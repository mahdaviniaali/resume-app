from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload

from app.api.serializers import member_to_detail, member_to_public, site_to_out
from app.core.database import get_db
from app.models.models import SiteSettings, TeamMember
from app.schemas import MemberDetail, MemberPublic, SiteSettingsOut

router = APIRouter(prefix="/api", tags=["public"])


@router.get("/health")
def health():
    return {"status": "ok"}


@router.get("/site", response_model=SiteSettingsOut)
def get_site(db: Session = Depends(get_db)):
    site = db.query(SiteSettings).first()
    if not site:
        raise HTTPException(status_code=404, detail="Site settings not found")
    return site_to_out(site)


@router.get("/members", response_model=list[MemberPublic])
def list_members(db: Session = Depends(get_db)):
    members = (
        db.query(TeamMember)
        .filter(TeamMember.is_published.is_(True))
        .order_by(TeamMember.sort_order.asc(), TeamMember.id.asc())
        .all()
    )
    return [member_to_public(m) for m in members]


@router.get("/members/{slug}", response_model=MemberDetail)
def get_member(slug: str, db: Session = Depends(get_db)):
    member = (
        db.query(TeamMember)
        .options(joinedload(TeamMember.resume))
        .filter(TeamMember.slug == slug, TeamMember.is_published.is_(True))
        .first()
    )
    if not member:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Member not found")
    return member_to_detail(member)
