"use client"

import { useState } from "react"
import { ArrowUpRight, CircleCheck, LoaderCircle, Mail, MapPin, Phone, Send } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Reveal } from "@/components/reveal"
import { socialIcons } from "@/components/social-icons"
import { contactSchema } from "@/lib/contact-schema"
import { profile } from "@/lib/content"

type FieldErrors = Partial<Record<"name" | "email" | "phone" | "subject" | "message", string>>

const contactLinks = [
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: "Phone", value: profile.phone, href: profile.phoneHref },
  { icon: MapPin, label: "Location", value: profile.location },
]

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle")
  const [errors, setErrors] = useState<FieldErrors>({})

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>

    const parsed = contactSchema.safeParse(data)
    if (!parsed.success) {
      const next: FieldErrors = {}
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FieldErrors
        next[key] ??= issue.message
      }
      setErrors(next)
      return
    }

    setErrors({})
    setStatus("sending")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const result = (await res.json()) as { ok: boolean; error?: string }
      if (!res.ok || !result.ok) throw new Error(result.error)

      form.reset()
      setStatus("sent")
      toast.success("Message sent", { description: "Thank you. I'll get back to you soon." })
    } catch (error) {
      setStatus("idle")
      toast.error("Message not sent", {
        description:
          error instanceof Error && error.message
            ? error.message
            : `Please try again or email ${profile.email}.`,
      })
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute -bottom-40 -left-40 size-[32rem] rounded-full bg-brand-soft blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow">Contact</p>
            <h2 className="mt-5 font-heading text-4xl leading-tight tracking-tight sm:text-6xl">
              Have a story to <span className="text-brand italic">tell?</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
              For content writing, editorial work, public relations, reporting or presenting, send a
              message and it lands straight in my inbox.
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <ul className="mt-10 space-y-3">
              {contactLinks.map(({ icon: Icon, label, value, href }) => {
                const inner = (
                  <>
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
                      <Icon className="size-[1.1rem]" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs tracking-[0.16em] text-muted-foreground uppercase">
                        {label}
                      </span>
                      <span className="block truncate font-medium">{value}</span>
                    </span>
                    {href && (
                      <ArrowUpRight className="ml-auto size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand" />
                    )}
                  </>
                )
                return (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        className="group flex items-center gap-4 rounded-2xl border bg-card p-3 pr-5 transition-colors hover:border-brand/40"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 rounded-2xl border bg-card p-3 pr-5">
                        {inner}
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>

            <div className="mt-8 flex flex-wrap gap-2">
              {profile.socials.map((social) => {
                const Icon = socialIcons[social.label]
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm transition-colors hover:border-brand/40 hover:text-brand"
                  >
                    <Icon className="size-4" />
                    {social.handle}
                  </a>
                )
              })}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="rounded-3xl border bg-card p-6 shadow-[0_30px_80px_-40px_oklch(0.3_0.05_40/0.4)] sm:p-10">
            {status === "sent" ? (
              <div className="flex min-h-[28rem] flex-col items-center justify-center text-center">
                <span className="grid size-16 place-items-center rounded-full bg-brand-soft text-brand">
                  <CircleCheck className="size-8" />
                </span>
                <h3 className="mt-6 font-heading text-3xl">Message received</h3>
                <p className="mt-3 max-w-sm text-muted-foreground">
                  Thank you for reaching out. I&apos;ll reply to the email address you provided.
                </p>
                <Button
                  variant="outline"
                  size="lg"
                  className="mt-8 h-11 rounded-full px-5"
                  onClick={() => setStatus("idle")}
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full name" name="name" error={errors.name} autoComplete="name" required />
                  <Field
                    label="Email address"
                    name="email"
                    type="email"
                    error={errors.email}
                    autoComplete="email"
                    required
                  />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Phone"
                    name="phone"
                    type="tel"
                    error={errors.phone}
                    autoComplete="tel"
                    optional
                  />
                  <Field label="Subject" name="subject" error={errors.subject} required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    placeholder="Tell me about the project, the audience and the timeline."
                    className="min-h-36 rounded-xl bg-background px-3.5 py-3"
                  />
                  {errors.message && (
                    <p id="message-error" className="text-sm text-destructive">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Honeypot for bots: hidden from people and assistive tech. */}
                <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <label htmlFor="company">Company</label>
                  <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={status === "sending"}
                  className="mt-2 h-12 rounded-full text-[0.95rem]"
                >
                  {status === "sending" ? (
                    <>
                      <LoaderCircle data-icon="inline-start" className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send message
                      <Send data-icon="inline-end" />
                    </>
                  )}
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  Your details are only used to reply to your message.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Field({
  label,
  name,
  error,
  optional,
  ...props
}: {
  label: string
  name: string
  error?: string
  optional?: boolean
} & React.ComponentProps<"input">) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={name}>
        {label}
        {optional && <span className="font-normal text-muted-foreground">(optional)</span>}
      </Label>
      <Input
        id={name}
        name={name}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className="h-11 rounded-xl bg-background px-3.5"
        {...props}
      />
      {error && (
        <p id={`${name}-error`} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
