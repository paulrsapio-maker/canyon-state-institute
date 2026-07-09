import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui";
import { legalPages } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(legalPages).map((doc) => ({ doc }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ doc: string }>;
}): Promise<Metadata> {
  const { doc } = await params;
  const page = legalPages[doc];
  if (!page) return {};
  return { title: page.title };
}

export default async function LegalPage({ params }: { params: Promise<{ doc: string }> }) {
  const { doc } = await params;
  const page = legalPages[doc];
  if (!page) notFound();

  return (
    <>
      <section className="bg-sand">
        <div className="mx-auto max-w-3xl px-6 pb-10 pt-8">
          <Breadcrumb items={[{ label: page.title }]} />
          <h1 className="mt-8 font-serif text-[34px] font-bold leading-tight text-ink">
            {page.title}
          </h1>
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-terracotta">
            Last updated · {page.updated}
          </p>
        </div>
      </section>
      <section className="bg-warm">
        <div className="mx-auto max-w-3xl space-y-6 px-6 py-12 text-[16px] leading-[28px] text-ink/90">
          {page.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>
    </>
  );
}
