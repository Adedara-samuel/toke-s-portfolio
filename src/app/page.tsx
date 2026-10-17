import { SplashScreen } from "@/components/splash-screen"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/sections/hero"
import { Ticker } from "@/components/sections/ticker"
import { About } from "@/components/sections/about"
import { Expertise } from "@/components/sections/expertise"
import { Experience } from "@/components/sections/experience"
import { Education } from "@/components/sections/education"
import { Contact } from "@/components/sections/contact"

export default function Home() {
  return (
    <>
      <SplashScreen />
      <SiteHeader />
      <main>
        <Hero />
        <Ticker />
        <About />
        <Expertise />
        <Experience />
        <Education />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
