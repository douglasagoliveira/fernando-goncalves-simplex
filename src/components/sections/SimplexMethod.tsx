import React, { useEffect, useRef, useState } from "react"
import fernandoSimplex from "../../assets/fernando-goncalves-simplex.jpg"

export function SimplexMethod() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="metodo-simplex"
      aria-labelledby="simplex-titulo"
      className="relative overflow-hidden bg-[#030919] text-white py-20 md:py-28 lg:py-32 px-6 sm:px-8 md:px-12 selection:bg-[#00cce1] selection:text-[#030919]"
      style={{
        background:
          "radial-gradient(ellipse 70% 50% at 85% 15%, rgba(0, 204, 225, 0.07), transparent 60%), radial-gradient(circle 600px at 15% 70%, rgba(29, 78, 216, 0.14), transparent 70%), linear-gradient(145deg, #020713 0%, #051026 50%, #030a1a 100%)",
      }}
    >
      {/* Background Decorative Large Outlined Watermark "SIMPLEX" */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute right-[-2%] bottom-[-2%] z-0 font-extrabold tracking-tight uppercase leading-none opacity-40 md:opacity-60"
        style={{
          fontSize: "clamp(5rem, 15vw, 13.5rem)",
          fontFamily: "var(--display, var(--font-sans))",
          color: "transparent",
          WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.06)",
        }}
      >
        SIMPLEX
      </div>

      <div className="relative z-10 mx-auto max-w-[var(--container-max)]">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1.15fr] lg:gap-20">
          {/* LEFT COLUMN: Composite Geometric Photo Card with Reveal & Docking Motion */}
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[500px] lg:max-w-[540px]">
              
              {/* 1. Thin Cyan Offset Accent Frame (Left & Bottom border bracket) */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-4 sm:-left-5 -bottom-4 sm:-bottom-5 w-[85%] h-[85%] border-l-2 border-b-2 border-[#00cce1]/60 transition-all duration-700 ease-out"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? "translate3d(0, 0, 0)"
                    : "translate3d(-10px, 30px, 0)",
                  transitionDelay: "60ms",
                }}
              />

              {/* 2. Cyan Curved Arc / Orbital Graphic */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 sm:-right-12 top-1/2 -translate-y-1/2 w-44 sm:w-56 h-44 sm:h-56 rounded-full border border-[#00cce1]/35 transition-all duration-1000 ease-out"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? "translate3d(0, -50%, 0) scale(1)"
                    : "translate3d(20px, -40%, 0) scale(0.9)",
                  transitionDelay: "120ms",
                  clipPath: "polygon(40% 0%, 100% 0%, 100% 100%, 40% 100%)",
                }}
              />

              {/* 3. Backdrop Solid Blue Graphic Block (Underneath & Offset to bottom-right) */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[#1d4ed8] shadow-[0_25px_60px_rgba(29,78,216,0.35)] transition-all ease-[cubic-bezier(0.16,1,0.3,1)] duration-800"
                style={{
                  transform: isVisible
                    ? "translate3d(18px, 20px, 0)"
                    : "translate3d(18px, 70px, 0)",
                  opacity: isVisible ? 1 : 0,
                  clipPath:
                    "polygon(0 0, calc(100% - 44px) 0, 100% 44px, 100% 100%, 0 100%)",
                }}
              />

              {/* 4. Foreground Main Photo Card (Encaixa sobre o bloco azul com atraso em ms) */}
              <div
                className="relative z-10 overflow-hidden bg-[#071329] shadow-2xl transition-all ease-[cubic-bezier(0.16,1,0.3,1)] duration-900"
                style={{
                  transform: isVisible
                    ? "translate3d(0, 0, 0)"
                    : "translate3d(0, 85px, 0)",
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: "180ms",
                  clipPath:
                    "polygon(0 0, calc(100% - 44px) 0, 100% 44px, 100% 100%, 0 100%)",
                }}
              >
                <img
                  src={fernandoSimplex.src}
                  alt="Fernando Gonçalves sorrindo em primeiro plano com equipe em capacitação pelo método SIMPLEX"
                  width={700}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover aspect-[4/3.5] sm:aspect-[4/3.4] block transition-transform duration-700 hover:scale-[1.02]"
                />

                {/* Subtle Chamfer Highlight Line on Top-Right Cut */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-0 right-0 w-[55px] h-[55px] border-t-2 border-r-2 border-white/20"
                  style={{
                    transform: "rotate(45deg) translate(8px, -28px)",
                  }}
                />
              </div>

              {/* 5. Bottom Cyan Glow Arc Line Accent */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-8 bottom-[-14px] w-2/3 h-6 bg-gradient-to-r from-transparent via-[#00cce1]/40 to-transparent blur-[6px] transition-opacity duration-1000"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: "300ms",
                }}
              />
            </div>
          </div>

          {/* RIGHT COLUMN: Typography & Call to Action */}
          <div className="flex flex-col items-start text-left">
            {/* Eyebrow / Tag */}
            <span
              className="text-[#00cce1] text-xs sm:text-[13px] font-semibold tracking-[0.25em] uppercase mb-3 inline-block transition-all duration-700 ease-out"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "none" : "translate3d(0, 20px, 0)",
                transitionDelay: "240ms",
              }}
            >
              METODOLOGIA SIMPLEX
            </span>

            {/* Main Title */}
            <h2
              id="simplex-titulo"
              className="text-3xl sm:text-4xl md:text-[2.75rem] lg:text-[3.25rem] font-light text-white leading-[1.12] tracking-[-0.02em] mb-4 transition-all duration-700 ease-out"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "none" : "translate3d(0, 20px, 0)",
                transitionDelay: "320ms",
              }}
            >
              Conheça a SIMPLEX<span className="text-[#00cce1]">.</span>
            </h2>

            {/* Subtitle */}
            <p
              className="simplex-subtitle text-[var(--font-size-subtitle)] leading-[var(--line-height-subtitle)] font-light text-slate-100 mb-6 max-w-[540px] transition-all duration-700 ease-out"
              style={{
                fontFamily: "var(--display)",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "none" : "translate3d(0, 20px, 0)",
                transitionDelay: "400ms",
              }}
            >
              Sistema Motivacional para Performances de{" "}
              <span className="text-[#38bdf8] font-normal">Excelência.</span>
            </p>

            {/* Paragraphs */}
            <div
              className="space-y-4 text-sm sm:text-[15px] text-slate-300 leading-relaxed font-light max-w-[540px] mb-8 transition-all duration-700 ease-out"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "none" : "translate3d(0, 20px, 0)",
                transitionDelay: "480ms",
              }}
            >
              <p className="m-0">
                O Simplex é uma metodologia desenvolvida para estruturar a
                experiência motivacional de acordo com as características e
                necessidades de cada contratante.
              </p>
              <p className="m-0">
                Diferente de palestras genéricas, o Simplex considera o perfil
                da organização, o perfil da equipe, os objetivos da contratação
                e os conteúdos prioritários — do planejamento à avaliação.
              </p>
            </div>

            {/* CTA Button */}
            <div
              className="transition-all duration-700 ease-out"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "none" : "translate3d(0, 20px, 0)",
                transitionDelay: "560ms",
              }}
            >
              <a
                href="/palestras"
                className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-lg bg-[#00cce1] text-[#031124] font-bold text-xs sm:text-[13px] tracking-wider uppercase shadow-[0_8px_25px_rgba(0,204,225,0.28)] hover:bg-[#38e1f3] hover:shadow-[0_12px_32px_rgba(0,204,225,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00cce1]"
              >
                <span>CONHEÇA O MÉTODO</span>
                <span
                  aria-hidden="true"
                  className="text-base leading-none transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 font-bold"
                >
                  ↗
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
