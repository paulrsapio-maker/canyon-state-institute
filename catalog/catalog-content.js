// Canyon State Institute — School Catalog DRAFT content model.
// Rendered by build-catalog.js. Conventions:
//   PH("hint")  -> [hint] highlighted yellow: a value the institution must supply.
//   FLAG("...") -> red ⚠ REVIEW note: a decision/legal/accreditor check, not just a blank.
// Structure mirrors a standard career-school catalog; all policy language here is
// original and generic — it must be reviewed against the institution's actual
// policies, state law, and accreditor standards before publication.

const PH = (t) => ({ ph: t });
const FLAG = (t) => ({ flag: t });
const B = (t) => ({ b: t });
const I = (t) => ({ i: t });

const meta = {
  outfile: "CSI-School-Catalog-DRAFT.docx",
  generated: "July 2026",
};

// ---------- Reusable program/course data (SAMPLE — finalize before submission) ----------
const tracks = {
  professional: {
    name: "Professional Education",
    code: "PRO",
    courses: [
      ["PRO101", "Project Management Essentials", "Instructor-led", "6 weeks", "Certificate of Completion"],
      ["PRO102", "Business Communication & Writing", "Self-paced", "4 weeks", "Record of Completion"],
      ["PRO103", "Data Literacy for Professionals", "Self-paced", "5 weeks", "Certificate of Completion"],
      ["PRO104", "Leadership Foundations", "Instructor-led", "8 weeks", "Certificate of Achievement"],
      ["PRO105", "Operations & Process Improvement", "Instructor-led", "8 weeks", "Certificate of Achievement"],
      ["PRO106", "Customer Success Fundamentals", "Self-paced", "3 weeks", "Record of Completion"],
    ],
  },
  graduate: {
    name: "Graduate Education",
    code: "GRD",
    courses: [
      ["GRD201", "Advanced Organizational Leadership", "Cohort", "12 weeks", "Certificate of Achievement"],
      ["GRD202", "Applied Analytics Capstone", "Instructor-led", "10 weeks", "Certificate of Achievement"],
      ["GRD203", "Strategic Management Program", "Cohort", "16 weeks", "Professional Certificate"],
      ["GRD204", "Research & Evidence-Based Practice", "Instructor-led", "8 weeks", "Certificate of Completion"],
    ],
  },
  enterprise: {
    name: "Enterprise Education",
    code: "ENT",
    courses: [
      ["ENT301", "Frontline Leader Academy", "Cohort", "10 weeks", "Certificate of Achievement"],
      ["ENT302", "Executive Leadership Intensive", "Cohort", "6 weeks", "Certificate of Completion"],
      ["ENT303", "Custom Technical Upskilling", "Cohort", "Scoped to engagement", "Program-specific"],
      ["ENT304", "Team Effectiveness Workshops", "Workshop", "1–3 days", "Statement of Participation"],
    ],
  },
  free: {
    name: "Free Courses",
    code: "FRE",
    courses: [
      ["FRE001", "Introduction to AI in the Workplace", "Self-paced", "2 weeks", "Statement of Participation"],
      ["FRE002", "Personal Finance Foundations", "Self-paced", "2 weeks", "Statement of Participation"],
      ["FRE003", "Career Transition Toolkit for Veterans", "Self-paced", "3 weeks", "Statement of Participation"],
      ["FRE004", "Effective Workplace Communication", "Self-paced", "1 week", "Statement of Participation"],
    ],
  },
};

const courseDescriptions = [
  ["PRO101", "Project Management Essentials",
    "Introduces the project lifecycle from initiation through closeout, including scope, scheduling, budgeting, risk, and stakeholder communication. Students apply planning tools to a capstone project plan they can present to an employer."],
  ["PRO102", "Business Communication & Writing",
    "Develops clear, professional written and verbal communication for the workplace. Topics include business correspondence, reports, summaries, meeting communication, and editing for tone and accuracy."],
  ["PRO103", "Data Literacy for Professionals",
    "Builds practical fluency in reading, interpreting, and presenting workplace data. Students work with spreadsheets, charts, and basic descriptive statistics to support evidence-based decisions."],
  ["PRO104", "Leadership Foundations",
    "Examines core leadership practices: setting expectations, giving feedback, coaching, delegation, and leading through change. Students complete assessed leadership scenarios drawn from real workplace situations."],
  ["PRO105", "Operations & Process Improvement",
    "Covers process mapping, waste identification, root-cause analysis, and continuous improvement methods. Students complete an assessed improvement proposal for a real or simulated operation."],
  ["PRO106", "Customer Success Fundamentals",
    "Introduces the customer lifecycle, service recovery, and retention practices. Emphasis on communication skills and measurable service standards."],
  ["GRD201", "Advanced Organizational Leadership",
    "An advanced, assessed study of leading teams and organizations: strategy alignment, organizational culture, decision-making under uncertainty, and ethical leadership. Cohort discussion and an assessed leadership portfolio are required."],
  ["GRD202", "Applied Analytics Capstone",
    "Students design and execute an applied analytics project from question through presentation, demonstrating data preparation, analysis, visualization, and communication of findings to a decision-maker audience."],
  ["GRD203", "Strategic Management Program",
    "A rigorous cohort program in strategy formulation and execution: market analysis, competitive positioning, resource allocation, and performance measurement, culminating in an assessed strategic plan."],
  ["GRD204", "Research & Evidence-Based Practice",
    "Develops the ability to locate, evaluate, and apply research evidence to professional practice. Topics include research design basics, source evaluation, and translating findings into workplace recommendations."],
  ["ENT301", "Frontline Leader Academy",
    "A cohort program preparing new and aspiring supervisors to lead frontline teams: expectations, accountability, scheduling, coaching, safety, and communication up and down the organization."],
  ["ENT302", "Executive Leadership Intensive",
    "A condensed cohort experience for senior leaders focused on strategic communication, organizational alignment, and leading through growth or transition."],
  ["ENT303", "Custom Technical Upskilling",
    "Employer-commissioned training built to a defined skills outcome. Curriculum, hours, and assessment are scoped in partnership with the client organization and documented in the training agreement."],
  ["ENT304", "Team Effectiveness Workshops",
    "Short, facilitated workshops that strengthen team communication, role clarity, and working agreements. Offered in one- to three-day formats on site or online."],
  ["FRE001", "Introduction to AI in the Workplace",
    "A practical orientation to artificial-intelligence tools in everyday work: what they do well, where they fail, and how to use them responsibly and productively."],
  ["FRE002", "Personal Finance Foundations",
    "Covers budgeting, credit, saving, and planning fundamentals that support financial stability during career transitions and beyond."],
  ["FRE003", "Career Transition Toolkit for Veterans",
    "Designed for transitioning service members and veterans: translating military experience into civilian terms, resumes and interviews, and mapping military skills to career pathways."],
  ["FRE004", "Effective Workplace Communication",
    "A one-week introduction to workplace communication essentials: professional email, meetings, active listening, and giving and receiving feedback."],
];

