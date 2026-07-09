import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Briefcase, Compass, FileDown, Heart } from "lucide-react";
import { ButtonLink, Eyebrow, SectionHeading } from "@/components/ui";
import StatBand from "@/components/StatBand";
import EnrollSteps from "@/components/EnrollSteps";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { images } from "@/components/images";
import { highSchool } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "High School",
  description:
    "The Canyon State Institute High School Program — a flexible, supportive online path to a high school diploma, built on career-focused, student-centered education.",
  path: "/high-school",
});

const SUPPORT_ICONS = {
  compass: Compass,
  briefcase: Briefcase,
  heart: Heart,
} as const;

export default function HighSchoolPage() {
  const hs = highSchool;
  return (
    <>
      {/* §1 Hero */}
      <section className="relative flex min-h-[520px] items-center bg-ink">
        <Image
          src={images.highSchoolHero}
          alt="A high school student writing notes at a bright home desk beside a laptop"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/25"
        />
        <div className="relative mx-auto w-full max-w-6xl px-6 py-20">
          <Eyebrow light>{hs.hero.eyebrow}</Eyebrow>
          <h1 className="mt-4 max-w-2xl font-serif text-[38px] font-bold leading-[1.15] text-warm sm:text-[48px] sm:leading-[56px]">
            {hs.hero.heading}
          </h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-7 text-sand sm:text-lg sm:leading-8">
            {hs.hero.sub}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink href={hs.hero.primary.href} variant="gold">
              {hs.hero.primary.label}
            </ButtonLink>
            <ButtonLink href={hs.hero.secondary.href} variant="ghostLight">
              {hs.hero.secondary.label}
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* §2 Program overview + at-a-glance */}
      <section className="bg-sand">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:py-20 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <Reveal>
            <SectionHeading>{hs.overview.heading}</SectionHeading>
            <div className="mt-6 space-y-5 text-[17px] leading-7 text-ink/90">
              {hs.overview.paragraphs.map((para, index) => (
                <p key={index} className={index === 1 ? "font-semibold text-ink" : undefined}>
                  {para}
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-lg border border-clay/45 bg-warm p-6 shadow-sm">
              <h3 className="font-serif text-[20px] font-bold text-canyon">At a Glance</h3>
              <dl className="mt-4 divide-y divide-clay/20">
                {hs.overview.atAGlance.map((row) => (
                  <div key={row.label} className="flex gap-4 py-3">
                    <dt className="w-28 shrink-0 text-[13px] font-semibold uppercase tracking-[0.14em] text-terracotta">
                      {row.label}
                    </dt>
                    <dd className="text-[15px] leading-6 text-ink/90">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* §3 Fast facts */}
      <StatBand
        heading="High School Fast Facts"
        stats={hs.fastFacts}
        footnote={hs.fastFactsFootnote}
        columns={6}
      />

      {/* §4 Curriculum & graduation requirements */}
      <section className="bg-warm">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <Reveal>
            <SectionHeading>{hs.curriculum.heading}</SectionHeading>
            <p className="mt-5 max-w-3xl text-[17px] leading-7 text-ink/90">
              {hs.curriculum.intro}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[480px] border-collapse text-left">
                <caption className="sr-only">
                  Graduation credit requirements by subject area
                </caption>
                <thead>
                  <tr className="border-b-2 border-canyon">
                    <th
                      scope="col"
                      className="py-3 pr-6 text-[13px] font-bold uppercase tracking-[0.16em] text-canyon"
                    >
                      Subject area
                    </th>
                    <th
                      scope="col"
                      className="py-3 text-[13px] font-bold uppercase tracking-[0.16em] text-canyon"
                    >
                      Credits required
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {hs.curriculum.subjects.map((subject) => (
                    <tr key={subject.area} className="border-b border-clay/25">
                      <th
                        scope="row"
                        className="py-3.5 pr-6 font-serif text-[17px] font-bold text-ink"
                      >
                        {subject.area}
                      </th>
                      <td className="py-3.5 text-[15px] text-ink/85">{subject.credits}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 max-w-3xl text-[15px] leading-6 text-ink/80">
              {hs.curriculum.model}
            </p>
            <a
              href={hs.curriculum.pdf.href}
              className="mt-6 inline-flex items-center gap-2 font-semibold text-terracotta transition-colors duration-200 hover:text-canyon"
            >
              <FileDown className="h-4 w-4" aria-hidden="true" />
              {hs.curriculum.pdf.label}
            </a>
          </Reveal>
        </div>
      </section>

      {/* §5 Student support */}
      <section className="bg-sand">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <Reveal>
            <SectionHeading>{hs.support.heading}</SectionHeading>
            <p className="mt-5 max-w-3xl text-[17px] leading-7 text-ink/90">{hs.support.intro}</p>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {hs.support.tiles.map((tile, index) => {
              const Icon = SUPPORT_ICONS[tile.icon as keyof typeof SUPPORT_ICONS];
              return (
                <Reveal key={tile.title} delay={index * 100}>
                  <div className="flex h-full flex-col rounded-lg border border-clay/45 bg-warm p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sand">
                      <Icon className="h-5 w-5 text-canyon" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 font-serif text-[20px] font-bold text-ink">{tile.title}</h3>
                    <p className="mt-2 text-[15px] leading-6 text-ink/85">{tile.body}</p>
                    {"link" in tile && tile.link && (
                      <Link
                        href={tile.link.href}
                        className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold text-terracotta transition-colors duration-200 hover:text-canyon"
                      >
                        {tile.link.label}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* §6 Admissions steps */}
      <section id="how-it-works" className="scroll-mt-24 bg-warm">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <Reveal>
            <SectionHeading>{hs.admissionsSteps.heading}</SectionHeading>
          </Reveal>
          <div className="mt-10">
            <EnrollSteps steps={hs.admissionsSteps.steps} />
          </div>
        </div>
      </section>

      {/* §7 Accreditation & policy */}
      <section className="bg-warm pb-16 sm:pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="rounded-lg border border-clay/35 bg-sand px-6 py-8 sm:px-8">
              <h2 className="font-serif text-[22px] font-bold text-canyon">{hs.policy.heading}</h2>
              <div className="mt-4 space-y-4 text-[14px] leading-6 text-ink/85">
                {hs.policy.paragraphs.map((para, index) => (
                  <p key={index}>{para}</p>
                ))}
                {hs.policy.disclosures.map((line, index) => (
                  <p key={`disclosure-${index}`} className="italic text-ink/70">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* §8 Closing CTA */}
      <CtaBand
        heading={hs.closing.heading}
        sub={hs.closing.sub}
        cta={hs.closing.cta}
        secondary={hs.closing.secondary}
      />
    </>
  );
}
