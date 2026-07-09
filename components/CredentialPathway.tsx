"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { credentials } from "@/lib/content";

/**
 * Credential-rigor diagram (spec §4.4): numbered tiers cascade in left-to-right
 * on scroll, arrows following each tile. Stacks vertically on mobile. Server
 * HTML renders fully visible; animation applies only post-hydration to
 * below-viewport renders (same pattern as Reveal.tsx).
 *
 * `compact` = names only (home teaser). `onSand` = warm tiles for sand
 * section backgrounds so the boxes don't blend in.
 */
export default function CredentialPathway({
  compact = false,
  onSand = false,
}: {
  compact?: boolean;
  onSand?: boolean;
}) {
  const ref = useRef<HTMLOListElement>(null);
  const tiers = credentials.tiers;

  useEffect(() => {
    const list = ref.current;
    if (!list) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerHeight === 0 || window.innerWidth === 0) return;

    const rect = list.getBoundingClientRect();
    if (rect.top < window.innerHeight - 40 && rect.bottom > 0) return;
    if (rect.bottom <= 0) return; // above viewport (scroll restoration) — stay static

    const steps = [...list.querySelectorAll<HTMLElement>("[data-step]")];
    steps.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateX(-14px)";
      el.style.transition = "opacity 0.45s ease-out, transform 0.45s ease-out";
    });
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          steps.forEach((el, i) => {
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "none";
            }, i * 90);
          });
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(list);
    return () => io.disconnect();
  }, []);

  const tileBg = onSand ? "bg-warm" : "bg-sand";

  return (
    <ol ref={ref} className="flex flex-col items-stretch gap-2 lg:flex-row lg:gap-0">
      {tiers.map((tier, i) => (
        <li key={tier.name} className="flex flex-col items-center lg:flex-1 lg:flex-row">
          <div
            data-step
            className={`group h-full w-full rounded-lg border border-clay/45 ${tileBg} shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-clay hover:shadow-md ${
              compact ? "px-4 py-4" : "px-5 py-6"
            }`}
          >
            <p
              aria-hidden="true"
              className="font-serif text-[12px] font-bold tracking-[0.2em] text-clay"
            >
              {String(i + 1).padStart(2, "0")}
            </p>
            <p className="mt-1.5 font-serif text-[15px] font-bold leading-snug text-canyon">
              {tier.name}
            </p>
            {!compact && (
              <p className="mt-2 text-[13px] leading-snug text-ink/80">{tier.requirement}</p>
            )}
          </div>
          {i < tiers.length - 1 && (
            <span data-step className="shrink-0 py-1 lg:px-1.5 lg:py-0" aria-hidden="true">
              <ArrowRight className="h-5 w-5 rotate-90 text-terracotta lg:rotate-0" />
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
