// Canyon State Institute — School Catalog (DRAFT) builder.
// Renders catalog-content.js into a branded .docx with yellow-highlighted
// placeholders for fields the institution must complete.
// Usage: node build-catalog.js
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, WidthType, BorderStyle, ShadingType,
  ImageRun, PageBreak, TableOfContents, Header, Footer, PageNumber,
  LevelFormat, VerticalAlign, TabStopType,
} = require("docx");

const { meta, sections } = require("./catalog-content");

// ---- Brand ----
const CANYON = "7A2E0E";
const TERRA = "A33E14";
const CLAY = "C05B2B";
const GOLD = "E8A33D";
const SAND = "F6E7D3";
const INK = "3B2314";
const WARM = "FDFAF5";
const REVIEW_RED = "B3261E";

const SERIF = "Georgia";
const SANS = "Calibri";

const PAGE_W = 12240; // US Letter DXA
const MARGIN = 1080; // 0.75"
const USABLE = PAGE_W - MARGIN * 2; // 10080

// ---- Run builders ----
function runsOf(content, base = {}) {
  const items = Array.isArray(content) ? content : [content];
  const out = [];
  for (const it of items) {
    if (typeof it === "string") {
      out.push(new TextRun({ text: it, ...base }));
    } else if (it.ph !== undefined) {
      out.push(
        new TextRun({ text: `[${it.ph}]`, bold: true, highlight: "yellow", ...base })
      );
    } else if (it.flag !== undefined) {
      out.push(
        new TextRun({
          text: ` ⚠ REVIEW: ${it.flag}`,
          bold: true,
          italics: true,
          color: REVIEW_RED,
          size: base.size,
        })
      );
    } else if (it.b !== undefined) {
      out.push(new TextRun({ text: it.b, bold: true, ...base }));
    } else if (it.i !== undefined) {
      out.push(new TextRun({ text: it.i, italics: true, ...base }));
    } else if (it.gold !== undefined) {
      out.push(new TextRun({ text: it.gold, bold: true, color: GOLD, ...base }));
    }
  }
  return out;
}

// ---- Numbering ----
const numberedRefs = [];
function collectNumbered(nodes) {
  let n = 0;
  for (const node of nodes) if (node.numbered) n++;
  for (let i = 0; i < n; i++) numberedRefs.push(`num-${i}`);
}
collectNumbered(sections);
let numberedSeen = 0;

const numberingConfig = [
  {
    reference: "bullets",
    levels: [
      {
        level: 0,
        format: LevelFormat.BULLET,
        text: "•",
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 432, hanging: 216 } } },
      },
      {
        level: 1,
        format: LevelFormat.BULLET,
        text: "–",
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 864, hanging: 216 } } },
      },
    ],
  },
  ...numberedRefs.map((reference) => ({
    reference,
    levels: [
      {
        level: 0,
        format: LevelFormat.DECIMAL,
        text: "%1.",
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 432, hanging: 288 } } },
      },
    ],
  })),
];

// ---- Node renderers ----
function para(node) {
  const o = node.opts || {};
  return new Paragraph({
    children: runsOf(node.p, {
      italics: o.italic || undefined,
      size: o.small ? 18 : undefined,
      color: o.color,
    }),
    alignment: o.center ? AlignmentType.CENTER : undefined,
    spacing: { after: o.tight ? 60 : 140, line: 264 },
    indent: o.indent ? { left: 432 } : undefined,
  });
}

function bulletList(items, level = 0) {
  return items.map(
    (it) =>
      new Paragraph({
        children: runsOf(it.sub ? it.text : it),
        numbering: { reference: "bullets", level: it.sub ? 1 : level },
        spacing: { after: 60, line: 252 },
      })
  );
}

function numberedList(items) {
  const ref = `num-${numberedSeen++}`;
  return items.map(
    (it) =>
      new Paragraph({
        children: runsOf(it),
        numbering: { reference: ref, level: 0 },
        spacing: { after: 60, line: 252 },
      })
  );
}

function cell(content, opts = {}) {
  const isHeader = opts.header;
  return new TableCell({
    width: { size: opts.width, type: WidthType.DXA },
    shading: isHeader
      ? { type: ShadingType.CLEAR, fill: CANYON }
      : opts.fill
        ? { type: ShadingType.CLEAR, fill: opts.fill }
        : undefined,
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    children: [
      new Paragraph({
        children: runsOf(content, {
          bold: isHeader || undefined,
          color: isHeader ? WARM : undefined,
          size: isHeader ? 18 : 19,
        }),
        alignment: opts.center ? AlignmentType.CENTER : undefined,
        spacing: { after: 0 },
      }),
    ],
  });
}

