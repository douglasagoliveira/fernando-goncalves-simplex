import { useEffect, useRef } from "react"
import { motion, useReducedMotion } from "motion/react"
import { Button } from "../ui"

const formats = [
  {
    title: "Palestra Essencial",
    duration: "A partir de 2h",
    description:
      "Formato indicado para eventos, encontros corporativos e grupos que desejam uma experiência motivacional objetiva e dinâmica.",
    ideal: "eventos rápidos, SIPAT, reuniões de equipe",
    featured: false,
  },
  {
    title: "Palestra Ampliada",
    duration: "De 3 a 4h",
    description:
      "Possibilita aprofundar os conteúdos, ampliar as dinâmicas e desenvolver maior interação com os participantes.",
    ideal: "convenções, treinamentos, eventos de liderança",
    featured: true,
  },
  {
    title: "Experiência Completa",
    duration: "Até 6h",
    description:
      "Divididas em duas ou três etapas. Para organizações que desejam uma experiência mais aprofundada, com maior tempo dedicado à reflexão e interação.",
    ideal: "programas de desenvolvimento, jornadas corporativas",
    featured: false,
  },
]

export function LectureFormats() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    let cancelled = false
    let dispose: (() => void) | undefined

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
      .then(([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled || !sectionRef.current) return
        gsap.registerPlugin(ScrollTrigger)
        const root = sectionRef.current
        const media = gsap.matchMedia()
        media.add(
          "(prefers-reduced-motion: no-preference)",
          () => {
            const cards = root.querySelectorAll("[data-format-card]")
            cards.forEach((card, index) => {
              gsap.from(card, {
                y: 28,
                opacity: 0,
                duration: 0.7,
                delay: window.innerWidth >= 1024 ? index * 0.12 : 0,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 90%",
                  once: true,
                },
              })
            })
          },
          root,
        )
        dispose = () => media.revert()
        document.fonts.ready.then(() => {
          if (!cancelled) ScrollTrigger.refresh()
        })
      })
      .catch(() => dispose?.())

    return () => {
      cancelled = true
      dispose?.()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="formatos-titulo"
      className="bg-[var(--background)] px-5 py-[var(--space-section)] text-[var(--foreground)] md:px-7"
    >
      <div className="mx-auto max-w-[var(--container-max)]">
        <div data-aos="compose" className="mx-auto mb-14 max-w-3xl text-center">
          <h2
            id="formatos-titulo"
            data-step="0"
            className="mb-[var(--space-h2-bottom)] text-[var(--font-size-h2)] font-light leading-[var(--line-height-h2)] tracking-[var(--tracking-h2)]"
          >
            Escolha o formato ideal para sua empresa
          </h2>
          <p
            data-step="1"
            className="lecture-formats-subtitle mx-auto mb-[var(--space-subtitle-bottom)] max-w-2xl text-[var(--font-size-subtitle)] font-light leading-[var(--line-height-subtitle)] text-[var(--muted-foreground)]"
            style={{ fontFamily: "var(--display)" }}
          >
            Cada contratação pode ser estruturada de acordo com o perfil e a
            disponibilidade do contratante.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {formats.map((format) => (
            <motion.article
              key={format.title}
              data-format-card
              whileHover={reducedMotion ? undefined : { y: -6 }}
              transition={{ type: "spring", stiffness: 240, damping: 24 }}
              className={`flex h-full flex-col overflow-hidden rounded-[var(--radius)] border motion-safe:transition-[border-color,box-shadow] motion-safe:duration-300 hover:border-[var(--brand-teal)] hover:shadow-[0_16px_36px_-20px_rgba(34,51,92,0.25)] ${
                format.featured
                  ? "border-[var(--brand-blue)] bg-[var(--brand-blue)] text-[var(--on-dark)]"
                  : "border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)]"
              }`}
            >
              <div
                className={`flex min-h-12 items-center justify-center border-b px-7 font-[family-name:var(--mono)] text-xs uppercase tracking-[0.1em] ${
                  format.featured
                    ? "border-[var(--line-dark)] bg-[var(--brand-indigo)] text-[var(--on-dark-accent)]"
                    : "border-transparent"
                }`}
              >
                {format.featured && "Mais Popular"}
              </div>
              <div className="flex flex-1 flex-col px-7 pb-8 pt-5 md:px-8 md:pb-9">
                <div
                  className={`mb-7 flex items-center gap-3 ${
                    format.featured
                      ? "text-[var(--on-dark-accent)]"
                      : "text-[var(--on-light-accent)]"
                  }`}
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-6 shrink-0"
                  >
                    <circle cx="12" cy="13" r="8" />
                    <path d="M12 9v4l3 2M9 2h6M12 2v3M18 6l2-2" />
                  </svg>
                  <span className="text-[clamp(0.875rem,1.1vw,1rem)] font-medium">
                    {format.duration}
                  </span>
                </div>
                <h3 className="mb-[var(--space-h3-bottom)] text-[var(--font-size-h3)] font-light leading-[var(--line-height-h3)] tracking-[var(--tracking-h3)]">
                  {format.title}
                </h3>
                <p
                  className={`mb-8 text-[clamp(0.9375rem,1.15vw,1rem)] leading-relaxed ${
                    format.featured
                      ? "text-[var(--on-dark-muted)]"
                      : "text-[var(--muted-foreground)]"
                  }`}
                >
                  {format.description}
                </p>
                <div
                  className={`mt-auto border-t pt-6 text-[clamp(0.875rem,1.05vw,0.9375rem)] leading-relaxed ${
                    format.featured
                      ? "border-[var(--line-dark)] text-[var(--on-dark-muted)]"
                      : "border-[var(--border)] text-[var(--muted-foreground)]"
                  }`}
                >
                  <strong
                    className={`mb-2 block font-semibold ${
                      format.featured
                        ? "text-[var(--on-dark)]"
                        : "text-[var(--brand-blue)]"
                    }`}
                  >
                    Ideal para:
                  </strong>
                  {format.ideal}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div data-aos="compose" className="mt-12 text-center md:mt-14">
          <p
            data-step="0"
            className="mx-auto mb-7 max-w-2xl text-[clamp(0.9375rem,1.2vw,1rem)] leading-relaxed text-[var(--muted-foreground)]"
          >
            Todos os formatos podem ser personalizados conforme os objetivos e
            necessidades do contratante.
          </p>
          <div
            data-step="1"
            className="[&_.button]:max-w-full [&_.button]:bg-[var(--brand-blue)]! [&_.button]:py-4 [&_.button]:text-[var(--on-dark)]! [&_.button:hover]:bg-[var(--brand-indigo)]!"
          >
            <Button>Solicitar Proposta Personalizada</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
