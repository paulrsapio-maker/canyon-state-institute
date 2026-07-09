import { admissions } from "@/lib/content";

export default function EnrollSteps({
  steps = admissions.steps,
}: {
  steps?: { title: string; body: string }[];
}) {
  return (
    <ol className="grid gap-8 sm:grid-cols-3">
      {steps.map((step, i) => (
        <li key={step.title} className="flex flex-col items-start">
          <span
            aria-hidden="true"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-canyon font-serif text-xl font-bold text-warm"
          >
            {i + 1}
          </span>
          <h3 className="mt-4 font-serif text-[20px] font-bold text-ink">{step.title}</h3>
          <p className="mt-2 text-[15px] leading-6 text-ink/85">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
