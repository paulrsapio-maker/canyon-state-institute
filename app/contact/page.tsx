import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { Breadcrumb, SectionHeading } from "@/components/ui";
import ContactForm from "@/components/ContactForm";
import { LogoEmblem } from "@/components/Logo";
import { contact, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Questions about programs, credentials, or partnerships? Reach the Canyon State Institute team — we respond within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-sand">
        <div className="mx-auto max-w-6xl px-6 pb-12 pt-8 sm:pb-14">
          <Breadcrumb items={[{ label: "Contact" }]} />
          <div className="mt-8">
            <SectionHeading eyebrow="We're Here to Help" as="h1">
              {contact.heading}
            </SectionHeading>
          </div>
          <p className="mt-6 max-w-3xl text-[17px] leading-7 text-ink/90">{contact.intro}</p>
        </div>
      </section>

      <section className="bg-warm">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-14 sm:py-16 lg:grid-cols-[1.3fr_1fr]">
          <div className="rounded-lg border border-clay/30 bg-warm p-6 shadow-sm sm:p-8">
            <ContactForm />
          </div>
          <aside>
            <div className="relative overflow-hidden rounded-lg border border-clay/30 bg-sand p-6 sm:p-8">
              <LogoEmblem className="pointer-events-none absolute -bottom-10 -right-10 h-44 w-44 opacity-[0.08]" />
              <h2 className="font-serif text-[22px] font-bold text-ink">Canyon State Institute</h2>
              <ul className="mt-5 space-y-4 text-[15px] leading-6 text-ink/90">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-clay" aria-hidden="true" />
                  {site.address}
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-clay" aria-hidden="true" />
                  {site.phone}
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-clay" aria-hidden="true" />
                  {site.email}
                </li>
              </ul>
              <hr className="my-6 border-clay/30" />
              <p className="text-[14px] leading-6 text-ink/75">
                Enterprise partnership inquiries: choose{" "}
                <span className="font-semibold">“Enterprise partnerships”</span> in the form and
                our programs team will follow up directly.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
