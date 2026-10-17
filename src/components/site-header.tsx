"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { ArrowDownToLine, Menu } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { profile } from "@/lib/content"

const links = [
  { href: "#about", label: "About" },
  { href: "#expertise", label: "Expertise" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/70 bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-full bg-foreground font-heading text-sm text-background italic transition-colors group-hover:bg-brand">
            AA
          </span>
          <span className="hidden font-heading text-lg leading-none sm:block">
            {profile.shortName}
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={profile.cv}
            download
            className={cn(
              buttonVariants({ size: "lg" }),
              "hidden h-10 rounded-full px-4 sm:inline-flex"
            )}
          >
            <ArrowDownToLine data-icon="inline-start" />
            Download CV
          </a>

          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon-lg"
                  className="size-10 rounded-full md:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <Menu />
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%] bg-background p-0">
              <div className="border-b px-6 py-5">
                <SheetTitle className="font-heading text-xl">{profile.name}</SheetTitle>
                <SheetDescription>Content · Public Relations · Media</SheetDescription>
              </div>
              <nav aria-label="Mobile" className="flex flex-col px-3 py-4">
                {links.map((link) => (
                  <SheetClose
                    key={link.href}
                    render={
                      <a
                        href={link.href}
                        className="rounded-lg px-3 py-3 font-heading text-2xl transition-colors hover:bg-secondary"
                      />
                    }
                    nativeButton={false}
                  >
                    {link.label}
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto border-t p-6">
                <a
                  href={profile.cv}
                  download
                  className={cn(buttonVariants({ size: "lg" }), "h-11 w-full rounded-full")}
                >
                  <ArrowDownToLine data-icon="inline-start" />
                  Download CV
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
