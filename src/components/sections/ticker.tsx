const items = [
  "Content Writing",
  "Editorial Writing",
  "News Reporting",
  "Public Relations",
  "Marketing & Advertising",
  "Radio Presenting",
  "Scriptwriting",
  "Short Stories & Quotes",
  "Digital Storytelling",
]

export function Ticker() {
  const row = [...items, ...items]

  return (
    <div
      aria-hidden
      className="relative overflow-hidden border-y bg-foreground py-5 text-background"
    >
      <div className="flex w-max animate-[ticker_40s_linear_infinite] gap-10 motion-reduce:animate-none">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10 font-heading text-2xl italic sm:text-3xl">
            {item}
            <span className="size-1.5 rounded-full bg-brand" />
          </span>
        ))}
      </div>
    </div>
  )
}
