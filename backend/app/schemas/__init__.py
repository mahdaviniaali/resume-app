from typing import Any

from pydantic import BaseModel, Field


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"


class LoginIn(BaseModel):
    username: str
    password: str


class ContactLinks(BaseModel):
    email: str = ""
    telegram: str = ""
    linkedin: str = ""
    github: str = ""


class SiteSettingsOut(BaseModel):
    brand_name: str
    tagline: str
    contacts: ContactLinks
    home_content: dict[str, Any]


class SiteSettingsUpdate(BaseModel):
    brand_name: str | None = None
    tagline: str | None = None
    email: str | None = None
    telegram: str | None = None
    linkedin: str | None = None
    github: str | None = None
    home_content: dict[str, Any] | None = None


class MemberPublic(BaseModel):
    id: int
    slug: str
    name_en: str
    name_fa: str
    role_en: str
    role_fa: str
    short_bio_en: str
    short_bio_fa: str
    avatar_url: str
    email: str
    github: str
    linkedin: str
    telegram: str
    sort_order: int
    is_published: bool

    model_config = {"from_attributes": True}


class MemberDetail(MemberPublic):
    resume: dict[str, Any] | None = None


class MemberCreate(BaseModel):
    slug: str = Field(min_length=2, max_length=120)
    name_en: str
    name_fa: str = ""
    role_en: str
    role_fa: str = ""
    short_bio_en: str = ""
    short_bio_fa: str = ""
    avatar_url: str = ""
    email: str = ""
    github: str = ""
    linkedin: str = ""
    telegram: str = ""
    sort_order: int = 0
    is_published: bool = True
    resume: dict[str, Any] | None = None


class MemberUpdate(BaseModel):
    slug: str | None = None
    name_en: str | None = None
    name_fa: str | None = None
    role_en: str | None = None
    role_fa: str | None = None
    short_bio_en: str | None = None
    short_bio_fa: str | None = None
    avatar_url: str | None = None
    email: str | None = None
    github: str | None = None
    linkedin: str | None = None
    telegram: str | None = None
    sort_order: int | None = None
    is_published: bool | None = None


class ResumeUpdate(BaseModel):
    data: dict[str, Any]


class ReorderItem(BaseModel):
    id: int
    sort_order: int


class ReorderIn(BaseModel):
    items: list[ReorderItem]


class DashboardOut(BaseModel):
    members_count: int
    published_count: int
    brand_name: str
