import { ButtonLink } from "@/components/ui";
import { LogoEmblem } from "@/components/Logo";

export default function NotFound() {
  return (
    <section className="bg-sand">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center sm:py-32">
        <LogoEmblem className="h-24 w-24 opacity-90" />
        <h1 className="mt-8 font-serif text-[36px] font-bold leading-tight text-ink">
          This trail doesn&apos;t go anywhere.
        </h1>
        <p className="mt-4 max-w-md text-[17px] leading-7 text-ink/85">
          The page you&apos;re looking for has moved or never existed. Let&apos;s get you back on
          the path.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/" variant="primary">
            Back to Home
          </ButtonLink>
          <ButtonLink href="/programs" variant="ghostDark">
            Explore Programs
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
