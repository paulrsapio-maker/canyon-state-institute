import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { imageAlts, programImages } from "./images";

export default function ProgramCard({
  title,
  short,
  href,
  imageKey,
}: {
  title: string;
  short: string;
  href: string;
  imageKey: string;
}) {
  return (
    <Link
      href={href}
      className="group block cursor-pointer overflow-hidden rounded-lg border border-clay/40 bg-warm shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
    >
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image
          src={programImages[imageKey]}
          alt={imageAlts[imageKey] ?? ""}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 768px) 45vw, 92vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <div className="p-6">
        <h3 className="font-serif text-[22px] font-bold leading-snug text-canyon">{title}</h3>
        <p className="mt-2 text-[15px] leading-6 text-ink/85">{short}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold text-terracotta transition-colors duration-150 group-hover:text-canyon">
          Learn more
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}
