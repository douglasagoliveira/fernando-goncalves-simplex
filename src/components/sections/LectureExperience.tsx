import { motion, useReducedMotion } from "motion/react"

const modules = [
  {
    number: "01",
    label: "Módulo 1",
    title: "A História",
    text: "Fernando apresenta os principais momentos de sua trajetória. Uma história real de dificuldades, quedas, recomeços e superação — criando identificação com os participantes.",
  },
  {
    number: "02",
    label: "Módulo 2",
    title: "As Estratégias",
    text: "Atitudes e estratégias desenvolvidas ao longo da vida para enfrentar situações limitantes: resiliência, perseverança, autoconhecimento, responsabilidade pessoal, otimismo e capacidade de adaptação.",
  },
  {
    number: "03",
    label: "Módulo 3",
    title: "Reflexão e Autoconscientização",
    text: "Participação direta do público com perguntas estratégicas sobre comportamento e convivência. Os participantes estabelecem metas e determinam datas para colocá-las em prática.",
  },
]

export function LectureExperience() {
  const reducedMotion = useReducedMotion()

  return (
    <section
      aria-labelledby="palestras-experiencia"
      className="lecture-experience overflow-hidden px-5 py-20 text-[var(--on-dark)] md:px-7 md:py-28 lg:py-32"
    >
      <div className="lecture-experience__inner mx-auto max-w-[var(--container-max)]">
        <div
          data-aos="compose"
          className="lecture-experience__header grid gap-8 lg:grid-cols-3 lg:items-center lg:gap-6"
        >
          <h2
            id="palestras-experiencia"
            data-step="1"
            className="lecture-experience__title mb-[var(--space-h2-bottom)] lg:mb-0 lg:col-span-2 max-w-[740px] text-[var(--font-size-h2)] font-light leading-[var(--line-height-h2)] tracking-[var(--tracking-h2)]"
          >
            Uma experiência dividida em{" "}
            <span>três momentos</span>
          </h2>
          <p
            data-step="2"
            className="lecture-experience-note mb-1 max-w-[390px] text-base leading-7 lg:col-span-1 lg:mb-0 lg:max-w-none lg:w-full"
          >
            As palestras podem ser adaptadas ao perfil, objetivo e
            disponibilidade de cada contratante.
          </p>
        </div>

        <ol className="lecture-experience__modules mt-12 grid list-none gap-5 p-0 md:mt-16 lg:grid-cols-3 lg:gap-6">
          {modules.map((module, index) => (
            <li key={module.number} data-aos="compose" className="min-w-0">
              <div data-step={index} className="h-full">
                <motion.article
                  whileHover={reducedMotion ? undefined : { y: -6 }}
                  transition={{ type: "spring", stiffness: 240, damping: 24 }}
                  className="group relative h-full"
                >
                  <a
                    href="/palestras"
                    aria-label={`Saiba mais sobre ${module.title}`}
                    className="lecture-experience__card relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-2xl p-7 focus-visible:outline-offset-4 md:p-8"
                  >
                    <div className="lecture-experience__card-head mb-9 flex items-center justify-between pb-6">
                      <span className="font-[family-name:var(--mono)] text-[11px] uppercase tracking-[0.1em]">
                        {module.label}
                      </span>
                      <span
                        aria-hidden="true"
                        className="lecture-experience__number text-5xl font-medium leading-none tracking-[calc(-0.04em_+_1px)] motion-safe:transition-colors"
                      >
                        {module.number}
                      </span>
                    </div>
                    <h3 className="lecture-experience__card-title mb-[var(--space-h3-bottom)] text-[var(--font-size-h3)] font-light leading-[var(--line-height-h3)] tracking-[var(--tracking-h3)]">
                      {module.title}
                    </h3>
                    <p className="lecture-experience__card-copy mb-9 text-[15px] leading-7">
                      {module.text}
                    </p>
                    <div className="lecture-experience__card-action mt-auto flex min-h-11 items-center justify-between gap-4 border-t pt-5 text-sm font-semibold">
                      <span>Saiba mais</span>
                      <span
                        aria-hidden="true"
                        className="lecture-experience__arrow flex size-9 items-center justify-center rounded-full text-xl motion-safe:transition-[background-color,transform] group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </div>
                  </a>
                </motion.article>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
