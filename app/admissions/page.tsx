import type { Metadata } from "next";
import Image from "next/image";
import { Star } from "lucide-react";
import { Breadcrumb, SectionHeading } from "@/components/ui";
import EnrollSteps from "@/components/EnrollSteps";
import Accordion from "@/components/Accordion";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { images } from "@/components/images";
import { admissions, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Get Started",
  description:
    "Enrolling at Canyon State Institute is simple and personal — tell us your goal and an advisor will map the path with you.",
};

export default function AdmissionsPage() {
  return (
    <>
      <section className="bg-sand">
        <div className="mx-auto max-w-6xl px-6 pb-14 pt-8 sm:pb-16">
          <Breadcrumb items={[{ label: "Admissions" }]} />
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <SectionHeading eyebrow="Admissions" as="h1">
                {admissions.heading}
              </SectionHeading>
              <p className="mt-6 text-[17px] leading-7 text-ink/90">{admissions.intro}</p>
            </div>
            <div className="relative aspect-[3/2] overflow-hidden rounded-lg border border-clay/30 shadow-md">
              <Image
                src={images.admissionsAdvisor}
                alt="An admissions advisor meeting warmly with a prospective student across a desk"
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
            <SectionHeading>Three Steps, Start to Finish</SectionHeading>
          </Reveal>
          <Reveal className="mt-10" delay={100}>
            <EnrollSteps />
          </Reveal>
        </div>
      </section>

      <section id="request" className="scroll-mt-24 bg-sand">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-14 sm:py-16 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <SectionHeading>Request Information</SectionHeading>
            <p className="mt-4 max-w-2xl text-[16px] leading-7 text-ink/85">
              Step one starts here. Share your goal and an advisor will reach out — usually within
              one business day.
            </p>
            <div className="mt-8 rounded-lg border border-clay/30 bg-warm p-6 sm:p-8">
              <ContactForm
                defaultReason="Admissions & enrollment"
                submitLabel="Request Information"
              />
            </div>
          </div>
          <aside className="lg:pt-24">
            <div className="rounded-lg border border-clay/30 bg-warm p-6">
              <p className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em] text-terracotta">
                <Star className="h-3.5 w-3.5 fill-gold text-gold" aria-hidden="true" />
                Veteran Owned &amp; Operated
              </p>
              <p className="mt-3 text-[15px] leading-6 text-ink/85">
                Veterans, service members, and military families: we understand the transition
                firsthand. Mention your service when you reach out and we'll walk you through the
                support available to you.
              </p>
              <hr className="my-5 border-clay/25" />
              <p className="text-[15px] font-semibold text-ink">Prefer to talk?</p>
              <p className="mt-1 text-[15px] leading-6 text-ink/85">
                {site.phone} · {site.email}
              </p>
            </div>
            <div
              id="login"
              className="mt-6 scroll-mt-24 rounded-lg border-l-4 border-gold bg-warm p-6"
            >
              <p className="text-[15px] font-semibold text-ink">Student Login</p>
              <p className="mt-1 text-[15px] italic leading-6 text-ink/75">
                {admissions.studentLoginNote}
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section id="faqs" className="scroll-mt-24 bg-warm">
        <div className="mx-auto max-w-3xl px-6 py-14 sm:py-16">
          <SectionHeading>Admissions FAQs</SectionHeading>
          <div className="mt-8">
            <Accordion items={admissions.faqs} />
          </div>
        </div>
      </section>
    </>
  );
}
