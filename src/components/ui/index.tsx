import type { ReactNode } from "react"

export const Arrow = () => (
  <span aria-hidden="true" className="arrow">
    ↗
  </span>
)

export function Button({
  children,
  secondary = false,
  href = "/contato",
}: {
  children: ReactNode
  secondary?: boolean
  href?: string
}) {
  return (
    <a
      href={href}
      className={`button ${secondary ? "button--secondary" : ""}`}
    >
      {children}
      <Arrow />
    </a>
  )
}

export function PageHero({
  label,
  title,
  children,
}: {
  label: string
  title: ReactNode
  children: ReactNode
}) {
  return (
    <section className="page-hero bg-[image:var(--hero-gradient)] dark px-5 pb-16 pt-36 text-white md:px-7 md:pb-24 md:pt-44">
      <div className="page-hero-inner mx-auto max-w-[1240px]">
        <div className="mb-12 flex gap-3 font-[family-name:var(--mono)] text-[11px] uppercase tracking-[0.1em] text-[var(--on-dark-muted)]">
          <a href="/" className="hover:text-white">
            Início
          </a>
          <span aria-hidden="true">/</span>
          <span>{label}</span>
        </div>
        <h1 className="page-title max-w-[960px]">{title}</h1>
        <p className="mb-0 max-w-[660px] text-base leading-7 text-[var(--on-dark-muted)]">
          {children}
        </p>
      </div>
    </section>
  )
}

export function FinalCta() {
  return (
    <section className="bg-[image:var(--section-gradient)] dark px-5 py-20 text-white md:px-7">
      <div
        data-aos="compose"
        className="mx-auto flex max-w-[1240px] flex-col items-start justify-between gap-8 md:flex-row md:items-center"
      >
        <div data-step="0">
          <h2 className="mb-0 max-w-[700px] text-[var(--font-size-h2)] font-light leading-[var(--line-height-h2)] tracking-[var(--tracking-h2)]">
            Sua equipe precisa de motivação?
            <br />
            <i className="text-[var(--on-dark-accent)]">Vamos conversar.</i>
          </h2>
        </div>
        <div data-step="2">
          <Button>Solicitar proposta</Button>
        </div>
      </div>
    </section>
  )
}
