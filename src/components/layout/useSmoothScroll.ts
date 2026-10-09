import { useEffect, useRef } from "react"
import type Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function useSmoothScroll(pathname: string, enabled: boolean) {
  const instance = useRef<Lenis | null>(null)

  useEffect(() => {
    if (!enabled) return
    let disposed = false
    gsap.registerPlugin(ScrollTrigger)

    import("lenis")
      .then(({ default: Lenis }) => {
        if (disposed) return
        const lenis = new Lenis({
          autoRaf: true,
          lerp: 0.12,
          smoothWheel: true,
          syncTouch: false,
          anchors: false,
          allowNestedScroll: true,
          virtualScroll: ({ event }) => !event.ctrlKey && !event.metaKey,
          prevent: (node) => /^(INPUT|TEXTAREA|SELECT)$/.test(node.tagName),
        })

        instance.current = lenis

        // Sync Lenis scroll events with GSAP ScrollTrigger
        lenis.on("scroll", () => {
          ScrollTrigger.update()
        })

        // Refresh ScrollTrigger once Lenis is initialized
        ScrollTrigger.refresh()
      })
      .catch(() => {})

    return () => {
      disposed = true
      instance.current?.destroy()
      instance.current = null
    }
  }, [enabled])

  useEffect(() => {
    instance.current?.scrollTo(0, { immediate: true, force: true })
    instance.current?.resize()
    ScrollTrigger.refresh()
  }, [pathname])
}
