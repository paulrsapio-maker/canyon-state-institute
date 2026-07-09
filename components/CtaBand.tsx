import { ButtonLink } from "./ui";

export default function CtaBand({
  heading,
  sub,
  cta,
  secondary,
}: {
  heading: string;
  sub?: string;
  cta: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="bg-canyon">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-6 py-16 text-center sm:py-20">
        <h2 className="font-serif text-[30px] font-bold leading-snug text-warm sm:text-[38px] sm:leading-[46px]">
          {heading}
        </h2>
        {sub && <p className="mt-4 max-w-2xl text-[17px] leading-7 text-sand/95">{sub}</p>}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <ButtonLink href={cta.href} variant="gold">
            {cta.label}
          </ButtonLink>
          {secondary && (
            <ButtonLink href={secondary.href} variant="ghostLight">
              {secondary.label}
            </ButtonLink>
          )}
        </div>
      </div>
    </section>
  );
}
