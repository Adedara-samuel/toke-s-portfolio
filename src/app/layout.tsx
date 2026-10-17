import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Newsreader } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { profile } from "@/lib/content"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
})

const description =
  "Portfolio of Adedoyin Favour Adebayo: content writer, news reporter, broadcast presenter and public relations professional based in Lagos, Nigeria."

export const metadata: Metadata = {
  title: `${profile.name} | Content Writer, PR & Media`,
  description,
  keywords: [
    "Adedoyin Favour Adebayo",
    "content writer",
    "public relations",
    "news reporting",
    "radio presenter",
    "mass communication",
    "Lagos",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} | Content Writer, PR & Media`,
    description,
    type: "profile",
    images: ["/adedoyin-hero.jpg"],
  },
}

export const viewport: Viewport = {
  themeColor: "#fbf8f3",
  colorScheme: "light",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  )
}
