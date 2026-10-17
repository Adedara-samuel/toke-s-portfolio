import { ArrowUp } from "lucide-react"
import { socialIcons } from "@/components/social-icons"
import { profile } from "@/lib/content"

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-6xl px-5 pt-20 pb-10 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-heading text-4xl leading-tight sm:text-5xl">
              Adedoyin Favour <span className="text-brand italic">Adebayo</span>
            </p>
            <p className="mt-4 max-w-sm text-background/60">
              Content writer, news reporter, presenter and public relations professional based in
              Lagos, Nigeria.
            </p>
          </div>

          <div>
            <p className="text-xs tracking-[0.18em] text-background/50 uppercase">Get in touch</p>
            <ul className="mt-4 space-y-2">
              <li>
                <a href={`mailto:${profile.email}`} className="break-all transition-colors hover:text-brand">
                  {profile.email}
                </a>
              </li>
              <li>
                <a href={profile.phoneHref} className="transition-colors hover:text-brand">
                  {profile.phone}
                </a>
              </li>
              <li className="text-background/60">{profile.location}</li>
            </ul>
          </div>

          <div>
            <p className="text-xs tracking-[0.18em] text-background/50 uppercase">Follow</p>
            <ul className="mt-4 space-y-2">
              {profile.socials.map((social) => {
                const Icon = socialIcons[social.label]
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 transition-colors hover:text-brand"
                    >
                      <Icon className="size-4" />
                      {social.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-background/15 pt-8 text-sm text-background/50 sm:flex-row sm:items-center">
          <p>© 2026 {profile.name}. All rights reserved.</p>
          <a href="#top" className="inline-flex items-center gap-2 transition-colors hover:text-background">
            Back to top
            <ArrowUp className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
