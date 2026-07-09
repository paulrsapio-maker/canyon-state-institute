"use client";

import { useState } from "react";
import { BadgeCheck, Clock, Layers } from "lucide-react";
import type { Course } from "@/lib/content";

export default function CourseGrid({ courses }: { courses: Course[] }) {
  const formats = Array.from(new Set(courses.map((c) => c.format)));
  const [selected, setSelected] = useState<string>("All");
  const visible = selected === "All" ? courses : courses.filter((c) => c.format === selected);

  return (
    <div>
      <div role="group" aria-label="Filter courses by format" className="flex flex-wrap gap-2.5">
        {["All", ...formats].map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={selected === f}
            onClick={() => setSelected(f)}
            className={`min-h-10 cursor-pointer rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ${
              selected === f
                ? "border-canyon bg-canyon text-warm"
                : "border-clay/50 bg-warm text-ink hover:bg-sand"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((course) => (
          <li
            key={course.title}
            className="rounded-lg border border-clay/40 bg-warm p-5 shadow-sm transition-shadow duration-200 hover:shadow-md"
          >
            <h3 className="font-serif text-[19px] font-bold leading-snug text-ink">
              {course.title}
            </h3>
            <dl className="mt-3.5 space-y-2 text-[14px] text-ink/85">
              <div className="flex items-center gap-2.5">
                <dt className="sr-only">Format</dt>
                <Layers className="h-4 w-4 shrink-0 text-clay" aria-hidden="true" />
                <dd>{course.format}</dd>
              </div>
              <div className="flex items-center gap-2.5">
                <dt className="sr-only">Length</dt>
                <Clock className="h-4 w-4 shrink-0 text-clay" aria-hidden="true" />
                <dd>{course.length}</dd>
              </div>
              <div className="flex items-center gap-2.5">
                <dt className="sr-only">Credential earned</dt>
                <BadgeCheck className="h-4 w-4 shrink-0 text-clay" aria-hidden="true" />
                <dd>{course.credential}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-sm italic text-ink/70">
        Sample catalog shown for design approval — final course list, schedules, and tuition are
        published by admissions.
      </p>
    </div>
  );
}
