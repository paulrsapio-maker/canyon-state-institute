import type { Metadata } from "next";
import Image from "next/image";
import { Briefcase, Clock, Compass, Star } from "lucide-react";
import { Breadcrumb, SectionHeading } from "@/components/ui";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { images } from "@/components/images";
import { studentSuccess } from "@/lib/content";

export const metadata: Metadata = {
  title: "Student Success",
  description:
    "Advising, career services, veteran support, and flexible formats — the systems behind every Canyon State Institute outcome.",
};

const supportIcons = {
  compass: Compass,
  briefcase: Briefcase,
  star: Star,
  clock: Clock,
} as const;

export default function StudentSuccessPage() {
  return (
    <>
      <section className="bg-sand">
        <div className="mx-auto max-w-6xl px-6 pb-14 pt-8 sm:pb-16">
          <Breadcrumb items={[{ label: "Student Success" }]} />
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <SectionHeading eyebrow="Outcomes & Support" as="h1">
                {studentSuccess.heading}
              </SectionHeading>
              <p className="mt-6 text-[17px] leading-7 text-ink/90">{studentSuccess.intro}</p>
            </div>
            <div className="relative aspect-[3/2] overflow-hidden rounded-lg border border-clay/30 shadow-md">
              <Image
                src={images.studentSuccess}
                alt="A confident graduate standing in a modern office with desert mountains outside the window"
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
            <SectionHeading>The Support Behind Every Outcome</SectionHeading>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {studentSuccess.supports.map((support, i) => {
              const Icon = supportIcons[support.icon as keyof typeof supportIcons] ?? Compass;
              return (
                <Reveal key={support.title} delay={Math.min(i * 80, 240)}>
                  <div className="flex h-full gap-5 rounded-lg border border-clay/40 bg-warm p-6 shadow-sm">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-canyon">
                      <Icon className="h-6 w-6 text-gold" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-serif text-[20px] font-bold text-ink">{support.title}</h3>
                      <p className="mt-2 text-[15px] leading-6 text-ink/85">{support.body}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-sand">
        <div className="mx-auto max-w-3xl px-6 py-14 text-center sm:py-16">
          <SectionHeading center>Student Stories</SectionHeading>
          <p className="mt-6 text-[16px] italic leading-7 text-ink/80">
            {studentSuccess.storiesNote}
          </p>
        </div>
      </section>

      <CtaBand
        heading="Your goal deserves a support system."
        sub="Talk with an advisor about where you want to go — and exactly how we'll help you get there."
        cta={{ label: "Get Started", href: "/admissions" }}
        secondary={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
