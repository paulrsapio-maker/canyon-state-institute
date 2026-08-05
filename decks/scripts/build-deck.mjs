// Canyon State Institute — Community Partnership deck
// Rebrand of the GCI Community Partnership deck: all source content preserved,
// restyled into the CSI brand system (warm desert palette, canyon emblem motif).
import pptxgen from "pptxgenjs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
const __dir = dirname(fileURLToPath(import.meta.url));
const DECK = resolve(__dir, "..");        // canyon-state-institute/decks
const SITE = resolve(__dir, "..", "..");  // canyon-state-institute


const A = resolve(DECK, "assets");

/* ---------------------------------------------------------------- brand */
const C = {
  canyon: "7A2E0E",
  terra: "A33E14",
  clay: "C05B2B",
  gold: "E8A33D",
  sand: "F6E7D3",
  warm: "FDFAF5",
  ink: "3B2314",
  muted: "6B4A32", // tagline brown from the logo — AA on warm/sand
  sandDeep: "EDD8BC", // one step down from sand, for tile fills on sand sections
};
// Office-resident fonts. The web brand uses Source Serif 4 / Source Sans 3, which
// most machines don't have — PowerPoint would substitute unpredictably on a deck
// that gets emailed around. Cambria/Calibri are the closest always-present pair.
const F = { head: "Cambria", body: "Calibri" };

const W = 13.333;
const H = 7.5;
const M = 0.72; // side margin
const CW = W - M * 2; // content width

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.author = "Canyon State Institute";
pres.company = "Canyon State Institute";
pres.title = "Canyon State Institute — Community Partnership";

/* ------------------------------------------------------------- helpers */
const shadow = (o = {}) => ({
  type: "outer",
  color: "3B2314",
  blur: 10,
  offset: 2,
  angle: 90,
  opacity: 0.1,
  ...o,
});

/** Eyebrow label — letterspaced caps, our standing section marker. */
function eyebrow(s, text, { x = M, y, color = C.terra } = {}) {
  s.addText(text.toUpperCase(), {
    x,
    y,
    w: CW,
    h: 0.26,
    fontFace: F.body,
    fontSize: 11.5,
    bold: true,
    color,
    charSpacing: 2.6,
    margin: 0,
    valign: "middle",
  });
}

/** Slide title. Serif, left-aligned, no underline rule (AI-deck tell). */
function title(s, text, { x = M, y, w = CW, size = 33, color = C.canyon } = {}) {
  s.addText(text, {
    x,
    y,
    w,
    h: 0.62,
    fontFace: F.head,
    fontSize: size,
    bold: true,
    color,
    margin: 0,
    valign: "middle",
  });
}

/** Sandstone card. */
function card(s, { x, y, w, h, fill = C.sand, line = C.clay, lineTrans = 62 }) {
  s.addShape(pres.ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.09,
    fill: { color: fill },
    line: { color: line, width: 0.75, transparency: lineTrans },
    shadow: shadow(),
  });
}

/** Gold numeral in a filled circle — the deck's repeating motif. */
function numDot(s, n, { x, y, d = 0.42, fill = C.gold, color = C.ink }) {
  s.addShape(pres.ShapeType.ellipse, { x, y, w: d, h: d, fill: { color: fill }, line: { color: fill, width: 0 } });
  s.addText(String(n), {
    x,
    y,
    w: d,
    h: d,
    fontFace: F.head,
    fontSize: 13,
    bold: true,
    color,
    align: "center",
    valign: "middle",
    margin: 0,
  });
}

/** Small check glyph in a circle — used for benefit lists. */
function checkDot(s, { x, y, d = 0.3, fill = C.canyon, mark = C.gold }) {
  s.addShape(pres.ShapeType.ellipse, { x, y, w: d, h: d, fill: { color: fill }, line: { color: fill, width: 0 } });
  s.addText("✓", {
    x,
    y,
    w: d,
    h: d,
    fontFace: F.body,
    fontSize: 11,
    bold: true,
    color: mark,
    align: "center",
    valign: "middle",
    margin: 0,
  });
}

/** Ink-brown full-bleed background for dark slides. */
function darkBg(s) {
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: H, fill: { color: C.ink }, line: { width: 0 } });
}

/** Warm-white page background (PowerPoint default is white; we want the warm tone). */
function lightBg(s, fill = C.warm) {
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: H, fill: { color: fill }, line: { width: 0 } });
}

/** Emblem watermark, bottom-right, very low contrast. */
function watermark(s, { transparency = 88 } = {}) {
  s.addImage({ path: `${A}/emblem.png`, x: W - 1.55, y: H - 1.5, w: 1.15, h: 1.15, transparency });
}

/** Footer line for interior slides. */
function footer(s, n) {
  s.addImage({ path: `${A}/emblem.png`, x: M, y: H - 0.62, w: 0.3, h: 0.3 });
  s.addText("Canyon State Institute  ·  Community Partnership", {
    x: M + 0.4,
    y: H - 0.62,
    w: 6,
    h: 0.3,
    fontFace: F.body,
    fontSize: 9.5,
    color: C.muted,
    margin: 0,
    valign: "middle",
  });
  s.addText(String(n), {
    x: W - M - 0.5,
    y: H - 0.62,
    w: 0.5,
    h: 0.3,
    fontFace: F.body,
    fontSize: 9.5,
    color: C.muted,
    align: "right",
    margin: 0,
    valign: "middle",
  });
}

