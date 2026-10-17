import nodemailer, { type Transporter } from "nodemailer"
import { contactSchema } from "@/lib/contact-schema"
import { profile } from "@/lib/content"

// Simple per-instance limiter: 5 messages per IP every 10 minutes.
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function isRateLimited(ip: string) {
  const now = Date.now()
  if (hits.size > 1000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key)
    }
  }
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > MAX_PER_WINDOW
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

// Header values must never contain line breaks.
const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim()

let transporter: Transporter | null = null

function getTransporter() {
  if (transporter) return transporter
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env
  if (!SMTP_USER || !SMTP_PASS) return null

  const port = Number(SMTP_PORT ?? 465)
  transporter = nodemailer.createTransport({
    host: SMTP_HOST ?? "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })
  return transporter
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  if (isRateLimited(ip)) {
    return Response.json(
      { ok: false, error: "Too many messages. Please try again in a few minutes." },
      { status: 429 }
    )
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 })
  }

  // Honeypot filled in: pretend success so bots learn nothing.
  if (typeof body.company === "string" && body.company.length > 0) {
    return Response.json({ ok: true })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Please check the form and try again." },
      { status: 400 }
    )
  }

  const mailer = getTransporter()
  if (!mailer) {
    console.error("Contact form: SMTP_USER / SMTP_PASS are not configured.")
    return Response.json(
      { ok: false, error: `Email is not set up yet. Please write to ${profile.email} directly.` },
      { status: 500 }
    )
  }

  const { name, email, phone, subject, message } = parsed.data
  const to = process.env.CONTACT_TO_EMAIL || profile.email
  const from = process.env.SMTP_FROM || process.env.SMTP_USER

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone || "Not provided"],
    ["Subject", subject],
  ]

  const html = `
  <div style="font-family:Georgia,serif;background:#fbf8f3;padding:32px">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #ece4d8;border-radius:16px;overflow:hidden">
      <div style="padding:24px 28px;border-bottom:1px solid #ece4d8">
        <p style="margin:0;font:600 11px/1 Arial,sans-serif;letter-spacing:2px;text-transform:uppercase;color:#a8432a">New portfolio enquiry</p>
        <h1 style="margin:10px 0 0;font-size:22px;color:#2a211c">${escapeHtml(subject)}</h1>
      </div>
      <table style="width:100%;border-collapse:collapse;font:14px/1.5 Arial,sans-serif;color:#2a211c">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="padding:10px 28px;width:90px;color:#7a6c62">${label}</td><td style="padding:10px 28px 10px 0">${escapeHtml(value)}</td></tr>`
          )
          .join("")}
      </table>
      <div style="padding:20px 28px 28px;font:15px/1.7 Arial,sans-serif;color:#2a211c;white-space:pre-wrap;border-top:1px solid #ece4d8">${escapeHtml(message)}</div>
    </div>
    <p style="text-align:center;font:12px Arial,sans-serif;color:#9a8d83;margin-top:16px">Reply to this email to answer ${escapeHtml(name)} directly.</p>
  </div>`

  const text = `${rows.map(([l, v]) => `${l}: ${v}`).join("\n")}\n\n${message}`

  try {
    await mailer.sendMail({
      from: `"${oneLine(profile.name)} · Portfolio" <${from}>`,
      to,
      replyTo: { name: oneLine(name), address: email },
      subject: oneLine(`Portfolio enquiry: ${subject}`),
      text,
      html,
    })
    return Response.json({ ok: true })
  } catch (error) {
    console.error("Contact form: failed to send email", error)
    return Response.json(
      { ok: false, error: `Message could not be sent. Please email ${profile.email} directly.` },
      { status: 502 }
    )
  }
}
