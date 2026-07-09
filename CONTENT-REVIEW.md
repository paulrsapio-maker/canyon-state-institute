# Content Review — Launch Gate

The site is **built and functional** but intentionally noindexed (`SITE_LAUNCHED=false`).
Do not flip the flag or point a public domain at it until every item below is resolved.
Spec source: `docs/website-spec.md` §8.

## Blocking — factual/legal content

| # | Item | Where | Status |
|---|------|-------|--------|
| 1 | **Fast-fact numbers** (year founded, programs, students served, employer partners, % veteran leadership) | Home fast-facts band → `lib/content.ts` `home.fastFacts` | ⬜ Placeholders in brackets |
| 2 | **Executive team roster** — names, titles, headshots, bios | `/about/executive-team` → `about.executiveTeam.members` | ⬜ Placeholder cards |
| 3 | **Accreditation status** — determines credential-page claims and whether Graduate Certificate / Degree tiers appear | `/about/credentials` → `credentials.disclaimer` | ⬜ Disclaimer shown; no accreditor named (correct until held) |
| 4 | **Credential hour thresholds** — 20/36–150/150+ tiers need internal approval | `credentials.tiers` | ⬜ Marked pending on page |
| 5 | **Course catalog** — real course lists, schedules, tuition | Program pages → `programs[].courses` | ⬜ Sample catalog, labeled as sample on-page |
| 6 | **Contact details** — address, phone, email | Footer, contact, admissions → `site.*` | ⬜ `[pending]` placeholders |
| 7 | **Legal pages** — privacy, terms, accessibility, non-discrimination need attorney review | `lib/content.ts` `legalPages` | ⬜ Placeholder text, flagged on-page |
| 8 | **Student testimonials/outcomes** — publish only real, consented stories (never fabricate for a school) | `/student-success` | ⬜ "Stories coming soon" note shown |
| 9 | **Domain + hosting decision** — spec placeholder is canyonstateinstitute.edu | `.env` `NEXT_PUBLIC_SITE_URL` | ⬜ Unconfirmed |

## Blocking — technical

| # | Item | Status |
|---|------|--------|
| 10 | `RESEND_API_KEY` + `CONTACT_TO_EMAIL` env vars (form currently logs to console) | ⬜ |
| 11 | Flip `SITE_LAUNCHED=true` (enables indexing + robots sitemap) at go-live only | ⬜ |
| 12 | GA4 + conversion events (spec §7) — not yet wired | ⬜ |
| 13 | Student Login destination — utility-bar link currently anchors to an "coming soon" note on /admissions | ⬜ |

## Resolved during build

- ✅ "Stanford Online Credentials" / "Grand Canyon Institute" source-copy references corrected to Canyon State Institute (per spec §3.5 warning) — confirm intent with owner.
- ✅ All imagery is AI-generated (Gemini / Nano Banana), reviewed for text artifacts and regenerated where needed. Replace with real classroom/staff photography when available (spec §6 prefers real people; AI images are the approved interim).
- ✅ WCAG 2.2 AA basics: skip link, focus rings, contrast-safe palette usage, reduced-motion support, semantic landmarks, form labels/errors.
- ✅ Social icons omitted from footer until real profiles exist (spec lists them; add when created).
- ✅ Newsletter signup omitted until a list provider is chosen.
