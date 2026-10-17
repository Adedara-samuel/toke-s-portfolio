"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react"
import { profile, splashLines } from "@/lib/content"

const DURATION = 3400
const PANELS = 5
const RING = 2 * Math.PI * 58

const ease = [0.76, 0, 0.24, 1] as const

const panel: Variants = {
  initial: { y: 0 },
  animate: { y: 0 },
  exit: (i: number) => ({
    y: "-100%",
    transition: { duration: 0.8, ease, delay: 0.25 + i * 0.07 },
  }),
}

const content: Variants = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  exit: { opacity: 0, y: -24, transition: { duration: 0.35, ease: "easeIn" } },
}

export function SplashScreen() {
  const reduceMotion = useReducedMotion()
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    document.documentElement.style.overflow = "hidden"
    const total = reduceMotion ? 1000 : DURATION
    const start = performance.now()
    let frame = 0
    let timer: ReturnType<typeof setTimeout>

    const tick = (now: number) => {
      const t = Math.min((now - start) / total, 1)
      // Gentle ease-in-out so each discipline gets a fair moment on screen.
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
      setProgress(eased * 100)
      if (t < 1) frame = requestAnimationFrame(tick)
      else timer = setTimeout(() => setDone(true), 350)
    }
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(timer)
    }
  }, [reduceMotion])

  useEffect(() => {
    if (done) document.documentElement.style.overflow = ""
  }, [done])

  const count = splashLines.length
  const lineIndex = Math.min(Math.floor((progress / 100) * count), count - 1)
  const percent = Math.round(progress)

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="splash"
          role="status"
          aria-live="polite"
          aria-label={`Loading the portfolio of ${profile.name}`}
          className="fixed inset-0 z-100"
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Panels that lift away one after another to reveal the page. */}
          <div className="absolute inset-0 flex">
            {Array.from({ length: PANELS }, (_, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={reduceMotion ? content : panel}
                className="h-full flex-1 bg-background"
                style={{ marginLeft: i ? -1 : 0 }}
              />
            ))}
          </div>

          <motion.div
            variants={content}
            className="relative flex h-full flex-col overflow-hidden"
          >
            <div className="grain pointer-events-none absolute inset-0 opacity-70" />
            <div className="pointer-events-none absolute top-1/2 left-1/2 size-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-soft/70 blur-3xl" />

            <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-7 sm:px-10 sm:pt-10">
              <span className="grid size-10 place-items-center rounded-full bg-foreground font-heading text-sm text-background italic">
                AA
              </span>
              <span className="text-[0.7rem] tracking-[0.25em] text-muted-foreground uppercase">
                {profile.location}
              </span>
            </div>

            <div className="relative flex flex-1 flex-col items-center justify-center px-6 text-center">
              <motion.div
                initial={reduceMotion ? false : { scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="relative size-32 sm:size-36"
              >
                <svg viewBox="0 0 128 128" className="absolute inset-0 -rotate-90" aria-hidden>
                  <circle cx="64" cy="64" r="58" fill="none" stroke="var(--border)" strokeWidth="2" />
                  <circle
                    cx="64"
                    cy="64"
                    r="58"
                    fill="none"
                    stroke="var(--brand)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray={RING}
                    strokeDashoffset={RING * (1 - progress / 100)}
                  />
                </svg>
                <div className="absolute inset-[10px] overflow-hidden rounded-full bg-muted">
                  <Image
                    src="/adedoyin-hero.jpg"
                    alt=""
                    fill
                    priority
                    sizes="144px"
                    className="origin-[52%_39%] scale-[1.8] object-cover object-[50%_28%]"
                  />
                </div>
              </motion.div>

              <motion.p
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="mt-8 font-heading text-xl tracking-tight sm:text-2xl"
              >
                {profile.name}
              </motion.p>

              <motion.p
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-6 text-[0.7rem] tracking-[0.3em] text-brand uppercase"
              >
                What I do · {String(lineIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </motion.p>

              <div className="relative mt-3 h-25 w-full overflow-hidden sm:h-22 md:h-26">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.p
                    key={splashLines[lineIndex]}
                    initial={reduceMotion ? { opacity: 0 } : { y: "100%", opacity: 0, filter: "blur(6px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={reduceMotion ? { opacity: 0 } : { y: "-100%", opacity: 0, filter: "blur(6px)" }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 flex items-center justify-center font-heading text-[2.3rem] leading-[1.15] tracking-tight text-balance italic sm:text-7xl sm:leading-tight md:text-[5.25rem]"
                  >
                    {splashLines[lineIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-6xl px-6 pb-8 sm:px-10 sm:pb-10">
              <div className="flex items-end justify-between gap-6">
                <ol className="grid flex-1 grid-cols-6 gap-1.5 sm:gap-3">
                  {splashLines.map((line, i) => {
                    const segment = Math.min(Math.max((progress / 100) * count - i, 0), 1)
                    return (
                      <li key={line}>
                        <div className="h-[3px] overflow-hidden rounded-full bg-border">
                          <div
                            className="h-full rounded-full bg-brand"
                            style={{ width: `${segment * 100}%` }}
                          />
                        </div>
                        <p
                          className={`mt-3 hidden truncate text-[0.7rem] tracking-wide transition-colors duration-300 md:block ${
                            i <= lineIndex ? "text-foreground" : "text-muted-foreground/60"
                          }`}
                        >
                          {line}
                        </p>
                      </li>
                    )
                  })}
                </ol>
                <p className="w-20 text-right font-heading text-4xl leading-none tabular-nums sm:w-28 sm:text-6xl">
                  {percent}
                  <span className="text-lg text-muted-foreground sm:text-2xl">%</span>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
