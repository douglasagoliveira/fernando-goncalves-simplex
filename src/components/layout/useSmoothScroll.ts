import { useEffect, useRef } from "react"
import type Lenis from "lenis"

export function useSmoothScroll(pathname: string, enabled: boolean) {
  const instance = useRef<Lenis | null>(null)

  useEffect(() => {
    if (!enabled) return
    let disposed = false
    import("lenis")
      .then(({ default: Lenis }) => {
        if (disposed) return
        instance.current = new Lenis({
          autoRaf: true,
          lerp: 0.12,
          smoothWheel: true,
          syncTouch: false,
          anchors: false,
          allowNestedScroll: true,
          virtualScroll: ({ event }) => !event.ctrlKey && !event.metaKey,
          prevent: (node) => /^(INPUT|TEXTAREA|SELECT)$/.test(node.tagName),
        })
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
  }, [pathname])
}
