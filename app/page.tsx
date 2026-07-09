import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { ButtonLink, Eyebrow, SectionHeading } from "@/components/ui";
import StatBand from "@/components/StatBand";
import { LogoEmblem } from "@/components/Logo";
import ProgramCard from "@/components/ProgramCard";
import CredentialPathway from "@/components/CredentialPathway";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { images } from "@/components/images";
import { about, home, mission, programs } from "@/lib/content";

const programCards = [
  {
    title: "Student Success",
    short: "Outcomes, testimonials, and the support systems behind them.",
    href: "/student-success",
    imageKey: "student-success",
  },
  ...programs.map((p) => ({
    title: p.name,
    short: p.short,
    href: `/programs/${p.slug}`,
    imageKey: p.image,
  })),
];

export default function HomePage() {
  return (
    <>
      {/* §3.1 Hero */}
      <section className="relative flex min-h-[560px] items-end overflow-hidden sm:h-[min(88vh,720px)]">
        <Image
          src={images.heroCanyon}
          alt="Layered red-rock canyon mesas at sunrise beneath a warm golden sky"
          fill
          priority
          sizes="100vw"
          className="hero-kenburns object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(59,35,20,0.92),rgba(59,35,20,0.5)_55%,rgba(59,35,20,0.28))]"
        />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-28 sm:pb-20">
          <Eyebrow light>{home.hero.eyebrow}</Eyebrow>
          <h1 className="mt-4 max-w-3xl font-serif text-[40px] font-bold leading-[48px] text-warm sm:text-[52px] sm:leading-[60px]">
            {home.hero.heading}
          </h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-[28px] text-sand sm:text-[18px]">
            {home.hero.sub}
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <ButtonLink href={home.hero.primary.href} variant="gold">
              {home.hero.primary.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href={home.hero.secondary.href} variant="ghostLight">
              {home.hero.secondary.label}
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* §3.2 Mission */}
      <section className="relative overflow-hidden bg-sand">
        <LogoEmblem
          className="pointer-events-none absolute -bottom-24 -right-16 h-[380px] w-[380px] opacity-[0.06]"
        />
        <div className="relative mx-auto max-w-[800px] px-6 py-16 text-center sm:py-20">
          <Reveal>
            <Eyebrow>Our Mission</Eyebrow>
            <p className="mt-6 font-serif text-[20px] font-semibold leading-[32px] text-ink">
              {mission}
            </p>
          </Reveal>
        </div>
      </section>

      {/* §3.3 Program cards */}
      <section className="bg-warm">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <Reveal>
            <SectionHeading eyebrow="Programs & Offerings" center>
              Find the Path That Fits Your Goal
            </SectionHeading>
          </Reveal>
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            {programCards.map((card, i) => (
              <Reveal
                key={card.href}
                delay={Math.min(i * 80, 240)}
                className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <ProgramCard {...card} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* §3.4 Fast facts */}
      <StatBand heading="Fast Facts" stats={home.fastFacts} footnote={home.fastFactsFootnote} />

      {/* §3.5 Credentials teaser */}
      <section className="bg-sand">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <Reveal>
            <SectionHeading eyebrow="A Clear Path Upward">
              {home.credentialsTeaser.heading}
            </SectionHeading>
            <p className="mt-6 max-w-3xl text-[17px] leading-7 text-ink/90">
              {home.credentialsTeaser.body}
            </p>
          </Reveal>
          <div className="mt-10">
            <CredentialPathway compact onSand />
          </div>
          <Reveal className="mt-9" delay={160}>
            <ButtonLink href={home.credentialsTeaser.link.href} variant="ghostDark">
              {home.credentialsTeaser.link.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      {/* §3.6 Who we are / Commitment split */}
      <section className="bg-warm">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:py-20 lg:grid-cols-2">
          {[
            {
              heading: about.whoWeAre.heading,
              body: about.whoWeAre.paragraphs[0],
              href: "/about",
              image: images.aboutWho,
              alt: "An instructor guiding an adult student through a hands-on training exercise",
              link: "Meet Canyon State Institute",
            },
            {
              heading: about.commitment.heading,
              body: about.commitment.paragraphs[0],
              href: "/about/commitment",
              image: images.aboutCommitment,
              alt: "Adult students collaborating around a table in warm afternoon light",
              link: "Read our commitment",
            },
          ].map((block, i) => (
            <Reveal key={block.href} delay={i * 120}>
              <article className="flex h-full flex-col">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-clay/30">
                  <Image
                    src={block.image}
                    alt={block.alt}
                    fill
                    sizes="(min-width: 1024px) 540px, 92vw"
                    className="object-cover"
                  />
                </div>
                <h2 className="mt-6 font-serif text-[26px] font-bold leading-snug text-ink">
                  {block.heading}
                </h2>
                <p className="mt-3 flex-1 text-[16px] leading-7 text-ink/85">{block.body}</p>
                <Link
                  href={block.href}
                  className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold text-terracotta transition-colors duration-150 hover:text-canyon"
                >
                  {block.link}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Veteran-owned statement band */}
      <section className="relative flex min-h-[440px] items-center overflow-hidden sm:min-h-[520px]">
        <Image
          src={images.veteranBand}
          alt="Silhouette of a soldier carrying the American flag along a canyon ridge toward the sunrise"
          fill
          sizes="100vw"
          className="object-cover object-[72%_center]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,35,20,0.88),rgba(59,35,20,0.45)_45%,rgba(59,35,20,0.08)_75%)]"
        />
        <div className="relative mx-auto w-full max-w-6xl px-6 py-16">
          <Reveal className="max-w-xl">
            <p className="inline-flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[0.28em] text-gold">
              <Star className="h-4 w-4 fill-gold" aria-hidden="true" />
              {home.veteranBand.eyebrow}
            </p>
            <h2 className="mt-4 font-serif text-[32px] font-bold leading-[40px] text-warm sm:text-[40px] sm:leading-[48px]">
              {home.veteranBand.heading}
            </h2>
            <p className="mt-4 text-[17px] leading-[28px] text-sand">{home.veteranBand.body}</p>
            <div className="mt-7">
              <ButtonLink href={home.veteranBand.cta.href} variant="ghostLight">
                {home.veteranBand.cta.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* §3.7 Closing CTA */}
      <CtaBand
        heading={home.closing.heading}
        sub={home.closing.sub}
        cta={home.closing.cta}
        secondary={{ label: "Talk to Admissions", href: "/contact" }}
      />
    </>
  );
}
