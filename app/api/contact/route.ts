import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const schema = z.object({
  name: z.string().min(2).max(200),
  email: z.email().max(320),
  phone: z.string().max(50).optional(),
  reason: z.string().min(1).max(100),
  message: z.string().min(10).max(5000),
  company: z.string().max(500).optional(), // honeypot
});

// Naive in-memory rate limit — fine for a single-region deployment of a marketing site.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 5;

// Bound the external send so a hung upstream can't stall the response.
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`send timed out after ${ms}ms`)), ms)
    ),
  ]);
}

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") ?? "local").split(",")[0].trim();
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    return NextResponse.json(
      { ok: false, error: "Too many messages from this connection — please try again later." },
      { status: 429 }
    );
  }
  recent.push(now);
  hits.set(ip, recent);

  let data: z.infer<typeof schema>;
  try {
    data = schema.parse(await req.json());
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid submission." }, { status: 400 });
  }

  // Bots fill the hidden field; pretend success and drop it.
  if (data.company) return NextResponse.json({ ok: true });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (apiKey && to) {
    try {
      const resend = new Resend(apiKey);
      await withTimeout(
        resend.emails.send({
        from: process.env.CONTACT_FROM_EMAIL ?? "CSI Website <onboarding@resend.dev>",
        to,
        replyTo: data.email,
        subject: `[CSI website] ${data.reason} — ${data.name}`,
        text: [
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Phone: ${data.phone || "—"}`,
          `Topic: ${data.reason}`,
          "",
          data.message,
        ].join("\n"),
        }),
        10_000
      );
    } catch (err) {
      console.error("contact: email send failed", err);
      return NextResponse.json(
        { ok: false, error: "We couldn't send your message right now. Please try again shortly." },
        { status: 502 }
      );
    }
  } else {
    // Email not configured yet (see CONTENT-REVIEW.md) — log so submissions aren't lost in dev.
    console.log("contact submission (email not configured):", data);
  }

  return NextResponse.json({ ok: true });
}
