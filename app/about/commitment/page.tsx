import type { Metadata } from "next";
import Image from "next/image";
import { Award, GraduationCap, Lightbulb, ShieldCheck } from "lucide-react";
import { Breadcrumb, SectionHeading } from "@/components/ui";
import AboutRail from "@/components/AboutRail";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { images } from "@/components/images";
import { about } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Commitment",
  description:
    "Every decision at Canyon State Institute is guided by excellence, integrity, innovation, and student success.",
};

const valueIcons = {
  award: Award,
  shield: ShieldCheck,
  lightbulb: Lightbulb,
  graduation: GraduationCap,
} as const;

export default function CommitmentPage() {
  const commitment = about.commitment;
  return (
    <>
      <section className="bg-sand">
        <div className="mx-auto max-w-6xl px-6 pb-12 pt-8 sm:pb-14">
          <Breadcrumb items={[{ label: "About Us", href: "/about" }, { label: "Our Commitment" }]} />
          <div className="mt-8">
            <SectionHeading eyebrow="About Us" as="h1">
              {commitment.heading}
            </SectionHeading>
          </div>
        </div>
      </section>

      <section className="bg-warm">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-14 sm:py-16 lg:grid-cols-[1fr_280px]">
          <div>
            <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-lg border border-clay/30 shadow-md">
              <Image
                src={images.aboutCommitment}
                alt="A diverse group of adult students collaborating and laughing around a study table"
                fill
                priority
                sizes="(min-width: 1024px) 720px, 92vw"
                className="object-cover"
              />
            </div>
            <div className="space-y-6 text-[17px] leading-[30px] text-ink/90">
              {commitment.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {commitment.values.map((value, i) => {
                const Icon = valueIcons[value.icon as keyof typeof valueIcons] ?? Award;
                return (
                  <Reveal key={value.name} delay={Math.min(i * 80, 240)}>
                    <div className="h-full rounded-lg border border-clay/30 bg-sand p-6">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-canyon">
                        <Icon className="h-6 w-6 text-gold" aria-hidden="true" />
                      </span>
                      <h2 className="mt-4 font-serif text-[20px] font-bold text-ink">
                        {value.name}
                      </h2>
                      <p className="mt-2 text-[15px] leading-6 text-ink/85">{value.body}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
          <AboutRail current="/about/commitment" />
        </div>
      </section>

      <CtaBand
        heading="As our students grow, we grow with them."
        cta={{ label: "Start Your Path", href: "/admissions" }}
        secondary={{ label: "Meet Our Team", href: "/about/executive-team" }}
      />
    </>
  );
}
