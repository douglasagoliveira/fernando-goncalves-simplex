import { useEffect, useRef, useState } from "react"

const steps = [
  {
    number: "01",
    title: "Solicite uma proposta",
    text: "Preencha o formulário com os dados do seu evento. Nossa equipe retorna em até 24h.",
    icon: "M10 3a7 7 0 1 0 0 14 7 7 0 0 0 0-14ZM15 15l6 6M7 10h6M10 7v6",
  },
  {
    number: "02",
    title: "Personalizamos o conteúdo",
    text: "Pelo método SIMPLEX, estruturamos a palestra de acordo com o perfil da sua equipe e seus objetivos.",
    icon: "m12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5",
  },
  {
    number: "03",
    title: "Viva a experiência",
    text: "No dia do evento, sua equipe vive uma experiência de história, emoção, reflexão, interação e atitude.",
    icon: "M9 3h6v9a3 3 0 0 1-6 0V3ZM5 10v2a7 7 0 0 0 14 0v-2M12 19v3M8 22h8",
  },
]

export function HiringJourney() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeStep, setActiveStep] = useState<number | null>(null)

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
          "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
          () => {
            const cards = Array.from(
              root.querySelectorAll<HTMLElement>("[data-journey-card]"),
            )
            const track = root.querySelector<HTMLElement>(
              "[data-journey-track]",
            )
            const progress = root.querySelector<HTMLElement>(
              "[data-journey-progress]",
            )
            const opacitySetters = cards.map((card) =>
              gsap.quickTo(card, "opacity", {
                duration: 0.45,
                ease: "power2.out",
              }),
            )
            const scaleSetters = cards.map((card) =>
              gsap.quickTo(card, "scale", {
                duration: 0.55,
                ease: "power2.out",
              }),
            )
            let current = -1

            const updateActive = () => {
              const distances = cards.map((card) => {
                const bounds = card.getBoundingClientRect()
                return Math.abs(
                  bounds.top + bounds.height / 2 - window.innerHeight / 2,
                )
              })
              const nearest = distances.indexOf(Math.min(...distances))
              if (nearest === current) return
              current = nearest
              setActiveStep(nearest)
              cards.forEach((_, index) => {
                opacitySetters[index](index === nearest ? 1 : 0.4)
                scaleSetters[index](index === nearest ? 1 : 0.97)
              })
            }

            ScrollTrigger.create({
              trigger: track,
              start: "top bottom",
              end: "bottom top",
              onUpdate: updateActive,
              onRefresh: updateActive,
            })
            gsap.fromTo(progress, { scaleY: 0 }, {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: track,
                start: "top center",
                end: "bottom center",
                scrub: 0.5,
              },
            })
            updateActive()
            return () => setActiveStep(null)
          },
          root,
        )
        dispose = () => media.revert()
        document.fonts.ready.then(() => {
          if (!cancelled) ScrollTrigger.refresh()
        })
      })
      .catch(() => {})

    return () => {
      cancelled = true
      dispose?.()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="contratar-titulo"
      className="dark bg-[linear-gradient(90deg,var(--brand-blue),var(--brand-indigo))] px-5 py-20 text-[var(--on-dark)] md:px-7 md:py-28 lg:py-32"
    >
      <div className="mx-auto grid max-w-[var(--container-max)] gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-20">
        <div className="lg:sticky lg:top-32">
          <div data-aos="compose">
            <h2
              id="contratar-titulo"
              data-step="1"
              className="mb-[var(--space-h2-bottom)] text-[var(--font-size-h2)] font-light leading-[var(--line-height-h2)] tracking-[var(--tracking-h2)]"
            >
              A Jornada{" "}
              <span className="text-[var(--on-dark-accent)]">SIMPLEX</span> até
              a sua empresa
            </h2>
            <p
              data-step="2"
              className="mb-8 max-w-[420px] text-base font-medium leading-relaxed text-[var(--on-dark-muted)]"
            >
              Toda transformação começa com uma conexão. Da primeira conversa ao
              dia do evento, construímos uma experiência que faz sentido para a
              sua equipe.
            </p>
            <div data-step="3">
              <a
                href="/contato"
                className="group inline-flex min-h-12 items-center gap-8 rounded-full border border-[var(--on-dark-accent)] bg-[var(--on-dark-accent)] px-6 py-3 text-sm font-semibold text-[var(--blue-950)]! focus-visible:outline-[var(--on-dark-accent)] motion-safe:transition-colors hover:bg-[var(--cyan-100)]"
              >
                Vamos conversar{" "}
                <span
                  aria-hidden="true"
                  className="text-lg motion-safe:transition-transform group-hover:translate-x-1"
                >
                  ↗
                </span>
              </a>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="mt-16 hidden items-center gap-4 lg:flex"
          >
            {steps.map((step, index) => (
              <span
                key={step.number}
                className={`flex items-center gap-3 font-[family-name:var(--mono)] text-xs motion-safe:transition-opacity ${
                  activeStep === null || activeStep === index
                    ? "opacity-100"
                    : "opacity-40"
                }`}
              >
                <span
                  className={`h-px w-8 ${
                    activeStep === index
                      ? "bg-[var(--on-dark-accent)]"
                      : "bg-[var(--on-dark-muted)]"
                  }`}
                />
                {step.number}
              </span>
            ))}
          </div>
        </div>

        <div data-journey-track className="relative lg:py-12">
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-[5px] top-0 w-px bg-[var(--line-dark)] md:left-[7px]"
          >
            <div
              data-journey-progress
              className="h-full w-full origin-top bg-[var(--on-dark-accent)]"
            />
          </div>
          <ol className="m-0 flex list-none flex-col gap-10 pl-7 md:gap-14 md:pl-10 lg:gap-28">
            {steps.map((step, index) => (
              <li key={step.number} className="relative">
                <span
                  aria-hidden="true"
                  className={`absolute -left-7 top-12 z-10 size-[11px] rounded-full border border-[var(--on-dark-accent)] md:-left-10 md:size-[15px] motion-safe:transition-colors ${
                    activeStep === null || activeStep === index
                      ? "bg-[var(--on-dark-accent)]"
                      : "bg-[var(--brand-indigo)]"
                  }`}
                />
                <div data-aos="rise">
                  <article
                    data-journey-card
                    data-active={activeStep === index}
                    className="relative origin-left rounded-2xl border border-[var(--glass-border)] bg-[var(--glass)] p-7 backdrop-blur-sm motion-safe:transition-[border-color,box-shadow] motion-safe:duration-500 data-[active=true]:border-[var(--on-dark-accent)] data-[active=true]:shadow-[0_0_40px_-18px_var(--on-dark-accent)] md:p-10 lg:min-h-[360px]"
                  >
                    <div className="mb-9 flex items-center justify-between gap-6">
                      <span
                        aria-hidden="true"
                        className="font-[family-name:var(--mono)] text-[clamp(3.5rem,5vw,5rem)] font-medium leading-none tracking-tight text-[var(--on-dark-accent)]"
                      >
                        {step.number}
                      </span>
                      <svg
                        aria-hidden="true"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[var(--on-dark-accent)]"
                      >
                        <path d={step.icon} />
                      </svg>
                    </div>
                    <span className="mb-3 block font-[family-name:var(--mono)] text-[10px] uppercase tracking-[0.14em] text-[var(--on-dark-muted)]">
                      Passo {step.number}
                    </span>
                    <h3 className="mb-[var(--space-h3-bottom)] text-[var(--font-size-h3)] font-light leading-[var(--line-height-h3)] tracking-[var(--tracking-h3)]">
                      {step.title}
                    </h3>
                    <p className="mb-0 text-base leading-relaxed text-[var(--on-dark-muted)]">
                      {step.text}
                    </p>
                  </article>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
