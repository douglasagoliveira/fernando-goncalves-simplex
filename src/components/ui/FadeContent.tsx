import { useEffect, useRef, type ReactNode } from "react"

export function FadeContent({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    let dispose: (() => void) | undefined
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled || !ref.current) return
      gsap.registerPlugin(ScrollTrigger)
      const media = gsap.matchMedia()
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(ref.current, {
          opacity: 0,
          y: 24,
          duration: 1,
          ease: "power2.out",
          clearProps: "opacity,transform",
          scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
        })
      }, ref)
      dispose = () => media.revert()
    }).catch(() => {})
    return () => { cancelled = true; dispose?.() }
  }, [])

  return <div ref={ref} className={className}>{children}</div>
}
