# Source Code & Project Handoff Guide

**Project:** Canyon State Institute Website
**Prepared by:** <mark>[your name / company]</mark>
**Prepared for:** <mark>[recipient name / organization]</mark>
**Document version:** 1.0 — first published alongside the initial site build (July 2026)
**Status:** <mark>[DRAFT — not yet executed / SCHEDULED for ___ / COMPLETED on ___]</mark>

---

## How to use this document

This is a working checklist, not just a reference. It is organized in the order a handoff actually happens: what's being handed off, what isn't, what has to be decided first, the technical architecture the new owner's developer needs to understand, and then a step-by-step transfer procedure with a sign-off sheet at the end.

Two markup conventions are used throughout, matching the convention already used in the CSI school catalog draft:

- <mark>Yellow highlight</mark> = a blank that needs a real value (a name, a date, an account) before this step can be executed.
- > ⚠️ **DECISION:** a blockquote like this marks a choice this document cannot make for you — it requires a business or legal decision, ideally with the other party and/or counsel present.

Everything **not** highlighted or flagged is a factual, technical description of the codebase as it exists today and can be treated as accurate.

---

## Table of contents

1. [Purpose & scope](#1-purpose--scope)
2. [What is being handed off](#2-what-is-being-handed-off)
3. [What is deliberately excluded](#3-what-is-deliberately-excluded)
4. [Business & legal items to settle first](#4-business--legal-items-to-settle-first)
5. [Content readiness gate](#5-content-readiness-gate)
6. [System architecture overview](#6-system-architecture-overview)
7. [Third-party services & accounts inventory](#7-third-party-services--accounts-inventory)
8. [Step-by-step transfer procedure](#8-step-by-step-transfer-procedure)
9. [Local development setup (for the new developer)](#9-local-development-setup-for-the-new-developer)
10. [Common maintenance tasks](#10-common-maintenance-tasks)
11. [Deployment model](#11-deployment-model)
12. [Known limitations & technical debt](#12-known-limitations--technical-debt)
13. [Post-handoff support](#13-post-handoff-support)
14. [Final handoff checklist & sign-off](#14-final-handoff-checklist--sign-off)

---

## 1. Purpose & scope

This document governs the transfer of the Canyon State Institute website — source code, deployment, and the accounts that support it — from the party that built it to <mark>[recipient]</mark>, who will own it going forward.

"Transfer" here means the recipient (or a developer working for them) ends up with:

- Full, unencumbered ownership of the source code and its Git history
- Working control of where the site is hosted and how it deploys
- Every account and credential needed to operate the site without further involvement from the builder
- Enough documentation to understand, run, and modify the codebase without reverse-engineering it

It does **not** by itself resolve payment, intellectual-property assignment, or ongoing-support terms — those are flagged in [§4](#4-business--legal-items-to-settle-first) as decisions for the two parties to make, separately from this technical procedure.

---

## 2. What is being handed off

| Item | Description |
|---|---|
| **Application source code** | The full Next.js website: all pages, components, content, styling, and configuration. See [§6](#6-system-architecture-overview) for the complete map. |
| **Git history** | 10 commits from initial scaffold through the current build, showing the full construction of the site. |
| **Generated site imagery** | ~1.5MB of optimized WebP images actually used by the live site (`images/`), tracked in Git. |
| **Brand assets** | The CSI logo in three lockups (horizontal, icon, reversed) as SVG, plus the generated favicon/app-icon/OG-card pipeline (`public/`, `scripts/generate-brand-assets.mjs`). |
| **Documentation** | This file, plus the two design specs this site was built from (`docs/website-spec.md`, `docs/high-school-page-spec.md`) and the launch-readiness tracker (`CONTENT-REVIEW.md`). |
| **School catalog generator** | A separate small Node tool (`catalog/`) that produces the branded `.docx`/`.pdf` school catalog draft. Independent of the website — see [§6.8](#68-catalog-generator-separate-tool). |
| **Live deployment** | The site as currently deployed and reachable at its Vercel URL (see [§7](#7-third-party-services--accounts-inventory)). |

---

## 3. What is deliberately excluded

Being explicit about this now avoids surprises later.

- **Raw AI-image generation candidates** (`source-images/`, ~21MB) — these are the unedited outputs from the image-generation tool used during the build (rejected variants, alternates, working files). They are `.gitignore`d and were never committed. They are not needed to run or maintain the site; every image actually used lives in `images/` and *is* tracked. <mark>[Confirm whether the recipient wants these anyway — if so, they can be copied outside of Git as a zip.]</mark>
- **The builder's personal tool subscriptions** — code review (CodeRabbit) and AI image/design generation (Nano Banana, Stitch) were used during the build under the builder's own personal accounts and API keys, configured at the machine level, not the project level. None of this is required to run the deployed site. If the recipient wants to keep using AI-generated imagery or automated code review going forward, they will need their own accounts — see [§7](#7-third-party-services--accounts-inventory).
- **The builder's Vercel team** — the project currently lives under the builder's personal Vercel team, alongside unrelated projects for other clients. That team itself is not being transferred, only this one project (or a copy of it) — see [§8.3](#step-3--hosting-vercel).
- **A software license grant** — no `LICENSE` file exists in the repository today, and none is proposed here. See [§4](#4-business--legal-items-to-settle-first).

---

## 4. Business & legal items to settle first

These are not technical steps. They should be resolved — ideally in writing, ideally with counsel if real money or IP rights are involved — **before** executing [§8](#8-step-by-step-transfer-procedure). Everything below is a placeholder for the two parties to fill in, not a recommendation.

> ⚠️ **DECISION — Intellectual property.** Who owns the copyright in the code after transfer? Typical options: (a) full assignment to the recipient, (b) the recipient receives a license (exclusive or non-exclusive) while the builder retains ownership, (c) joint ownership. <mark>[state the agreed position]</mark>

> ⚠️ **DECISION — Payment.** Is this handoff contingent on a final payment, milestone, or invoice being settled? <mark>[state amount/terms, or "N/A — no payment attached to handoff"]</mark>

> ⚠️ **DECISION — License file.** If the recipient wants an explicit open-source-style license (MIT, etc.) or a proprietary "all rights reserved" notice in the repo, add a `LICENSE` file at the repo root before or during transfer. <mark>[choose one, or confirm none is wanted]</mark>

> ⚠️ **DECISION — Third-party asset rights.** The site's photography is 100% AI-generated (Gemini / Nano Banana) rather than licensed stock or original photography — see `CONTENT-REVIEW.md` item 8. Confirm the recipient understands this and is comfortable with continued use, or plans to replace it with real photography before public launch.

> ⚠️ **DECISION — Post-handoff support window.** Will the builder be available for questions or fixes for a period after transfer, and on what terms (paid hourly, a fixed included window, none)? <mark>[state terms]</mark> — see [§13](#13-post-handoff-support).

---

## 5. Content readiness gate

The site is **fully built and functional**, but intentionally kept out of search engines (`SITE_LAUNCHED=false`) because a number of content items are still placeholders. This is tracked in detail in **[`CONTENT-REVIEW.md`](../CONTENT-REVIEW.md)** at the repo root — that file is the authoritative, up-to-date list and should be checked directly rather than assumed from this summary. As of this writing it contains:

- **9 site-wide blocking items** — real fast-fact numbers, the executive team roster, accreditation status, credential hour thresholds, the real course catalog, real contact details, attorney-reviewed legal pages, real (not fabricated) student testimonials, and the final domain decision.
- **7 High School program items (HS-1 through HS-7)** — grades served, curriculum, a DEAC compliance review of the two-track policy language, state authorization for enrolling minors, real fast facts, the admissions-funnel decision, and the "accredited" wording gate.
- **4 technical items** — email delivery credentials, the `SITE_LAUNCHED` flag itself, analytics wiring, and the student-login destination.

**A code/account handoff can happen before this content gate clears** — ownership and content readiness are independent. But whoever owns the site after handoff needs to inherit this checklist and treat it as their launch gate, not just a historical note. Confirm as part of this handoff that the recipient has read `CONTENT-REVIEW.md` in full.

---

## 6. System architecture overview

### 6.1 Tech stack

| Layer | Choice | Version (at handoff) |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.10 |
| UI library | React | 19.2.4 |
| Language | TypeScript | ^5 |
| Styling | Tailwind CSS | v4 (via `@tailwindcss/postcss`) |
| Forms | React Hook Form + Zod | ^7.81 / ^4.4 |
| Email delivery | Resend | ^6.17 |
| Icons | lucide-react | ^1.24 |
| Image processing (build-time only) | sharp | ^0.35 |
| Package manager | npm | — (`package-lock.json` is the lockfile in use; do not introduce a second lockfile by installing with yarn/pnpm/bun) |
| Node.js | — | 22.x used during development. No `engines` field is currently set in `package.json` — recommend adding one (Next 16 requires Node ≥ 20). |

There is **no test suite** — `npm run lint` (ESLint) is the only automated check. See [§12](#12-known-limitations--technical-debt).

### 6.2 Directory structure

```
canyon-state-institute/
├── app/                      # Next.js App Router — one folder per route
│   ├── (legal)/[doc]/        # Dynamic route: /privacy, /terms, /accessibility, /non-discrimination
│   ├── about/                # /about, plus /about/executive-team, /about/commitment, /about/credentials
│   ├── admissions/           # /admissions
│   ├── api/contact/          # POST route backing the contact form
│   ├── contact/              # /contact
│   ├── high-school/          # /high-school
│   ├── programs/             # /programs index + /programs/[slug] (4 dynamic program pages)
│   ├── student-success/      # /student-success
│   ├── layout.tsx            # Root layout: fonts, global metadata, JSON-LD, header/footer shell
│   ├── globals.css           # Tailwind v4 entry point + brand design tokens (@theme)
│   ├── manifest.ts           # Web app manifest (PWA metadata)
│   ├── robots.ts             # robots.txt — gated by SITE_LAUNCHED
│   ├── sitemap.ts            # XML sitemap — auto-derived from lib/content.ts
│   └── not-found.tsx         # Custom 404
├── components/                # 16 shared UI components (header, footer, cards, form, etc.)
├── lib/
│   ├── content.ts             # ALL site copy — see §6.3, this is the most important file in the repo
│   ├── seo.ts                 # Per-page metadata + JSON-LD builders
│   └── base-url.ts            # Resolves the canonical site URL across env/preview/production
├── images/                    # Optimized WebP images used by the live site (tracked in Git)
├── source-images/              # Raw AI-generation candidates (gitignored, not required)
├── public/                    # Static files: logos, icons, robots-adjacent assets, docs/csi-high-school-one-sheet.pdf
├── scripts/
│   ├── optimize-images.mjs    # Converts/compresses source images into images/
│   └── generate-brand-assets.mjs  # Regenerates favicon/app-icons/OG card from the logo SVGs
├── catalog/                   # SEPARATE tool: generates the branded school catalog .docx/.pdf — see §6.8
├── docs/                      # This file, plus the two build specs
└── CONTENT-REVIEW.md          # Launch-readiness gate — see §5
```

### 6.3 Content model — the single most important architectural fact

**Nearly every word of copy on the site lives in one file: `lib/content.ts`.** Page components import typed objects from it (`site`, `nav`, `home`, `programs`, `about`, `credentials`, `admissions`, `contact`, `footer`, `legalPages`) and render them — they do not contain hardcoded prose.

This was a deliberate choice so that **updating the site's content does not require understanding React, JSX, or the design system** — it requires editing a well-commented TypeScript file of strings, arrays, and objects. A new developer's first stop for any "change this text" request should be `lib/content.ts`, not the page files. See [§10](#10-common-maintenance-tasks) for concrete examples.

The one exception is the four legal pages (`/privacy`, `/terms`, `/accessibility`, `/non-discrimination`), whose body paragraphs are also in `lib/content.ts` (`legalPages`) but are explicitly placeholder text pending attorney review (`CONTENT-REVIEW.md` item 7) — do not treat them as final copy.

### 6.4 Design system / brand tokens

Brand colors, type scale, and spacing are defined once as CSS custom properties in `app/globals.css` under Tailwind v4's `@theme` block, then used as Tailwind utility classes (`bg-canyon`, `text-terracotta`, `bg-sand`, etc.) throughout components. The palette:

| Token | Hex | Role |
|---|---|---|
| `canyon` | `#7A2E0E` | Primary — buttons, headings |
| `terracotta` | `#A33E14` | Secondary — hover states, links |
| `clay` | `#C05B2B` | Accent — borders, dividers |
| `gold` | `#E8A33D` | Highlight — CTAs on dark, stat numbers |
| `sand` | `#F6E7D3` | Section backgrounds |
| `warm` | `#FDFAF5` | Page background |
| `ink` | `#3B2314` | Body text, footer background |

Headings use Source Serif 4; body/UI text uses Source Sans 3 — both loaded via `next/font/google` in `app/layout.tsx` (no external font-hosting account needed).

To change a brand color or font, edit `app/globals.css` once — it propagates everywhere. Do not hunt for hardcoded hex values in components; there shouldn't be any.

### 6.5 Image pipeline

Images are generated once (via AI image generation, outside of this codebase) into `source-images/`, then run through `scripts/optimize-images.mjs` to produce the compressed WebP files actually shipped in `images/`. The app never processes images at runtime beyond Next.js's built-in `<Image>` optimization. To add or replace an image: drop a source file, run the optimize script, and reference the new file from `components/images.ts`, which maps human-readable keys to the imported image files.

### 6.6 SEO / structured-data layer

`lib/seo.ts` centralizes per-page metadata (title, description, canonical URL, Open Graph, Twitter card) and JSON-LD structured data (`EducationalOrganization`, `WebSite`, and a `Course` `ItemList` generated automatically from the program catalog in `lib/content.ts`). `lib/base-url.ts` resolves the canonical domain correctly whether running locally, on a Vercel preview, or in production — this is why the OG image and sitemap don't need manual URL updates when the real domain goes live; setting `NEXT_PUBLIC_SITE_URL` once handles it everywhere.

### 6.7 Contact form + email delivery

`components/ContactForm.tsx` (React Hook Form + Zod validation) posts to `app/api/contact/route.ts`, a Next.js Route Handler that sends the submission via Resend. **This currently has no API key configured** — until `RESEND_API_KEY` and `CONTACT_TO_EMAIL` are set (see `.env.example` and [§8.4](#step-4--environment-variables--secrets)), submissions are logged to the server console only and the visitor sees a success message with no email actually sent. This is `CONTENT-REVIEW.md` item 10 and must be fixed before real inquiries depend on this form.

### 6.8 Catalog generator (separate tool)

`catalog/` is a self-contained Node script (its own `package.json`, depending only on the `docx` npm package) that generates the branded Canyon State Institute school catalog as a `.docx`/`.pdf`, modeled on a source catalog PDF supplied during the build. It shares no code with the website and does not run as part of the site — it's a one-off document-generation utility that happens to live in the same repository for convenience. A new developer can ignore it entirely unless asked to regenerate or extend the catalog.

---

## 7. Third-party services & accounts inventory

| Service | Purpose | Currently under | Action needed at handoff |
|---|---|---|---|
| **Vercel** | Hosting, builds, deploys | Builder's personal Vercel team (`paulrsapio-makers-projects`), project `canyon-state-institute` | Create a new project under the recipient's own Vercel account and deploy there, **or** use Vercel's project-transfer feature to move this exact project (see [§8.3](#step-3--hosting-vercel)) |
| **GitHub** | Source control | **Not yet created** — the repo exists only as a local Git history with no remote | Create the repository under the recipient's GitHub account/organization (see [§8.1](#step-1--create-the-github-repository)) |
| **Domain** | `canyonstateinstitute.edu` (referenced in code as a placeholder) | **Not registered by anyone involved in this build** | Recipient must register the real domain (`.edu` registration has its own eligibility process in the US) and connect it in Vercel once decided — see `CONTENT-REVIEW.md` item 9 |
| **Resend** | Contact-form email delivery | **No account connected** — `RESEND_API_KEY` is unset everywhere | Recipient creates a Resend account, verifies a sending domain, generates an API key, sets it as a Vercel environment variable |
| **Google Fonts** | Source Serif 4 / Source Sans 3 | N/A — served via Next.js's built-in font optimization, no account required | None |
| **CodeRabbit** *(optional)* | Automated code review used during the build | Builder's personal paid subscription | If the recipient's developer wants continued AI code review, they need their own CodeRabbit account — not required for the site to function |
| **Nano Banana / Gemini image generation** *(optional)* | Generated all site photography during the build | Builder's personal API key, configured at the machine (MCP) level, not the project level | Only needed if more/replacement images are wanted later — get a Gemini API key from Google AI Studio |
| **Google Analytics (GA4)** | Traffic analytics | **Not yet implemented** | Spec'd but not wired (`CONTENT-REVIEW.md` item 12) — recipient's developer needs to add it |

---

## 8. Step-by-step transfer procedure

Work through these in order. Each step names who typically performs it.

### Step 1 — Create the GitHub repository

*(Performed by: whoever will own the GitHub account long-term — see the decision below.)*

No GitHub repository exists yet for this project — everything so far is a local Git history on the builder's machine. There are two clean ways to get it onto GitHub under the recipient's control:

**Option A — Recipient creates the repo, builder pushes to it (recommended if the builder should not retain any residual access):**
1. Recipient creates a new empty (no README/license/gitignore) private repository on GitHub, under their own account or organization.
2. Recipient temporarily adds the builder as a collaborator with push access.
3. Builder runs, from the project directory:
   ```bash
   git remote add origin <mark>[recipient's repo URL]</mark>
   git push -u origin main
   ```
4. Recipient removes the builder's collaborator access once the push is confirmed.

**Option B — Builder creates the repo, then transfers ownership (preserves GitHub's own "Transfer repository" record, cleanest audit trail):**
1. Builder creates a new repository under their own GitHub account and pushes (`git remote add origin … && git push -u origin main`).
2. Builder goes to **Settings → General → Danger Zone → Transfer ownership** on GitHub and transfers the repo to the recipient's account or organization.
3. Recipient accepts the transfer.
4. ⚠️ After transfer, if the repo was connected to Vercel for auto-deploy, **reconnect it** — GitHub repository transfers change the underlying repo ID, which breaks existing Vercel Git integrations.

> ⚠️ **DECISION:** Choose Option A or B, and confirm whether the recipient wants the builder's name attached to the commit history (both options preserve full history and authorship either way — the choice above only affects *how* the repo gets there, not whether history is preserved).

### Step 2 — Confirm repository access

Once transferred, the recipient should verify: they are the sole owner/admin, no unexpected external collaborators remain, and (if desired) branch protection is enabled on `main`.

### Step 3 — Hosting (Vercel)

*(Performed by: recipient's developer, with the builder available to assist.)*

1. Recipient creates their own Vercel account (or uses an existing one).
2. From the Vercel dashboard: **Add New → Project**, import the now-transferred GitHub repository.
3. Vercel will auto-detect the Next.js framework — accept the defaults (build command `next build`, output handled automatically).
4. Set environment variables before the first deploy (see Step 4).
5. Deploy. Confirm the preview URL builds and renders correctly.
6. Once confirmed, this becomes the site's new production home. The builder's original Vercel project (`canyon-state-institute` under `paulrsapio-makers-projects`) can then be deleted or left to expire — it is not part of the handoff.

*Alternative:* Vercel also supports transferring an existing project directly to another Vercel team via **Project Settings → Transfer**, which would carry over deployment history and any environment variables already set. Given this project currently has **zero environment variables configured on Vercel**, there is little advantage to this over a fresh import — Option above is simpler and gives the recipient a clean start.

### Step 4 — Environment variables & secrets

Set these in the new Vercel project's **Settings → Environment Variables** (values come from `.env.example` at the repo root, which documents every variable the app reads):

| Variable | Required for | Value |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Correct canonical URLs, sitemap, OG tags once a real domain is live | <mark>[https://www.canyonstateinstitute.edu or final domain]</mark> |
| `SITE_LAUNCHED` | Controls search-engine indexing — leave `false` until `CONTENT-REVIEW.md` is fully cleared | `false` until launch, then `true` |
| `RESEND_API_KEY` | Contact form email delivery | <mark>[from new Resend account]</mark> |
| `CONTACT_TO_EMAIL` | Where contact form submissions are delivered | <mark>[real inbox address]</mark> |
| `CONTACT_FROM_EMAIL` | Sender address on outgoing form emails | <mark>[e.g. "Canyon State Institute <no-reply@canyonstateinstitute.edu>" — must be on a domain verified in Resend]</mark> |

No other secrets exist in this codebase. (`VERCEL_URL` / `VERCEL_PROJECT_PRODUCTION_URL`, also read by `lib/base-url.ts`, are provided automatically by Vercel's build environment and need no manual configuration.)

### Step 5 — Domain

1. <mark>[Recipient decides on and registers the final domain]</mark> — note that `.edu` domains require proof of accredited/degree-granting institutional status through EDUCAUSE, which may not apply here; confirm the intended TLD.
2. Add the domain in Vercel's project settings and follow its DNS instructions (either delegate nameservers to Vercel or add the specific A/CNAME records it provides).
3. Update `NEXT_PUBLIC_SITE_URL` to match exactly, and redeploy.

### Step 6 — Email delivery

1. Recipient creates a Resend account.
2. Verify a sending domain in Resend (DNS records, same domain as Step 5 or a subdomain of it).
3. Generate an API key and set it as `RESEND_API_KEY` in Vercel.
4. Send a real test submission through the live contact form and confirm delivery to `CONTACT_TO_EMAIL`.

### Step 7 — Analytics (future work, not yet built)

GA4 is specified (`docs/website-spec.md` §7) but not implemented. This is new development, not a handoff task — flag it for the recipient's developer as a follow-up.

### Step 8 — Revoke builder-side access

Once everything above is confirmed working under the recipient's own accounts:

- Remove the builder as a GitHub collaborator (if Option A was used in Step 1).
- Confirm the builder's original Vercel project is no longer the live one, and delete it if appropriate.
- Confirm no environment variables or API keys belonging to the builder remain in use anywhere in the new deployment.

---

## 9. Local development setup (for the new developer)

```bash
# Prerequisites: Node.js 20+ (22.x was used during the build), npm

git clone <mark>[repo URL]</mark>
cd canyon-state-institute
npm install

cp .env.example .env.local
# fill in .env.local with real values — see §8.4

npm run dev
# open http://localhost:3000
```

Other scripts:

```bash
npm run build   # production build — run this before every deploy/PR to catch errors early
npm run start   # serve the production build locally
npm run lint    # ESLint — the only automated check in this repo
```

To regenerate brand icons/OG card after a logo change: `node scripts/generate-brand-assets.mjs` (requires `sharp`, already a dev dependency).

---

## 10. Common maintenance tasks

| Task | Where |
|---|---|
| Change any page copy (headlines, body text, button labels) | `lib/content.ts` — find the relevant exported object (`home`, `about`, `admissions`, etc.) |
| Add or edit a program (Professional/Graduate/Enterprise/Free Courses) | `lib/content.ts` → `programs` array — the program list page and each program's dynamic route both render from this automatically |
| Update the fast-facts numbers | `lib/content.ts` → `home.fastFacts` (currently sample figures — see `CONTENT-REVIEW.md` item 1) |
| Add or replace a photo | Add source file, run `scripts/optimize-images.mjs`, register it in `components/images.ts` |
| Change brand colors or fonts | `app/globals.css` `@theme` block — propagates site-wide |
| Edit a legal page (privacy, terms, etc.) | `lib/content.ts` → `legalPages` |
| Add a new top-level page | Create a folder under `app/` with a `page.tsx`; add its link to `lib/content.ts` → `nav` and/or `footer` if it should appear in navigation |
| Flip the site live for search engines | Set `SITE_LAUNCHED=true` in Vercel — only after every `CONTENT-REVIEW.md` item is resolved |

---

## 11. Deployment model

**Current state:** the site is deployed manually via the Vercel CLI (`vercel --prod`) and is **not** connected to a Git remote for automatic deploys, because no GitHub repository exists yet ([§8.1](#step-1--create-the-github-repository)).

**Recommended going forward:** once the repository is on GitHub and imported into the recipient's Vercel project ([§8.3](#step-3--hosting-vercel)), Vercel's default Git integration takes over — every push to `main` deploys to production automatically, and every pull request gets its own preview URL. This is the standard, low-maintenance setup and requires no custom CI configuration; there is none in this repo today (no `.github/workflows`), and none is needed unless the recipient wants additional automated checks (e.g., running `npm run lint` / `npm run build` on every PR before merge).

---

## 12. Known limitations & technical debt

Being upfront about these so they aren't discovered later:

- **No automated tests.** Only ESLint runs automatically. Correctness currently depends on manual review and production-build checks.
- **No `LICENSE` file.** See the decision flagged in [§4](#4-business--legal-items-to-settle-first).
- **`README.md` is still the unedited `create-next-app` boilerplate** — it does not mention Canyon State Institute at all. Recommend replacing it with a short project-specific README (this handoff doc can serve as the source for that) as one of the first post-handoff tasks.
- **No `engines` field in `package.json`** — the Node version requirement is implicit rather than enforced.
- **All site photography is AI-generated**, not licensed stock or original photography — see the decision flagged in [§4](#4-business--legal-items-to-settle-first) and `CONTENT-REVIEW.md` item 8.
- **The contact form has no working email delivery** until Resend is configured — see [§6.7](#67-contact-form--email-delivery).
- **Nine site-wide and seven High-School-specific content items remain placeholders** — the full, current list is `CONTENT-REVIEW.md`, not this document.

---

## 13. Post-handoff support

> ⚠️ **DECISION:** State the actual agreement here once made. Suggested structure to fill in:

- **Support window:** <mark>[e.g., "30 days of email support included" / "none — handoff is final" / "ongoing retainer at $___/mo"]</mark>
- **What's covered:** <mark>[e.g., bug fixes in existing functionality vs. new feature requests]</mark>
- **What's not covered:** <mark>[e.g., content entry, new pages, design changes]</mark>
- **Primary contact during the support window:** <mark>[name / email]</mark>

---

## 14. Final handoff checklist & sign-off

Work through this together, live, as the last step — don't just read it, execute each line and check it off.

**Code & repository**
- [ ] GitHub repository created and under the recipient's sole ownership ([§8.1](#step-1--create-the-github-repository))
- [ ] No unexpected collaborators remain on the repo ([§8.2](#step-2--confirm-repository-access))
- [ ] Recipient (or their developer) has successfully cloned the repo and run it locally ([§9](#9-local-development-setup-for-the-new-developer))

**Hosting & domain**
- [ ] New Vercel project created under the recipient's account and deploying successfully ([§8.3](#step-3--hosting-vercel))
- [ ] All environment variables set with real (not placeholder) values ([§8.4](#step-4--environment-variables--secrets))
- [ ] Domain registered and pointed at the deployment, or explicitly deferred with a plan ([§8.5](#step-5--domain))
- [ ] Contact form tested end-to-end and confirmed delivering real email ([§8.6](#step-6--email-delivery))

**Content & launch readiness**
- [ ] Recipient has read `CONTENT-REVIEW.md` in full and understands it is their launch gate ([§5](#5-content-readiness-gate))
- [ ] Recipient understands `SITE_LAUNCHED` must stay `false` until that gate clears

**Business & legal**
- [ ] IP ownership/license position confirmed ([§4](#4-business--legal-items-to-settle-first))
- [ ] Payment/invoicing settled ([§4](#4-business--legal-items-to-settle-first))
- [ ] `LICENSE` file added if applicable ([§4](#4-business--legal-items-to-settle-first))
- [ ] Post-handoff support terms confirmed in writing ([§13](#13-post-handoff-support))

**Access cleanup**
- [ ] Builder's GitHub access removed (if applicable) ([§8.8](#step-8--revoke-builder-side-access))
- [ ] Builder's original Vercel project deleted or confirmed inactive
- [ ] Recipient confirms no builder-owned credentials remain in use anywhere in the live deployment

---

**Signed off by (builder):** <mark>[name]</mark> — Date: <mark>[ ]</mark>
**Signed off by (recipient):** <mark>[name]</mark> — Date: <mark>[ ]</mark>
