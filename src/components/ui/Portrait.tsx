import type React from "react"
import speakerSmall from "../../imports/optimized/fernando-palestrando-graded-480.webp"
import speakerLarge from "../../imports/optimized/fernando-palestrando-graded-960.webp"
import portraitSmall from "../../imports/optimized/fernando-retrato-graded-480.webp"
import portraitLarge from "../../imports/optimized/fernando-retrato-graded-960.webp"

export function Portrait({
  variant = "speaker",
  grade = "corporate",
  critical = false,
  className = "",
  ...rest
}: {
  variant?: "speaker" | "portrait"
  grade?: "corporate" | "clean" | "none"
  critical?: boolean
  className?: string
} & React.ImgHTMLAttributes<HTMLImageElement> & {
  [key: `data-${string}`]: string
}) {
  const speaker = variant === "speaker"
  const gradeClass =
    grade === "corporate"
      ? "portrait-grade-corporate"
      : grade === "clean"
        ? "portrait-grade-clean"
        : ""
  return (
    <img
      src={(speaker ? speakerLarge : portraitLarge).src}
      srcSet={`${(speaker ? speakerSmall : portraitSmall).src} 480w, ${
        (speaker ? speakerLarge : portraitLarge).src
      } 960w`}
      sizes="(max-width: 600px) 90vw, (max-width: 900px) 65vw, 800px"
      width={960}
      height={speaker ? 1127 * 1.5 : 1461 * 1.5}
      alt={
        speaker
          ? "Fernando Gonçalves com microfone durante uma palestra"
          : "Fernando Gonçalves, de camisa azul e blazer"
      }
      loading={critical ? "eager" : "lazy"}
      fetchPriority={critical ? "high" : "auto"}
      decoding="async"
      className={`${gradeClass} ${className}`.trim()}
      {...rest}
    />
  )
}