/** Body paragraph. */
function body(s, text, o = {}) {
  s.addText(text, {
    fontFace: F.body,
    fontSize: 13,
    color: C.ink,
    lineSpacingMultiple: 1.22,
    margin: 0,
    ...o,
  });
}

/** Bulleted list with our clay bullet. */
function list(s, items, o = {}) {
  const { fontSize = 12.5, color = C.ink, ...rest } = o;
  s.addText(
    items.map((t, i) => ({
      text: t,
      options: { bullet: { code: "2022", color: C.clay }, breakLine: i !== items.length - 1 },
    })),
    {
      fontFace: F.body,
      fontSize,
      color,
      paraSpaceAfter: 7,
      lineSpacingMultiple: 1.14,
      margin: 0,
      ...rest,
    }
  );
}

/* =================================================================== 1 */
{
  const s = pres.addSlide();
  // Scrim is baked into the image (see bake-hero.mjs) — stacked translucent
  // rects leave a hard vertical seam where they end.
  s.addImage({ path: `${A}/hero-title.jpg`, x: 0, y: 0, w: W, h: H });

  s.addImage({ path: `${A}/logo-reversed.png`, x: M, y: 0.62, w: 4.3, h: 1.0 });

  s.addText("COMMUNITY PARTNERSHIP PROPOSAL", {
    x: M,
    y: 2.42,
    w: 9,
    h: 0.3,
    fontFace: F.body,
    fontSize: 12.5,
    bold: true,
    color: C.gold,
    charSpacing: 3,
    margin: 0,
  });
  s.addText("Creating Educational Opportunity.", {
    x: M,
    y: 2.86,
    w: 9.4,
    h: 0.66,
    fontFace: F.head,
    fontSize: 40,
    bold: true,
    color: C.warm,
    margin: 0,
  });
  s.addText("Strengthening Communities.", {
    x: M,
    y: 3.5,
    w: 9.4,
    h: 0.66,
    fontFace: F.head,
    fontSize: 40,
    bold: true,
    color: C.warm,
    margin: 0,
  });
  s.addText("Preparing Future Leaders.", {
    x: M,
    y: 4.14,
    w: 9.4,
    h: 0.66,
    fontFace: F.head,
    fontSize: 40,
    bold: true,
    color: C.gold,
    margin: 0,
  });
  s.addText("Canyon State Institute  ·  College & Career Preparatory High School Program", {
    x: M,
    y: 5.06,
    w: 9.6,
    h: 0.34,
    fontFace: F.body,
    fontSize: 15,
    color: C.sand,
    margin: 0,
  });
  s.addText("[Date]  ·  Presented by [Name, Title]", {
    x: M,
    y: 6.4,
    w: 7,
    h: 0.3,
    fontFace: F.body,
    fontSize: 12,
    italic: true,
    color: C.gold,
    margin: 0,
  });
  s.addNotes(
    "Opening slide. Introduce yourself and Canyon State Institute as a veteran-owned institution. " +
      "Fill in the date and presenter line before sending. Frame the meeting as exploring a shared-facility partnership, not a sales pitch."
  );
}

/* =================================================================== 2 */
{
  const s = pres.addSlide();
  lightBg(s);
  eyebrow(s, "Who We Are", { y: 0.52 });
  title(s, "Canyon State Institute", { y: 0.85 });
  s.addText("A private College & Career Preparatory High School Program  ·  Grades 9–12  ·  Arizona and Texas", {
    x: M,
    y: 1.5,
    w: CW,
    h: 0.3,
    fontFace: F.body,
    fontSize: 13,
    color: C.muted,
    margin: 0,
  });

  body(s, "We combine things that are usually separate:", {
    x: M,
    y: 2.03,
    w: 5.75,
    h: 0.3,
    bold: true,
    fontSize: 14,
    color: C.canyon,
  });
  const combos = [
    "A personalized high school education",
    "Hands-on STEM and innovation learning",
    "College prep",
    "Job training, access, and real workforce certifications",
    "Clear paths into college and careers",
  ];
  combos.forEach((t, i) => {
    const y = 2.48 + i * 0.5;
    numDot(s, i + 1, { x: M, y: y - 0.03, d: 0.36 });
    s.addText(t, {
      x: M + 0.5,
      y: y - 0.05,
      w: 5.25,
      h: 0.4,
      fontFace: F.body,
      fontSize: 12.5,
      color: C.ink,
      margin: 0,
      valign: "middle",
    });
  });

  card(s, { x: 7.05, y: 2.03, w: CW - 6.33, h: 1.62 });
  s.addText("Students graduate with a diploma, credentials employers recognize, and a path forward.", {
    x: 7.35,
    y: 2.2,
    w: CW - 6.93,
    h: 1.28,
    fontFace: F.head,
    fontSize: 17,
    bold: true,
    color: C.canyon,
    lineSpacingMultiple: 1.16,
    margin: 0,
    valign: "middle",
  });

  card(s, { x: 7.05, y: 3.83, w: CW - 6.33, h: 1.78, fill: C.ink, line: C.ink, lineTrans: 0 });
  s.addText("OUR MISSION", {
    x: 7.35,
    y: 4.03,
    w: 4.5,
    h: 0.26,
    fontFace: F.body,
    fontSize: 10.5,
    bold: true,
    color: C.gold,
    charSpacing: 2.4,
    margin: 0,
  });
  s.addText(
    "Give students and adult learners a real shot at a good future, with local partners helping make it happen.",
    {
      x: 7.35,
      y: 4.4,
      w: CW - 6.93,
      h: 1.0,
      fontFace: F.body,
      fontSize: 13.5,
      color: C.sand,
      lineSpacingMultiple: 1.2,
      margin: 0,
    }
  );

  footer(s, 2);
  s.addNotes(
    "Establishes what the institution is. The five numbered items are the differentiator — most schools do one or two of these, not all five. " +
      "Confirm the states served (Arizona and Texas) and grade range before presenting; state authorization for enrolling minors varies by state."
  );
}

