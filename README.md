<div align="center">

<img src="public/csi-logo-horizontal.svg" width="420" alt="Canyon State Institute" />

**Veteran Owned · Career-Focused Education**

[![Next.js](https://img.shields.io/badge/Next.js-16.2.10-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2.4-149ECA?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Status](https://img.shields.io/badge/status-pre--launch-E8A33D?style=flat-square)](CONTENT-REVIEW.md)

[Live Preview](https://canyon-state-institute.vercel.app) · [Handoff Guide](docs/source-code-handoff.md) · [Launch Checklist](CONTENT-REVIEW.md) · [Design Spec](docs/website-spec.md)

</div>

---

## About

This repository is the marketing website for **Canyon State Institute** — a veteran-owned institution offering career-focused certificate programs alongside a high school diploma program, all under one accreditation structure. The site follows a two-track architecture that mirrors the institution itself: **Track 1** (Professional, Graduate, Enterprise, and Free certificate programs) and **Track 2** (the High School Program), sharing one brand, one navigation, one credential framework, and one admissions funnel — because that's what the institution actually is.

The [Live Preview](https://canyon-state-institute.vercel.app) is real and fully functional, but intentionally kept out of search engines (`SITE_LAUNCHED=false`) until every item on the [launch checklist](CONTENT-REVIEW.md) — real enrollment figures, the executive team roster, accreditation status, and a few others — is resolved with the institution.

> Built by **[Grapevine Group](https://grapevinegroup.ai)**. See [Credits](#credits).

---

## Features

- **Full multi-page site** — home, a programs index plus four dynamic certificate-program pages, the High School program, Student Success, a four-page About section (Who We Are, Executive Team, Our Commitment, CSI Credentials), Admissions, and Contact.
- **A real credential-pathway system** — the five-tier credential framework (Statement of Participation → Professional Certificate) is modeled as data, not hardcoded markup, and renders as an animated pathway diagram wherever it appears.
- **Centralized content model** — nearly every word of copy on the site lives in one typed file, [`lib/content.ts`](lib/content.ts). Updating text is a copy edit, not a code change. See the [Handoff Guide](docs/source-code-handoff.md#63-content-model--the-single-most-important-architectural-fact).
- **A real SEO layer** — per-page Open Graph and Twitter cards, JSON-LD structured data (`EducationalOrganization`, `WebSite`, and an auto-generated `Course` list per program), a branded OG share image, and a sitemap/robots pair gated by a single launch flag.
- **Accessibility groundwork** — skip-to-content link, visible focus states, a palette chosen for AA contrast, semantic landmarks, labeled form fields, and `prefers-reduced-motion` support throughout every animated component.
- **A working contact form** — React Hook Form + Zod validation on the client, a Next.js Route Handler on the server, email delivery via Resend.
- **A companion catalog generator** — [`catalog/`](catalog) is a small, independent Node tool that produces a fully branded school-catalog `.docx`/`.pdf` from the same design system, for institutional/compliance use outside the website itself.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| UI | [React 19](https://react.dev) |
| Language | [TypeScript 5](https://www.typescriptlang.org) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Forms & validation | [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) |
| Email delivery | [Resend](https://resend.com) |
| Icons | [lucide-react](https://lucide.dev) |
| Hosting | [Vercel](https://vercel.com) |

---

## Getting started

```bash
git clone <repo-url>
cd canyon-state-institute
npm install

cp .env.example .env.local
# fill in real values — see docs/source-code-handoff.md §8.4

npm run dev
# open http://localhost:3000
```

```bash
npm run build   # production build
npm run start   # serve the production build locally
npm run lint    # ESLint
```

For the full environment-variable reference, deployment steps, and a complete architecture walkthrough, see the **[Source Code & Project Handoff Guide](docs/source-code-handoff.md)**.

---

<details>
<summary><strong>Project structure</strong></summary>

```
canyon-state-institute/
├── app/                      # Next.js App Router — one folder per route
│   ├── (legal)/[doc]/        # /privacy, /terms, /accessibility, /non-discrimination
│   ├── about/                # /about, executive-team, commitment, credentials
│   ├── admissions/           # /admissions
│   ├── api/contact/          # Contact form route handler
│   ├── contact/               # /contact
│   ├── high-school/          # /high-school
│   ├── programs/             # /programs index + /programs/[slug]
│   ├── student-success/      # /student-success
│   ├── layout.tsx            # Root layout, fonts, metadata, JSON-LD
│   └── globals.css           # Tailwind v4 entry point + brand design tokens
├── components/                # Shared UI components
├── lib/
│   ├── content.ts             # All site copy — the content model
│   ├── seo.ts                 # Per-page metadata + JSON-LD builders
│   └── base-url.ts            # Canonical URL resolution across environments
├── images/                    # Optimized site imagery (tracked)
├── public/                    # Logos, icons, static assets
├── scripts/                   # Image optimization + brand asset generation
├── catalog/                   # Independent school-catalog document generator
└── docs/                      # Specs + the handoff guide
```

</details>

---

## Design system

| | | |
|---|---|---|
| ![Canyon Red](https://img.shields.io/badge/Canyon_Red-7A2E0E-7A2E0E?style=flat-square) | ![Terracotta](https://img.shields.io/badge/Terracotta-A33E14-A33E14?style=flat-square) | ![Mesa Clay](https://img.shields.io/badge/Mesa_Clay-C05B2B-C05B2B?style=flat-square) |
| ![Sun Gold](https://img.shields.io/badge/Sun_Gold-E8A33D-E8A33D?style=flat-square) | ![Sandstone](https://img.shields.io/badge/Sandstone-F6E7D3-F6E7D3?style=flat-square) | ![Ink Brown](https://img.shields.io/badge/Ink_Brown-3B2314-3B2314?style=flat-square) |

Headings are set in **Source Serif 4**, body and UI text in **Source Sans 3**, both loaded via `next/font`. Every token above is defined once in `app/globals.css` and consumed as Tailwind utilities (`bg-canyon`, `text-terracotta`, …) — there are no hardcoded hex values scattered through components. Full rationale and usage rules: [`docs/website-spec.md`](docs/website-spec.md).

---

## Documentation

| Document | Purpose |
|---|---|
| [`docs/source-code-handoff.md`](docs/source-code-handoff.md) | Full technical handoff / ownership-transfer guide — architecture, accounts, step-by-step transfer procedure |
| [`docs/website-spec.md`](docs/website-spec.md) | Original design specification: brand, sitemap, page-by-page content spec |
| [`docs/high-school-page-spec.md`](docs/high-school-page-spec.md) | High School program page spec and the single-institution/two-track positioning it implements |
| [`CONTENT-REVIEW.md`](CONTENT-REVIEW.md) | The current, authoritative launch-readiness checklist |

---

## Deployment

The site currently deploys via direct upload from the Vercel CLI (`vercel --prod`) rather than a connected Git remote. Once this repository is pushed to GitHub, connecting it to Vercel enables the standard flow — every push to `main` deploys automatically, every pull request gets its own preview URL. See [`docs/source-code-handoff.md §11`](docs/source-code-handoff.md#11-deployment-model) for details.

## License

This repository does not yet include a `LICENSE` file. Ownership and usage rights are governed by the agreement between Grapevine Group and Canyon State Institute — see the [Handoff Guide](docs/source-code-handoff.md#4-business--legal-items-to-settle-first) for the open decision on this.

---

## Credits

<div align="center">

<br/>

[![Built by Grapevine Group](https://img.shields.io/badge/Built_by-Grapevine_Group-7a1e3a?style=for-the-badge&labelColor=0b0a0c)](https://grapevinegroup.ai)

**Grapevine Group** — operational & technology systems for complex organizations.

</div>
