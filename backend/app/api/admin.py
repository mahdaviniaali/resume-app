from __future__ import annotations

import json
import uuid
from pathlib import Path

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from sqlalchemy.orm import Session, joinedload

from app.api.serializers import member_to_detail, member_to_public, site_to_out
from app.core.database import get_db
from app.core.deps import get_current_admin
from app.core.security import create_access_token, verify_password
from app.models.models import AdminUser, Resume, SiteSettings, TeamMember
from app.schemas import (
    DashboardOut,
    LoginIn,
    MemberCreate,
    MemberDetail,
    MemberPublic,
    MemberUpdate,
    ReorderIn,
    ResumeUpdate,
    SiteSettingsOut,
    SiteSettingsUpdate,
    TokenOut,
)
from app.seed import empty_resume

router = APIRouter(prefix="/api/admin", tags=["admin"])

UPLOAD_DIR = Path(__file__).resolve().parents[2] / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


@router.post("/login", response_model=TokenOut)
def login(payload: LoginIn, db: Session = Depends(get_db)):
    admin = db.query(AdminUser).filter(AdminUser.username == payload.username).first()
    if not admin or not verify_password(payload.password, admin.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    return TokenOut(access_token=create_access_token(admin.username))


@router.get("/dashboard", response_model=DashboardOut)
def dashboard(
    db: Session = Depends(get_db),
    _: AdminUser = Depends(get_current_admin),
):
    members = db.query(TeamMember).all()
    site = db.query(SiteSettings).first()
    return DashboardOut(
        members_count=len(members),
        published_count=sum(1 for m in members if m.is_published),
        brand_name=site.brand_name if site else "Genesis",
    )


@router.get("/site", response_model=SiteSettingsOut)
def admin_get_site(
    db: Session = Depends(get_db),
    _: AdminUser = Depends(get_current_admin),
):
    site = db.query(SiteSettings).first()
    if not site:
        raise HTTPException(status_code=404, detail="Site settings not found")
    return site_to_out(site)


@router.put("/site", response_model=SiteSettingsOut)
def admin_update_site(
    payload: SiteSettingsUpdate,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(get_current_admin),
):
    site = db.query(SiteSettings).first()
    if not site:
        raise HTTPException(status_code=404, detail="Site settings not found")

    data = payload.model_dump(exclude_unset=True)
    home = data.pop("home_content", None)
    for key, value in data.items():
        setattr(site, key, value)
    if home is not None:
        site.home_content = json.dumps(home, ensure_ascii=False)
    db.commit()
    db.refresh(site)
    return site_to_out(site)


@router.get("/members", response_model=list[MemberPublic])
def admin_list_members(
    db: Session = Depends(get_db),
    _: AdminUser = Depends(get_current_admin),
):
    members = db.query(TeamMember).order_by(TeamMember.sort_order.asc(), TeamMember.id.asc()).all()
    return [member_to_public(m) for m in members]


@router.get("/members/{member_id}", response_model=MemberDetail)
def admin_get_member(
    member_id: int,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(get_current_admin),
):
    member = (
        db.query(TeamMember)
        .options(joinedload(TeamMember.resume))
        .filter(TeamMember.id == member_id)
        .first()
    )
    if not member:
        raise HTTPException(status_code=404, detail="Member not found")
    return member_to_detail(member)


@router.post("/members", response_model=MemberDetail, status_code=201)
def admin_create_member(
    payload: MemberCreate,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(get_current_admin),
):
    if db.query(TeamMember).filter(TeamMember.slug == payload.slug).first():
        raise HTTPException(status_code=400, detail="Slug already exists")

    member = TeamMember(
        slug=payload.slug,
        name_en=payload.name_en,
        name_fa=payload.name_fa,
        role_en=payload.role_en,
        role_fa=payload.role_fa,
        short_bio_en=payload.short_bio_en,
        short_bio_fa=payload.short_bio_fa,
        avatar_url=payload.avatar_url,
        email=payload.email,
        github=payload.github,
        linkedin=payload.linkedin,
        telegram=payload.telegram,
        sort_order=payload.sort_order,
        is_published=payload.is_published,
    )
    db.add(member)
    db.flush()

    resume_data = payload.resume or empty_resume(
        payload.name_en, payload.name_fa, payload.role_en, payload.role_fa, payload.email
    )
    db.add(Resume(member_id=member.id, data_json=json.dumps(resume_data, ensure_ascii=False)))
    db.commit()

    member = (
        db.query(TeamMember)
        .options(joinedload(TeamMember.resume))
        .filter(TeamMember.id == member.id)
        .first()
    )
    return member_to_detail(member)


@router.put("/members/{member_id}", response_model=MemberDetail)
def admin_update_member(
    member_id: int,
    payload: MemberUpdate,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(get_current_admin),
):
    member = (
        db.query(TeamMember)
        .options(joinedload(TeamMember.resume))
        .filter(TeamMember.id == member_id)
        .first()
    )
    if not member:
        raise HTTPException(status_code=404, detail="Member not found")

    data = payload.model_dump(exclude_unset=True)
    if "slug" in data and data["slug"] != member.slug:
        exists = db.query(TeamMember).filter(TeamMember.slug == data["slug"]).first()
        if exists:
            raise HTTPException(status_code=400, detail="Slug already exists")

    for key, value in data.items():
        setattr(member, key, value)
    db.commit()
    db.refresh(member)
    return member_to_detail(member)


@router.delete("/members/{member_id}", status_code=204)
def admin_delete_member(
    member_id: int,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(get_current_admin),
):
    member = db.query(TeamMember).filter(TeamMember.id == member_id).first()
    if not member:
        raise HTTPException(status_code=404, detail="Member not found")
    db.delete(member)
    db.commit()
    return None


@router.put("/members/{member_id}/resume", response_model=MemberDetail)
def admin_update_resume(
    member_id: int,
    payload: ResumeUpdate,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(get_current_admin),
):
    member = (
        db.query(TeamMember)
        .options(joinedload(TeamMember.resume))
        .filter(TeamMember.id == member_id)
        .first()
    )
    if not member:
        raise HTTPException(status_code=404, detail="Member not found")
    if not member.resume:
        member.resume = Resume(member_id=member.id, data_json="{}")
        db.add(member.resume)
    member.resume.data_json = json.dumps(payload.data, ensure_ascii=False)
    db.commit()
    db.refresh(member)
    return member_to_detail(member)


@router.put("/members/reorder", response_model=list[MemberPublic])
def admin_reorder(
    payload: ReorderIn,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(get_current_admin),
):
    by_id = {m.id: m for m in db.query(TeamMember).all()}
    for item in payload.items:
        if item.id in by_id:
            by_id[item.id].sort_order = item.sort_order
    db.commit()
    members = db.query(TeamMember).order_by(TeamMember.sort_order.asc(), TeamMember.id.asc()).all()
    return [member_to_public(m) for m in members]


@router.post("/upload")
async def admin_upload(
    file: UploadFile = File(...),
    _: AdminUser = Depends(get_current_admin),
):
    suffix = Path(file.filename or "upload.bin").suffix.lower() or ".bin"
    if suffix not in {".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"}:
        raise HTTPException(status_code=400, detail="Unsupported file type")
    name = f"{uuid.uuid4().hex}{suffix}"
    dest = UPLOAD_DIR / name
    content = await file.read()
    dest.write_bytes(content)
    return {"url": f"/uploads/{name}"}