/* =================================================================== 3 */
{
  const s = pres.addSlide();
  lightBg(s, C.sand);
  eyebrow(s, "The Opportunity", { y: 0.52 });
  title(s, "Why Canyon State Institute, Why Now?", { y: 0.85 });
  body(s, "Communities across Arizona and Texas need expanded educational opportunities that address:", {
    x: M,
    y: 1.54,
    w: CW,
    h: 0.3,
    fontSize: 13.5,
    color: C.muted,
  });

  const needs = [
    "Growing student populations",
    "Demand for personalized learning environments",
    "Increased interest in STEM education",
    "Workforce skill shortages",
    "Need for career-connected education",
    "Students seeking alternative pathways to success",
  ];
  const cw = (CW - 0.36 * 2) / 3;
  needs.forEach((t, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = M + col * (cw + 0.36);
    const y = 2.06 + row * 1.32;
    card(s, { x, y, w: cw, h: 1.12, fill: C.warm });
    numDot(s, i + 1, { x: x + 0.26, y: y + 0.24, d: 0.38 });
    s.addText(t, {
      x: x + 0.74,
      y: y + 0.16,
      w: cw - 1.0,
      h: 0.8,
      fontFace: F.body,
      fontSize: 12,
      color: C.ink,
      lineSpacingMultiple: 1.12,
      margin: 0,
      valign: "middle",
    });
  });

  s.addText("Families are looking for schools where students are:", {
    x: M,
    y: 4.94,
    w: 4.5,
    h: 0.3,
    fontFace: F.body,
    fontSize: 13,
    bold: true,
    color: C.canyon,
    margin: 0,
    valign: "middle",
  });
  const pills = ["Known", "Supported", "Challenged", "Prepared for the future"];
  let px = M;
  pills.forEach((t) => {
    const pw = t.length > 12 ? 2.5 : 1.62;
    s.addShape(pres.ShapeType.roundRect, {
      x: px,
      y: 5.42,
      w: pw,
      h: 0.5,
      rectRadius: 0.25,
      fill: { color: C.canyon },
      line: { color: C.canyon, width: 0 },
    });
    s.addText(`✓  ${t}`, {
      x: px,
      y: 5.42,
      w: pw,
      h: 0.5,
      fontFace: F.body,
      fontSize: 12,
      bold: true,
      color: C.warm,
      align: "center",
      valign: "middle",
      margin: 0,
    });
    px += pw + 0.24;
  });

  footer(s, 3);
  s.addNotes(
    "The 'why now' case. Six documented pressures on the region's schools. " +
      "If the partner serves a specific community, name the local version of these pressures here."
  );
}

