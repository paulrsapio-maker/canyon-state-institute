import Link from "next/link";

const items = [
  { label: "Who We Are", href: "/about" },
  { label: "Our Executive Team", href: "/about/executive-team" },
  { label: "Our Commitment", href: "/about/commitment" },
  { label: "CSI Credentials", href: "/about/credentials" },
];

export default function AboutRail({ current }: { current: string }) {
  return (
    <aside className="lg:sticky lg:top-28 lg:self-start">
      <nav aria-label="About section" className="rounded-lg border border-clay/30 bg-warm p-3">
        <p className="px-3 pb-2 pt-1 text-[12px] font-bold uppercase tracking-[0.22em] text-terracotta">
          About Us
        </p>
        <ul className="space-y-1">
          {items.map((item) => {
            const active = item.href === current;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`block rounded-md px-3 py-2.5 text-[15px] font-semibold transition-colors duration-150 ${
                    active
                      ? "bg-sand text-canyon"
                      : "text-ink hover:bg-sand/70 hover:text-terracotta"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
