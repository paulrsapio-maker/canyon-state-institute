import Link from "next/link";
import { Star, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`text-[13px] font-semibold uppercase tracking-[0.28em] ${
        light ? "text-gold" : "text-terracotta"
      }`}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  children,
  rule = true,
  light = false,
  center = false,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  children: ReactNode;
  rule?: boolean;
  light?: boolean;
  center?: boolean;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div className={center ? "flex flex-col items-center text-center" : ""}>
      {eyebrow && (
        <div className="mb-3">
          <Eyebrow light={light}>{eyebrow}</Eyebrow>
        </div>
      )}
      <Tag
        className={`font-serif text-[30px] leading-[38px] font-bold sm:text-[36px] sm:leading-[44px] ${
          light ? "text-warm" : "text-ink"
        }`}
      >
        {children}
      </Tag>
      {rule && <div aria-hidden="true" className="mt-4 h-1 w-16 rounded-full bg-clay" />}
    </div>
  );
}

const buttonStyles = {
  primary:
    "bg-canyon text-warm hover:bg-terracotta focus-visible:ring-gold",
  gold: "bg-gold text-ink hover:bg-[#f0b45c] focus-visible:ring-warm",
  ghostLight:
    "border-2 border-warm/80 text-warm hover:bg-warm/15 focus-visible:ring-gold",
  ghostDark:
    "border-2 border-canyon text-canyon hover:bg-canyon/5 focus-visible:ring-gold",
} as const;

export function ButtonLink({
  href,
  variant = "primary",
  children,
  className = "",
}: {
  href: string;
  variant?: keyof typeof buttonStyles;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg px-6 py-3 text-[15px] font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${buttonStyles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

export function VeteranBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full bg-ink px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.18em] text-gold ${className}`}
    >
      <Star className="h-3.5 w-3.5 fill-gold" aria-hidden="true" />
      Veteran Owned
    </span>
  );
}

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/" className="text-terracotta underline-offset-2 hover:underline">
            Home
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 text-clay" aria-hidden="true" />
            {item.href ? (
              <Link href={item.href} className="text-terracotta underline-offset-2 hover:underline">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink/80">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

