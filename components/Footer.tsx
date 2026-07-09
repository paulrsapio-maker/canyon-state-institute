import Link from "next/link";
import { Mail, MapPin, Phone, Star } from "lucide-react";
import { LogoHorizontal } from "./Logo";
import { footer, site } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="bg-ink text-sand">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <Link
              href="/"
              className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <LogoHorizontal reversed withTagline className="h-16 w-auto" />
            </Link>
            <p className="mt-5 max-w-sm text-[15px] leading-6 text-sand/80">
              Career-focused education built on excellence, integrity, innovation, and student
              success.
            </p>
          </div>

          {footer.columns.slice(0, 2).map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className="text-[13px] font-bold uppercase tracking-[0.22em] text-gold">
                {col.heading}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-[15px] text-sand transition-colors duration-150 hover:text-warm hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="space-y-8">
            <nav aria-label={footer.columns[2].heading}>
              <h2 className="text-[13px] font-bold uppercase tracking-[0.22em] text-gold">
                {footer.columns[2].heading}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {footer.columns[2].links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-[15px] text-sand transition-colors duration-150 hover:text-warm hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <h2 className="text-[13px] font-bold uppercase tracking-[0.22em] text-gold">
                Connect
              </h2>
              <ul className="mt-4 space-y-2.5 text-[15px] text-sand/90">
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-clay" aria-hidden="true" />
                  {site.address}
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 shrink-0 text-clay" aria-hidden="true" />
                  {site.phone}
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 shrink-0 text-clay" aria-hidden="true" />
                  {site.email}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-warm/10 pt-7">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <p className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] text-sand/85">
              <span className="inline-flex items-center gap-1.5 font-bold text-gold">
                <Star className="h-3.5 w-3.5 fill-gold" aria-hidden="true" />
                Veteran Owned &amp; Operated
              </span>
              <span aria-hidden="true">·</span>© {new Date().getFullYear()} {site.name}
            </p>
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {footer.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-sand/85 transition-colors duration-150 hover:text-warm hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
