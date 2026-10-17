import { ChartColumn, Layers, Megaphone, Mic, Newspaper, PenLine } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { impact, skills } from "@/lib/content"

const icons = {
  pen: PenLine,
  megaphone: Megaphone,
  newspaper: Newspaper,
  mic: Mic,
  layers: Layers,
  chart: ChartColumn,
} as const

export function Expertise() {
  return (
    <section id="expertise" className="border-y bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <p className="eyebrow">What I do</p>
            <h2 className="mt-5 max-w-2xl font-heading text-4xl leading-tight tracking-tight sm:text-5xl">
              Core skills across content, PR and media.
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="max-w-sm text-muted-foreground">
              Six areas of practice, from the first draft of a story to the campaign that carries it
              to an audience.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, i) => {
            const Icon = icons[skill.icon]
            return (
              <Reveal key={skill.area} delay={(i % 3) * 0.06}>
                <Card className="group h-full gap-5 rounded-2xl bg-card py-7 ring-foreground/8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-25px_oklch(0.3_0.05_40/0.35)] hover:ring-brand/30">
                  <CardHeader className="px-7">
                    <span className="mb-4 grid size-11 place-items-center rounded-xl bg-brand-soft text-brand transition-colors group-hover:bg-brand group-hover:text-primary-foreground">
                      <Icon className="size-5" />
                    </span>
                    <CardTitle className="font-heading text-2xl">{skill.area}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-7">
                    <ul className="flex flex-wrap gap-2">
                      {skill.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-full bg-secondary px-3 py-1 text-[0.8rem] text-secondary-foreground"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Reveal>
            )
          })}
        </div>

        <div className="mt-24">
          <Reveal>
            <p className="eyebrow">Measured impact</p>
            <h3 className="mt-5 font-heading text-3xl tracking-tight sm:text-4xl">
              Results from the work so far
            </h3>
          </Reveal>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {impact.map((item, i) => (
              <Reveal key={item.label} delay={(i % 3) * 0.06} className="bg-card p-7 sm:p-8">
                <p className="font-heading text-5xl tracking-tight text-brand sm:text-6xl">{item.value}</p>
                <p className="mt-3 font-medium">{item.label}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.source}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
