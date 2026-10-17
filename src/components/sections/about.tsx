import Image from "next/image"
import { Quote } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { Separator } from "@/components/ui/separator"

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="eyebrow">About me</p>
            <h2 className="mt-5 font-heading text-4xl leading-tight tracking-tight sm:text-5xl">
              Telling stories that engage and <span className="text-brand italic">move</span> audiences.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <figure className="mt-10">
              <div className="relative aspect-4/5 overflow-hidden rounded-3xl bg-muted">
                <Image
                  src="/about-img.jpg"
                  alt="Adedoyin Favour Adebayo seated behind a studio microphone"
                  fill
                  sizes="(min-width: 1024px) 400px, 90vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-sm text-muted-foreground">
                Behind the microphone: presenting is part of the craft.
              </figcaption>
            </figure>
          </Reveal>
        </aside>

        <article className="article">
          <Reveal>
            <p className="dropcap">
              My name is Adedoyin Favour Adebayo. I&apos;m a graduate of Communications and Media Studies (Mass
              Communication) from Bamidele Olumilua University of Education, Science and Technology,
              Ikere-Ekiti, with over three years of experience across content writing, marketing,
              advertising, public relations and social media management.
            </p>
            <p>
              My work sits where writing meets its audience. I specialise in content and marketing
              communication, news reporting, public relations, advertisements and digital
              storytelling, and away from briefs and deadlines I write quotes and short stories of
              my own. I&apos;m skilled in editorial writing, radio presenting and customer
              relationship management, with a record of leading campaigns that deliver measurable
              results.
            </p>
          </Reveal>

          <Reveal>
            <h3 className="mt-12 mb-5 font-heading text-2xl sm:text-3xl">On air and in the newsroom</h3>
            <p>
              Since March 2026 I have been writing and reporting news at Dove TV, where I present and
              host <em>Corpers Chronicles</em> on Dove Television. I research, write and report
              stories for television and digital audiences, and hold every piece to accurate,
              ethical reporting standards so that coverage is timely and built around the audience.
            </p>
            <p>
              My broadcast work started at Hebron FM in Canaan Land, Ota, where I hosted radio
              segments reaching thousands of listeners weekly, wrote promotional content that raised
              listener engagement by 10%, and worked with production teams on creative scripts and
              advertisements. I also work freelance as a vox-pop producer and video editor,
              conducting vox-pop interviews and shaping raw event footage into clear, engaging
              stories for social media and digital platforms.
            </p>
          </Reveal>

          <Reveal>
            <blockquote className="my-12 rounded-3xl border bg-paper px-7 py-8 sm:px-10">
              <Quote className="size-7 text-brand" />
              <p className="mt-4 font-heading text-2xl leading-snug text-foreground! italic sm:text-3xl">
                Content and marketing communication, news reporting and digital storytelling that
                engages and moves audiences.
              </p>
            </blockquote>
          </Reveal>

          <Reveal>
            <h3 className="mb-5 font-heading text-2xl sm:text-3xl">Words with a purpose</h3>
            <p>
              From November 2022 to 2024 I wrote editorial content for RCF, Ekiti Zone, reaching over
              1,000 readers monthly. I built the content calendars, managed publication schedules
              and refined messaging with the team, which boosted engagement by 30% across digital
              platforms.
            </p>
            <p>
              Over the same period at Christ the Redeemer&apos;s Ministry, I created written and
              visual content for publications and social media, and developed content strategies
              for ministry events that increased attendance by 20%, while keeping every piece
              consistent with the organisation&apos;s values.
            </p>
          </Reveal>

          <Reveal>
            <h3 className="mt-12 mb-5 font-heading text-2xl sm:text-3xl">
              Campaigns, clients and public trust
            </h3>
            <p>
              My grounding in public relations began as Public Relations Officer for the Federation
              of Ikole Local Government Students Union, where I organised events that drew 500+
              attendees, developed PR strategies that strengthened the organisation&apos;s
              reputation and community trust, and coordinated media outreach that secured coverage
              in local publications.
            </p>
            <p>
              As Content Writing &amp; Marketing Head at AMCOMS, I led a team of content creators and
              ran campaigns that increased brand visibility by 25% within one month and grew the
              follower base by 500+ across platforms. At Powress Picture Limited, I managed client
              relationships through CRM strategies and analysed customer data to tailor marketing
              campaigns, achieving a 15% increase in engagement.
            </p>
            <p>
              That interest in how communication builds trust carried into my 2024 research, a study
              of the impact of effective public relations on the marketing expansion of the banking
              system, using First Bank of Nigeria, Ikere-Ekiti as the case.
            </p>
          </Reveal>

          <Reveal>
            <Separator className="my-12" />
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
                  Based in
                </p>
                <p className="mt-2 font-heading text-xl text-foreground!">Lagos, Nigeria</p>
              </div>
              <div>
                <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
                  Speaks
                </p>
                <p className="mt-2 font-heading text-xl text-foreground!">
                  English, Yoruba, French &amp; Ghana
                </p>
              </div>
            </div>
          </Reveal>
        </article>
      </div>
    </section>
  )
}