// ---------- Table width presets (usable width = 10080 DXA) ----------
const W = {
  two: [3360, 6720],
  courseTable: [1300, 3620, 1650, 1730, 1780],
  tuition: [3200, 1600, 1300, 1300, 1300, 1380],
  grade: [900, 3800, 1700, 1700, 1980],
  sap: [3360, 3360, 3360],
  hsCredits: [5040, 2520, 2520],
  calendar: [2520, 2520, 2520, 2520],
  charges: [7080, 3000],
  faculty: [2200, 2400, 2300, 1900, 1280],
};

const sections = [];
const S = (...nodes) => sections.push(...nodes);

// ============================================================
// HOW TO COMPLETE THIS DRAFT
// ============================================================
S(
  { h1: "How to Complete This Draft (remove this page before publication)" },
  { p: [B("This document is a working draft of the Canyon State Institute school catalog."), " It follows the structure of a standard accredited career-school catalog and is pre-populated with Canyon State Institute's mission, values, program families, credential framework, and two-track institutional structure. Everything else is marked for completion."] },
  { h3: "Conventions used throughout" },
  { bullets: [
    [B("Yellow highlights "), "— ", PH("LIKE THIS"), " — are blanks. Replace each with the institution's actual value (dates, dollar amounts, names, addresses, percentages, agency names). The bracketed text describes what belongs there."],
    [B("Red ⚠ REVIEW notes"), " mark items that are not simple blanks: they need a policy decision, legal review, or a check against the current accreditor handbook and state regulations before publication."],
    [B("“Sample” program and course listings"), " (course codes, sequences, and descriptions) are realistic drafts based on the institute's published program families. Confirm, revise, or replace them, then update the Course Descriptions section to match."],
  ] },
  { h3: "Suggested completion order" },
  { numbered: [
    ["Institutional identity: cover page, addresses, phone, license numbers, volume and effective dates."],
    ["Governance and people: ownership, officers, directors, faculty roster, signature blocks."],
    ["Programs and pricing: confirm course lists, hours, and the tuition table."],
    ["Policies: work through each ⚠ REVIEW flag with your compliance/accreditation consultant."],
    ["Calendars: start/end dates, holidays, administrative hours."],
    ["Update the Table of Contents (right-click → Update Field), delete this page, and remove the DRAFT banners only when approved for publication."],
  ] },
  { p: [FLAG("This draft was structured by reference to a peer institution's published catalog for section coverage only; all language herein is original. Final compliance responsibility rests with the institution.")], opts: { small: true } },
  { pagebreak: true }
);

// ============================================================
// MISSION & CERTIFICATION
// ============================================================
S(
  { h1: "Mission Statement" },
  { p: ["At Canyon State Institute, our mission is to empower individuals to achieve their career aspirations through exceptional education, practical skill development, and unwavering support. We are committed to preparing every student with the knowledge, confidence, and career readiness needed to advance professionally, embrace new opportunities, and make meaningful contributions to their communities. By fostering a culture of excellence, integrity, and lifelong learning, we help transform potential into lasting success."] },
  { spacer: 200 },
  { p: [I("The information contained in this catalog is true and correct to the best of my knowledge.")] },
  { sig: [
    { name: [PH("NAME")], title: [PH("TITLE — e.g., President / Campus Director")] },
    { name: [PH("NAME")], title: [PH("TITLE — e.g., Director of Education")] },
  ] },
  { spacer: 300 },
  { h3: ["Approved and regulated by ", PH("STATE REGULATORY AGENCY, DIVISION, CITY, STATE")] },
  { p: [
    "Canyon State Institute reserves the right to modify — with the approval of ", PH("STATE AGENCY"), " and any applicable accrediting body — the offering of programs, individual courses of study, mode of delivery, curriculum, policies, procedures, tuition, hours of instruction, the school calendar, and other materials described in this publication. The complete catalog comprises this document and all addenda issued during the publication year. It is each student's responsibility to know the information presented in this catalog and in any supplements and addenda. By enrolling, students agree to abide by the terms stated in this catalog and all school policies. If any statement in this catalog conflicts with the enrollment agreement signed by the student, the provision in the enrollment agreement controls.",
  ], opts: { small: true } },
  { pagebreak: true }
);

// ============================================================
// TABLE OF CONTENTS
// ============================================================
S({ toc: true }, { pagebreak: true });

// ============================================================
// ACCREDITATIONS, LICENSES, AND APPROVALS
// ============================================================
S(
  { h1: "Accreditations, Licenses, and Approvals" },
  { p: [FLAG("Do not publish any accreditation claim until accreditation is actually granted. Every statement in this section must be verified against current approvals before this catalog is distributed.")] },
  { h3: "Accreditation" },
  { p: [PH("Accreditation status statement. If accreditation is pending: state only what is factually true, e.g., “Canyon State Institute has applied for accreditation with [ACCREDITOR] and this application is pending.” If not yet applied, omit this subsection entirely.")] },
  { p: [PH("ACCREDITOR NAME"), " · ", PH("ACCREDITOR ADDRESS"), " · ", PH("ACCREDITOR PHONE"), " · ", PH("ACCREDITOR WEBSITE")] },
  { h3: "State licensure" },
  { p: ["Canyon State Institute is licensed/authorized to operate by:"] },
  { p: [PH("STATE AGENCY NAME — e.g., the state board or commission that licenses private postsecondary institutions"), " · ", PH("AGENCY ADDRESS"), " · ", PH("AGENCY PHONE"), " · ", PH("AGENCY WEBSITE"), " · License/Approval No. ", PH("#")] },
  { h3: "Veterans education benefits" },
  { p: [PH("If/when approved: “Canyon State Institute is approved by [STATE APPROVING AGENCY] for the training of veterans and eligible persons under applicable chapters of Title 38, U.S. Code.” Until then, omit."), FLAG("VA approval has its own application process; do not reference GI Bill® benefits until approval is granted. “GI Bill®” is a registered trademark of the U.S. Department of Veterans Affairs.")] },
  { h3: "High school program authorization" },
  { p: [PH("State authorization applicable to operating a distance-education high school diploma program, including any additional authorizations required to enroll minors in other states."), FLAG("state-by-state authorization review required before marketing the high school program outside the home state")] },
  { h3: "Approved testing / certification sites" },
  { p: [PH("List any third-party certification or testing partnerships (e.g., industry certification exam sites), or omit this subsection.")] },
  { pagebreak: true }
);

// ============================================================
// INSTITUTIONAL STRUCTURE — TWO PROGRAM TRACKS
// ============================================================
S(
  { h1: "Institutional Structure — Programs of Instruction" },
  { p: ["Canyon State Institute offers instruction through two program tracks delivered by distance education:"] },
  { p: [B("Track 1 — Certificate Programs. "), "Professional, graduate-level, enterprise, and free/introductory courses and certificate programs designed for career preparation and advancement."] },
  { p: [B("Track 2 — High School Diploma Program. "), "A ", PH("grades 9–12 — confirm grade span"), " distance education program leading to a high school diploma issued by Canyon State Institute."] },
  { p: ["Both tracks operate under the ownership, governance, administration, academic policies, and student-services infrastructure of Canyon State Institute as a single institution. All programs are described in this institutional catalog, and students in both tracks are subject to the same enrollment agreement framework, complaint procedures, and records policies."] },
  { p: [FLAG("Verify this two-track wording against the current accreditor handbook (high-school program category standards: curriculum hours, credit definitions, proctoring, and state authorization for minors) before submission.")] }
);

