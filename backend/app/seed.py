from __future__ import annotations

import json
from pathlib import Path

from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import hash_password
from app.models.models import AdminUser, Resume, SiteSettings, TeamMember

DEFAULT_HOME = {
    "hero": {
        "eyebrow": "[ The Genesis Protocol ]",
        "line1": "From the void",
        "line2_prefix": "of",
        "line2_stroke": "is empty",
        "line3_prefix": "We code the",
        "line3_accent": "light",
        "description": "We turn messy systems and hard problems into clear architectures — multi-tenant SaaS, domain-driven design, and high-performance async cores.",
    },
    "void": {
        "title": "The Void",
        "subtitle": "Where most products stall",
        "items": [
            {
                "label": "01",
                "title": "Scattered logic",
                "text": "Business rules buried in UI, scripts, and tribal knowledge — nothing you can safely change.",
            },
            {
                "label": "02",
                "title": "Hard-to-scale tenancy",
                "text": "One-off customer forks instead of a true multi-tenant foundation.",
            },
            {
                "label": "03",
                "title": "Opaque systems",
                "text": "No clear boundaries, no events, no observability — only firefighting.",
            },
        ],
    },
    "crossing": {
        "title": "The Crossing",
        "subtitle": "From chaos to a system that holds",
        "steps": [
            {"from": "Messy requirements", "to": "Sharp domain model"},
            {"from": "Fragile monoliths", "to": "Bounded contexts"},
            {"from": "Empty states", "to": "Illuminated flows"},
            {"from": "Heroic debugging", "to": "Observable pipelines"},
        ],
    },
    "capabilities": {
        "title": "Capabilities",
        "subtitle": "What we forge",
        "cards": [
            {
                "icon": "01 // MULTI-TENANT",
                "title": "SaaS Ecosystems",
                "description": "Isolated, secure, scalable infrastructures — one foundation, many realms.",
                "span": 2,
            },
            {
                "icon": "02 // DDD",
                "title": "System Arch",
                "description": "Order upon chaos. Pure, scalable contexts.",
                "span": 1,
            },
            {
                "icon": "03 // ENG",
                "title": "Product-minded",
                "description": "Every line serves a real product pulse.",
                "span": 1,
            },
            {
                "icon": "LOGIC_CORE // PYTHON & DJANGO",
                "title": "Business Logic",
                "description": "Complex multi-tenant logic with battle-tested rapidity.",
                "code": "def create_reality(req):\n    if req.void.is_empty:\n        return Architect.build(SaaS())",
                "span": 2,
            },
            {
                "icon": "SYSTEM_CORE // RUST ASYNC",
                "title": "High-Performance",
                "description": "Zero-cost abstractions where memory and speed matter.",
                "code": "async fn illuminate(s: &mut Void) {\n    s.extract_truth().await;\n    Light::from(s)\n}",
                "span": 2,
            },
        ],
    },
    "method": {
        "title": "The Method",
        "subtitle": "Our working protocol",
        "steps": [
            {
                "key": "Discover",
                "text": "Map the mess. Interview the domain. Name what actually hurts.",
            },
            {
                "key": "Model",
                "text": "Draw bounded contexts. Separate write and read paths when scale demands it.",
            },
            {
                "key": "Build",
                "text": "Ship modular services — Django for product velocity, Rust when the edge is sharp.",
            },
            {
                "key": "Illuminate",
                "text": "Document, observe, and hand over a system the team can own.",
            },
        ],
    },
    "team": {
        "title": "The Circle",
        "subtitle": "Architects of the unseen",
    },
    "contact": {
        "title": "Let's weave the light.",
        "subtitle": "Ready to leave the void behind? Transmit a signal.",
        "button": "Transmit Signal →",
    },
}


def empty_resume(name_en: str, name_fa: str, role_en: str, role_fa: str, email: str = "") -> dict:
    return {
        "personal": {
            "name": {"fa": name_fa or name_en, "en": name_en},
            "tagline": {"fa": role_fa or role_en, "en": role_en},
            "avatar": {"fa": (name_fa or name_en)[:1], "en": name_en[:1]},
            "location": {"fa": "تهران", "en": "Tehran"},
            "phone": {"fa": "", "en": ""},
            "phoneHref": "",
            "email": email,
            "badges": [],
        },
        "contactsSecondary": [],
        "summary": {"fa": "", "en": ""},
        "experiences": [],
        "projects": {"major": [], "small": []},
        "skills": [],
        "education": [],
        "certificates": [],
        "languages": [],
        "footer": {
            "text": {"fa": "Genesis", "en": "Genesis"},
            "backToTop": {"fa": "بازگشت به بالا", "en": "Back to top"},
        },
    }


