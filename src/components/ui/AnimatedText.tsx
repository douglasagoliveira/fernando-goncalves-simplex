import { useEffect, useRef, useState, type CSSProperties } from "react"

export function AnimatedText({ text }: { text: string }) {
  const words = text.split(" ")
  return (
    <span data-aos="words">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <span key={`${word}-${index}`}>
            <span
              className="inline-block"
              data-word
              style={{ "--word-index": Math.min(index, 12) } as CSSProperties}
            >
              {word}
            </span>
            {index < words.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    </span>
  )
}

export function CountUp({
  value,
  prefix = "",
}: {
  value: number
  prefix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (preference.matches || !ref.current) return
    let frame = 0
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer.disconnect()
        const started = performance.now()
        const update = (now: number) => {
          const progress = Math.min((now - started) / 1100, 1)
          setDisplay(Math.round(value * (1 - (1 - progress) ** 3)))
          if (progress < 1) frame = requestAnimationFrame(update)
        }
        frame = requestAnimationFrame(update)
      },
      { threshold: 0.6 },
    )
    const finish = () => {
      if (!preference.matches) return
      observer.disconnect()
      cancelAnimationFrame(frame)
      setDisplay(value)
    }
    observer.observe(ref.current)
    preference.addEventListener("change", finish)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      preference.removeEventListener("change", finish)
    }
  }, [value])

  return (
    <span ref={ref} className="tabular-nums">
      <span className="sr-only">
        {prefix}
        {value}
      </span>
      <span aria-hidden="true">
        {prefix}
        {display}
      </span>
    </span>
  )
}