// ============================================================
// PROGRAMS OVERVIEW
// ============================================================
S(
  { h1: "Canyon State Institute Programs" },
  { p: ["The following programs of study are ", PH("approved and regulated by STATE AGENCY, ADDRESS"), "."] },
  { h3: "Delivery definitions" },
  { bullets: [
    [B("Online (asynchronous) "), "— instruction is self-directed with no scheduled live component; attendance/participation is measured by defined academic activity."],
    [B("Live virtual (synchronous) "), "— instruction is delivered live in a virtual environment at scheduled times; attendance is measured by presence."],
    [B("Blended "), "— a documented combination of synchronous and asynchronous instruction."],
  ] },
  { p: ["The primary delivery mode for each course is listed in its program outline; courses may be offered in another documented mode where noted."] },
  { h3: "Track 1 — Certificate Programs" },
  { table: {
    widths: [4200, 2000, 3880],
    headers: ["Program Family", "Delivery", "Credentials Awarded"],
    rows: [
      ["Professional Education", [PH("Online / Live virtual / Blended")], "Record of Completion · Certificate of Completion · Certificate of Achievement"],
      ["Graduate Education", [PH("Delivery mode(s)")], "Certificate of Completion · Certificate of Achievement · Professional Certificate"],
      ["Enterprise Education (employer cohorts)", [PH("Delivery mode(s)")], "Statement of Participation · Certificate of Completion · Certificate of Achievement"],
      ["Free Courses", [PH("Delivery mode(s)")], "Statement of Participation"],
    ],
    zebra: true,
  } },
  { h3: "Track 2 — High School Diploma Program" },
  { table: {
    widths: [4200, 2000, 3880],
    headers: ["Program", "Delivery", "Credential Awarded"],
    rows: [[["High School Diploma Program (grades ", PH("9–12"), ")"], [PH("Online / Blended")], "High School Diploma"]],
  } },
  { h3: "The Canyon State Institute credential framework" },
  { p: ["Credentials increase in academic rigor and time commitment:"] },
  { table: {
    widths: [3200, 6880],
    headers: ["Credential", "Requirement"],
    rows: [
      ["Statement of Participation", ["Webinars, seminars & workshops under ", PH("20"), " hours; no formal assessment required"]],
      ["Record of Completion", "Successful completion of an individual course"],
      ["Certificate of Completion", [PH("20"), "+ hours of coursework with defined completion criteria"]],
      ["Certificate of Achievement", [PH("36–150"), " hours with formally assessed learning outcomes"]],
      ["Professional Certificate", [PH("150"), "+ hours with rigorous assessment of mastery"]],
    ],
    zebra: true,
  } },
  { p: [FLAG("Credential hour thresholds and assessment requirements are pending internal approval. Graduate certificate and degree tiers may be added only upon accreditation and required approvals.")] },
  { pagebreak: true }
);

// ============================================================
// TUITION AND FEES
// ============================================================
S(
  { h1: "Tuition and Fees" },
  { p: ["Unless otherwise listed, tuition includes ", PH("what tuition includes — e.g., digital course materials"), ". All charges are stated on the enrollment agreement before enrollment; there are no charges beyond those disclosed."] },
  { table: {
    widths: W.tuition,
    headers: ["Program / Course", "Credential", "Hours", "Tuition", "Fees", "Total"],
    rows: [
      ...tracks.professional.courses.map((c) => [c[1], c[4].replace("Certificate", "Cert."), [PH("##")], [PH("$")], [PH("$ or N/A")], [PH("$")]]),
      ...tracks.graduate.courses.map((c) => [c[1], c[4].replace("Certificate", "Cert."), [PH("##")], [PH("$")], [PH("$ or N/A")], [PH("$")]]),
      ...tracks.enterprise.courses.map((c) => [c[1], c[4], [PH("##")], [PH("$ / by agreement")], [PH("$ or N/A")], [PH("$")]]),
      ["Free Courses (all)", "Stmt. of Participation", [PH("##")], "$0.00", "N/A", "$0.00"],
      [["High School Diploma Program (per ", PH("year/term"), ")"], "HS Diploma", [PH("##")], [PH("$")], [PH("$ or N/A")], [PH("$")]],
    ],
    zebra: true,
    centerCols: [2, 3, 4, 5],
  } },
  { h3: "Other charges" },
  { table: {
    widths: W.charges,
    headers: ["Item", "Charge"],
    rows: [
      ["Registration fee (if any)", [PH("$ or None")]],
      ["Official transcript (first copy)", [PH("$ or No charge")]],
      ["Additional official transcripts", [PH("$")]],
      ["Diploma/credential replacement", [PH("$")]],
      ["Returned payment fee", [PH("$")]],
      [[PH("Other item")], [PH("$")]],
    ],
  } },
  { p: [FLAG("Confirm every figure against the enrollment agreement and state fee-disclosure rules. Remove rows that do not apply.")] }
);