/* =================================================================== 4 */
{
  const s = pres.addSlide();
  lightBg(s);
  eyebrow(s, "Our Vision", { y: 0.52 });
  title(s, "Education Is More Than Academics", { y: 0.85 });
  body(s, "At Canyon State Institute, we believe education is about more than academics.", {
    x: M,
    y: 1.54,
    w: CW,
    h: 0.3,
    fontSize: 13.5,
    color: C.muted,
  });

  const colW = (CW - 0.5) / 2;
  // Left: we focus on developing
  card(s, { x: M, y: 2.06, w: colW, h: 3.66, fill: C.warm });
  s.addText("We focus on developing", {
    x: M + 0.34,
    y: 2.3,
    w: colW - 0.68,
    h: 0.34,
    fontFace: F.head,
    fontSize: 17,
    bold: true,
    color: C.canyon,
    margin: 0,
  });
  const dev = ["Confident learners", "Ethical leaders", "Innovative thinkers", "Career-ready graduates", "Community contributors"];
  dev.forEach((t, i) => {
    const y = 2.85 + i * 0.55;
    checkDot(s, { x: M + 0.34, y: y + 0.04, d: 0.3 });
    s.addText(t, {
      x: M + 0.76,
      y,
      w: colW - 1.1,
      h: 0.38,
      fontFace: F.body,
      fontSize: 13,
      color: C.ink,
      margin: 0,
      valign: "middle",
    });
  });

  // Right: every student deserves
  const rx = M + colW + 0.5;
  card(s, { x: rx, y: 2.06, w: colW, h: 3.66, fill: C.sand });
  s.addText("Every student deserves access to", {
    x: rx + 0.34,
    y: 2.3,
    w: colW - 0.68,
    h: 0.34,
    fontFace: F.head,
    fontSize: 17,
    bold: true,
    color: C.canyon,
    margin: 0,
  });
  const deserve = ["Mentorship", "Opportunity", "Guidance", "Real-world experiences", "A pathway to success"];
  deserve.forEach((t, i) => {
    const y = 2.85 + i * 0.55;
    checkDot(s, { x: rx + 0.34, y: y + 0.04, d: 0.3, fill: C.terra });
    s.addText(t, {
      x: rx + 0.76,
      y,
      w: colW - 1.1,
      h: 0.38,
      fontFace: F.body,
      fontSize: 13,
      color: C.ink,
      margin: 0,
      valign: "middle",
    });
  });

  footer(s, 4);
  s.addNotes("The values slide. Keep it brief when presenting — it sets tone rather than making an argument.");
}

/* =================================================================== 5 */
{
  const s = pres.addSlide();
  lightBg(s);
  eyebrow(s, "What Makes Us Different", { y: 0.52 });
  title(s, "A Modern Education Model", { y: 0.85 });

  card(s, { x: M, y: 1.62, w: CW, h: 0.86, fill: C.ink, line: C.ink, lineTrans: 0 });
  s.addImage({ path: `${A}/emblem.png`, x: M + 0.3, y: 1.79, w: 0.52, h: 0.52 });
  s.addText("High School Program  ·  Grades 9–12", {
    x: M + 1.0,
    y: 1.62,
    w: 7.4,
    h: 0.86,
    fontFace: F.head,
    fontSize: 20,
    bold: true,
    color: C.warm,
    margin: 0,
    valign: "middle",
  });
  s.addText("A program of Canyon State Institute", {
    x: W - M - 4.2,
    y: 1.62,
    w: 3.9,
    h: 0.86,
    fontFace: F.body,
    fontSize: 12,
    italic: true,
    color: C.gold,
    align: "right",
    margin: 0,
    valign: "middle",
  });

  s.addText("Students experience:", {
    x: M,
    y: 2.72,
    w: CW,
    h: 0.3,
    fontFace: F.body,
    fontSize: 13.5,
    bold: true,
    color: C.canyon,
    margin: 0,
  });

  const exp = [
    "College-preparatory academics",
    "STEM education",
    "Technology integration",
    "Career exploration",
    "Leadership development",
    "Individualized academic support",
  ];
  const ew = (CW - 0.34 * 2) / 3;
  exp.forEach((t, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = M + col * (ew + 0.34);
    const y = 3.24 + row * 1.44;
    card(s, { x, y, w: ew, h: 1.24, fill: C.sand });
    numDot(s, i + 1, { x: x + 0.26, y: y + 0.3, d: 0.38, fill: C.terra, color: C.warm });
    s.addText(t, {
      x: x + 0.74,
      y: y + 0.22,
      w: ew - 1.0,
      h: 0.8,
      fontFace: F.body,
      fontSize: 12.5,
      color: C.ink,
      lineSpacingMultiple: 1.12,
      margin: 0,
      valign: "middle",
    });
  });

  footer(s, 5);
  s.addNotes(
    "The academic model. Note the framing: the high school is a PROGRAM of Canyon State Institute, " +
      "not a separate school — one institution, one set of policies, one catalog."
  );
}

