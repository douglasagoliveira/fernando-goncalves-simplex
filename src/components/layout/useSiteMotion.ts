import { useEffect, useState } from "react"
import { useSmoothScroll } from "./useSmoothScroll"

/**
 * Motion runtime: AOS triggers viewport reveals (styles live in
 * styles/motion.css); one rAF loop drives the parallax layers and a
 * ScrollTrigger keeps the header surface in sync with the opening field.
 * Everything animated is skipped under reduced motion.
 */
export function useSiteMotion(pathname: string) {
  const [motionAllowed, setMotionAllowed] = useState(false)
  useSmoothScroll(pathname, motionAllowed)

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => {
      setMotionAllowed(!preference.matches)
      if (preference.matches) {
        document.documentElement.classList.remove("motion", "motion-ready")
      }
    }
    update()
    preference.addEventListener("change", update)
    return () => preference.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (!motionAllowed) return
    let cancelled = false
    import("aos")
      .then(({ default: AOS }) => {
        if (cancelled) return
        AOS.init({
          once: true,
          offset: 72,
          duration: 0,
          easing: "ease",
          disableMutationObserver: false,
        })
        root.classList.add("motion", "motion-ready")
      })
      .catch(() => root.classList.remove("motion", "motion-ready"))
    return () => {
      cancelled = true
      root.classList.remove("motion", "motion-ready")
    }
  }, [motionAllowed])

  useEffect(() => {
    if (!motionAllowed) return
    let cancelled = false
    import("aos")
      .then(({ default: AOS }) => {
        if (!cancelled) AOS.refreshHard()
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [pathname, motionAllowed])

  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".site-header")
    const opening = document.querySelector<HTMLElement>(".hero, .page-hero")
    if (!header || !opening) return
    if (!motionAllowed) {
      const updateSurface = () => {
        header.classList.toggle(
          "is-light-surface",
          opening.getBoundingClientRect().bottom <= 76,
        )
      }
      updateSurface()
      window.addEventListener("scroll", updateSurface, { passive: true })
      return () => window.removeEventListener("scroll", updateSurface)
    }

    let cancelled = false
    let dispose: (() => void) | undefined
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
      .then(([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return
        gsap.registerPlugin(ScrollTrigger)
        header.classList.toggle(
          "is-light-surface",
          opening.getBoundingClientRect().bottom <= 76,
        )
        const trigger = ScrollTrigger.create({
          trigger: opening,
          start: "bottom top+=76",
          onEnter: () => header.classList.add("is-light-surface"),
          onLeaveBack: () => header.classList.remove("is-light-surface"),
        })
        dispose = () => trigger.kill()
        ScrollTrigger.refresh()
      })
      .catch(() => {})

    return () => {
      cancelled = true
      dispose?.()
      header.classList.remove("is-light-surface")
    }
  }, [pathname, motionAllowed])

  useEffect(() => {
    const layers = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]"),
    )
    const root = document.documentElement
    const visible = new Set<HTMLElement>()
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const element = entry.target as HTMLElement
        if (entry.isIntersecting) visible.add(element)
        else visible.delete(element)
      }
      schedule()
    })
    layers.forEach((layer) => observer.observe(layer))

    let frame = 0
    const update = () => {
      frame = 0
      const y = window.scrollY
      const viewport = window.innerHeight
      const strength = motionAllowed ? (window.innerWidth < 600 ? 0.5 : 1) : 0

      for (const layer of visible) {
        const speed = Number(layer.dataset.parallax) * strength
        let offset = y
        if (layer.dataset.parallaxAnchor !== "top") {
          const box = layer.getBoundingClientRect()
          offset = box.top + box.height / 2 - viewport / 2
        }
        layer.style.setProperty(
          "--parallax",
          `${Math.max(-60, Math.min(60, offset * speed)).toFixed(1)}px`,
        )
      }

      const max = document.documentElement.scrollHeight - viewport
      root.style.setProperty(
        "--scroll-progress",
        String(max > 0 ? Math.min(1, y / max) : 0),
      )

    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
    }
  }, [pathname, motionAllowed])
}
