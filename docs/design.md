# Design rules

## Ali positioning (resume / team card)

Public intro for Ali Mahdavinia leads with **Software Engineer — Backend, System Design & AI Agents**. Software design/delivery is the identity; AI agents / RAG are visible, not the whole title. Never use “Senior” in Ali resume copy.

Military service: state **completed / exempt** on the resume (badge). Do not invent a graduation date.

**Source of truth for product claims:** [`project-dossier.md`](./project-dossier.md).

**Agent Studio / chatbot.ir** (resume project + current role):

- Public bullets: **5 max**, plain “built X …” wording — no fake “نتیجه:” prefixes on architecture claims.
- Metrics (~90% RAG vs org policies, ~20GB knowledge-path load) appear **once** (project bullets only), not in summary/experience/shortBio.
- Architecture-light: no internal stage names, Task enums, Host/slug rules, Coolify/RLS/Langfuse wiring, or product-specific client tools.
- Interview note: defend ~90% with evaluation method (dataset size, labeling, judge). If undefended, drop or soften the number.
- Project order (major): Agent Studio → Ehdasino → Amreton → HopGo.
- Other / small: Signal (Kafka multi-worker consumer) only — no pump shop, wholesale, SIEM, or student filler.
- Landing / team tagline for Ali matches resume positioning (not the poetic brand line).

## Work case pages (`/work/[slug]`)

Product marketing on the site; engineering depth on `/resume`.

| Slug | Layout | Story |
| --- | --- | --- |
| `hopgo` | `trust-map` | owner ↔ walker trust / local |
| `amreton` | `before-after` | DM chaos → invoice & pay |
| `ehdasino` | `b2b-flow` | RFQ → proposals → decide |
| `chatbot-ir` | `agent-idea` | org-grounded agents |

Do not invent payments/ratings for HopGo. Gold only on short phrase marks (same rule as below).

## Gold / yellow accent

**Gold (`#f5b342` / `text-gold`) is only for highlighting short phrases inside body copy.**

Reference implementations (do this):

- **Hero** — white chrome (`>_`, titles, roles). Gold only on phrase marks like `Architecture.` and `code the light`, plus the thin quote bar beside the lead.
- **Beyond (section 2)** — muted eyebrow, white title. Gold only via `.beyond-mark` on selected words/phrases in the lead and stage copy.

Do **not** do this:

- Paint section chrome yellow (`>_`, index, kickers, labels, icons, beads, glows, tracks, hinges, pulses).
- Recolor entire labels, CTAs, or decorative UI just to “use the brand color.”
- Auto-highlight middle kicker segments or whole titles in gold.

If a section needs emphasis, highlight **one short phrase** in the sentence — same pattern as Hero / Beyond. Everything else stays white / muted / section-local neutrals (e.g. cyan on Leverage signal side).

## Section headers

After Hero, headers follow **Beyond** — not the Hero terminal prompt:

- Eyebrow: muted (`#8fa3c7`) — `{index} — {kicker}` (e.g. `02 — LEVERAGE`)
- Title: white Inter
- Lead: muted body; optional `leadHighlight` phrase in gold only
- Do **not** use `>_` on section headers (Hero only)

Hero keeps `>_` as its own chrome.
## Homepage order

1. Hero  
2. Beyond (`BeyondCodeSection`)  
3. Leverage (`LeverageSection`)  
4. Selected work — Beyond-style stage (tabs + one glass window + visual); not a grid  
5. Team  
6. Contact  

Do not add a separate “Method / process steps” section — Beyond + Leverage already carry that story.
Do not lay out homepage work as bordered 2×2 cells — the site uses open fields and single stages.