/* =================================================================== 6 */
{
  const s = pres.addSlide();
  lightBg(s, C.sand);
  eyebrow(s, "Beyond the Diploma", { y: 0.52 });
  title(s, "Postsecondary & Certification Programs", { y: 0.85 });
  body(s, "Canyon State Institute will also provide:", {
    x: M,
    y: 1.54,
    w: CW,
    h: 0.3,
    fontSize: 13.5,
    color: C.muted,
  });

  const progs = [
    ["Professional certifications", "Recognized credentials that carry weight with employers."],
    ["Workforce training", "Practical skills aligned to regional employer demand."],
    ["Career advancement opportunities", "Pathways for adults returning to education mid-career."],
    ["Industry-aligned credentials", "Curriculum built with employer input, not in isolation."],
  ];
  const pw = (CW - 0.34 * 3) / 4;
  progs.forEach(([h, d], i) => {
    const x = M + i * (pw + 0.34);
    card(s, { x, y: 2.1, w: pw, h: 2.5, fill: C.warm });
    numDot(s, i + 1, { x: x + 0.3, y: 2.36, d: 0.44 });
    // Bottom-aligned so one- and two-line headers share a baseline and the
    // description below starts at the same height across all four cards.
    s.addText(h, {
      x: x + 0.3,
      y: 3.0,
      w: pw - 0.6,
      h: 0.62,
      fontFace: F.head,
      fontSize: 15,
      bold: true,
      color: C.canyon,
      lineSpacingMultiple: 1.06,
      margin: 0,
      valign: "bottom",
    });
    s.addText(d, {
      x: x + 0.3,
      y: 3.64,
      w: pw - 0.6,
      h: 0.82,
      fontFace: F.body,
      fontSize: 11.5,
      color: C.muted,
      lineSpacingMultiple: 1.14,
      margin: 0,
    });
  });

  card(s, { x: M, y: 4.84, w: CW, h: 0.92, fill: C.ink, line: C.ink, lineTrans: 0 });
  s.addText(
    "High school graduates can continue directly into Canyon State Institute certificate programs — one institution, every stage of the journey.",
    {
      x: M + 0.4,
      y: 4.84,
      w: CW - 0.8,
      h: 0.92,
      fontFace: F.body,
      fontSize: 13.5,
      color: C.sand,
      margin: 0,
      valign: "middle",
    }
  );

  footer(s, 6);
  s.addNotes(
    "This is the internal-pathway argument: a student can enter at grade 9 and continue into certificate programs without leaving the institution. " +
      "It is a genuine differentiator and reinforces the single-institution structure."
  );
}

/* =================================================================== 7 */
{
  const s = pres.addSlide();
  lightBg(s);
  eyebrow(s, "Community Need", { y: 0.52 });
  title(s, "Families Need More Educational Choices", { y: 0.85 });

  const colW = 6.1;
  s.addText("Many communities face:", {
    x: M,
    y: 1.62,
    w: colW,
    h: 0.3,
    fontFace: F.body,
    fontSize: 13.5,
    bold: true,
    color: C.canyon,
    margin: 0,
  });
  const faces = [
    "Overcrowded schools",
    "Limited specialized programs",
    "Students needing more individualized support",
    "Growing demand for STEM and career preparation",
    "Workforce development challenges",
  ];
  faces.forEach((t, i) => {
    const y = 2.12 + i * 0.62;
    card(s, { x: M, y, w: colW, h: 0.52, fill: C.sand });
    s.addText(t, {
      x: M + 0.3,
      y,
      w: colW - 0.6,
      h: 0.52,
      fontFace: F.body,
      fontSize: 12.5,
      color: C.ink,
      margin: 0,
      valign: "middle",
    });
  });

  const rx = M + colW + 0.55;
  const rw = CW - colW - 0.55;
  s.addImage({ path: `${A}/high-school-hero.jpg`, x: rx, y: 1.62, w: rw, h: 1.9, sizing: { type: "cover", w: rw, h: 1.9 }, rounding: false });
  s.addText("Canyon State Institute provides an additional option that supports:", {
    x: rx,
    y: 3.68,
    w: rw,
    h: 0.46,
    fontFace: F.body,
    fontSize: 12.5,
    bold: true,
    color: C.canyon,
    lineSpacingMultiple: 1.1,
    margin: 0,
  });

  const chain = ["Students", "Families", "Employers", "Communities"];
  chain.forEach((t, i) => {
    const y = 4.24 + i * 0.56;
    s.addShape(pres.ShapeType.roundRect, {
      x: rx,
      y,
      w: rw - 0.9,
      h: 0.42,
      rectRadius: 0.21,
      fill: { color: i % 2 ? C.terra : C.canyon },
      line: { width: 0 },
    });
    s.addText(t, {
      x: rx,
      y,
      w: rw - 0.9,
      h: 0.42,
      fontFace: F.body,
      fontSize: 12,
      bold: true,
      color: C.warm,
      align: "center",
      valign: "middle",
      margin: 0,
    });
    if (i < chain.length - 1) {
      // Centered in the 0.14" gap between pills so it touches neither.
      s.addText("▼", {
        x: rx + (rw - 0.9) / 2 - 0.2,
        y: y + 0.43,
        w: 0.4,
        h: 0.1,
        fontFace: F.body,
        fontSize: 7,
        color: C.clay,
        align: "center",
        valign: "middle",
        margin: 0,
      });
    }
  });

  footer(s, 7);
  s.addNotes(
    "The need argument, then the ripple effect: serving students serves families, employers, and the wider community. " +
      "That chain is what makes this a community-partnership conversation rather than a school-enrollment one."
  );
}

