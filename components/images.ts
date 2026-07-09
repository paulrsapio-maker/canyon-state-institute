import type { StaticImageData } from "next/image";
import heroCanyon from "@/images/hero-canyon.webp";
import sectionLandscape from "@/images/section-landscape.webp";
import programStudentSuccess from "@/images/program-student-success.webp";
import programProfessional from "@/images/program-professional.webp";
import programGraduate from "@/images/program-graduate.webp";
import programEnterprise from "@/images/program-enterprise.webp";
import programFree from "@/images/program-free.webp";
import aboutWho from "@/images/about-who.webp";
import aboutCommitment from "@/images/about-commitment.webp";
import admissionsAdvisor from "@/images/admissions-advisor.webp";

export const images = {
  heroCanyon,
  sectionLandscape,
  aboutWho,
  aboutCommitment,
  admissionsAdvisor,
  studentSuccess: programStudentSuccess,
};

/** Keyed by `Program.image` in lib/content.ts (plus the Student Success card). */
export const programImages: Record<string, StaticImageData> = {
  "student-success": programStudentSuccess,
  professional: programProfessional,
  graduate: programGraduate,
  enterprise: programEnterprise,
  free: programFree,
};

export const imageAlts: Record<string, string> = {
  "student-success":
    "A confident graduate standing in a modern office with desert mountains outside the window",
  professional:
    "Adult students in a warm evening seminar classroom with an instructor at the whiteboard",
  graduate: "An adult learner contributing to a small seminar discussion in a library setting",
  enterprise: "A team of professionals in a leadership workshop around a conference table",
  free: "A person learning on a laptop at a sunny kitchen table at home",
};
