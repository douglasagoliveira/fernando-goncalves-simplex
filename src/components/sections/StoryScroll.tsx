import { useEffect, useRef, useState } from "react"

type StoryScrollProps = {
  label: string
  title: string
  paragraphs: string[]
}

const chapters = ["Infância e adolescência", "Origens", "A decisão", "Hoje"]

export function StoryScroll({ label, title, paragraphs }: StoryScrollProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    let cancelled = false
    let dispose: (() => void) | undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting)
        .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0]
      if (visible) setActive(Number((visible.target as HTMLElement).dataset.storyIndex))
    }, { rootMargin: "-15% 0px -30% 0px", threshold: [0, 0.25, 0.5, 0.75] })
    section.querySelectorAll("[data-story-index]").forEach((panel) => observer.observe(panel))

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)
      const media = gsap.matchMedia()
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(section.querySelector(".life-line-path"),
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 1.4, ease: "power2.out", scrollTrigger: { trigger: section, start: "top 75%", once: true } })
        gsap.from(section.querySelectorAll(".life-chapter-heading"), {
          y: 16, duration: 0.65, stagger: 0.12, ease: "power2.out", clearProps: "transform",
          scrollTrigger: { trigger: section.querySelector(".life-chapters"), start: "top 85%", once: true },
        })
      }, section)
      dispose = () => media.revert()
    }).catch(() => {})

    return () => { cancelled = true; observer.disconnect(); dispose?.() }
  }, [paragraphs])

  return (
    <section ref={sectionRef} className="life-story" aria-labelledby="about-story-title">
      <div className="about-container">
        <header className="life-story-heading">
          <p className="about-label">{label}</p>
          <h2 id="about-story-title">{title}</h2>
        </header>
        <nav className="life-story-nav" aria-label="Capítulos da minha história">
          {paragraphs.map((paragraph, index) => (
            <a key={paragraph} href={`#historia-${index + 1}`} aria-current={active === index ? "step" : undefined} onClick={() => setActive(index)}>
              <span>{String(index + 1).padStart(2, "0")}</span>{chapters[index]}
            </a>
          ))}
        </nav>
        <div className="life-chapters">
          <svg className="life-line" viewBox="0 0 1200 140" preserveAspectRatio="none" aria-hidden="true">
            <path className="life-line-guide" d="M 0 120 H 150 C 280 120 300 90 450 90 S 650 55 750 55 S 960 15 1050 15 H 1200" />
            <path className="life-line-path" pathLength="1" d="M 0 120 H 150 C 280 120 300 90 450 90 S 650 55 750 55 S 960 15 1050 15 H 1200" />
          </svg>
          {paragraphs.map((paragraph, index) => (
            <article key={paragraph} id={`historia-${index + 1}`} data-story-index={index} className={`life-chapter${active === index ? " is-active" : ""}`}>
              <div className="life-chapter-marker" aria-hidden="true"><span /></div>
              <header className="life-chapter-heading">
                <span className="life-chapter-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3>{chapters[index]}</h3>
              </header>
              <p>{paragraph}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
