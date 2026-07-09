import type { Metadata } from "next";
import { Breadcrumb, SectionHeading } from "@/components/ui";
import ProgramCard from "@/components/ProgramCard";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { programs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Professional, Graduate, Enterprise, and Free Course offerings from Canyon State Institute — career-focused education with a clear credential pathway.",
};

export default function ProgramsPage() {
  return (
    <>
      <section className="bg-sand">
        <div className="mx-auto max-w-6xl px-6 pb-14 pt-8 sm:pb-16">
          <Breadcrumb items={[{ label: "Programs" }]} />
          <div className="mt-8">
            <SectionHeading eyebrow="Programs & Offerings" as="h1">
              Programs Built Around Your Goals
            </SectionHeading>
          </div>
          <p className="mt-6 max-w-3xl text-[17px] leading-7 text-ink/90">
            Whether you are starting a new career, advancing in your current one, building your
            team, or simply exploring, there is a Canyon State Institute program designed for
            where you are — and where you want to go.
          </p>
        </div>
      </section>

      <section className="bg-warm">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
          <div className="grid gap-6 md:grid-cols-2">
            {programs.map((p, i) => (
              <Reveal key={p.slug} delay={Math.min(i * 80, 240)}>
                <ProgramCard
                  title={p.name}
                  short={p.short}
                  href={`/programs/${p.slug}`}
                  imageKey={p.image}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        heading="Not sure which program fits?"
        sub="Tell us your goal and an advisor will map the options with you — honestly and without pressure."
        cta={{ label: "Get Started", href: "/admissions" }}
        secondary={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
