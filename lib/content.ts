// Canyon State Institute — central content library.
// Copy that still needs client sign-off is tracked in CONTENT-REVIEW.md.

export const site = {
  name: "Canyon State Institute",
  shortName: "CSI",
  tagline: "Veteran Owned · Career-Focused Education",
  description:
    "Canyon State Institute empowers individuals to achieve their career aspirations through exceptional education, practical skill development, and unwavering support.",
  url: "https://www.canyonstateinstitute.edu", // placeholder — confirm domain
  phone: "[Phone pending]",
  email: "[Email pending]",
  address: "[Street address pending] · [City, State ZIP]",
};

export type NavChild = { label: string; href: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const nav: {
  utility: NavChild[];
  main: NavItem[];
  cta: NavChild;
} = {
  utility: [
    { label: "Student Login", href: "/admissions#login" },
    { label: "Contact", href: "/contact" },
  ],
  main: [
    {
      label: "Programs",
      href: "/programs",
      children: [
        { label: "Professional Education", href: "/programs/professional-education" },
        { label: "Graduate Education", href: "/programs/graduate-education" },
        { label: "Enterprise Education", href: "/programs/enterprise-education" },
        { label: "Free Courses", href: "/programs/free-courses" },
      ],
    },
    { label: "High School", href: "/high-school" },
    { label: "Student Success", href: "/student-success" },
    {
      label: "About Us",
      href: "/about",
      children: [
        { label: "Who We Are", href: "/about" },
        { label: "Our Executive Team", href: "/about/executive-team" },
        { label: "Our Commitment", href: "/about/commitment" },
        { label: "CSI Credentials", href: "/about/credentials" },
      ],
    },
    { label: "Admissions", href: "/admissions" },
    { label: "Contact", href: "/contact" },
  ],
  cta: { label: "Get Started", href: "/admissions" },
};

export const mission =
  "At Canyon State Institute, our mission is to empower individuals to achieve their career aspirations through exceptional education, practical skill development, and unwavering support. We are committed to preparing every student with the knowledge, confidence, and career readiness needed to advance professionally, embrace new opportunities, and make meaningful contributions to their communities. By fostering a culture of excellence, integrity, and lifelong learning, we help transform potential into lasting success.";

export const home = {
  hero: {
    eyebrow: "Veteran Owned · Career-Focused Education",
    heading: "Learning for a Lifetime of Success",
    sub: site.description,
    primary: { label: "Explore Programs", href: "/programs" },
    secondary: { label: "Who We Are", href: "/about" },
  },
  fastFacts: [
    // ⚠️ SAMPLE values approved for design preview (2026-07-09) — swap in real,
    // verified figures before launch. CONTENT-REVIEW.md item #1 still blocks.
    { value: "2024", label: "Year Founded" },
    { value: "24", label: "Programs Offered" },
    { value: "1,200", label: "Students Served" },
    { value: "45", label: "Employer Partners" },
    { value: "80%", label: "Veteran Leadership" },
  ],
  fastFactsFootnote:
    "Sample figures shown for preview — final numbers publish before launch.",
  veteranBand: {
    eyebrow: "Veteran Owned & Operated",
    heading: "Founded by Those Who Served",
    body: "Canyon State Institute was built by veterans who know what it means to take on a new mission. The discipline, integrity, and commitment to the people beside us that defined our service now drive everything we teach.",
    cta: { label: "Our Story", href: "/about" },
  },
  credentialsTeaser: {
    heading: "Canyon State Institute Credentials",
    body: "Canyon State Institute offers a wide range of educational opportunities designed to help you meet your personal learning goals, wherever you are in your life or career. Explore our range of offerings by credential and academic rigor.",
    link: { label: "Explore the credential framework", href: "/about/credentials" },
  },
  closing: {
    heading: "Transform potential into lasting success.",
    sub: "Take the first step today — our admissions team will help you find the right path.",
    cta: { label: "Get Started", href: "/admissions" },
  },
};

export type Course = {
  title: string;
  format: "Self-paced" | "Instructor-led" | "Cohort" | "Workshop";
  length: string;
  credential: string;
};

export type Program = {
  slug: string;
  name: string;
  short: string; // card copy
  image: string; // key into images map
  intro: string;
  highlights: string[];
  courses: Course[];
  faqs: { q: string; a: string }[];
};

export const programs: Program[] = [
  {
    slug: "professional-education",
    name: "Professional Education",
    short:
      "Self-paced and instructor-led courses that make an immediate career impact — and earn a certificate.",
    image: "professional",
    intro:
      "Professional Education at Canyon State Institute is built for working adults. Courses are practical by design: every module maps to skills you can apply the same week, and every completed course moves you toward a recognized CSI credential.",
    highlights: [
      "Self-paced and instructor-led formats to fit your schedule",
      "Skills chosen with employer input — practical from day one",
      "Clear credential pathway from single courses to Professional Certificates",
    ],
    courses: [
      { title: "Project Management Essentials", format: "Instructor-led", length: "6 weeks", credential: "Certificate of Completion" },
      { title: "Business Communication & Writing", format: "Self-paced", length: "4 weeks", credential: "Record of Completion" },
      { title: "Data Literacy for Professionals", format: "Self-paced", length: "5 weeks", credential: "Certificate of Completion" },
      { title: "Leadership Foundations", format: "Instructor-led", length: "8 weeks", credential: "Certificate of Achievement" },
      { title: "Operations & Process Improvement", format: "Instructor-led", length: "8 weeks", credential: "Certificate of Achievement" },
      { title: "Customer Success Fundamentals", format: "Self-paced", length: "3 weeks", credential: "Record of Completion" },
    ],
    faqs: [
      {
        q: "How much time should I plan for each week?",
        a: "Most professional courses are designed for 3–6 hours per week. Self-paced courses let you adjust that around work and family; instructor-led courses follow a weekly rhythm with flexible evening sessions.",
      },
      {
        q: "Do I earn a credential for every course?",
        a: "Yes. Every completed course earns at least a Record of Completion, and multi-week assessed courses count toward Certificates of Completion and Achievement. See the CSI Credentials page for the full framework.",
      },
      {
        q: "Are courses online or in person?",
        a: "Both formats are offered. Each course listing shows its delivery format before you enroll.",
      },
    ],
  },
  {
    slug: "graduate-education",
    name: "Graduate Education",
    short:
      "Advanced courses and certificate programs for moving up, changing fields, or preparing for further study.",
    image: "graduate",
    intro:
      "Graduate Education serves learners who already hold experience or prior education and want to go deeper. Advanced certificate programs combine rigorous coursework with assessed outcomes, preparing you to move up, change fields, or continue into further study.",
    highlights: [
      "Advanced, assessed coursework with rigorous learning outcomes",
      "Designed for career-changers and experienced professionals",
      "A structured step toward further academic study",
    ],
    courses: [
      { title: "Advanced Organizational Leadership", format: "Cohort", length: "12 weeks", credential: "Certificate of Achievement" },
      { title: "Applied Analytics Capstone", format: "Instructor-led", length: "10 weeks", credential: "Certificate of Achievement" },
      { title: "Strategic Management Program", format: "Cohort", length: "16 weeks", credential: "Professional Certificate" },
      { title: "Research & Evidence-Based Practice", format: "Instructor-led", length: "8 weeks", credential: "Certificate of Completion" },
    ],
    faqs: [
      {
        q: "What are the admission requirements?",
        a: "Graduate-level programs typically expect prior professional experience or completed undergraduate study. Each program page lists its specific expectations, and admissions can review your background with you.",
      },
      {
        q: "Will graduate credentials transfer toward a degree?",
        a: "CSI credentials document rigorous, assessed learning. Transferability is always determined by the receiving institution; our team can provide detailed course descriptions to support your request.",
      },
    ],
  },
  {
    slug: "enterprise-education",
    name: "Enterprise Education",
    short:
      "Cohort learning, leadership development, and custom programs built for organizations.",
    image: "enterprise",
    intro:
      "Enterprise Education partners with employers to build the capabilities their teams actually need. From standing leadership academies to custom technical upskilling, programs are delivered in cohorts, measured against agreed outcomes, and shaped by decades of military and civilian leadership experience.",
    highlights: [
      "Custom curriculum built around your organization's goals",
      "Cohort delivery that builds teams, not just skills",
      "Veteran-led perspective on leadership and operational excellence",
    ],
    courses: [
      { title: "Frontline Leader Academy", format: "Cohort", length: "10 weeks", credential: "Certificate of Achievement" },
      { title: "Executive Leadership Intensive", format: "Cohort", length: "6 weeks", credential: "Certificate of Completion" },
      { title: "Custom Technical Upskilling", format: "Cohort", length: "Scoped to need", credential: "Program-specific" },
      { title: "Team Effectiveness Workshops", format: "Workshop", length: "1–3 days", credential: "Statement of Participation" },
    ],
    faqs: [
      {
        q: "How does a custom program get built?",
        a: "We start with a discovery conversation about your goals, then propose a curriculum, delivery format, and measurement plan. Programs launch only when both sides agree on what success looks like.",
      },
      {
        q: "Can programs be delivered on-site?",
        a: "Yes — on-site, online, and blended delivery are all available depending on your team's locations and schedules.",
      },
    ],
  },
  {
    slug: "free-courses",
    name: "Free Courses",
    short:
      "An affordable, flexible way to get introduced to new and emerging topics.",
    image: "free",
    intro:
      "Free Courses are the easiest way to experience Canyon State Institute. Explore new and emerging topics, sample our teaching style, and earn a Statement of Participation — no cost, no obligation, and a clear next step if you want to go further.",
    highlights: [
      "No cost, no obligation — start learning today",
      "Short formats designed to fit into a busy week",
      "A natural on-ramp into certificate programs",
    ],
    courses: [
      { title: "Intro to AI in the Workplace", format: "Self-paced", length: "2 weeks", credential: "Statement of Participation" },
      { title: "Personal Finance Foundations", format: "Self-paced", length: "2 weeks", credential: "Statement of Participation" },
      { title: "Career Transition Toolkit for Veterans", format: "Self-paced", length: "3 weeks", credential: "Statement of Participation" },
      { title: "Effective Workplace Communication", format: "Self-paced", length: "1 week", credential: "Statement of Participation" },
    ],
    faqs: [
      {
        q: "Is it really free?",
        a: "Yes. Free courses are our introduction to who we are. If a course inspires you to continue, our team can map the credential pathway that fits your goals.",
      },
      {
        q: "Do free courses earn a credential?",
        a: "Free courses earn a Statement of Participation — the first tier of the CSI credential framework.",
      },
    ],
  },
];

// ── High School Diploma Program (Track 2) ── see docs/high-school-page-spec.md.
// One institution, two tracks: the HS program is a program OF CSI, not a
// separate school (DEAC single-institution positioning — do not sub-brand).
export const highSchool = {
  hero: {
    eyebrow: "A Program of Canyon State Institute",
    heading: "Earn Your High School Diploma, On Your Path",
    // ⚠️ Do not add the word "accredited" until accreditation is granted.
    sub: "The Canyon State Institute High School Program brings our career-focused, student-centered approach to [grades 9–12] — a flexible, supportive online path to a high school diploma.",
    primary: { label: "How It Works", href: "#how-it-works" },
    secondary: { label: "Request Info", href: "/contact" },
  },
  overview: {
    heading: "Program Overview",
    paragraphs: [
      "The Canyon State Institute High School Program extends the institute's career-focused, student-centered approach to secondary education. Coursework is delivered online with the same faculty standards, support systems, and commitment to real-world readiness that define every CSI program.",
      "Canyon State Institute serves learners across two program tracks — career certificate programs and our high school diploma program — under one institution, one faculty standard, and one commitment to student success.",
    ],
    atAGlance: [
      { label: "Grades", value: "[9–12 — pending approval]" },
      { label: "Format", value: "[Online — live / self-paced TBD]" },
      { label: "Schedule", value: "[Rolling / semester — TBD]" },
      { label: "Start dates", value: "[TBD]" },
      { label: "Class size", value: "[TBD]" },
      { label: "Diploma", value: "High school diploma issued by Canyon State Institute" },
    ],
  },
  fastFacts: [
    // ⚠️ Placeholders — real HS figures required before launch (CONTENT-REVIEW.md).
    { value: "[#–#]", label: "Grades Offered" },
    { value: "[##]", label: "Courses Offered" },
    { value: "[##]", label: "Avg. Class Size" },
    { value: "[###]", label: "Students Enrolled" },
    { value: "[##%]", label: "Graduation Rate" },
    { value: "[##]", label: "States Served" },
  ],
  fastFactsFootnote:
    "Program figures publish as they are finalized — values shown are placeholders.",
  curriculum: {
    heading: "Curriculum & Graduation Requirements",
    intro:
      "Graduation requirements are organized by subject area. Credit counts and course descriptions are pending internal approval and will be published in the institutional catalog.",
    subjects: [
      { area: "English", credits: "[TBD]" },
      { area: "Mathematics", credits: "[TBD]" },
      { area: "Science", credits: "[TBD]" },
      { area: "Social Studies", credits: "[TBD]" },
      { area: "Electives", credits: "[TBD]" },
      { area: "Health & Wellness", credits: "[TBD]" },
    ],
    model:
      "Instruction is delivered [live online / self-paced / hybrid — format pending approval] with certified instructors, structured feedback, and regular progress checks.",
    pdf: {
      label: "Download the High School one-sheet (PDF)",
      href: "/docs/csi-high-school-one-sheet.pdf",
    },
  },
  support: {
    heading: "Student Support",
    intro:
      "Support systems are built into the school week, not bolted on. Every student has people in their corner.",
    tiles: [
      {
        title: "Academic Advising",
        body: "Every high school student has an advisor tracking progress, flagging obstacles early, and keeping the path to graduation clear.",
        icon: "compass",
      },
      {
        title: "College & Career Counseling",
        body: "Counselors help students plan beyond the diploma — college applications, career exploration, and a direct pathway into Canyon State Institute certificate programs.",
        icon: "briefcase",
        link: { label: "Explore certificate programs", href: "/programs" },
      },
      {
        title: "Wellness Support",
        body: "Flexible pacing, human check-ins, and resources that support the whole student — not just the transcript.",
        icon: "heart",
      },
    ],
  },
  admissionsSteps: {
    heading: "How It Works",
    steps: [
      {
        title: "Inquire",
        body: "Tell us about your student and your goals. We'll walk you through the program, schedule, and what to expect.",
      },
      {
        title: "Apply",
        body: "Complete the application and share transcripts for any prior high school coursework.",
      },
      {
        title: "Enroll",
        body: "Review and sign the enrollment agreement — a parent or guardian signature is required for students under 18 — and choose a start date.",
      },
    ],
  },
  policy: {
    heading: "Accreditation & Institutional Structure",
    paragraphs: [
      "Canyon State Institute offers instruction through two program tracks delivered by distance education: Track 1 — Certificate Programs, serving career preparation and advancement; and Track 2 — the High School Diploma Program, leading to a high school diploma issued by Canyon State Institute.",
      "Both tracks operate under the ownership, governance, administration, academic policies, and student-services infrastructure of Canyon State Institute as a single institution. All programs are described in the institutional catalog, and students in both tracks share the same enrollment agreement framework, complaint procedures, and records policies.",
    ],
    disclosures: [
      "[Accreditation status — pending. This program does not claim accreditation until granted.]",
      "[State authorization disclosures for enrollment of minors, by state — pending legal review.]",
    ],
  },
  closing: {
    heading: "One institution. Every stage of the journey.",
    sub: "Talk with our team about whether the High School Program is the right fit for your student.",
    cta: { label: "Request Information", href: "/contact" },
    secondary: { label: "Explore Certificate Programs", href: "/programs" },
  },
};

export const studentSuccess = {
  heading: "Student Success",
  intro:
    "Success at Canyon State Institute is measured one student at a time — a new role, a promotion, a finished credential, a renewed sense of direction. Behind every outcome is a support system built to make sure no student navigates their path alone.",
  supports: [
    {
      title: "Advising That Knows Your Name",
      body: "Every student is paired with an advisor who understands their goals and checks in throughout the program — not just at enrollment.",
      icon: "compass",
    },
    {
      title: "Career Services",
      body: "Resume reviews, interview preparation, and employer connections aligned with the skills your program builds.",
      icon: "briefcase",
    },
    {
      title: "Veteran & Military Family Support",
      body: "Founded by veterans, CSI understands military transitions firsthand and helps students translate service experience into civilian careers.",
      icon: "star",
    },
    {
      title: "Flexible Formats",
      body: "Self-paced, evening, and cohort options acknowledge the reality of working adult life — education that fits around it, not against it.",
      icon: "clock",
    },
  ],
  storiesNote:
    "Student stories and outcomes will be published here as our first cohorts complete their programs.",
};

export const about = {
  whoWeAre: {
    heading: "Who We Are",
    paragraphs: [
      "Canyon State Institute is dedicated to preparing individuals for meaningful career advancement through high-quality education, practical workforce preparation, and student-centered support. We believe that education should be accessible, relevant, and designed to equip students with the knowledge and confidence needed to succeed in today's evolving workforce.",
      "Our programs are built with a focus on career readiness, professional growth, and lifelong learning. Whether students are pursuing a new career, seeking advancement in their current profession, or preparing for specialized opportunities, Canyon State Institute is committed to providing an educational experience that helps them reach their goals.",
    ],
    pullQuote:
      "Education should be accessible, relevant, and designed to equip students with the knowledge and confidence needed to succeed.",
  },
  executiveTeam: {
    heading: "Our Executive Team",
    paragraphs: [
      "The strength of Canyon State Institute is rooted in the experience and leadership of our executive team. Collectively, our leadership brings decades of professional expertise spanning military service, civilian workforce development, education, leadership, and organizational management.",
      "This diverse background allows our leadership to develop programs that are practical, current, and aligned with the needs of employers while maintaining the highest standards of academic quality and student support.",
    ],
    // ⚠️ Placeholder roster — names/titles/bios/headshots pending approval (CONTENT-REVIEW.md).
    members: [
      { name: "[Name pending]", title: "President", bio: "Bio to be added upon approval." },
      { name: "[Name pending]", title: "Chief Academic Officer", bio: "Bio to be added upon approval." },
      { name: "[Name pending]", title: "Director of Student Success", bio: "Bio to be added upon approval." },
      { name: "[Name pending]", title: "Director of Enterprise Programs", bio: "Bio to be added upon approval." },
    ],
  },
  commitment: {
    heading: "Our Commitment",
    paragraphs: [
      "We are more than an educational institution — we are a community committed to helping individuals realize their potential. Every decision we make is guided by our commitment to excellence, integrity, innovation, and student success.",
      "We are proud to serve students from diverse backgrounds and remain dedicated to creating pathways that lead to career advancement, professional achievement, and lifelong learning. As our students grow, we grow with them — preparing graduates to lead, serve, and succeed with confidence.",
    ],
    values: [
      { name: "Excellence", body: "High standards in every course, every interaction, every outcome.", icon: "award" },
      { name: "Integrity", body: "We say what we do and do what we say — with students and employers alike.", icon: "shield" },
      { name: "Innovation", body: "Programs stay current with the workforce, not behind it.", icon: "lightbulb" },
      { name: "Student Success", body: "The measure that matters most: students reaching their goals.", icon: "graduation" },
    ],
  },
};

export const credentials = {
  heading: "Canyon State Institute Credentials",
  intro:
    "Canyon State Institute offers a wide range of educational opportunities designed to help you meet your personal learning goals, wherever you are in your life or career. Credentials increase in academic rigor and time commitment from left to right.",
  // ⚠️ Hour thresholds pending internal approval; graduate/degree tiers pending accreditation.
  tiers: [
    {
      name: "Statement of Participation",
      requirement: "Webinars, seminars & workshops under 20 hours",
      detail:
        "Recognizes engaged participation in short-form learning — webinars, seminars, and workshops under 20 hours. No formal assessment is required.",
    },
    {
      name: "Record of Completion",
      requirement: "Successful completion of an individual course",
      detail:
        "Documents the successful completion of an individual course, including any course-level completion criteria set by the instructor.",
    },
    {
      name: "Certificate of Completion",
      requirement: "20+ hours of coursework with completion criteria",
      detail:
        "Awarded for programs of 20 or more hours with defined completion criteria — a substantive commitment to structured learning.",
    },
    {
      name: "Certificate of Achievement",
      requirement: "36–150 hours with assessed learning outcomes",
      detail:
        "Awarded for programs of 36–150 hours in which learning outcomes are formally assessed — evidence of demonstrated capability, not just attendance.",
    },
    {
      name: "Professional Certificate",
      requirement: "150+ hours with rigorous assessment of mastery",
      detail:
        "The most rigorous CSI credential: 150+ hours of coursework with rigorous assessment of mastery, designed to carry weight with employers.",
    },
  ],
  disclaimer:
    "Credential hour thresholds and assessment requirements are pending internal approval. Graduate certificate and degree tiers will be added upon accreditation.",
};

export const admissions = {
  heading: "Get Started",
  intro:
    "Enrolling at Canyon State Institute is designed to be simple and personal. Tell us where you want to go — we'll help you map the path to get there.",
  steps: [
    {
      title: "Tell us your goal",
      body: "Complete the request form below or call us. Share where you are today and where you want to be — that's all we need to start.",
    },
    {
      title: "Meet your advisor",
      body: "An advisor walks you through programs, formats, schedules, and credentials that fit your goal, and answers every question honestly.",
    },
    {
      title: "Enroll and begin",
      body: "Choose your start date, complete enrollment, and begin. Your advisor stays with you from first course to final credential.",
    },
  ],
  faqs: [
    {
      q: "Do I need prior college experience to enroll?",
      a: "No. Programs span from introductory free courses to advanced graduate-level study. Your advisor will help you find the entry point that matches your background and goals.",
    },
    {
      q: "Is Canyon State Institute veteran-friendly?",
      a: "We're veteran-owned and veteran-led. We understand military transitions firsthand and welcome veterans, service members, and military families. Contact admissions to discuss the support available to you.",
    },
    {
      q: "What does tuition look like?",
      a: "Tuition varies by program and format, and free courses cost nothing. Admissions will provide complete, transparent pricing for any program before you commit — no surprises.",
    },
    {
      q: "When can I start?",
      a: "Self-paced courses can begin as soon as enrollment is complete. Instructor-led and cohort programs list their upcoming start dates on each program page.",
    },
  ],
  studentLoginNote:
    "Already enrolled? The student portal is coming online soon — your advisor will share access details.",
};

export const contact = {
  heading: "Contact Us",
  intro:
    "Questions about programs, credentials, enterprise partnerships, or anything else — reach out and a member of our team will respond within one business day.",
  reasons: [
    "Program information",
    "Admissions & enrollment",
    "Enterprise partnerships",
    "Veteran & military support",
    "Credential verification",
    "Something else",
  ],
};

export const footer = {
  columns: [
    {
      heading: "Programs",
      links: [
        { label: "Professional Education", href: "/programs/professional-education" },
        { label: "Graduate Education", href: "/programs/graduate-education" },
        { label: "Enterprise Education", href: "/programs/enterprise-education" },
        { label: "Free Courses", href: "/programs/free-courses" },
        { label: "High School Program", href: "/high-school" },
      ],
    },
    {
      heading: "About",
      links: [
        { label: "Who We Are", href: "/about" },
        { label: "Our Executive Team", href: "/about/executive-team" },
        { label: "Our Commitment", href: "/about/commitment" },
        { label: "Student Success", href: "/student-success" },
      ],
    },
    {
      heading: "Resources",
      links: [
        { label: "CSI Credentials", href: "/about/credentials" },
        { label: "Admissions FAQs", href: "/admissions#faqs" },
        { label: "Get Started", href: "/admissions" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Accessibility", href: "/accessibility" },
    { label: "Non-Discrimination", href: "/non-discrimination" },
  ],
};

export const legalPages: Record<
  string,
  { title: string; updated: string; body: string[] }
> = {
  privacy: {
    title: "Privacy Policy",
    updated: "July 2026",
    body: [
      "Canyon State Institute respects your privacy. This policy describes the information we collect through this website — such as contact form submissions — and how we use it.",
      "Information you submit through our forms (name, email, phone, and your message) is used solely to respond to your inquiry and administer admissions. We do not sell personal information.",
      "This is a placeholder policy pending legal review. A complete privacy policy will be published before public launch.",
    ],
  },
  terms: {
    title: "Terms of Use",
    updated: "July 2026",
    body: [
      "By using this website you agree to use it for lawful purposes and acknowledge that content is provided for general information about Canyon State Institute and its programs.",
      "Program details, schedules, and credential requirements are subject to change prior to enrollment agreements.",
      "This is a placeholder document pending legal review. Complete terms will be published before public launch.",
    ],
  },
  accessibility: {
    title: "Accessibility",
    updated: "July 2026",
    body: [
      "Canyon State Institute is committed to providing a website that is accessible to the widest possible audience, in conformance with WCAG 2.2 Level AA.",
      "This site is built with semantic structure, keyboard navigability, visible focus indicators, sufficient color contrast, and reduced-motion support.",
      "If you encounter an accessibility barrier on this site, please contact us and we will work to resolve it promptly.",
    ],
  },
  "non-discrimination": {
    title: "Non-Discrimination Statement",
    updated: "July 2026",
    body: [
      "Canyon State Institute admits students of any race, color, national and ethnic origin, sex, age, disability, religion, and veteran status to all the rights, privileges, programs, and activities generally accorded or made available to students at the institute.",
      "It does not discriminate on the basis of these characteristics in administration of its educational policies, admissions policies, or institute-administered programs.",
      "This is a placeholder statement pending legal review prior to public launch.",
    ],
  },
};
