import { BookOpen, GraduationCap, Heart, Languages } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { education, interests, languages, research } from "@/lib/content"

export function Education() {
  return (
    <section id="education" className="border-t bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow">Education &amp; research</p>
          <h2 className="mt-5 max-w-2xl font-heading text-4xl leading-tight tracking-tight sm:text-5xl">
            Trained in mass communication, curious about trust.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <Reveal className="h-full">
            <div className="flex h-full flex-col rounded-3xl border bg-card p-8 sm:p-10">
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-2xl bg-brand-soft text-brand">
                  <GraduationCap className="size-5" />
                </span>
                <span className="font-heading text-3xl text-muted-foreground">{education.year}</span>
              </div>
              <p className="mt-8 text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
                Degree
              </p>
              <h3 className="mt-2 font-heading text-2xl leading-snug sm:text-3xl">{education.degree}</h3>
              <p className="mt-auto pt-6 text-muted-foreground">
                {education.school}
                <br />
                {education.place}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.06} className="h-full">
            <div className="flex h-full flex-col rounded-3xl bg-foreground p-8 text-background sm:p-10">
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-2xl bg-background/10 text-background">
                  <BookOpen className="size-5" />
                </span>
                <span className="font-heading text-3xl text-background/50">{research.year}</span>
              </div>
              <p className="mt-8 text-xs font-medium tracking-[0.18em] text-background/60 uppercase">
                Research work
              </p>
              <h3 className="mt-2 font-heading text-xl leading-snug italic sm:text-2xl">
                {research.title}
              </h3>
              <ul className="mt-auto space-y-2.5 pt-6">
                {research.points.map((point) => (
                  <li
                    key={point}
                    className="relative pl-5 text-[0.95rem] leading-relaxed text-background/75 before:absolute before:top-[0.7em] before:left-0 before:h-px before:w-2.5 before:bg-brand"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="h-full">
            <div className="h-full rounded-3xl border bg-card p-8 sm:p-10">
              <div className="flex items-center gap-3">
                <Languages className="size-5 text-brand" />
                <h3 className="font-heading text-2xl">Languages</h3>
              </div>
              <ul className="mt-6 divide-y">
                {languages.map((language) => (
                  <li key={language.name} className="flex items-center justify-between py-3">
                    <span className="font-medium">{language.name}</span>
                    <span className="text-sm text-muted-foreground">{language.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.06} className="h-full">
            <div className="h-full rounded-3xl border bg-card p-8 sm:p-10">
              <div className="flex items-center gap-3">
                <Heart className="size-5 text-brand" />
                <h3 className="font-heading text-2xl">Interests</h3>
              </div>
              <ul className="mt-6 flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <li key={interest} className="rounded-full border bg-background px-3.5 py-1.5 text-sm">
                    {interest}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
