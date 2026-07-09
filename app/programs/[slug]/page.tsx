import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Breadcrumb, SectionHeading } from "@/components/ui";
import { imageAlts, programImages } from "@/components/images";
import CourseGrid from "@/components/CourseGrid";
import EnrollSteps from "@/components/EnrollSteps";
import Accordion from "@/components/Accordion";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { programs } from "@/lib/content";
import { pageMetadata, programCoursesJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = programs.find((p) => p.slug === slug);
  if (!program) return {};
  return pageMetadata({
    title: program.name,
    description: program.short,
    path: `/programs/${program.slug}`,
  });
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = programs.find((p) => p.slug === slug);
  if (!program) notFound();

  return (
    <>
      <JsonLd data={programCoursesJsonLd(program)} />
      <section className="bg-sand">
        <div className="mx-auto max-w-6xl px-6 pb-14 pt-8 sm:pb-16">
          <Breadcrumb
            items={[{ label: "Programs", href: "/programs" }, { label: program.name }]}
          />
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <SectionHeading eyebrow="Programs & Offerings" as="h1">
                {program.name}
              </SectionHeading>
              <p className="mt-6 text-[17px] leading-7 text-ink/90">{program.intro}</p>
              <ul className="mt-7 space-y-3">
                {program.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-[16px] leading-6 text-ink">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-clay" aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-[3/2] overflow-hidden rounded-lg border border-clay/30 shadow-md">
              <Image
                src={programImages[program.image]}
                alt={imageAlts[program.image] ?? ""}
                fill
                priority
                sizes="(min-width: 1024px) 520px, 92vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-warm">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
          <Reveal>
            <SectionHeading>Courses &amp; Formats</SectionHeading>
          </Reveal>
          <Reveal className="mt-8" delay={100}>
            <CourseGrid courses={program.courses} />
          </Reveal>
        </div>
      </section>

      <section className="bg-sand">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
          <Reveal>
            <SectionHeading>How Enrollment Works</SectionHeading>
          </Reveal>
          <Reveal className="mt-10" delay={100}>
            <EnrollSteps />
          </Reveal>
        </div>
      </section>

      <section className="bg-warm">
        <div className="mx-auto max-w-3xl px-6 py-14 sm:py-16">
          <SectionHeading>Frequently Asked Questions</SectionHeading>
          <div className="mt-8">
            <Accordion items={program.faqs} />
          </div>
        </div>
      </section>

      <CtaBand
        heading={`Ready to explore ${program.name}?`}
        sub="An advisor will walk you through courses, schedules, credentials, and transparent tuition — no pressure, no surprises."
        cta={{ label: "Get Started", href: "/admissions" }}
        secondary={{ label: "Ask a Question", href: "/contact" }}
      />
    </>
  );
}
