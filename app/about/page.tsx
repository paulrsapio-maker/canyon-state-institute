import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumb, SectionHeading } from "@/components/ui";
import AboutRail from "@/components/AboutRail";
import CtaBand from "@/components/CtaBand";
import { images } from "@/components/images";
import { about } from "@/lib/content";

export const metadata: Metadata = {
  title: "Who We Are",
  description:
    "Canyon State Institute is a veteran-owned educational institution dedicated to career readiness, professional growth, and lifelong learning.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-sand">
        <div className="mx-auto max-w-6xl px-6 pb-12 pt-8 sm:pb-14">
          <Breadcrumb items={[{ label: "About Us" }]} />
          <div className="mt-8">
            <SectionHeading eyebrow="About Us" as="h1">
              {about.whoWeAre.heading}
            </SectionHeading>
          </div>
        </div>
      </section>

      <section className="bg-warm">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-14 sm:py-16 lg:grid-cols-[1fr_280px]">
          <div>
            <div className="relative mb-10 aspect-[4/3] overflow-hidden rounded-lg border border-clay/30 shadow-md sm:aspect-[16/9]">
              <Image
                src={images.aboutWho}
                alt="An instructor guiding an adult student wearing a military-style cap through a hands-on training exercise"
                fill
                priority
                sizes="(min-width: 1024px) 720px, 92vw"
                className="object-cover"
              />
            </div>
            <div className="space-y-6 text-[17px] leading-[30px] text-ink/90">
              <p>{about.whoWeAre.paragraphs[0]}</p>
              <blockquote className="border-l-4 border-clay bg-sand/70 px-6 py-5 font-serif text-[20px] font-semibold leading-8 text-canyon">
                “{about.whoWeAre.pullQuote}”
              </blockquote>
              <p>{about.whoWeAre.paragraphs[1]}</p>
            </div>
          </div>
          <AboutRail current="/about" />
        </div>
      </section>

      <CtaBand
        heading="See where a CSI credential can take you."
        cta={{ label: "Explore Programs", href: "/programs" }}
        secondary={{ label: "Our Credentials", href: "/about/credentials" }}
      />
    </>
  );
}
