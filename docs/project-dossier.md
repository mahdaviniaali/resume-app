# Project dossier — resume & site source of truth

Facts only from each repo’s docs/code. Marketing copy on the site and engineering bullets on the resume both derive from here — different tone, same claims.

Last verified against repos under `/home/ali-m/Desktop/projects` (HopGo, Amreton, Ehdasino) and existing Agent Studio resume claims + `docs/design.md`.

---

## Agent Studio (chatbot.ir)

| Field | Value |
| --- | --- |
| URL | https://chatbot.ir/ |
| Maturity | In development / shipping iteratively |
| Role | Backend software engineer — platform & runtime — Amer Andish Houshmand |
| Site angle | Enterprise agent platform — controlled assistants that follow org rules |
| Resume angle | Multi-tenant agent runtime, grounded RAG, queues under load |

**Pitch (EN):** Backend for building and running enterprise AI assistants on chatbot.ir: tenant isolation, knowledge ingestion under load, controlled agent runtime, and grounded RAG.

**Pitch (FA):** بک‌اند ساخت و اجرای دستیار هوشمند سازمانی روی chatbot.ir: ایزولاسیون tenant، بار دانش، runtime کنترل‌شده، و RAG grounded.

**Product features (site):** multi-tenant agents · knowledge from sites/docs · answers tied to retrieved sources · human/tool-in-the-loop · self-serve builder path

**Tech (resume keywords):** Python / FastAPI · multi-tenant · queues & retries · Docker · streaming APIs · vector search · RAG · LLM · observability · TypeScript / Next.js (product surfaces)

**Engineering bullets (resume):**

- Handled ~20GB knowledge-path input without downtime via resource-aware queues and retries
- Multi-tenant isolation with custom domain per tenant
- Controlled runtime: model proposes, system makes hard decisions
- RAG ~90% accuracy against org policies with source grounding (defend method in interview)
- Server/client tools + human-in-the-loop in the same agent run

**Do not claim:** internal stage/Task enums, Coolify/RLS/Langfuse wiring, product-specific client tool names, Kubernetes/Kafka unless verified in this repo.

---

## Ehdasino

| Field | Value |
| --- | --- |
| URL | http://ehdasino.ir/ |
| Maturity | Delivered under contract (Agrin Pay); production hardening waves applied |
| Role | Software engineer (contract) — Agrin Pay |
| Site angle | Reverse auction for construction materials — transparent buyer↔supplier competition |
| Resume angle | B2B domain (RFQ/Proposal), OTP/JWT roles, hexagonal Django, testable delivery |

**Pitch (EN):** Construction-materials marketplace where suppliers compete: buyers post a request, collect bids, and compare price, delivery, and terms.

**Pitch (FA):** پلتفرم خرید مصالح با رقابت تأمین‌کنندگان: خریدار درخواست می‌زند، چند پیشنهاد می‌گیرد و قیمت، زمان تحویل و شرایط را شفاف مقایسه می‌کند.

**Audience:** Buyers (contractors / purchasers) and suppliers of construction materials.

**Product features (site):**

- Buyer posts RFQ; suppliers submit proposals
- Side-by-side comparison of price, delivery, terms
- Buyer / supplier roles
- Official vs unofficial purchase types; attachments & material dictionaries
- Status lifecycle: published → completed / cancelled / expired

**Tech:** Django / DRF · Next.js · PostgreSQL · Redis · Celery · OTP/JWT cookies · hexagonal (use case + ports) · Docker · Sentry / OTEL hooks

**Engineering bullets (resume):**

- Modeled RFQ/Proposal domain with edit rules when proposals exist
- OTP → JWT HTTP-only cookies; buyer/supplier roles; refresh-on-401 client
- Hexagonal backend: use cases testable without HTTP; thin views
- Async notifications via Celery + Redis
- Production hardening: auth/OTP, health/readiness, access scoping, observability

**Do not claim:** unfinished scaffold apps as shipped features; invent metrics.

---

## Amreton

| Field | Value |
| --- | --- |
| URL | https://amreton.com/ |
| Maturity | Building / prelaunch product path; core order flow complete in backend |
| Role | Software engineering & system design |
| Site angle | Instagram DM chaos → invoice, online pay, trackable order — no IG password |
| Resume angle | Multi-tenant commerce SaaS, outbox, pluggable payments/SMS, seller isolation |

**Pitch (EN):** Turns Instagram DM order-taking into online invoices, bank payments, and trackable orders—without asking for an Instagram password.

**Pitch (FA):** سفارش‌های دایرکت اینستاگرام را به فاکتور آنلاین، پرداخت بانکی و سفارش قابل‌رهگیری تبدیل می‌کند — بدون درخواست رمز اینستاگرام.