/* =================================================================== 8 */
{
  const s = pres.addSlide();
  darkBg(s);
  s.addImage({ path: `${A}/section-landscape.jpg`, x: 0, y: 0, w: W, h: H, sizing: { type: "cover", w: W, h: H }, transparency: 78 });

  eyebrow(s, "Partnership Vision", { y: 0.62, color: C.gold });
  title(s, "Creating a Community Education Hub", { y: 0.96, color: C.warm, size: 34 });
  s.addText(
    "Canyon State Institute is seeking a community partner to establish a shared educational facility that will serve as a:",
    {
      x: M,
      y: 1.74,
      w: 10.6,
      h: 0.34,
      fontFace: F.body,
      fontSize: 13.5,
      color: C.sand,
      margin: 0,
    }
  );

  const hub = [
    ["High school resource and location", "We are online, but want heavy student support"],
    ["STEM learning center", "Hands-on labs and innovation space"],
    ["Workforce development hub", "Training aligned to regional employers"],
    ["Community resource location", "A space the neighborhood can use"],
    ["Postsecondary training site", "Certificate programs for adult learners"],
  ];
  const hw = (CW - 0.3 * 4) / 5;
  hub.forEach(([h, d], i) => {
    const x = M + i * (hw + 0.3);
    s.addShape(pres.ShapeType.roundRect, {
      x,
      y: 2.42,
      w: hw,
      h: 2.62,
      rectRadius: 0.09,
      fill: { color: C.warm, transparency: 6 },
      line: { color: C.gold, width: 0.75, transparency: 55 },
    });
    numDot(s, i + 1, { x: x + 0.24, y: 2.66, d: 0.4 });
    s.addText(h, {
      x: x + 0.24,
      y: 3.22,
      w: hw - 0.48,
      h: 0.84,
      fontFace: F.head,
      fontSize: 13.5,
      bold: true,
      color: C.canyon,
      lineSpacingMultiple: 1.06,
      margin: 0,
      valign: "bottom", // headers run 1–3 lines; share a baseline
    });
    s.addText(d, {
      x: x + 0.24,
      y: 4.06,
      w: hw - 0.48,
      h: 0.76,
      fontFace: F.body,
      fontSize: 10.5,
      color: C.muted,
      lineSpacingMultiple: 1.12,
      margin: 0,
    });
  });

  s.addText("Together, we can transform existing space into a center of opportunity.", {
    x: M,
    y: 5.42,
    w: CW,
    h: 0.5,
    fontFace: F.head,
    fontSize: 19,
    bold: true,
    color: C.gold,
    margin: 0,
    valign: "middle",
  });

  // Emblem only — the full lockup's tagline is unreadable below ~3" wide.
  s.addImage({ path: `${A}/emblem.png`, x: W - M - 0.56, y: H - 1.04, w: 0.56, h: 0.56 });
  s.addNotes(
    "The core ask, stated as a shared vision rather than a request for space. " +
      "The five roles let the partner see their building doing more than one job."
  );
}

/* =================================================================== 9 */
{
  const s = pres.addSlide();
  lightBg(s);
  eyebrow(s, "What We Are Seeking", { y: 0.52 });
  title(s, "Facility Partnership Opportunity", { y: 0.85 });

  const colW = (CW - 0.5) / 2;
  card(s, { x: M, y: 1.66, w: colW, h: 4.06, fill: C.sand });
  s.addText("Canyon State Institute is seeking", {
    x: M + 0.34,
    y: 1.92,
    w: colW - 0.68,
    h: 0.34,
    fontFace: F.head,
    fontSize: 17,
    bold: true,
    color: C.canyon,
    margin: 0,
  });
  const seeking = [
    "Occasional classroom space",
    "Shared-use facility arrangements",
    "Long-term facility partnership",
    "Community campus collaboration",
  ];
  seeking.forEach((t, i) => {
    const y = 2.5 + i * 0.72;
    numDot(s, i + 1, { x: M + 0.34, y: y + 0.05, d: 0.4, fill: C.canyon, color: C.gold });
    s.addText(t, {
      x: M + 0.86,
      y,
      w: colW - 1.2,
      h: 0.5,
      fontFace: F.body,
      fontSize: 13,
      color: C.ink,
      margin: 0,
      valign: "middle",
    });
  });

  const rx = M + colW + 0.5;
  card(s, { x: rx, y: 1.66, w: colW, h: 4.06, fill: C.warm });
  s.addText("Ideal facility characteristics", {
    x: rx + 0.34,
    y: 1.92,
    w: colW - 0.68,
    h: 0.34,
    fontFace: F.head,
    fontSize: 17,
    bold: true,
    color: C.canyon,
    margin: 0,
  });
  const chars = [
    "Classrooms or a computer room",
    "Small administrative space",
    "Technology infrastructure",
    "Student gathering areas",
    "Parking availability",
    "Safe and accessible environment",
  ];
  chars.forEach((t, i) => {
    const y = 2.5 + i * 0.5;
    checkDot(s, { x: rx + 0.34, y: y + 0.05, d: 0.3, fill: C.terra });
    s.addText(t, {
      x: rx + 0.78,
      y,
      w: colW - 1.14,
      h: 0.4,
      fontFace: F.body,
      fontSize: 12.5,
      color: C.ink,
      margin: 0,
      valign: "middle",
    });
  });

  footer(s, 9);
  s.addNotes(
    "Be explicit that the ask scales — occasional classroom use is a real starting point, not a lesser option. " +
      "Let the partner self-select the arrangement that fits their space."
  );
}

