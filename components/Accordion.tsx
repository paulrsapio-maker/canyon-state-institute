"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonId = useId();
  return (
    <div className="border-b border-clay/30">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left text-[17px] font-semibold text-ink transition-colors duration-200 hover:text-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
        >
          {q}
          <ChevronDown
            aria-hidden="true"
            className={`h-5 w-5 shrink-0 text-clay transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-5 pr-8 text-[16px] leading-7 text-ink/85">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function Accordion({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="border-t border-clay/30">
      {items.map((item) => (
        <AccordionItem key={item.q} q={item.q} a={item.a} />
      ))}
    </div>
  );
}