// ============================================================
// ADMISSION
// ============================================================
S(
  { h1: "Admission" },
  { p: ["The admissions process depends on a truthful exchange of information between the applicant and Canyon State Institute staff. The institute admits students without regard to race, color, religion, sex, sexual orientation, gender identity or expression, national origin, ancestry, age, marital status, disability, veteran status, or any other characteristic protected by law. Applicants are notified promptly of their admission status, and no charges apply to applicants who are not accepted."] },
  { h2: "Track 1 — Certificate program admission" },
  { p: ["To be considered for acceptance, applicants must:"] },
  { bullets: [
    ["Be at least ", PH("16/17/18 — set minimum age"), " years of age. Applicants under 18 must provide written permission from a parent or legal guardian, who must co-sign the enrollment agreement."],
    ["Complete an interview or advising conversation with an admissions representative."],
    ["For programs requiring it, provide verifiable documentation of completion of secondary education (diploma, transcript, or recognized equivalency certificate) within ", PH("##"), " calendar days of starting; ", PH("list any programs exempt from this requirement, e.g., Free Courses")],
    ["Foreign credentials must be evaluated for U.S. high-school equivalency at the student's expense by an evaluation service that is a member of ", PH("NACES or equivalent — confirm accepted evaluators"), "."],
    [PH("Any criminal-history or background-check policy, if adopted"), FLAG("adopt or strike a background-check policy; if adopted, define disqualifying conditions and appeal path")],
  ] },
  { h2: "Track 2 — High School Diploma Program admission" },
  { bullets: [
    ["Applicants must be entering grade ", PH("9–12 — confirm grade span"), " and provide ", PH("prior school records / transcript requirements"), "."],
    [B("A parent or legal guardian must sign the enrollment agreement for any applicant under 18."), " The parent/guardian remains the primary contact for academic progress, attendance, and records matters, consistent with applicable law."],
    ["Grade placement is determined by ", PH("placement policy — e.g., evaluation of prior transcripts and credits earned"), "."],
    [PH("Residency / state-eligibility limitations for enrolling minors"), FLAG("enrollment of minors outside the home state requires state-by-state authorization review")],
  ] },
  { h2: "English proficiency" },
  { p: ["Instruction is delivered in English, and English as a Second Language instruction is ", PH("not provided / provided as follows"), ". Applicants whose primary language is not English demonstrate proficiency through one of the following:"] },
  { bullets: [
    ["Graduation from an English-speaking secondary institution;"],
    ["A minimum score of ", PH("##"), " on ", PH("TOEFL/IELTS or other accepted test — confirm accepted tests and scores"), "; or"],
    [PH("Other accepted evidence — confirm")],
  ] },
  { h2: "Veterans and service members" },
  { p: ["For any student using U.S. Department of Veterans Affairs education benefits while payment to the institution is pending from the VA, Canyon State Institute will not prevent the student's enrollment, assess a late penalty, require the student to secure alternative or additional funding, or deny access to any resources available to other students who have satisfied their tuition and fees. Students may be required to provide a certificate of eligibility or comparable confirmation of applied-for benefits within ", PH("##"), " weeks of enrollment.", FLAG("this subsection applies once VA approval exists; align wording with 38 U.S.C. §3679(e) at that time")] },
  { h2: "Technology requirements" },
  { p: ["To be admitted to a program delivered online, students must have regular access to:"] },
  { bullets: [
    ["A computer meeting minimum specifications: ", PH("OS / RAM / storage minimums"), ";"],
    ["A webcam, microphone, and speakers (built-in or external);"],
    ["Reliable broadband internet access; and"],
    ["The ability to use a web browser, email, and the institute's learning management system (", PH("LMS NAME"), ")."],
  ] },
  { h2: "Orientation" },
  { p: ["All new students complete an orientation before beginning their program, covering policies and procedures, support services, the learning platform, expectations for academic integrity and online conduct, and how to get help. Completion of orientation is ", PH("required/not required"), " before course access is granted."] },
  { h2: "Re-entry and readmission" },
  { p: ["Students who withdraw before graduating and wish to return to the same program may apply for re-entry, subject to review of prior academic, conduct, and financial standing. Re-entry within ", PH("##"), " days of the last date of attendance is charged at ", PH("re-entry charging policy — e.g., the tuition rate in effect at original enrollment"), "; re-entry after that period is charged at current catalog rates. ", PH("Enrollment-attempt limits, if any")] },
  { h2: "Readmission for military service members" },
  { p: ["Canyon State Institute promptly readmits service members whose enrollment was interrupted by uniformed service, consistent with applicable federal requirements. Returning students are readmitted to the same program (or the most similar program if it is no longer offered) with the same academic standing, and for the first academic year are charged the tuition and fees that applied when they left, unless military benefits will cover the difference. This policy does not apply to students who receive a dishonorable or bad-conduct discharge; such students may remain eligible under the general re-entry policy."] },
  { h2: "Visitors" },
  { p: [PH("Visitor policy if any physical location exists; for a fully-distance institution, describe how prospective students may observe a class or demo the platform."), ""] },
  { pagebreak: true }
);

// ============================================================
// FINANCIAL AID & PAYMENT OPTIONS
// ============================================================
S(
  { h1: "Financial Aid and Payment Options" },
  { p: [PH("Title IV participation status — e.g., “Canyon State Institute does not participate in federal Title IV student financial aid programs.” If pursuing eligibility, do not reference Title IV until certified."), FLAG("this single fact changes multiple policies (refunds/R2T4, SAP consequences); confirm before publication")] },
  { h2: "Payment plans" },
  { p: ["The institute offers interest-free institutional payment plans that divide tuition across the length of the program. Plan terms are stated on the enrollment agreement. ", PH("Down-payment and installment structure"), ". Failure to keep payments current may result in ", PH("consequence — e.g., suspension of course access per policy"), "."] },
  { h2: "Veterans benefits and military assistance" },
  { p: [PH("Once approved: list approved benefit chapters and the state approving agency. Until then: “The institute is pursuing approval for veterans education benefits; contact admissions for current status.”")] },
  { h2: "Scholarships and grants" },
  { p: ["Canyon State Institute may offer institutional scholarships or grants for specific start dates and programs. Awards are limited, criteria are published with each offering, and awards are applied to tuition only."] },
  { table: {
    widths: [3200, 4400, 2480],
    headers: ["Scholarship / Grant", "Eligibility Summary", "Maximum Award"],
    rows: [
      [[PH("NAME — e.g., Veteran & Military Family Scholarship")], [PH("eligibility")], [PH("$")]],
      [[PH("NAME")], [PH("eligibility")], [PH("$")]],
      [[PH("NAME")], [PH("eligibility")], [PH("$")]],
    ],
  } },
  { h2: "Workforce and vocational programs" },
  { p: [PH("If applicable: state workforce development / vocational rehabilitation funding sources accepted, with agency contact info; otherwise omit.")] }
);

// ============================================================
// CANCELLATION & REFUND POLICY
// ============================================================
S(
  { h1: "Cancellation and Refund Policy" },
  { p: [FLAG("Refund policy language is state-regulated. Replace the placeholders below with the schedule required by the licensing state, and have counsel verify before publication.")] },
  { h2: "Cancellation" },
  { numbered: [
    ["A full refund is made to any applicant who cancels the enrollment agreement within ", PH("72 hours / state-required window"), " after signing, and to any applicant not accepted for enrollment."],
    ["An applicant who cancels within the first ", PH("##"), " scheduled class days receives a full refund, except that the school may retain up to ", PH("$ administrative fee, if permitted"), "."],
    ["A full refund is due if the program is discontinued by the institute and this prevents the student from completing, or if the enrollment was procured as a result of any misrepresentation in advertising or by the institute."],
  ] },
  { h2: "Refund computation after classes begin" },
  { p: ["Refunds are computed based on ", PH("basis — e.g., scheduled hours / lessons completed and serviced through the last date of attendance"), ". The effective date of termination for refund purposes is the earliest of: (a) the date the institute terminates the student's enrollment; (b) the date of receipt of the student's written notice of withdrawal; or (c) ", PH("automatic-withdrawal trigger — e.g., ## consecutive calendar days of non-attendance / end of the third month after the last completed lesson"), "."] },
  { table: {
    widths: [5040, 5040],
    headers: ["Portion of Program Completed (by hours/lessons)", "Institute May Retain"],
    rows: [
      [["Up to ", PH("10"), "%"], [PH("10"), "% of tuition"]],
      [[PH("10"), "% to ", PH("25"), "%"], [PH("##"), "% of tuition"]],
      [[PH("25"), "% to ", PH("50"), "%"], [PH("##"), "% of tuition"]],
      [["More than ", PH("50/75"), "%"], [PH("policy — e.g., 100% of tuition may be retained")]],
    ],
  } },
  { p: ["Refunds are paid within ", PH("## days — per state rule"), " of the effective date of termination. Books, kits, or materials issued and used are ", PH("refund treatment"), "."] },
  { h2: "Students called to active military service" },
  { p: ["A student who withdraws as a result of being called to active duty may elect: (a) a pro-rata refund of tuition and fees for the uncompleted portion; (b) a grade of “withdrawn-military” with the right to re-enroll within ", PH("##"), " of discharge without additional tuition for the interrupted portion; or (c) assignment of final grades/credit where the instructor determines at least ", PH("90"), "% of coursework was satisfactorily completed with sufficient mastery demonstrated."] },
  { h2: "High school program refunds" },
  { p: [PH("Refund schedule applicable to the high school diploma program, stated per term/year, including any rules specific to minors and parent/guardian signatures."), FLAG("some states apply different refund rules to K-12 distance programs")] },
  { pagebreak: true }
);

