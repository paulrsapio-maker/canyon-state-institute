"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scroll-reveal that is invisible-proof: server HTML renders fully visible, and
 * only after hydration do below-viewport elements get hidden and animated in.
 * No-JS visitors, crawlers, snapshots, and slow connections always see content;
 * prefers-reduced-motion skips the effect entirely.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Degenerate viewports (hidden tabs, headless embeds) can't intersect — stay visible.
    if (window.innerHeight === 0 || window.innerWidth === 0) return;

    // Already on screen (or scrolled past, e.g. scroll restoration) at
    // hydration time — leave it visible, no animation.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 40 && rect.bottom > 0) return;
    if (rect.bottom <= 0) return;

    el.classList.add("reveal-pending");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("reveal-in");
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
