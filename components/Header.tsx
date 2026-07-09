"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Star, X } from "lucide-react";
import { LogoEmblem, LogoHorizontal } from "./Logo";
import { nav } from "@/lib/content";

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrolled;
}

function DesktopDropdown({
  item,
  active,
}: {
  item: { label: string; href: string; children: { label: string; href: string }[] };
  active: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  // A click right after hover-open must not close the menu (hover+click conflict).
  const openedByHover = useRef(false);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <li
      ref={ref}
      className="relative"
      onMouseEnter={() => {
        openedByHover.current = true;
        setOpen(true);
      }}
      onMouseLeave={() => {
        openedByHover.current = false;
        setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => {
          if (open && openedByHover.current) {
            openedByHover.current = false;
            return;
          }
          setOpen((v) => !v);
        }}
        className={`inline-flex min-h-11 cursor-pointer items-center gap-1 border-b-2 px-1 pt-0.5 text-[15px] font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
          active
            ? "border-clay text-canyon"
            : "border-transparent text-ink hover:text-terracotta"
        }`}
      >
        {item.label}
        <ChevronDown
          aria-hidden="true"
          className={`h-4 w-4 text-clay transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 w-64 pt-2">
          <ul className="rounded-lg border border-clay/25 bg-warm p-2 shadow-xl">
            {item.children.map((child) => (
              <li key={child.href}>
                <Link
                  href={child.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2.5 text-[15px] font-semibold text-ink transition-colors duration-150 hover:bg-sand hover:text-canyon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

export default function Header() {
  const pathname = usePathname();
  const scrolled = useScrolled();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close the mobile panel on navigation and lock body scroll while open.
  useEffect(() => setMobileOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      {/* Utility bar — Veteran Owned badge persists on every page (spec §2.2) */}
      <div className="bg-ink text-[13px]">
        <div className="mx-auto flex h-9 max-w-6xl items-center justify-between px-4 sm:px-6">
          <p className="inline-flex items-center gap-2 font-bold uppercase tracking-[0.18em] text-gold">
            <Star className="h-3.5 w-3.5 fill-gold" aria-hidden="true" />
            Veteran Owned
          </p>
          <nav aria-label="Utility">
            <ul className="flex items-center gap-5">
              {nav.utility.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="font-semibold text-sand transition-colors duration-150 hover:text-warm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 bg-warm transition-shadow duration-200 ${
          scrolled ? "border-b border-clay/20 shadow-md" : "border-b border-clay/10"
        }`}
      >
        {/* Desktop */}
        <div className="mx-auto hidden h-[72px] max-w-6xl items-center justify-between gap-8 px-6 lg:flex">
          <Link
            href="/"
            className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <LogoHorizontal className="h-12 w-auto" />
          </Link>
          <nav aria-label="Primary" className="flex items-center gap-7">
            <ul className="flex items-center gap-6">
              {nav.main.map((item) =>
                item.children ? (
                  <DesktopDropdown
                    key={item.label}
                    item={{ label: item.label, href: item.href, children: item.children }}
                    active={isActive(item.href)}
                  />
                ) : (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={`inline-flex min-h-11 items-center border-b-2 px-1 pt-0.5 text-[15px] font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                        isActive(item.href)
                          ? "border-clay text-canyon"
                          : "border-transparent text-ink hover:text-terracotta"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
            <Link
              href={nav.cta.href}
              className="inline-flex min-h-11 cursor-pointer items-center rounded-lg bg-canyon px-5 py-2.5 text-[15px] font-semibold text-warm transition-colors duration-200 hover:bg-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            >
              {nav.cta.label}
            </Link>
          </nav>
        </div>

        {/* Mobile */}
        <div className="grid h-16 grid-cols-3 items-center px-3 lg:hidden">
          <div className="justify-self-start">
            <button
              type="button"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-ink transition-colors duration-150 hover:bg-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              {mobileOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
              <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
            </button>
          </div>
          <Link
            href="/"
            className="justify-self-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <LogoEmblem className="h-11 w-11" />
            <span className="sr-only">Canyon State Institute — home</span>
          </Link>
          <div className="justify-self-end">
            <Link
              href={nav.cta.href}
              className="inline-flex min-h-10 cursor-pointer items-center rounded-lg bg-canyon px-3.5 py-2 text-sm font-semibold text-warm transition-colors duration-200 hover:bg-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              {nav.cta.label}
            </Link>
          </div>
        </div>

        {mobileOpen && (
          <nav
            id="mobile-menu"
            aria-label="Primary"
            className="max-h-[calc(100dvh-6.25rem)] overflow-y-auto border-t border-clay/20 bg-warm px-4 pb-8 pt-2 lg:hidden"
          >
            <ul className="divide-y divide-clay/15">
              {nav.main.map((item) =>
                item.children ? (
                  <li key={item.label} className="py-1">
                    <details className="group">
                      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between py-2 text-[17px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                        {item.label}
                        <ChevronDown
                          className="h-5 w-5 text-clay transition-transform duration-200 group-open:rotate-180"
                          aria-hidden="true"
                        />
                      </summary>
                      <ul className="mb-2 space-y-1 border-l-2 border-sand pl-4">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block min-h-11 py-2.5 text-[16px] font-semibold text-ink/85 hover:text-terracotta"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                ) : (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="flex min-h-12 items-center py-2 text-[17px] font-semibold text-ink hover:text-terracotta"
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href={nav.cta.href}
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-canyon px-6 py-3 text-[16px] font-semibold text-warm hover:bg-terracotta"
              >
                {nav.cta.label}
              </Link>
              <p className="mt-2 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em] text-terracotta">
                <Star className="h-3.5 w-3.5 fill-gold text-gold" aria-hidden="true" />
                Veteran Owned · Career-Focused Education
              </p>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