// ============================================================
// ACADEMICS
// ============================================================
S(
  { h1: "Academics" },
  { h2: "Unit of academic measurement" },
  { p: ["Canyon State Institute measures academic work in ", PH("clock hours / credit hours — choose and define"), ". ", PH("Definition — e.g., “One credit is awarded for each ## hours of instruction plus ## hours of outside preparation,” or clock-hour definition"), " Learning materials may require documented outside preparation, indicated on each course syllabus."] },
  { h2: "Transfer of credit to Canyon State Institute" },
  { p: ["Students may request transfer credit for comparable prior coursework completed at an institution accredited by an agency recognized by the U.S. Department of Education. Transfer credit is evaluated from official transcripts and awarded when:"] },
  { bullets: [
    ["The final grade is equivalent to “", PH("C"), "” or better;"],
    ["The credits were completed within the past ", PH("#"), " years;"],
    ["The course content matches the Canyon State Institute course and program objectives; and"],
    ["The course applies to the graduation requirements of the student's program."],
  ] },
  { p: ["No more than ", PH("##"), "% of a program may be satisfied by transfer credit. Transfer credit appears on the transcript as “TR” and is excluded from grade-point-average calculations. Evaluation determinations are final."] },
  { h2: "Foreign transcripts" },
  { p: ["Coursework completed outside the United States must be translated and evaluated by an educational credential evaluation service (", PH("accepted evaluators — e.g., NACES members"), ") and sent directly to the institute's registrar."] },
  { h2: "Credit for military training and experience" },
  { p: ["The institute evaluates the Joint Services Transcript (JST) and other documented military education and occupational experience for applicable credit toward program requirements."] },
  { h2: "Proficiency credit" },
  { p: ["Proficiency credit may be awarded for specific courses through nationally recognized examinations (", PH("CLEP / AP / DANTES — confirm accepted exams and minimum scores"), "). Proficiency credit appears on the transcript as “PR.”"] },
  { h2: "Transfer of credit to other institutions" },
  { p: [B("Canyon State Institute does not guarantee the transferability of its credits or credentials to any other institution. "), "Acceptance of credits is determined solely by the receiving institution. Students who plan to continue their education elsewhere should contact that institution before enrolling."] },
  { h2: "Administrative hours" },
  { table: {
    widths: [5040, 5040],
    headers: ["Day", "Administrative / Student-Support Hours"],
    rows: [
      ["Monday – Thursday", [PH("8:00am – 8:00pm")]],
      ["Friday", [PH("8:00am – 5:00pm")]],
      ["Saturday", [PH("hours or Closed")]],
      ["Sunday", [PH("hours or Closed")]],
    ],
  } },
  { h2: "Course start and end dates" },
  { p: [PH("Describe the enrollment/start model — e.g., “Self-paced courses begin upon enrollment completion; instructor-led and cohort courses follow the published schedule below.”")] },
  { table: {
    widths: W.calendar,
    headers: ["Term / Cohort", "Start Date", "End Date", "Notes"],
    rows: [0, 1, 2, 3].map(() => [[PH("term")], [PH("mm/dd/yyyy")], [PH("mm/dd/yyyy")], [PH(" ")]]),
  } },
  { h2: "Holiday calendar" },
  { table: {
    widths: W.calendar,
    headers: ["Holiday", "Start", "End", "Make-Up Day (if any)"],
    rows: [0, 1, 2, 3, 4, 5].map(() => [[PH("holiday")], [PH("mm/dd")], [PH("mm/dd")], [PH(" ")]]),
  } },
  { h2: "School closings" },
  { p: ["When operations are interrupted (extreme weather, utilities, or emergencies), the institute communicates closures and resumption through ", PH("channels — e.g., email, SMS, website banner, LMS announcement"), ". Make-up requirements for lost instructional time are scheduled within ", PH("policy"), "."] },
  { h2: "Directed study" },
  { p: [PH("If offered: conditions under which an individual directed-study arrangement is permitted, approval authority, and documentation. If not offered, state that."), ""] },
  { h2: "Externship / applied experience" },
  { p: [PH("If any program includes an externship or supervised applied experience, describe hours, grading, site requirements, and student responsibilities; otherwise state that programs do not include externships."), ""] },
  { pagebreak: true }
);

// ============================================================
// ATTENDANCE
// ============================================================
S(
  { h1: "Attendance and Participation" },
  { p: ["Students are expected to participate in each course according to its delivery mode. In asynchronous courses, attendance is measured by ", PH("defined academic activity — e.g., lesson submissions, assessments, LMS activity benchmarks"), "; in synchronous courses, attendance is measured by presence at scheduled sessions. Attendance records are maintained by the institute, and any agency providing educational funding to a student receives accurate attendance and progress information."] },
  { h2: "Attendance violations" },
  { bullets: [
    ["A student who exceeds ", PH("##"), "% absence of the scheduled hours/activities in a program will be ", PH("consequence — e.g., dismissed, with re-entry after a minimum of ## weeks"), "."],
    ["A student with no attendance/academic activity for ", PH("14"), " consecutive calendar days (excluding scheduled breaks) is withdrawn from school."],
    ["High school program students: ", PH("attendance standard appropriate to a distance high-school program and any compulsory-attendance requirements for minors"), FLAG("check state compulsory-education rules for minors")],
  ] },
  { h2: "Make-up work" },
  { p: ["Make-up of missed work may be permitted when approved by ", PH("role — e.g., Director of Education"), ", is supervised/verified, must demonstrate the same competence expected of the original activity, and is documented. No more than ", PH("#"), "% of total program hours may be made up. Make-up work does not erase an absence for attendance-percentage purposes."] },
  { h2: "Leave of absence" },
  { p: ["A student may request a leave of absence (in writing, in advance) for documented extenuating circumstances. Leaves are limited to ", PH("#"), " per 12-month period, not exceeding ", PH("##"), " total calendar days. A student who does not return by the scheduled return date is withdrawn, with the withdrawal date determined by the last date of attendance."] },
  { h2: "Voluntary withdrawal" },
  { p: ["Students who wish to withdraw notify ", PH("role — e.g., the Registrar"), " verbally or in writing; the withdrawal is effective as of the date of the request. Only the student may request withdrawal unless express written authorization is provided to a third-party representative (for high school students, the parent/guardian who signed the enrollment agreement may act)."] },
  { h2: "Name and contact updates" },
  { p: ["Students must provide their legal name at enrollment and report legal name changes (with documentation) and any change of address or contact information to the Registrar."] }
);

