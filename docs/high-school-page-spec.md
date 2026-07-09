# Canyon State Institute — High School Page Specification

**Version:** 1.0 · **Date:** July 9, 2026 · **Status:** Draft for approval
**Companion to:** `canyon-state-institute-website-design.md` (inherits all brand, color, type, and component rules)
**Reference model:** onlinehighschool.stanford.edu (fast-facts pattern), OHS School Profile PDF (content structure)

---

## 1. Structural Decision (read this first — it's the DEAC part)

The High School is a **program of Canyon State Institute, not a separate school**. It lives at `/high-school` on the main site, under the same logo, header, and footer. There is no separate HS sub-brand, sub-domain, or standalone logo.

Why this matters: DEAC accredits the **institution**, and the institution's scope covers its programs. A separately-branded "school" inside the site invites the question of whether it's a separate entity. One institution, two program tracks, one catalog, one set of policies — the website structure should visibly match that claim.

**Navigation:** a single top-level **"High School"** tab in the main nav (already added to the master design doc). The Track 1 / Track 2 framing is *not* used as header labels — it lives in institutional policy, the catalog, and one line of body copy on this page. Visitors get a normal website; the accreditor gets clean policy language.

### 1.1 Draft policy wording (for catalog / policy manual / accreditor)

> Canyon State Institute offers instruction through two program tracks delivered by distance education:
>
> **Track 1 — Certificate Programs.** Professional, graduate-level, enterprise, and free/introductory courses and certificate programs designed for career preparation and advancement.
>
> **Track 2 — High School Diploma Program.** A [grades 9–12] distance education program leading to a high school diploma issued by Canyon State Institute.
>
> Both tracks operate under the ownership, governance, administration, academic policies, and student-services infrastructure of Canyon State Institute as a single institution. All programs are described in the institutional catalog, and students in both tracks are subject to the same enrollment agreement framework, complaint procedures, and records policies.

> ⚠️ **Check this against the current DEAC Accreditation Handbook before submitting** — DEAC has a specific high-school program category with its own standards (curriculum hours, credit definitions, proctoring, state authorization for minors). This wording establishes the single-institution structure but does not satisfy those program-level standards by itself. I'm not an accreditation consultant; have your DEAC liaison or consultant confirm.

### 1.2 Naming

Use **"Canyon State Institute High School Program"** in formal/policy contexts and **"High School"** in navigation and marketing headers. Avoid names that read as a separate entity ("Canyon State Academy," "CSI Online High School") — they undercut the single-institution position and, in the "Academy" case, collide with an existing Arizona school.

---

## 2. Page Spec — `/high-school`

Inherits the master design system. Same header (with Veteran Owned badge) and footer as every other page.

### Section 1 — Hero
Photography: teen student at home workspace, warm light. Ink Brown scrim.
- Eyebrow: `A PROGRAM OF CANYON STATE INSTITUTE`
- H1: **"Earn Your High School Diploma, On Your Path"**
- Subhead: "The Canyon State Institute High School Program brings our career-focused, student-centered approach to [grades 9–12] — a flexible, supportive online path to an accredited high school diploma." *(the word "accredited" ships only when it's true)*
- CTAs: `How It Works` (Sun Gold anchor-link) · `Request Info` (ghost)

### Section 2 — Program Overview
Sandstone band, two columns. Left: overview copy including the one visible track sentence: *"Canyon State Institute serves learners across two program tracks — career certificate programs and our high school diploma program — under one institution, one faculty standard, and one commitment to student success."* Right: bulleted at-a-glance card (grades, format, schedule, start dates — bracketed placeholders).

### Section 3 — Fast Facts band
Same component as homepage (Ink Brown, Sun Gold stats): `[Grades Offered]` · `[Courses Offered]` · `[Avg. Class Size]` · `[Students Enrolled]` · `[Graduation Rate]` · `[States Served]`. Placeholders until real.

### Section 4 — Curriculum & Graduation Requirements
Table of subject-area credit requirements (English, Math, Science, Social Studies, Electives, Health/Wellness — **credit counts TBD**), plus a paragraph on instructional model ([live online / self-paced / hybrid — TBD]). Link to downloadable HS one-sheet PDF.

### Section 5 — Student Support
Three tiles: Academic Advising · College & Career Counseling · Wellness Support. The career-counseling tile is the differentiator — connect it to CSI's Track 1 programs ("graduates can continue into Canyon State Institute certificate programs"). That internal pathway is a selling point *and* reinforces the one-institution story.

### Section 6 — Admissions Steps
Numbered 3-step row: Inquire → Apply → Enroll. Note for minors: parent/guardian signature required on enrollment agreement.

### Section 7 — Accreditation & Policy block
Sandstone card, small type: the Track 1/Track 2 policy statement (§1.1), accreditation status line `[pending — do not claim until granted]`, and state-authorization disclosure placeholder.

### Section 8 — Closing CTA
Canyon Red band: "One institution. Every stage of the journey." + `Request Information`.

---

## 3. Open Items

1. Grades served (9–12 vs 7–12) and instructional format (live/self-paced) — every bracket above.
2. Curriculum credit requirements and course list.
3. DEAC handbook review of the policy wording (§1.1) and HS program standards.
4. State authorization for enrolling minors, by state — needed before marketing outside Arizona.
5. Real fast-fact numbers.
6. Whether the HS gets its own "Get Started" flow or shares the main Admissions funnel.
