# Canyon State Institute — Website Design Specification

**Version:** 1.0 · **Date:** July 8, 2026 · **Status:** Draft for approval
**Reference model:** online.stanford.edu (structure, credential framework) and onlinehighschool.stanford.edu (fast-facts pattern)

---

## 1. Brand Foundation

### 1.1 Positioning

Canyon State Institute (CSI) is a veteran-owned educational institution focused on career readiness, professional growth, and lifelong learning. The site must communicate three things within five seconds of landing: (1) veteran-owned credibility, (2) practical, career-focused education, and (3) a clear path from "browsing" to "enrolled."

### 1.2 Logo

Primary mark: circular canyon emblem — layered mesa silhouettes in warm desert tones beneath a rising sun, with a river path cutting through the canyon (symbolizing the student's path through education). Paired with a serif wordmark.

| Asset | File | Usage |
|---|---|---|
| Horizontal lockup | `csi-logo-horizontal.svg/.png` | Site header, documents, email signatures |
| Icon only | `csi-logo-icon.svg/.png` | Favicon, social avatars, app icon, watermarks |
| Reversed lockup | `csi-logo-reversed.svg/.png` | Footer, dark hero overlays |

Logo rules: minimum clear space = height of the emblem's outer ring on all sides; minimum display width 180px (horizontal) / 32px (icon); never stretch, recolor, or place the full-color mark on mid-tone photography without a scrim.

### 1.3 Color Palette

| Role | Name | Hex | Usage |
|---|---|---|---|
| Primary | Canyon Red | `#7A2E0E` | Header accents, primary buttons, H1/H2 underlines |
| Secondary | Terracotta | `#A33E14` | Hover states, secondary buttons, link color |
| Accent | Mesa Clay | `#C05B2B` | Card borders, dividers, icons |
| Highlight | Sun Gold | `#E8A33D` | CTAs on dark, stat numbers, badges |
| Background | Sandstone | `#F6E7D3` | Section backgrounds, cards |
| Neutral light | Warm White | `#FDFAF5` | Page background |
| Neutral dark | Ink Brown | `#3B2314` | Body text, footer background |
| Support | Slate Teal | `#2E5E5A` | Optional cool contrast for links/infographics |

Accessibility: body text is always Ink Brown on Warm White or Sandstone (contrast ratio > 10:1). Never set body copy in Sun Gold or Mesa Clay. Buttons: white text on Canyon Red (AA compliant).

### 1.4 Typography

| Use | Typeface | Weights | Notes |
|---|---|---|---|
| Headings | **Source Serif 4** (Google Fonts) | 600, 700 | Collegiate, credible; matches logo serif |
| Body & UI | **Source Sans 3** (Google Fonts) | 400, 600 | Highly readable at small sizes |
| Stats / labels | Source Sans 3, all-caps, letter-spaced | 600 | For eyebrow labels and fast-fact numbers |

Type scale (desktop): H1 48/56, H2 36/44, H3 26/34, H4 20/28, body 18/28, small 15/22. Mobile scales down ~15%.

---

## 2. Site Architecture

### 2.1 Sitemap

```
Home
├── Programs
│   ├── Professional Education
│   ├── Graduate Education
│   ├── Enterprise Education
│   └── Free Courses
├── Student Success            (stories, outcomes, testimonials)
├── About Us
│   ├── Who We Are
│   ├── Our Executive Team
│   ├── Our Commitment
│   └── CSI Credentials        (credential framework page)
├── Admissions / Get Started   (apply, enrollment steps, FAQs)
└── Contact Us
```

### 2.2 Global Header

- **Top utility bar** (Ink Brown background, 36px): far left — **"★ Veteran Owned" badge** in Sun Gold (this satisfies the "Top Left – Veteran Owned" requirement and persists on every page); far right — utility links (Student Login, Contact).
- **Main nav bar** (Warm White, sticky): horizontal logo left; nav items — Programs (dropdown: Professional, Graduate, Enterprise, Free Courses), Student Success, About Us (dropdown), Contact; right-aligned primary button **"Get Started"** (Canyon Red).
- Mobile: hamburger menu, logo icon centered, Get Started button persists.

### 2.3 Global Footer

Reversed logo on Ink Brown. Four columns: Programs, About, Resources (FAQs, Credential Verification, Academic Calendar), Connect (social icons, newsletter signup). Bottom bar: © Canyon State Institute · Veteran Owned & Operated · Privacy · Terms · Accessibility · Non-Discrimination.

---

## 3. Homepage (Page-by-Page Spec)

Modeled on online.stanford.edu/courses-and-programs.

### Section 1 — Hero
Full-width desert-canyon photography (sunrise tones) with Ink Brown gradient scrim.
- Eyebrow: `VETERAN OWNED · CAREER-FOCUSED EDUCATION`
- H1: **"Learning for a Lifetime of Success"**
- Subhead (the mission, condensed): "Canyon State Institute empowers individuals to achieve their career aspirations through exceptional education, practical skill development, and unwavering support."
- CTAs: `Explore Programs` (Sun Gold) · `Who We Are` (ghost/outline)

### Section 2 — Mission Statement
Sandstone band, centered, max-width 800px. Full mission text as provided, set at 20/32 serif. Small canyon-icon watermark behind text at 6% opacity.

### Section 3 — Program Cards (the "boxes")
Grid of 5 cards (3 + 2 on desktop, 1-column mobile). Each card: image top, H3 title, 2-line description, "Learn more →" link in Terracotta. Card style: Warm White, 1px Mesa Clay border, 8px radius, lift-on-hover shadow.

1. **Student Success** — outcomes, testimonials, and the support systems behind them.
2. **Professional Education** — self-paced and instructor-led courses that make an immediate career impact; earn a certificate.
3. **Graduate Education** — advanced courses and certificate programs for moving up, changing fields, or preparing for further study.
4. **Enterprise Education** — cohort learning, leadership development, and custom programs for organizations.
5. **Free Courses** — an affordable, flexible introduction to new and emerging topics.

### Section 4 — Fast Facts band (pattern from Stanford OHS #fastfacts)
Ink Brown background, Sun Gold stat numbers, 4–6 stats in a row. Placeholders until real data is approved: `Year Founded` · `Programs Offered` · `Students Served` · `% Veteran Leadership` · `Employer Partners`. **These need real numbers before launch — do not ship placeholder stats.**

### Section 5 — CSI Credentials teaser
H2: **"Canyon State Institute Credentials"**. Copy: "Canyon State Institute offers a wide range of educational opportunities designed to help you meet your personal learning goals, wherever you are in your life or career. Explore our range of offerings by credential and academic rigor." Horizontal credential-pathway graphic (see §4) + `Learn More` link to the Credentials page.
> ⚠️ Source copy said "Stanford Online Credentials" / "Grand Canyon Institute" — corrected to Canyon State Institute throughout. Confirm this was the intent.

### Section 6 — Who We Are / Commitment split
Two-column: left, "Who We Are" copy (as provided) with photo; right, "Our Commitment" copy with photo. Each links to its About subpage.

### Section 7 — Closing CTA
Canyon Red band: "Transform potential into lasting success." + `Get Started` button (Sun Gold).

---

## 4. Key Interior Pages

### 4.1 About Us — Who We Are
Two provided paragraphs, plus pull-quote treatment of "education should be accessible, relevant, and designed to equip students…" Side rail links to Executive Team, Commitment, Credentials.

### 4.2 Our Executive Team
Intro uses the provided "Our Executive Team" copy (decades of military service, workforce development, education, leadership). Below: leadership grid — photo, name, title, 2-sentence bio, expandable. **Needs: names, titles, headshots, bios.**

### 4.3 Our Commitment
Provided copy, full-width, with values row: **Excellence · Integrity · Innovation · Student Success** rendered as four icon tiles.

### 4.4 CSI Credentials (modeled on online.stanford.edu/stanford-credentials)
- Intro paragraph + **credential pathway graphic**: horizontal arrow diagram, left-to-right by rigor:
  `Statement of Participation → Record of Completion → Certificate of Completion → Certificate of Achievement → Professional Certificate → [Graduate Certificate → Degree, if/when accredited]`
- Below the graphic, one section per credential defining hour thresholds and assessment requirements (CSI equivalents of Stanford's 20/36–150/150+ hour tiers — **thresholds need internal approval**).
- Accreditation statement placeholder. **Legal check required:** do not name specific accreditors until accreditation is actually held.

### 4.5 Program landing pages (×4)
Shared template: hero band with program name, intro paragraph, filterable course-card grid (title, format, length, credential earned, cost), enrollment steps (3-step numbered row), FAQ accordion, CTA band.

---

## 5. Components Library

| Component | Spec |
|---|---|
| Primary button | Canyon Red bg, white text, 8px radius, hover → Terracotta |
| Gold CTA | Sun Gold bg, Ink Brown text — only on dark/photo backgrounds |
| Ghost button | 2px Warm White border on photos; Canyon Red border on light |
| Card | Warm White, 1px Mesa Clay border, 8px radius, 24px padding |
| Eyebrow label | 13px all-caps, 4px letter-spacing, Terracotta |
| Stat block | 56px serif number in Sun Gold, 14px all-caps label |
| Veteran badge | Star icon + "VETERAN OWNED", Sun Gold on Ink Brown pill |
| Accordion | Mesa Clay divider, plus/minus toggle, 18px body |
| Breadcrumb | Home / Section / Page, 14px, Terracotta separators |

---

## 6. Imagery & Voice

**Photography:** warm-hour light, real classrooms and workplaces, veterans and adult learners of diverse backgrounds; Arizona/Southwest landscape for section breaks. Avoid sterile stock imagery, staged handshakes.

**Voice:** direct, confident, service-oriented. Second person ("you") for prospective students; first person plural ("we") for institutional pages. Reading level ~grade 9. Never overpromise outcomes ("guaranteed job") — use "career readiness," "advancement," "preparation."

---

## 7. Technical & Accessibility Requirements

- Responsive breakpoints: 1200 / 992 / 768 / 480. Mobile-first CSS.
- WCAG 2.2 AA: all text ≥ 4.5:1 contrast, focus states on all interactive elements, alt text everywhere, skip-to-content link.
- Performance: hero images ≤ 250KB (WebP), lazy-load below the fold, target LCP < 2.5s.
- SEO: one H1 per page, meta descriptions from mission language, Organization + Course schema.org markup, XML sitemap.
- Analytics: GA4 + conversion events on Get Started, program page views, contact submissions.

---

## 8. Open Items Before Build

1. **Real fast-fact numbers** (founding year, enrollment, programs count).
2. **Executive team names, titles, headshots, bios.**
3. **Accreditation status** — determines what the Credentials page can legally claim, and whether Graduate Certificate/Degree tiers appear in the pathway graphic.
4. **Course catalog data** for the four program pages.
5. **Contact details** (address, phone, email) for footer and Contact page.
6. Confirm correction of "Stanford Online Credentials" / "Grand Canyon Institute" copy to Canyon State Institute.
7. Domain + hosting decision; CMS choice (the Stanford reference sites run Drupal — WordPress or Webflow are cheaper to maintain at this scale).