// ============================================================
// GRADES
// ============================================================
S(
  { h1: "Grades" },
  { table: {
    widths: W.grade,
    headers: ["Grade", "Description", "Included in Credits Earned", "Included in Credits Attempted", "Grade Points"],
    rows: [
      ["A", ["Excellent (", PH("90–100"), ")"], "Yes", "Yes", "4.0"],
      ["B", ["Above Average (", PH("80–89"), ")"], "Yes", "Yes", "3.0"],
      ["C", ["Average (", PH("70–79"), ")"], "Yes", "Yes", "2.0"],
      ["F", ["Failing (below ", PH("70"), ")"], "No", "Yes", "0.0"],
      ["P / NP", "Pass / No Pass (where designated)", "Yes / No", "Yes", "N/A"],
      ["W", "Withdrawal before the end of a grading period", "No", "Yes", "N/A"],
      ["I", ["Incomplete — permitted when ", PH("conditions"), "; converts to ", PH("grade"), " if not resolved within ", PH("##"), " days"], "No", "Yes", "N/A"],
      ["TR", "Transfer credit", "Yes", "Yes", "N/A"],
      ["PR", "Proficiency credit", "Yes", "Yes", "N/A"],
    ],
    zebra: true,
    centerCols: [0, 2, 3, 4],
  } },
  { p: [FLAG("confirm the grading scale, incomplete rules, and any additional grade codes against actual academic policy")] },
  { h2: "Grade appeals" },
  { p: ["A student who disagrees with a final grade may discuss it with the instructor within ", PH("#"), " calendar days after grades are final, or appeal to ", PH("role"), " within ", PH("#"), " calendar days. The determination on appeal is final and issued within ", PH("#"), " calendar days."] },
  { h2: "Repeating a course" },
  { p: ["When a course is repeated, all grades remain on the transcript and ", PH("policy — e.g., only the latest grade counts in the CGPA; repeats count toward maximum time frame; charge policy for repeats"), "."] },
  { h2: "Progress reports" },
  { p: ["Final grades are available in the student portal at the end of each course/grading period. High school program students and their parents/guardians receive progress reports ", PH("frequency"), "."] }
);

// ============================================================
// SATISFACTORY ACADEMIC PROGRESS
// ============================================================
S(
  { h1: "Satisfactory Academic Progress (SAP)" },
  { p: ["Students must maintain satisfactory academic progress, measured by both a qualitative standard (cumulative grade point average) and a quantitative standard (rate of progress — credits/hours earned divided by credits/hours attempted) at defined evaluation points, and must be able to complete the program within the maximum time frame."] },
  { table: {
    widths: W.sap,
    headers: ["% of Program Attempted", "Minimum Rate of Progress", "Minimum CGPA"],
    rows: [
      [["Up to ", PH("33"), "%"], [PH("50"), "%"], [PH("1.5")]],
      [[PH("33"), "% – ", PH("50"), "%"], [PH("60"), "%"], [PH("2.0")]],
      [[PH("50"), "% and above"], [PH("67"), "%"], [PH("2.0")]],
    ],
    centerCols: [0, 1, 2],
  } },
  { p: [B("Evaluation points: "), PH("e.g., at the end of each course / every ## weeks"), ". ", B("Maximum time frame: "), PH("e.g., 1.5×"), " the published program length."] },
  { h2: "SAP statuses" },
  { bullets: [
    [B("Academic Warning "), "— first failure to meet a benchmark; the student is notified, advised, and remains enrolled for one evaluation period under an improvement plan."],
    [B("Academic Probation "), "— continued failure after warning; permitted only with an approved appeal and academic plan. A student who meets both benchmarks by the end of the probation period returns to good standing; a student who does not is dismissed."],
  ] },
  { h2: "SAP appeals" },
  { p: ["A dismissed student may appeal based on death of a relative, injury or illness of the student, or other special circumstances, describing the circumstances and how they have been resolved. Approved appeals result in probation with an academic plan; denied appeals result in dismissal with re-entry eligibility after ", PH("period"), "."] },
  { h2: "High school program academic progress" },
  { p: [PH("Grade-level promotion standards and intervention/support policy for the high school program"), FLAG("HS progress standards are typically credit-based per grade level — define before submission")] },
  { pagebreak: true }
);

// ============================================================
// STUDENT CODE OF CONDUCT
// ============================================================
S(
  { h1: "Student Code of Conduct" },
  { p: ["The Code of Conduct maintains a safe, professional, and respectful learning environment for all students, faculty, and staff — on any campus, in any virtual classroom, and at any institute-sponsored activity. Students who commit misconduct are subject to disciplinary action up to suspension or dismissal, determined by ", PH("committee composition — e.g., the Director of Education and one other director/instructor"), ", documented in the student's file, and appealable through the grievance procedure."] },
  { h3: "Offenses related to persons" },
  { bullets: [
    ["Interfering with another student's right to gain an education, or failing to respect the privacy and diversity of opinions of others;"],
    ["Threatening, intimidating, or using physical force in a manner that endangers or causes fear of harm;"],
    ["Harassing or bullying behavior toward any person, in any medium; and"],
    ["Vulgarity, foul language, or lack of respect directed at peers, instructors, or staff."],
  ] },
  { h3: "Offenses related to the operation of the institute" },
  { bullets: [
    ["Forging, altering, or misusing documents, records, or identification;"],
    ["Misappropriating the property or services of another person or the institute;"],
    ["Obstructing the orderly conduct of classes or institute functions, or violating the acceptable-use policy;"],
    ["Unauthorized use of institute systems, or committing a computer-related offense; and"],
    ["Acting in a manner that brings the institute's name or reputation into disrepute."],
  ] },
  { h3: "Offenses related to welfare, health, or safety" },
  { bullets: [
    ["Misrepresenting one's history or identity to the institute;"],
    ["Possessing or using weapons, explosives, or dangerous substances in connection with any institute activity;"],
    ["Falsely reporting emergencies or misusing safety systems; and"],
    ["Failing to comply with directions of institute personnel acting in performance of their duties."],
  ] },
  { h2: "Drug- and alcohol-free school" },
  { p: ["The unlawful manufacture, distribution, possession, or use of illicit drugs or alcohol in connection with any institute activity is prohibited. ", PH("Support/referral resources statement"), ""] },
  { h2: "Academic integrity and plagiarism" },
  { p: ["Submitting work that is not the student's own, unauthorized collaboration, cheating on assessments, or misrepresenting academic activity (including falsified attendance) violates academic integrity. Sanctions range from loss of credit for the work to dismissal. ", PH("Policy on permitted use of AI tools in coursework"), FLAG("adopt an explicit AI-use policy — distance-education integrity expectations increasingly require one")] },
  { h2: "Dress and environment" },
  { p: [PH("For virtual classrooms: camera/professional-environment expectations. If any on-site activity exists, dress expectations."), ""] },
  { h2: "Graduation requirements" },
  { p: ["A credential is conferred when the student has:"] },
  { bullets: [
    ["Successfully completed all courses and assessed learning outcomes required by the program;"],
    ["Achieved a cumulative grade point average of at least ", PH("2.0"), " (where letter grades apply);"],
    ["Satisfied all financial obligations to the institute; and"],
    ["For the High School Diploma Program: earned the required credits by subject area as published in this catalog."],
  ] }
);