**Audience:** Social sellers (Instagram-first) and their customers.

**Product features (site):**

- Per-seller invoice / pay / track links
- Seller panel: products, orders, statuses
- Online payment (card-to-card default; Zarinpal and other providers via ports)
- SMS status updates
- Multi-tenant seller isolation
- Instagram channel connect (OAuth or mock in non-prod)

**Tech:** Python 3.12 · FastAPI · SQLAlchemy 2 async · PostgreSQL · Redis · transactional outbox + worker · Next.js · SSE · platform admin RBAC · Docker · structlog / optional OTel

**Engineering bullets (resume):**

- Modular monolith: API + outbox worker; domain events via transactional outbox
- Multi-tenant sellers (`seller_users` / memberships / `sellers`) with JWT tenant claims
- Pluggable payment & SMS ports (card-to-card, Zarinpal, mocks; Kavenegar/sms.ir)
- Instagram channel BC with outbound pay URLs and editable DM templates
- Observability: request id, JSON logs; optional OTel stack

**Do not claim:** full logistics/inventory as live unless citing current_state; Platform AI as production unless stub-only is clear; NestJS (superseded).

---

## HopGo

| Field | Value |
| --- | --- |
| URL | — (no public production URL in repo docs) |
| Maturity | Building — core matching & map UX shipped; payments / ratings not built |
| Role | Software engineering & system design |
| Site angle | Trusted local dog-walking marketplace in Iran — owner ↔ verified walker |
| Resume angle | FastAPI hexagonal + RabbitMQ outbox, dual-path matching, OTP one-phone-one-role |

**Pitch (EN):** Connects dog owners with verified local walkers so care is simple, trustworthy, and trackable—starting with walking, growing toward broader pet care.

**Pitch (FA):** صاحبان سگ را به سگ‌گردان‌های تأییدشده وصل می‌کند تا مراقبت ساده، قابل‌اعتماد و قابل‌پیگیری باشد — با تمرکز اول روی سگ‌گردانی.

**Audience:** Dog owners (demand) and walkers/sitters (supply); platform as trust + coordination layer.

**Product features built (site — only claim these):**

- Shared OTP login; one phone = one role
- Owner onboarding + dog profiles CRUD
- Walker multi-step verification + admin review
- Walker ops profile: area, schedule, bio, price, capacity
- Map-first homes + service/inbox sheets
- Multi-dog service requests; ranked offers; accept/reject
- Start/end geo snapshot + soft admin flag
- Marketing landing + public walker search (opt-in map)

**Not built (do not claim):** payments/settlement · post-service reports & public ratings · in-app messaging · continuous live tracking

**Tech:** FastAPI · SQLAlchemy 2 async · PostgreSQL 16 · RabbitMQ + aio-pika · outbox relay + consumers · hexagonal DDD · Next.js · structlog · Docker Compose

**Engineering bullets (resume):**

- Hexagonal FastAPI with bounded contexts; domain free of ORM/AMQP
- Transactional outbox + RabbitMQ workers for notifications/side effects
- Dual-path area matching (ranked active walkers vs coverage broadcast; first-wins apply)
- OTP identity with one-phone-one-role; walker KYC vs ops profile separation
- Health/readyz (DB + AMQP); REST v1 contract

**Do not claim:** live payments, ratings, live GPS tracking, or a public URL until one exists.

---

## Signal (small / resume only)

| Field | Value |
| --- | --- |
| URL | — (lab / portfolio system) |
| Maturity | Complete demo with load + decision docs |
| Role | Software engineering — distributed systems |
| Resume angle | Multi-worker Kafka consumer: I/O vs CPU isolation, safe commits, backpressure, idempotency |

**Pitch (EN):** FastAPI + 5 uvicorn workers consuming two Kafka topics; I/O stays non-blocking under CPU load via ProcessPool; watermark commits and SQLite idempotency.

**Engineering bullets:**

- asyncio I/O vs ProcessPool CPU so the event loop stays alive under compute
- Per-worker semaphore + Kafka pause/resume (bounded in-flight)
- Contiguous watermark commits; failures leave offsets uncommitted
- Idempotent redelivery via UNIQUE(topic, event_id)

**Do not claim:** production traffic or a public product URL. Not a site marketing case.

**Removed from resume/site:** wholesale ordering system; industrial pump e-commerce (waterrisen) — weak signal vs majors + Signal.

---

## Positioning rules (Ali)

- Identity: Software Engineer (design, analysis, backend, delivery) first; AI agents visible second.
- Never use “Senior” in Ali copy.
- Metrics (~90%, ~20GB) once in Agent Studio project bullets only.
- Site = marketing / promise; resume = engineering flex.
- Small projects: Signal only.