/* =================================================================== 10 */
{
  const s = pres.addSlide();
  lightBg(s, C.sand);
  eyebrow(s, "Benefits to the Community Partner", { y: 0.52 });
  title(s, "A Partnership That Creates Shared Impact", { y: 0.85 });
  body(s, "Partner organizations benefit through:", { x: M, y: 1.54, w: CW, h: 0.3, fontSize: 13.5, color: C.muted });

  const groups = [
    ["Community Impact", ["Expanding educational access", "Supporting youth success", "Strengthening workforce pipelines"]],
    ["Facility Utilization", ["Activating unused or underutilized space", "Creating ongoing community engagement"]],
    ["Shared Mission Alignment", ["Serving families", "Developing leaders", "Improving community outcomes"]],
  ];
  const gw = (CW - 0.4 * 2) / 3;
  groups.forEach(([h, items], i) => {
    const x = M + i * (gw + 0.4);
    card(s, { x, y: 2.12, w: gw, h: 3.34, fill: C.warm });
    numDot(s, i + 1, { x: x + 0.36, y: 2.46, d: 0.48 });
    s.addText(h, {
      x: x + 0.36,
      y: 3.16,
      w: gw - 0.72,
      h: 0.4,
      fontFace: F.head,
      fontSize: 16.5,
      bold: true,
      color: C.canyon,
      margin: 0,
    });
    list(s, items, { x: x + 0.36, y: 3.72, w: gw - 0.72, h: 1.4, fontSize: 12, color: C.ink });
  });

  footer(s, 10);
  s.addNotes(
    "Frame this from the partner's side of the table. If they own underused space, 'Facility Utilization' is usually the argument that lands first — " +
      "the building starts working for the community again."
  );
}

/* =================================================================== 11 */
{
  const s = pres.addSlide();
  lightBg(s);
  eyebrow(s, "Benefits to Students & Families", { y: 0.52 });
  title(s, "What Students Gain", { y: 0.85 });

  const gains = [
    "Personalized education",
    "STEM opportunities",
    "Career exposure",
    "Industry connections",
    "Mentorship",
    "College preparation",
    "Workforce skills",
    "Leadership development",
  ];
  const gw = (CW - 0.3 * 3) / 4;
  gains.forEach((t, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const x = M + col * (gw + 0.3);
    const y = 1.66 + row * 0.98;
    card(s, { x, y, w: gw, h: 0.8, fill: C.sand });
    checkDot(s, { x: x + 0.24, y: y + 0.25, d: 0.3 });
    s.addText(t, {
      x: x + 0.66,
      y,
      w: gw - 0.9,
      h: 0.8,
      fontFace: F.body,
      fontSize: 12,
      color: C.ink,
      margin: 0,
      valign: "middle",
    });
  });

  card(s, { x: M, y: 3.86, w: CW, h: 2.02, fill: C.ink, line: C.ink, lineTrans: 0 });
  s.addText("Students graduate prepared for:", {
    x: M + 0.4,
    y: 4.16,
    w: 4.6,
    h: 0.34,
    fontFace: F.body,
    fontSize: 13,
    bold: true,
    color: C.gold,
    margin: 0,
  });
  const prepared = ["College", "Careers", "Certifications", "Entrepreneurship", "Community leadership"];
  const ppw = (CW - 0.8 - 0.24 * 4) / 5;
  prepared.forEach((t, i) => {
    const x = M + 0.4 + i * (ppw + 0.24);
    s.addShape(pres.ShapeType.roundRect, {
      x,
      y: 4.72,
      w: ppw,
      h: 0.76,
      rectRadius: 0.09,
      fill: { color: C.warm, transparency: 8 },
      line: { color: C.gold, width: 0.75, transparency: 50 },
    });
    s.addText(t, {
      x,
      y: 4.72,
      w: ppw,
      h: 0.76,
      fontFace: F.body,
      fontSize: 11.5,
      bold: true,
      color: C.canyon,
      align: "center",
      valign: "middle",
      margin: 0,
    });
  });

  footer(s, 11);
  s.addNotes("The student-outcome case. Eight gains, five destinations — this is the slide families care about most.");
}