// ============================================================
// STUDENT SERVICES
// ============================================================
S(
  { h1: "Student Services" },
  { h2: "Academic advising" },
  { p: ["Every student is paired with an advisor who understands their goals and checks in throughout the program — not just at enrollment. Advisors help students plan course sequences, navigate policies, and connect with support resources."] },
  { h2: "Career services" },
  { p: ["Career services include resume review, interview preparation, and employer connections aligned with the skills each program builds. ", B("Canyon State Institute does not guarantee employment or salary outcomes."), ""] },
  { h2: "Veteran and military family support" },
  { p: ["Founded by veterans, Canyon State Institute understands military transitions firsthand. Dedicated staff help veterans, service members, and military families translate service experience into civilian careers and navigate benefits. ", PH("Named point of contact / office")] },
  { h2: "Learning resources" },
  { p: ["Students have access to ", PH("digital library / tutoring / learning-resource description"), " through the learning management system."] },
  { h2: "High school student support" },
  { p: ["High school students receive academic advising, college and career counseling — including guided pathways into Canyon State Institute certificate programs — and wellness support resources. ", PH("Counseling structure and any third-party wellness resources"), ""] },
  { h2: "Students with disabilities" },
  { p: ["Canyon State Institute provides reasonable accommodations to qualified students with documented disabilities. Requests are made to ", PH("role/contact"), " and are evaluated interactively and confidentially. ", FLAG("designate the accommodations coordinator and document the process")] }
);

// ============================================================
// NOTIFICATIONS & STUDENT RIGHTS
// ============================================================
S(
  { h1: "Notifications and Student Rights" },
  { h2: "Student grievance procedure" },
  { numbered: [
    ["Raise the concern informally with the instructor or staff member involved, or with ", PH("role"), ", within ", PH("#"), " days of the event."],
    ["If unresolved, submit a written grievance to ", PH("role — e.g., Director of Education"), ", who investigates and responds in writing within ", PH("#"), " days."],
    ["If still unresolved, appeal in writing to ", PH("role — e.g., the President"), ", whose written determination within ", PH("#"), " days is the institute's final decision."],
    ["Students may also contact the institute's regulator at any time: ", PH("STATE AGENCY, address, phone, complaint URL"), ". ", PH("Accreditor complaint contact — once accredited")],
  ] },
  { h2: "Non-discrimination" },
  { p: ["Canyon State Institute admits students of any race, color, national and ethnic origin, sex, age, disability, religion, and veteran status to all the rights, privileges, programs, and activities generally accorded or made available to students at the institute. It does not discriminate on the basis of these characteristics in administration of its educational policies, admissions policies, or institute-administered programs. Inquiries: ", PH("designated coordinator, contact"), "."] },
  { h2: "Harassment and sexual misconduct" },
  { p: ["Harassment — including sexual harassment — of any student or employee is prohibited. Reports are made to ", PH("designated coordinator/role"), ", are investigated promptly and equitably, and retaliation for good-faith reporting is prohibited. ", FLAG("if the institution becomes subject to Title IX or state-equivalent requirements (including for the HS program), adopt the full required procedure")] },
  { h2: "Acceptable use of technology" },
  { p: ["Institute systems and accounts are provided for educational purposes. Unauthorized access, disruption of services, unlawful content, or use that violates the Code of Conduct is prohibited and may result in loss of access and discipline."] },
  { h2: "Distance education identity verification and privacy" },
  { p: ["The institute verifies that the student who registers is the student who participates and completes the work, through ", PH("methods — e.g., secure LMS credentials, proctored assessments, identity checks"), ", and protects student privacy in doing so. Any charges associated with identity verification are disclosed at enrollment (currently ", PH("$ or none"), ")."] },
  { h2: "Student records and FERPA" },
  { p: ["Students (and parents/guardians of dependent minor students) have the right to inspect and review education records, request amendment of inaccurate records, consent to disclosures of personally identifiable information except where law permits disclosure without consent, and file complaints with the U.S. Department of Education regarding alleged FERPA failures. The institute discloses directory information (", PH("define directory items or state none"), ") only as permitted and honors opt-outs. For high school students under 18, FERPA rights rest with the parent/guardian and transfer to the student as provided by law."] },
  { h2: "Records retention" },
  { p: ["Academic transcripts are maintained ", PH("permanently / per state rule"), "; other enrollment records are retained for at least ", PH("# years — per state rule"), ". Students may request official transcripts from the Registrar (", PH("fee, if any"), ")."] },
  { h2: "Personal property" },
  { p: ["The institute is not responsible for loss or damage to students' personal property, including devices used for coursework."] },
  { h2: "Arbitration / dispute resolution" },
  { p: [PH("If the enrollment agreement contains an arbitration or dispute-resolution clause, summarize it here consistently with that agreement; otherwise omit."), FLAG("legal review required; some states and accreditors restrict mandatory arbitration language")] },
  { pagebreak: true }
);

// ============================================================
// PROGRAMS OF STUDY — TRACK 1
// ============================================================
function programSection(track, blurb, objectives, careers) {
  return [
    { h2: track.name },
    { h3: "Program objectives" },
    { p: ["After completing this program of study, graduates will be able to:"] },
    { bullets: objectives },
    { p: blurb },
    { p: careers ? [I(careers)] : [I("")] },
    { table: {
      widths: W.courseTable,
      headers: ["Course No.", "Course Title", "Format", "Length", "Credential Earned"],
      rows: track.courses.map((c) => [c[0], c[1], c[2], c[3], c[4]]),
      zebra: true,
      centerCols: [0, 2, 3],
    } },
    { p: [B("Hours: "), PH("total instructional hours by course and program"), "   ", B("Prerequisites: "), PH("by course, if any"), ""] , opts: { small: true } },
  ];
}

