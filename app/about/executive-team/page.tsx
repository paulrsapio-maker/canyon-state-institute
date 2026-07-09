import { UserRound } from "lucide-react";
import { Breadcrumb, SectionHeading } from "@/components/ui";
import AboutRail from "@/components/AboutRail";
import CtaBand from "@/components/CtaBand";
import { about } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Executive Team",
  description:
    "Canyon State Institute leadership brings decades of expertise spanning military service, workforce development, education, and organizational management.",
  path: "/about/executive-team",
});

export default function ExecutiveTeamPage() {
  const team = about.executiveTeam;
  return (
    <>
      <section className="bg-sand">
        <div className="mx-auto max-w-6xl px-6 pb-12 pt-8 sm:pb-14">
          <Breadcrumb items={[{ label: "About Us", href: "/about" }, { label: "Our Executive Team" }]} />
          <div className="mt-8">
            <SectionHeading eyebrow="About Us" as="h1">
              {team.heading}
            </SectionHeading>
          </div>
        </div>
      </section>

      <section className="bg-warm">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-14 sm:py-16 lg:grid-cols-[1fr_280px]">
          <div>
            <div className="space-y-6 text-[17px] leading-[30px] text-ink/90">
              {team.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {team.members.map((member, i) => (
                <article
                  key={`${member.title}-${i}`}
                  className="rounded-lg border border-clay/40 bg-warm p-6 shadow-sm"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-clay/40 bg-sand">
                    <UserRound className="h-8 w-8 text-clay" aria-hidden="true" />
                  </div>
                  <h2 className="mt-4 font-serif text-[20px] font-bold text-ink">{member.name}</h2>
                  <p className="mt-1 text-[13px] font-bold uppercase tracking-[0.16em] text-terracotta">
                    {member.title}
                  </p>
                  <p className="mt-3 text-[15px] italic leading-6 text-ink/70">{member.bio}</p>
                </article>
              ))}
            </div>

            <p className="mt-8 rounded-lg border-l-4 border-gold bg-sand/70 px-6 py-4 text-[15px] italic leading-6 text-ink/85">
              The complete leadership roster — names, titles, headshots, and biographies — will be
              published here upon internal approval.
            </p>
          </div>
          <AboutRail current="/about/executive-team" />
        </div>
      </section>

      <CtaBand
        heading="Leadership that has walked the path."
        sub="Decades of military and civilian experience, focused on one mission: your success."
        cta={{ label: "Get Started", href: "/admissions" }}
      />
    </>
  );
}
