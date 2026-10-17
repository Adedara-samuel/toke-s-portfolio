"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Reveal } from "@/components/reveal"
import {
  experience,
  experienceCategories,
  type ExperienceCategory,
} from "@/lib/content"

// Wrap figures like "30%", "1,000" or "500+" so they stand out in the bullet text.
function emphasiseFigures(text: string) {
  const parts = text.split(/(\d[\d,]*%?\+?)/g)
  return parts.map((part, i) =>
    /^\d/.test(part) ? (
      <strong key={i} className="font-semibold text-foreground">
        {part}
      </strong>
    ) : (
      part
    )
  )
}

export function Experience() {
  const [filter, setFilter] = useState<ExperienceCategory | "all">("all")
  const visible = experience.filter((item) => filter === "all" || item.category === filter)

  return (
    <section id="experience" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <p className="eyebrow">Experience</p>
            <h2 className="mt-5 max-w-xl font-heading text-4xl leading-tight tracking-tight sm:text-5xl">
              Newsrooms, studios, campaigns and communities.
            </h2>
          </Reveal>

          <Reveal delay={0.05}>
            <Tabs
              value={filter}
              onValueChange={(value) => setFilter(value as ExperienceCategory | "all")}
            >
              <TabsList className="h-auto! w-full flex-wrap justify-start gap-1 rounded-2xl bg-secondary p-1 sm:w-fit sm:rounded-full">
                {experienceCategories.map((category) => (
                  <TabsTrigger
                    key={category.value}
                    value={category.value}
                    className="h-9 flex-none rounded-full px-4 text-[0.82rem] data-active:shadow-sm"
                  >
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </Reveal>
        </div>

        <ol className="relative mt-14 border-l border-border pl-0 sm:ml-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((item) => (
              <motion.li
                key={item.organisation + item.role}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative pb-12 pl-8 last:pb-0 sm:pl-12"
              >
                <span
                  className={
                    item.current
                      ? "absolute top-2 -left-1.75 size-3.5 rounded-full border-[3px] border-background bg-brand ring-4 ring-brand/15"
                      : "absolute top-2 -left-1.5 size-3 rounded-full border-2 border-background bg-foreground/30"
                  }
                />

                <div className="grid gap-4 md:grid-cols-[13rem_1fr] md:gap-10">
                  <div className="flex flex-wrap items-center gap-2 md:flex-col md:items-start">
                    <p className="text-sm font-medium tabular-nums text-muted-foreground">
                      {item.period}
                    </p>
                    {item.current && (
                      <Badge className="rounded-full bg-brand-soft px-2.5 text-accent-foreground">
                        Current
                      </Badge>
                    )}
                  </div>

                  <div className="rounded-2xl border bg-card p-6 transition-shadow hover:shadow-[0_20px_50px_-30px_oklch(0.3_0.05_40/0.35)] sm:p-7">
                    <h3 className="font-heading text-2xl leading-snug">{item.role}</h3>
                    <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground/80">{item.organisation}</span>
                      {item.location && (
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="size-3.5" />
                          {item.location}
                        </span>
                      )}
                    </p>
                    <ul className="mt-5 space-y-2.5">
                      {item.points.map((point) => (
                        <li
                          key={point}
                          className="relative pl-5 text-[0.95rem] leading-relaxed text-foreground/75 before:absolute before:top-[0.7em] before:left-0 before:h-px before:w-2.5 before:bg-brand"
                        >
                          {emphasiseFigures(point)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ol>
      </div>
    </section>
  )
}
