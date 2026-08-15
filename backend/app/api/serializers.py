from __future__ import annotations

import json

from app.models.models import SiteSettings, TeamMember
from app.schemas import ContactLinks, MemberDetail, MemberPublic, SiteSettingsOut


def parse_json(raw: str | None, default: dict | list | None = None):
    if not raw:
        return default if default is not None else {}
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        return default if default is not None else {}


def site_to_out(site: SiteSettings) -> SiteSettingsOut:
    return SiteSettingsOut(
        brand_name=site.brand_name,
        tagline=site.tagline,
        contacts=ContactLinks(
            email=site.email,
            telegram=site.telegram,
            linkedin=site.linkedin,
            github=site.github,
        ),
        home_content=parse_json(site.home_content, {}),
    )


def member_to_public(m: TeamMember) -> MemberPublic:
    return MemberPublic.model_validate(m)


def member_to_detail(m: TeamMember, include_resume: bool = True) -> MemberDetail:
    base = MemberPublic.model_validate(m)
    resume = None
    if include_resume and m.resume:
        resume = parse_json(m.resume.data_json, {})
    return MemberDetail(**base.model_dump(), resume=resume)