def seed_if_empty(db: Session) -> None:
    if db.query(AdminUser).first():
        return

    db.add(
        AdminUser(
            username=settings.admin_username,
            password_hash=hash_password(settings.admin_password),
        )
    )

    profile_path = Path(__file__).resolve().parents[2] / "src" / "data" / "profile.json"
    ali_resume: dict = {}
    contacts = {
        "email": "alimahdavinia125@gmail.com",
        "telegram": "https://t.me/mahdaviniaali",
        "linkedin": "https://www.linkedin.com/in/mahdaviniaali/",
        "github": "https://github.com/mahdaviniaali",
    }
    if profile_path.exists():
        raw = json.loads(profile_path.read_text(encoding="utf-8"))
        ali_resume = raw.get("resume", {})
        landing = raw.get("landing", {})
        for c in landing.get("contacts", []):
            t = c.get("type")
            if t in contacts and c.get("href"):
                contacts[t] = c["href"].replace("mailto:", "") if t == "email" else c["href"]

    email_raw = contacts.get("email", "alimahdavinia125@gmail.com")
    email_clean = email_raw.replace("mailto:", "")

    db.add(
        SiteSettings(
            brand_name="Genesis",
            tagline='From the void of "is empty"; We code the light.',
            email=email_clean,
            telegram=contacts.get("telegram", ""),
            linkedin=contacts.get("linkedin", ""),
            github=contacts.get("github", ""),
            home_content=json.dumps(DEFAULT_HOME, ensure_ascii=False),
        )
    )

    ali = TeamMember(
        slug="ali-mahdavinia",
        name_en="Ali Mahdavinia",
        name_fa="علی مهدوی‌نیا",
        role_en="Backend & System Architect",
        role_fa="معمار سیستم و بک‌اند",
        short_bio_en="Leads multi-tenant SaaS and domain-driven backends — turning messy product ideas into durable systems.",
        short_bio_fa="رهبری بک‌اند SaaS چندمستاجره و معماری دامنه — تبدیل ایده‌های مبهم به سیستم‌های پایدار.",
        avatar_url="",
        email=email_clean,
        github=contacts.get("github", ""),
        linkedin=contacts.get("linkedin", ""),
        telegram=contacts.get("telegram", ""),
        sort_order=0,
        is_published=True,
    )
    db.add(ali)
    db.flush()
    db.add(Resume(member_id=ali.id, data_json=json.dumps(ali_resume or empty_resume(
        ali.name_en, ali.name_fa, ali.role_en, ali.role_fa, ali.email
    ), ensure_ascii=False)))

    sara = TeamMember(
        slug="sara-nokhavat",
        name_en="Sara Nokhavat",
        name_fa="سارا نخاوت",
        role_en="Product & Domain Strategist",
        role_fa="استراتژیست محصول و دامنه",
        short_bio_en="Turns ambiguous briefs into crisp requirements and domain language the whole team can ship against.",
        short_bio_fa="بریف‌های مبهم را به نیازمندی و زبان دامنه شفاف برای کل تیم تبدیل می‌کند.",
        sort_order=1,
        is_published=True,
        email="sara@genesis.dev",
    )
    db.add(sara)
    db.flush()
    sara_resume = empty_resume(sara.name_en, sara.name_fa, sara.role_en, sara.role_fa, sara.email)
    sara_resume["summary"] = {
        "en": "Product strategist focused on domain clarity. Bridges founders and engineers so Genesis ships systems that match the real business — not a guess.",
        "fa": "استراتژیست محصول با تمرکز روی شفافیت دامنه. پل بین بنیان‌گذار و مهندس تا سیستم با واقعیت بیزینس هم‌خوان باشد.",
    }
    sara_resume["skills"] = ["Domain Workshops", "User Research", "PRD / Spec Writing", "SaaS Roadmaps", "Stakeholder Alignment"]
    sara_resume["experiences"] = [
        {
            "title": {"en": "Product Strategist", "fa": "استراتژیست محصول"},
            "location": {"en": "Genesis", "fa": "جنسیس"},
            "date": {"en": "2024 — Present", "fa": "۱۴۰۳ — اکنون"},
            "description": {
                "en": "Runs discovery workshops, shapes backlog language, and keeps engineering aligned with revenue-critical flows.",
                "fa": "ورکشاپ کشف، زبان بک‌لاگ و هم‌راستایی مهندسی با جریان‌های حیاتی درآمد.",
            },
        }
    ]
    db.add(Resume(member_id=sara.id, data_json=json.dumps(sara_resume, ensure_ascii=False)))

    reza = TeamMember(
        slug="reza-karimi",
        name_en="Reza Karimi",
        name_fa="رضا کریمی",
        role_en="Frontend Systems Engineer",
        role_fa="مهندس سیستم‌های فرانت‌اند",
        short_bio_en="Builds calm, high-signal interfaces on top of complex backends — clarity for operators and customers.",
        short_bio_fa="رابط‌های آرام و خوانا روی بک‌اندهای پیچیده — وضوح برای اپراتور و مشتری.",
        sort_order=2,
        is_published=True,
        email="reza@genesis.dev",
        github="https://github.com",
    )
    db.add(reza)
    db.flush()
    reza_resume = empty_resume(reza.name_en, reza.name_fa, reza.role_en, reza.role_fa, reza.email)
    reza_resume["summary"] = {
        "en": "Frontend systems engineer specializing in design systems and operational dashboards for multi-tenant products.",
        "fa": "مهندس فرانت با تمرکز روی دیزاین‌سیستم و داشبوردهای عملیاتی محصولات چندمستاجره.",
    }
    reza_resume["skills"] = ["TypeScript", "React / Next.js", "Design Systems", "Accessibility", "Performance"]
    reza_resume["experiences"] = [
        {
            "title": {"en": "Frontend Engineer", "fa": "مهندس فرانت‌اند"},
            "location": {"en": "Genesis", "fa": "جنسیس"},
            "date": {"en": "2023 — Present", "fa": "۱۴۰۲ — اکنون"},
            "description": {
                "en": "Owns client shells for SaaS consoles, focusing on state clarity and fast paths for power users.",
                "fa": "مالک شِل کلاینت کنسول‌های SaaS با تمرکز روی وضوح state و مسیرهای سریع برای کاربران حرفه‌ای.",
            },
        }
    ]
    db.add(Resume(member_id=reza.id, data_json=json.dumps(reza_resume, ensure_ascii=False)))

    db.commit()
