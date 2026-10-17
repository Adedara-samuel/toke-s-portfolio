"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { profile, splashLines } from "@/lib/content"

const DURATION = 2800

export function SplashScreen() {
  const reduceMotion = useReducedMotion()
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    document.documentElement.style.overflow = "hidden"
    const total = reduceMotion ? 900 : DURATION
    const start = performance.now()
    let frame = 0

    const tick = (now: number) => {
      const t = Math.min((now - start) / total, 1)
      // ease-out so the counter settles rather than snaps
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100))
      if (t < 1) frame = requestAnimationFrame(tick)
      else setTimeout(() => setDone(true), 250)
    }
    frame = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frame)
  }, [reduceMotion])

  useEffect(() => {
    if (done) document.documentElement.style.overflow = ""
  }, [done])

  const lineIndex = Math.min(
    Math.floor((progress / 100) * splashLines.length),
    splashLines.length - 1
  )

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="splash"
          role="status"
          aria-live="polite"
          aria-label={`Loading portfolio of ${profile.name}`}
          className="fixed inset-0 z-100 flex flex-col bg-background"
          exit={reduceMotion ? { opacity: 0 } : { y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="grain pointer-events-none absolute inset-0 opacity-60" />

          <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-between px-6 py-8 sm:px-10 sm:py-12">
            <div className="flex items-center justify-between text-xs tracking-[0.2em] text-muted-foreground uppercase">
              <span>Portfolio</span>
              <span>{profile.location}</span>
            </div>

            <div>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="eyebrow"
              >
                Content · Public Relations · Media
              </motion.p>

              <div className="mt-5 font-heading text-5xl leading-[1.02] tracking-tight sm:text-7xl md:text-8xl">
                <span className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                  >
                    Adedoyin Favour
                  </motion.span>
                </span>
                <span className="block overflow-hidden pb-2 italic text-brand">
                  <motion.span
                    className="block"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
                  >
                    Adebayo
                  </motion.span>
                </span>
              </div>

              <div className="mt-8 flex h-8 items-center gap-3 overflow-hidden text-lg text-muted-foreground sm:text-xl">
                <span className="text-foreground/40">—</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={splashLines[lineIndex]}
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -24, opacity: 0 }}
                    transition={{ duration: 0.28 }}
                    className="text-foreground"
                  >
                    {splashLines[lineIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            <div>
              <div className="flex items-end justify-between">
                <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                  Preparing the story
                </span>
                <span className="font-heading text-6xl tabular-nums sm:text-8xl">
                  {progress}
                  <span className="text-2xl text-muted-foreground sm:text-3xl">%</span>
                </span>
              </div>
              <div className="mt-4 h-px w-full bg-border">
                <div
                  className="h-px bg-brand transition-[width] duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
