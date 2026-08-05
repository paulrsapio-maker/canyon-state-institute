# Decks

Branded presentation decks for Canyon State Institute.

## Community Partnership

`CSI-Community-Partnership.pptx` — 13-slide deck for approaching community partners
about a shared educational facility. `CSI-Community-Partnership.pdf` is a
render of the same deck for quick sharing/preview.

**Provenance.** Rebranded from a source deck titled *"GCI Community Partnership"*
(Grand Canyon Institute College & Career Preparatory High School). All substantive
content was carried over; only the brand layer, structure, and naming changed.

### What changed from the source

| | Source | This deck |
|---|---|---|
| Institution name | Grand Canyon Institute (GCI) | Canyon State Institute |
| High school framing | "…Preparatory High School" as the entity | **A program of** Canyon State Institute |
| Palette | Default Office blues/greys | CSI warm desert palette |
| Type | Office defaults | Cambria headings / Calibri body |
| Diagrams | 4 SmartArt graphics | Rebuilt as native card layouts |

The naming follows the single-institution structure established in
[`docs/high-school-page-spec.md`](../docs/high-school-page-spec.md) §1: the high
school is a **program of** the institute, not a separately branded school. That
positioning is deliberate — it matches what the website and catalog claim.

### Fonts — deliberate substitution

The web brand uses Source Serif 4 + Source Sans 3. Those are Google Fonts and are
**not installed on most machines**, so a `.pptx` specifying them would silently
substitute something arbitrary on the recipient's computer. This deck uses
**Cambria** (headings) and **Calibri** (body) — the closest always-present pair
that ships with Microsoft Office on both Windows and Mac. Colors, logo, and layout
carry the brand; the typefaces are the portable equivalents.

### Placeholders to fill before sending

| Slide | Placeholder |
|---|---|
| 1 | `[Date]`, `[Name, Title]` |
| 13 | `[Contact name, title]`, `[Phone]`, `[Email]`, `[Website]` |

### Claims to confirm before sending

These came from the source deck and are **not** verified here:

- **"Grades 9–12" and "Arizona and Texas"** — the website still carries these as
  open items (`CONTENT-REVIEW.md` HS-1, HS-4). State authorization for enrolling
  minors varies by state; confirm before marketing outside Arizona.
- **"A private … High School Program"** — carried over from the source wording.
- The deck deliberately makes **no accreditation claim**, matching the website.

One source line was cleaned up rather than copied verbatim: *"Locational Classrooms
or Computer Room"* → *"Classrooms or a computer room"*. Revert if the original
phrasing was intentional.

## Regenerating

Requires `pptxgenjs` and `sharp`.

```bash
npm install pptxgenjs sharp
node scripts/prep-assets.mjs    # rasterize logos + convert site imagery -> assets/
node scripts/bake-hero.mjs      # bake the title-slide gradient scrim
node scripts/build-deck.mjs     # write CSI-Community-Partnership.pptx
```

`assets/` is committed, so `build-deck.mjs` alone is enough for content edits —
the other two only need rerunning if the source logos or site imagery change.

To re-render the PDF:

```bash
soffice --headless --convert-to pdf CSI-Community-Partnership.pptx
```

### Notes for editing

- Slide content lives inline in `scripts/build-deck.mjs`, one block per slide.
- Speaker notes are attached to every slide (`addNotes`) — presenter guidance,
  plus flags on the items above.
- Imagery is AI-generated (Gemini/Nano Banana), consistent with the website.
  Swap in real photography of students, staff, and facilities when available.
