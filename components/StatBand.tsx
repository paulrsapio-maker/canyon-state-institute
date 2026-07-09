"use client";

import { useEffect, useRef } from "react";

/**
 * Fast-facts band with staggered rise-in and a count-up for numeric values.
 * Bracketed placeholders ("[YYYY]") simply fade in; once real numbers land in
 * lib/content.ts they count up automatically. Server HTML renders fully
 * visible (same progressive-enhancement pattern as Reveal.tsx).
 */

function animateCount(el: HTMLElement, raw: string) {
  const match = raw.match(/^([^0-9]*)([0-9][0-9,.]*)([^0-9]*)$/);
  if (!match) return; // non-numeric (placeholder) — leave as-is
  const [, prefix, num, suffix] = match;
  const target = parseFloat(num.replace(/,/g, ""));
  if (!Number.isFinite(target) || target <= 0) return;
  const useGrouping = num.includes(",");
  const decimals = num.includes(".") ? (num.split(".")[1] ?? "").length : 0;
  const duration = 1400;
  const start = performance.now();
  const format = (v: number) =>
    prefix +
    v.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      useGrouping,
    }) +
    suffix;
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = format(target * eased);
    if (t < 1) requestAnimationFrame(tick);
    else el.textContent = raw;
  };
  requestAnimationFrame(tick);
}

const COLUMN_CLASS: Record<5 | 6, string> = {
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
};

export default function StatBand({
  heading,
  stats,
  footnote,
  columns = 5,
}: {
  heading?: string;
  stats: { value: string; label: string }[];
  footnote?: string;
  columns?: 5 | 6;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const band = ref.current;
    if (!band) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerHeight === 0 || window.innerWidth === 0) return;

    const items = [...band.querySelectorAll<HTMLElement>("[data-stat]")];
    const run = () => {
      items.forEach((item, i) => {
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "none";
          const dd = item.querySelector<HTMLElement>("[data-count]");
          if (dd) animateCount(dd, dd.dataset.count ?? "");
        }, i * 110);
      });
    };

    const rect = band.getBoundingClientRect();
    const inView = rect.top < window.innerHeight - 40 && rect.bottom > 0;
    const alreadyPassed = rect.bottom <= 0; // above viewport (scroll restoration)
    if (inView || alreadyPassed) return; // on screen or scrolled past — leave static

    items.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(20px)";
      item.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    });
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(band);
    return () => io.disconnect();
  }, []);

  return (
    <section aria-label={heading ?? "Fast facts"} className="bg-ink">
      <div ref={ref} className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
        {heading && (
          <p className="mb-10 text-center text-sm font-bold uppercase tracking-[0.3em] text-gold">
            {heading}
          </p>
        )}
        <dl
          className={`grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 ${COLUMN_CLASS[columns]}`}
        >
          {stats.map((s) => (
            <div key={s.label} data-stat className="flex flex-col items-center text-center">
              <dt className="order-2 mt-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-sand">
                {s.label}
              </dt>
              <dd
                data-count={s.value}
                className="order-1 font-serif text-[40px] font-bold leading-none text-gold sm:text-[52px]"
              >
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
        {footnote && <p className="mt-10 text-center text-sm italic text-sand/70">{footnote}</p>}
      </div>
    </section>
  );
}