function table(node) {
  const t = node.table;
  const widths = t.widths;
  const rows = [];
  if (t.headers) {
    rows.push(
      new TableRow({
        tableHeader: true,
        children: t.headers.map((h, i) =>
          cell(h, { header: true, width: widths[i], center: true })
        ),
      })
    );
  }
  t.rows.forEach((r, ri) => {
    rows.push(
      new TableRow({
        children: r.map((c, i) =>
          cell(c, {
            width: widths[i],
            fill: t.zebra && ri % 2 === 1 ? SAND : undefined,
            center: t.centerCols ? t.centerCols.includes(i) : false,
          })
        ),
      })
    );
  });
  return new Table({
    columnWidths: widths,
    width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: CLAY },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: CLAY },
      left: { style: BorderStyle.SINGLE, size: 4, color: CLAY },
      right: { style: BorderStyle.SINGLE, size: 4, color: CLAY },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 2, color: CLAY },
      insideVertical: { style: BorderStyle.SINGLE, size: 2, color: CLAY },
    },
    rows,
  });
}

function sigBlock(people) {
  const w = USABLE / 2;
  const rows = [];
  for (let i = 0; i < people.length; i += 2) {
    const pair = [people[i], people[i + 1]].filter(Boolean);
    rows.push(
      new TableRow({
        children: pair
          .concat(pair.length === 1 ? [null] : [])
          .map((person) =>
            person
              ? new TableCell({
                  width: { size: w, type: WidthType.DXA },
                  borders: noBorders(),
                  margins: { top: 500, bottom: 100, left: 100, right: 600 },
                  children: [
                    new Paragraph({
                      border: { top: { style: BorderStyle.SINGLE, size: 4, color: INK } },
                      children: runsOf(person.name),
                      spacing: { after: 20 },
                    }),
                    new Paragraph({
                      children: runsOf(person.title, { size: 18 }),
                      spacing: { after: 0 },
                    }),
                  ],
                })
              : new TableCell({
                  width: { size: w, type: WidthType.DXA },
                  borders: noBorders(),
                  children: [new Paragraph("")],
                })
          ),
      })
    );
  }
  return new Table({
    columnWidths: [w, w],
    width: { size: USABLE, type: WidthType.DXA },
    borders: noBorders(),
    rows,
  });
}

function noBorders() {
  const none = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
  return {
    top: none, bottom: none, left: none, right: none,
    insideHorizontal: none, insideVertical: none,
  };
}

function veteranBand(text) {
  return new Paragraph({
    shading: { type: ShadingType.CLEAR, fill: INK },
    alignment: AlignmentType.CENTER,
    spacing: { before: 200, after: 200 },
    children: [new TextRun({ text, bold: true, color: GOLD, size: 22, font: SANS })],
  });
}

function draftBand() {
  return new Paragraph({
    shading: { type: ShadingType.CLEAR, fill: REVIEW_RED },
    alignment: AlignmentType.CENTER,
    spacing: { before: 200, after: 0 },
    children: [
      new TextRun({
        text: "DRAFT — FOR INTERNAL COMPLETION AND REVIEW ONLY",
        bold: true, color: "FFFFFF", size: 20, font: SANS,
      }),
    ],
  });
}

// ---- Cover ----
function coverChildren() {
  const logo = fs.readFileSync(path.join(__dirname, "assets", "csi-logo-horizontal.png"));
  const kids = [
    new Paragraph({ spacing: { before: 1400 }, children: [] }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new ImageRun({ type: "png", data: logo, transformation: { width: 540, height: 126 } }),
      ],
      spacing: { after: 500 },
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: "SCHOOL CATALOG", bold: true, size: 56, color: CANYON, font: SERIF }),
      ],
      spacing: { after: 400 },
    }),
  ];
  const centerLine = (content, opts = {}) =>
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: runsOf(content, { size: opts.size || 22, bold: opts.bold }),
      spacing: { after: opts.after ?? 120 },
    });
  kids.push(
    centerLine(["Publish Date: ", { ph: "MONTH DAY, YEAR" }]),
    centerLine(["Effective Dates: ", { ph: "MONTH DAY, YEAR" }, " – ", { ph: "MONTH DAY, YEAR" }]),
    centerLine(["Volume Number: ", { ph: "e.g., 2026-1" }], { after: 500 }),
    centerLine([{ b: "Main Campus" }], { size: 24, after: 100 }),
    centerLine(["Canyon State Institute"], {}),
    centerLine([{ ph: "STREET ADDRESS, SUITE" }]),
    centerLine([{ ph: "CITY, STATE ZIP" }]),
    centerLine(["Phone ", { ph: "(###) ###-####" }, "   ·   ", { ph: "WEBSITE URL" }]),
    centerLine([{ ph: "STATE LICENSE / APPROVAL NUMBER — issued by state agency" }], { after: 400 }),
    veteranBand("★  VETERAN OWNED & OPERATED  ★"),
    new Paragraph({ spacing: { before: 300 }, children: [] }),
    draftBand()
  );
  return kids;
}