S(
  { h1: "Programs of Study — Track 1: Certificate Programs" },
  { p: [I("Course listings below are drafted from the institute's published program families and are marked SAMPLE until finalized. Course numbering is suggested."), FLAG("finalize course lists, hours, prerequisites, and numbering; every course listed must have a matching entry in Course Descriptions")] },
  ...programSection(
    tracks.professional,
    ["Professional Education is built for working adults. Courses are practical by design: every module maps to skills that can be applied the same week, and every completed course moves the student toward a recognized Canyon State Institute credential."],
    [
      ["Apply practical, employer-aligned skills immediately in the workplace;"],
      ["Communicate professionally in writing and in person;"],
      ["Use data and process-improvement methods to support decisions; and"],
      ["Demonstrate foundational leadership and service practices."],
    ],
    "Graduates may pursue advancement in administrative, operations, customer-facing, and team-lead roles across industries."
  ),
  ...programSection(
    tracks.graduate,
    ["Graduate Education serves learners who already hold experience or prior education and want to go deeper: advanced, assessed coursework designed for career-changers and experienced professionals preparing to move up or continue into further study."],
    [
      ["Lead teams and organizations through change with assessed capability;"],
      ["Design and execute applied analytics and research-informed projects; and"],
      ["Formulate and present organizational strategy."],
    ],
    "Graduates may pursue supervisory, managerial, and strategy-support roles, or continued academic study."
  ),
  ...programSection(
    tracks.enterprise,
    ["Enterprise Education partners with employers to build the capabilities their teams need. Programs are delivered in cohorts, measured against agreed outcomes, and shaped by decades of military and civilian leadership experience. Custom engagements are documented in a training agreement."],
    [
      ["Lead frontline teams with clear expectations and accountability;"],
      ["Align leadership practice to organizational strategy; and"],
      ["Strengthen team effectiveness and communication."],
    ],
    "Delivered to employer cohorts; individual enrollment where offered."
  ),
  ...programSection(
    tracks.free,
    ["Free Courses are the easiest way to experience Canyon State Institute: short, no-cost introductions to new and emerging topics that earn a Statement of Participation and map a clear next step into certificate programs."],
    [
      ["Explore new and emerging topics in a structured, supported format; and"],
      ["Identify a credential pathway matched to the student's goals."],
    ],
    null
  ),
  { pagebreak: true }
);

// ============================================================
// PROGRAM OF STUDY — TRACK 2 HIGH SCHOOL
// ============================================================
S(
  { h1: "Program of Study — Track 2: High School Diploma Program" },
  { p: ["The Canyon State Institute High School Program brings the institute's career-focused, student-centered approach to grades ", PH("9–12"), " — a flexible, supportive online path to a high school diploma issued by Canyon State Institute."] },
  { h2: "Instructional model" },
  { p: [PH("Describe the model: live online / self-paced / hybrid; term structure; expected weekly pacing; teacher interaction model; proctoring approach for assessments."), FLAG("accreditor high-school standards typically require defined instructional hours per credit, assessment integrity/proctoring, and qualified-teacher requirements")] },
  { h2: "Graduation credit requirements" },
  { table: {
    widths: W.hsCredits,
    headers: ["Subject Area", "Credits Required", "Notes"],
    rows: [
      ["English / Language Arts", [PH("4")], [PH(" ")]],
      ["Mathematics", [PH("4")], [PH("e.g., through Algebra II")]],
      ["Science", [PH("3")], [PH("labs — how satisfied online")]],
      ["Social Studies", [PH("3")], [PH(" ")]],
      ["Health / Wellness", [PH("1")], [PH(" ")]],
      ["Electives", [PH("6–7")], [PH("incl. career-focused electives drawing on Track 1 content")]],
      [[B("Total")], [PH("21–22")], [PH(" ")]],
    ],
  } },
  { p: [FLAG("credit counts must satisfy the home state's diploma requirements and the accreditor's high-school program standards")] },
  { h2: "Assessment and academic integrity" },
  { p: [PH("Assessment types, proctoring requirements for milestone exams, and identity-verification measures specific to minors."), ""] },
  { h2: "College and career pathways" },
  { p: ["High school students receive college and career counseling, and graduates may continue directly into Canyon State Institute certificate programs — one institution supporting every stage of the journey."] },
  { h2: "Parent and guardian role" },
  { p: ["For students under 18, a parent or legal guardian signs the enrollment agreement, receives progress reporting ", PH("frequency"), ", and is the primary contact for attendance, conduct, and records matters."] },
  { pagebreak: true }
);

// ============================================================
// COURSE DESCRIPTIONS
// ============================================================
S(
  { h1: "Course Descriptions" },
  { p: [I("Sample descriptions drafted from published program content — finalize alongside the program outlines. High school course descriptions to be added when the HS curriculum is finalized."), FLAG("every course in a program outline must appear here with hours and prerequisites")] },
  ...courseDescriptions.flatMap(([code, title, desc]) => [
    { h3: `${code} ${title}` },
    { p: [I("Hours: "), PH("##"), I("  ·  Outside preparation: "), PH("##"), I("  ·  Prerequisites: "), PH("None or course code"), ""], opts: { tight: true, small: true } },
    { p: [desc] },
  ]),
  { h3: ["High School Diploma Program courses"] },
  { p: [PH("Course-by-course listing for the high school curriculum (course code, title, credit value, description), to be added when the curriculum is approved.")] },
  { pagebreak: true }
);

// ============================================================
// HISTORY, FACILITIES, GOVERNANCE
// ============================================================
S(
  { h1: "History of Canyon State Institute" },
  { p: ["Canyon State Institute was founded in ", PH("YEAR"), " by ", PH("founder(s) / founding story — veteran founding is central to institutional identity"), ". ", PH("Timeline of key milestones — program launches, approvals, growth")] },
  { h2: "Facilities and equipment" },
  { p: [PH("Describe the administrative location and the technology infrastructure used to deliver distance education (LMS, student information system, proctoring tools, help desk). If any physical instructional facility exists, describe it (square footage, classrooms/labs, resources)."), ""] },
  { h2: "Governance and ownership" },
  { p: ["Canyon State Institute is owned by ", PH("legal entity name"), ", ", PH("entity type and state of formation"), "."] },
  { h3: "Corporate officers" },
  { table: {
    widths: [5040, 5040],
    headers: ["Name", "Title"],
    rows: [
      [[PH("NAME")], [PH("Chief Executive Officer")]],
      [[PH("NAME")], [PH("TITLE")]],
      [[PH("NAME")], [PH("TITLE")]],
    ],
  } }
);

// ============================================================
// STAFF AND FACULTY
// ============================================================
S(
  { h1: "Staff and Faculty" },
  { p: ["Canyon State Institute selects professionals who are adept in both theory and practical application. All faculty meet or exceed the minimum education and industry-experience requirements set by ", PH("state agency"), " and any applicable accrediting body. Instructional and support staff are available to assist students with academics, enrollment, and student services."] },
  { table: {
    widths: W.faculty,
    headers: ["Name", "Title", "Education (Cert/Dipl/Deg)", "Institution", "Yrs Exp"],
    rows: [0, 1, 2, 3, 4, 5, 6, 7].map(() => [
      [PH("NAME")], [PH("TITLE")], [PH("CREDENTIAL")], [PH("INSTITUTION")], [PH("##")],
    ]),
  } },
  { p: [FLAG("high school program faculty may require state teaching credentials or documented subject-matter qualifications — verify against HS program standards")] },
  { spacer: 300 },
  { band: "★  VETERAN OWNED & OPERATED  ★" },
  { spacer: 100 },
  { p: ["Canyon State Institute · ", PH("STREET ADDRESS"), " · ", PH("CITY, STATE ZIP"), " · ", PH("PHONE"), " · ", PH("EMAIL"), " · ", PH("WEBSITE")], opts: { center: true, small: true } },
  { p: ["This catalog is true and correct in content and policy as of its publish date. Volume ", PH("#"), " · Effective ", PH("DATES"), ""], opts: { center: true, small: true, italic: true } }
);

module.exports = { meta, sections };
