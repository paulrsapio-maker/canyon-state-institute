"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, TriangleAlert } from "lucide-react";
import { contact } from "@/lib/content";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.email("Enter a valid email address"),
  phone: z.string().optional(),
  reason: z.string().min(1, "Choose a topic"),
  message: z.string().min(10, "Tell us a little more — 10+ characters helps us route it"),
  company: z.string().optional(), // honeypot — humans never see or fill this
});

type FormData = z.infer<typeof schema>;

const inputClass =
  "w-full rounded-lg border border-clay/50 bg-warm px-4 py-3 text-[16px] text-ink placeholder:text-ink/40 transition-colors duration-150 focus:border-clay focus:outline-none focus-visible:ring-2 focus-visible:ring-gold";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm font-semibold text-terracotta">
      {message}
    </p>
  );
}

export default function ContactForm({
  defaultReason = "",
  submitLabel = "Send Message",
}: {
  defaultReason?: string;
  submitLabel?: string;
}) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string>("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { reason: defaultReason },
  });

  const onSubmit = async (data: FormData) => {
    setStatus("idle");
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && body.ok) {
        setStatus("success");
        reset({ reason: defaultReason, name: "", email: "", phone: "", message: "", company: "" });
      } else {
        setStatus("error");
        setServerError(body.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setServerError("We couldn't reach the server. Please check your connection and try again.");
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex items-start gap-4 rounded-lg border-2 border-teal bg-teal/5 p-6"
      >
        <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-teal" aria-hidden="true" />
        <div>
          <p className="font-serif text-[20px] font-bold text-ink">Message received.</p>
          <p className="mt-1 text-[15px] leading-6 text-ink/85">
            Thank you for reaching out — a member of our team will respond within one business
            day.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-3 cursor-pointer text-[15px] font-semibold text-terracotta underline-offset-2 hover:underline"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mb-1.5 block text-[15px] font-semibold text-ink">
            Name
          </label>
          <input
            id="cf-name"
            type="text"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "cf-name-error" : undefined}
            className={inputClass}
            {...register("name")}
          />
          <FieldError id="cf-name-error" message={errors.name?.message} />
        </div>
        <div>
          <label htmlFor="cf-email" className="mb-1.5 block text-[15px] font-semibold text-ink">
            Email
          </label>
          <input
            id="cf-email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "cf-email-error" : undefined}
            className={inputClass}
            {...register("email")}
          />
          <FieldError id="cf-email-error" message={errors.email?.message} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-phone" className="mb-1.5 block text-[15px] font-semibold text-ink">
            Phone <span className="font-normal text-ink/60">(optional)</span>
          </label>
          <input
            id="cf-phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
            {...register("phone")}
          />
        </div>
        <div>
          <label htmlFor="cf-reason" className="mb-1.5 block text-[15px] font-semibold text-ink">
            How can we help?
          </label>
          <select
            id="cf-reason"
            aria-invalid={!!errors.reason}
            aria-describedby={errors.reason ? "cf-reason-error" : undefined}
            className={`${inputClass} cursor-pointer`}
            {...register("reason")}
          >
            <option value="" disabled>
              Choose a topic…
            </option>
            {contact.reasons.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <FieldError id="cf-reason-error" message={errors.reason?.message} />
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className="mb-1.5 block text-[15px] font-semibold text-ink">
          Message
        </label>
        <textarea
          id="cf-message"
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "cf-message-error" : undefined}
          className={inputClass}
          {...register("message")}
        />
        <FieldError id="cf-message-error" message={errors.message?.message} />
      </div>

      {/* Honeypot — hidden from real users */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="cf-company">Company</label>
        <input id="cf-company" type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="flex items-start gap-3 rounded-lg border-2 border-terracotta/60 bg-terracotta/5 px-4 py-3 text-[15px] font-semibold text-terracotta"
        >
          <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-lg bg-canyon px-8 py-3 text-[16px] font-semibold text-warm transition-colors duration-200 hover:bg-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Sending…" : submitLabel}
      </button>
      <p className="text-[13px] leading-5 text-ink/60">
        We use your information only to respond to your inquiry. See our{" "}
        <a href="/privacy" className="underline underline-offset-2 hover:text-terracotta">
          privacy policy
        </a>
        .
      </p>
    </form>
  );
}