/* =================================================================== 12 */
{
  const s = pres.addSlide();
  darkBg(s);
  s.addImage({ path: `${A}/veteran-band.jpg`, x: 0, y: 0, w: W, h: H, sizing: { type: "cover", w: W, h: H }, transparency: 74 });

  eyebrow(s, "Why Partner With Canyon State Institute", { y: 0.62, color: C.gold });
  title(s, "Together We Can Create Lasting Impact", { y: 0.96, color: C.warm, size: 34 });
  s.addText("A partnership with Canyon State Institute provides an opportunity to:", {
    x: M,
    y: 1.76,
    w: 8.6,
    h: 0.32,
    fontFace: F.body,
    fontSize: 13.5,
    color: C.sand,
    margin: 0,
  });

  const why = [
    "Invest in the next generation",
    "Strengthen workforce readiness",
    "Expand educational access",
    "Support families",
    "Create measurable community impact",
  ];
  why.forEach((t, i) => {
    const y = 2.32 + i * 0.62;
    s.addShape(pres.ShapeType.roundRect, {
      x: M,
      y,
      w: 7.3,
      h: 0.52,
      rectRadius: 0.09,
      fill: { color: C.warm, transparency: 8 },
      line: { color: C.gold, width: 0.75, transparency: 62 },
    });
    numDot(s, i + 1, { x: M + 0.18, y: y + 0.07, d: 0.38 });
    s.addText(t, {
      x: M + 0.7,
      y,
      w: 6.4,
      h: 0.52,
      fontFace: F.body,
      fontSize: 13,
      bold: true,
      color: C.canyon,
      margin: 0,
      valign: "middle",
    });
  });

  s.addText("“", {
    x: 8.5,
    y: 2.5,
    w: 0.8,
    h: 0.8,
    fontFace: F.head,
    fontSize: 72,
    color: C.gold,
    margin: 0,
    valign: "middle",
  });
  s.addText("Education is one of the strongest investments a community can make.", {
    x: 8.62,
    y: 3.16,
    w: 3.98,
    h: 1.86,
    fontFace: F.head,
    fontSize: 21,
    bold: true,
    italic: true,
    color: C.warm,
    lineSpacingMultiple: 1.16,
    margin: 0,
  });

  s.addNotes(
    "The emotional close before the ask. Pause on the quote. " +
      "Canyon State Institute is veteran-owned — that commitment to service is the same instinct behind this partnership."
  );
}

/* =================================================================== 13 */
{
  const s = pres.addSlide();
  darkBg(s);
  s.addImage({ path: `${A}/hero-canyon.jpg`, x: 0, y: 0, w: W, h: H, sizing: { type: "cover", w: W, h: H }, transparency: 80 });

  eyebrow(s, "Next Steps", { y: 0.62, color: C.gold });
  title(s, "Let’s Build the Future Together", { y: 0.96, color: C.warm, size: 34 });

  const colW = (CW - 0.6) / 2;
  s.addText("We are seeking community partners who share our commitment to:", {
    x: M,
    y: 1.82,
    w: colW,
    h: 0.44,
    fontFace: F.body,
    fontSize: 13,
    color: C.sand,
    lineSpacingMultiple: 1.1,
    margin: 0,
  });
  const commit = ["Student success", "Workforce development", "Innovation", "Community growth"];
  commit.forEach((t, i) => {
    const y = 2.44 + i * 0.56;
    checkDot(s, { x: M, y: y + 0.06, d: 0.3, fill: C.gold, mark: C.ink });
    s.addText(t, {
      x: M + 0.44,
      y,
      w: colW - 0.5,
      h: 0.42,
      fontFace: F.body,
      fontSize: 13,
      color: C.warm,
      margin: 0,
      valign: "middle",
    });
  });

  const rx = M + colW + 0.6;
  s.addText("Next steps:", {
    x: rx,
    y: 1.82,
    w: colW,
    h: 0.44,
    fontFace: F.body,
    fontSize: 13,
    bold: true,
    color: C.gold,
    margin: 0,
  });
  const steps = [
    "Facility discussion and site evaluation",
    "Partnership alignment meeting",
    "Space utilization planning",
    "Launch timeline development",
  ];
  steps.forEach((t, i) => {
    const y = 2.44 + i * 0.56;
    numDot(s, i + 1, { x: rx, y: y + 0.02, d: 0.38 });
    s.addText(t, {
      x: rx + 0.52,
      y,
      w: colW - 0.58,
      h: 0.42,
      fontFace: F.body,
      fontSize: 13,
      color: C.warm,
      margin: 0,
      valign: "middle",
    });
  });

  // Contact block
  s.addShape(pres.ShapeType.roundRect, {
    x: M,
    y: 4.94,
    w: CW,
    h: 1.28,
    rectRadius: 0.09,
    fill: { color: C.warm, transparency: 8 },
    line: { color: C.gold, width: 0.75, transparency: 55 },
  });
  s.addImage({ path: `${A}/logo-horizontal.png`, x: M + 0.34, y: 5.18, w: 3.5, h: 0.81 });
  s.addText("Building pathways.  Creating opportunities.  Transforming lives.", {
    x: M + 4.1,
    y: 5.14,
    w: 5.2,
    h: 0.42,
    fontFace: F.head,
    fontSize: 14.5,
    bold: true,
    italic: true,
    color: C.canyon,
    margin: 0,
    valign: "middle",
  });
  s.addText("[Contact name, title]  ·  [Phone]  ·  [Email]  ·  [Website]", {
    x: M + 4.1,
    y: 5.6,
    w: 6.4,
    h: 0.42,
    fontFace: F.body,
    fontSize: 12,
    italic: true,
    color: C.terra,
    margin: 0,
    valign: "middle",
  });

  s.addNotes(
    "Close by proposing a specific next action — a site visit is the easiest yes. " +
      "Fill in the contact line before sending; it currently holds bracketed placeholders."
  );
}

const OUT = resolve(DECK, "CSI-Community-Partnership.pptx");
await pres.writeFile({ fileName: OUT });
console.log("wrote", OUT);
