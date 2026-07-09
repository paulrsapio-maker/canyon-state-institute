import { Breadcrumb, SectionHeading } from "@/components/ui";
import AboutRail from "@/components/AboutRail";
import CredentialPathway from "@/components/CredentialPathway";
import CtaBand from "@/components/CtaBand";
import { credentials } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "CSI Credentials",
  description:
    "The Canyon State Institute credential framework — from Statements of Participation to Professional Certificates, increasing in rigor and time commitment.",
  path: "/about/credentials",
});

export default function CredentialsPage() {
  return (
    <>
      <section className="bg-sand">
        <div className="mx-auto max-w-6xl px-6 pb-12 pt-8 sm:pb-14">
          <Breadcrumb items={[{ label: "About Us", href: "/about" }, { label: "CSI Credentials" }]} />
          <div className="mt-8">
            <SectionHeading eyebrow="About Us" as="h1">
              {credentials.heading}
            </SectionHeading>
          </div>
          <p className="mt-6 max-w-3xl text-[17px] leading-7 text-ink/90">{credentials.intro}</p>
        </div>
      </section>

      <section className="bg-warm">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
          <h2 className="sr-only">Credential pathway by rigor</h2>
          <CredentialPathway />

          <div className="mx-auto mt-16 grid max-w-6xl gap-12 lg:grid-cols-[1fr_280px]">
            <div>
              <div className="divide-y divide-clay/25 border-y border-clay/25">
                {credentials.tiers.map((tier) => (
                  <article
                    key={tier.name}
                    className="grid gap-4 py-8 md:grid-cols-[280px_1fr] md:items-start md:gap-10"
                  >
                    <div>
                      <h3 className="font-serif text-[21px] font-bold leading-snug text-canyon">
                        {tier.name}
                      </h3>
                      <p className="mt-3 inline-flex items-center rounded-full border border-clay/35 bg-sand/70 px-3.5 py-1.5 text-[13px] font-semibold leading-snug text-ink/85">
                        {tier.requirement}
                      </p>
                    </div>
                    <p className="max-w-prose text-[16px] leading-7 text-ink/90">{tier.detail}</p>
                  </article>
                ))}
              </div>

              <p className="mt-8 rounded-lg border-l-4 border-gold bg-sand/70 px-6 py-4 text-[15px] italic leading-6 text-ink/85">
                {credentials.disclaimer}
              </p>
            </div>
            <AboutRail current="/about/credentials" />
          </div>
        </div>
      </section>

      <CtaBand
        heading="Every course moves you up the pathway."
        sub="Start anywhere — free courses to professional certificates — and build a record employers recognize."
        cta={{ label: "Explore Programs", href: "/programs" }}
      />
    </>
  );
}