// ---- Heading paragraph styles ----
const styles = {
  default: {
    document: { run: { font: SANS, size: 21, color: INK } },
  },
  paragraphStyles: [
    {
      id: "Heading1",
      name: "Heading 1",
      basedOn: "Normal",
      next: "Normal",
      quickFormat: true,
      run: { font: SERIF, size: 28, bold: true, color: CANYON },
      paragraph: {
        shading: { type: ShadingType.CLEAR, fill: SAND },
        border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: CLAY } },
        spacing: { before: 320, after: 200 },
        keepNext: true,
        outlineLevel: 0,
      },
    },
    {
      id: "Heading2",
      name: "Heading 2",
      basedOn: "Normal",
      next: "Normal",
      quickFormat: true,
      run: { font: SERIF, size: 24, bold: true, color: TERRA },
      paragraph: { spacing: { before: 240, after: 120 }, keepNext: true, outlineLevel: 1 },
    },
    {
      id: "Heading3",
      name: "Heading 3",
      basedOn: "Normal",
      next: "Normal",
      quickFormat: true,
      run: { font: SANS, size: 21, bold: true, color: INK, allCaps: true },
      paragraph: { spacing: { before: 180, after: 80 }, keepNext: true, outlineLevel: 2 },
    },
  ],
};

// ---- Assemble body ----
function renderNodes(nodes) {
  const out = [];
  for (const node of nodes) {
    if (node.h1 !== undefined) {
      out.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: runsOf(node.h1) }));
    } else if (node.h2 !== undefined) {
      out.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: runsOf(node.h2) }));
    } else if (node.h3 !== undefined) {
      out.push(new Paragraph({ heading: HeadingLevel.HEADING_3, children: runsOf(node.h3) }));
    } else if (node.p !== undefined) {
      out.push(para(node));
    } else if (node.bullets) {
      out.push(...bulletList(node.bullets));
    } else if (node.numbered) {
      out.push(...numberedList(node.numbered));
    } else if (node.table) {
      out.push(table(node));
      out.push(new Paragraph({ spacing: { after: 140 }, children: [] }));
    } else if (node.sig) {
      out.push(sigBlock(node.sig));
    } else if (node.band) {
      out.push(veteranBand(node.band));
    } else if (node.pagebreak) {
      out.push(new Paragraph({ children: [new PageBreak()] }));
    } else if (node.toc) {
      out.push(
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: runsOf("Table of Contents") }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Right-click → “Update Field” (or press F9) after editing to refresh page numbers.",
              italics: true, size: 18, color: TERRA,
            }),
          ],
          spacing: { after: 160 },
        }),
        new TableOfContents("Table of Contents", {
          hyperlink: true,
          headingStyleRange: "1-2",
        })
      );
    } else if (node.spacer) {
      out.push(new Paragraph({ spacing: { after: node.spacer }, children: [] }));
    }
  }
  return out;
}

// ---- Document ----
const headerP = new Header({
  children: [
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: CLAY } },
      children: [
        new TextRun({
          text: `Canyon State Institute · School Catalog · Volume `,
          italics: true, size: 16, color: TERRA, font: SANS,
        }),
        new TextRun({ text: "[VOL]", bold: true, size: 16, highlight: "yellow" }),
      ],
    }),
  ],
});

const footerP = new Footer({
  children: [
    new Paragraph({
      tabStops: [
        { type: TabStopType.CENTER, position: USABLE / 2 },
        { type: TabStopType.RIGHT, position: USABLE },
      ],
      children: [
        new TextRun({
          text: "DRAFT — not for distribution or regulatory submission",
          size: 15, color: REVIEW_RED, bold: true,
        }),
        new TextRun({ text: "\t", size: 16 }),
        new TextRun({ children: [PageNumber.CURRENT], size: 18, color: INK }),
        new TextRun({ text: "\t", size: 16 }),
        new TextRun({ text: `Generated ${meta.generated}`, size: 15, color: CLAY, italics: true }),
      ],
    }),
  ],
});

const doc = new Document({
  creator: "Canyon State Institute",
  title: "Canyon State Institute — School Catalog (DRAFT)",
  description: "Institutional catalog draft with placeholders for completion",
  styles,
  numbering: { config: numberingConfig },
  features: { updateFields: true },
  sections: [
    {
      properties: {
        page: {
          size: { width: PAGE_W, height: 15840 },
          margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
        },
      },
      headers: { default: new Header({ children: [new Paragraph("")] }) },
      footers: { default: footerP },
      children: coverChildren(),
    },
    {
      properties: {
        page: {
          size: { width: PAGE_W, height: 15840 },
          margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
        },
      },
      headers: { default: headerP },
      footers: { default: footerP },
      children: renderNodes(sections),
    },
  ],
});

Packer.toBuffer(doc).then((buf) => {
  const out = path.join(__dirname, meta.outfile);
  fs.writeFileSync(out, buf);
  console.log(`Wrote ${out} (${(buf.length / 1024).toFixed(0)} KB)`);
});
