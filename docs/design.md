# Design rules

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
4. Method — open path; short kicker `Method`; gold only on lead phrase  
5. Selected work  
6. Team  
7. Contact  
