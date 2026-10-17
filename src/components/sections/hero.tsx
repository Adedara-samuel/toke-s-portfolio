import Image from "next/image"
import { ArrowDownToLine, ArrowUpRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Reveal } from "@/components/reveal"
import { cn } from "@/lib/utils"
import { highlights, profile } from "@/lib/content"

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-36 lg:pb-24">
      <div className="grain pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <div className="pointer-events-none absolute -top-40 right-[-10%] size-[36rem] rounded-full bg-brand-soft blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <Reveal>
            <p className="eyebrow">Content Writer · Public Relations · Media</p>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-6 font-heading text-[2.9rem] leading-[1.02] tracking-tight sm:text-7xl lg:text-[5.25rem]">
              Adedoyin Favour <span className="text-brand italic">Adebayo</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              I write, report and present stories that engage and move audiences, across content
              and marketing communication, news reporting, public relations, advertisements and
              digital storytelling.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className={cn(buttonVariants({ size: "lg" }), "h-12 rounded-full px-6 text-[0.95rem]")}
              >
                Work with me
                <ArrowUpRight data-icon="inline-end" />
              </a>
              <a
                href={profile.cv}
                download
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-12 rounded-full bg-card px-6 text-[0.95rem]"
                )}
              >
                <ArrowDownToLine data-icon="inline-start" />
                Download CV
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="mt-10 flex flex-wrap gap-2">
              {profile.roles.map((role) => (
                <li
                  key={role}
                  className="rounded-full border bg-card/70 px-3.5 py-1.5 text-sm text-foreground/80"
                >
                  {role}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="relative aspect-4/5 overflow-hidden rounded-t-[999px] rounded-b-3xl border-8 border-card bg-muted shadow-[0_30px_80px_-30px_oklch(0.3_0.05_40/0.45)]">
            <Image
              src="/portrait.jpg"
              alt="Portrait of Adedoyin Favour Adebayo"
              fill
              priority
              sizes="(min-width: 1024px) 420px, 90vw"
              className="object-cover object-[50%_30%]"
            />
          </div>

          <div className="absolute -bottom-6 -left-4 max-w-[15rem] rounded-2xl border bg-card/95 p-4 shadow-xl backdrop-blur sm:-left-10">
            <div className="flex items-center gap-2 text-xs font-medium tracking-wider text-brand uppercase">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-brand" />
              </span>
              Now on Dove TV
            </div>
            <p className="mt-2 text-sm leading-snug">
              Presenting &amp; hosting <span className="font-heading italic">Corpers Chronicles</span>
            </p>
          </div>
        </Reveal>
      </div>

      <div className="relative mx-auto mt-24 max-w-6xl px-5 sm:px-8">
        <dl className="grid grid-cols-2 divide-border overflow-hidden rounded-2xl border bg-card/80 backdrop-blur md:grid-cols-4 md:divide-x">
          {highlights.map((item, i) => (
            <Reveal
              key={item.label}
              delay={i * 0.06}
              className={cn("p-6 sm:p-8", i < 2 && "border-b md:border-b-0", i % 2 === 0 && "border-r md:border-r-0")}
            >
              <dt className="sr-only">{item.label}</dt>
              <dd className="font-heading text-4xl tracking-tight sm:text-5xl">{item.value}</dd>
              <dd className="mt-2 text-sm text-muted-foreground">{item.label}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
