import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "motion/react";
import { testimonials } from "../../data/testimonials";

import speakerImg from "../../imports/fernando-goncalves-palestras-depoimento.png";

const SET_COUNT = 5;
const SET_SIZE = testimonials.length;
const MIDDLE_SET_INDEX = 2; // Sets: [0], [1], [2] (middle), [3], [4]
const MIDDLE_SET_START = MIDDLE_SET_INDEX * SET_SIZE; // Index 20
const slides = Array.from({ length: SET_COUNT }, () => testimonials).flat();

const speakerSrc = speakerImg && typeof speakerImg === 'object' && 'src' in speakerImg ? speakerImg.src : speakerImg;

const controlClass =
  "flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-[var(--blue-950)]/60 text-white backdrop-blur-sm transition-all hover:border-[var(--on-dark-accent)] hover:bg-white/10 focus-visible:outline-[var(--on-dark-accent)] motion-reduce:transition-none";

export function Testimonials() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const current = useRef(MIDDLE_SET_START);
  const targetIndex = useRef(MIDDLE_SET_START);
  const isTeleporting = useRef(false);
  const scrollEndTimeout = useRef<number | undefined>(undefined);

  const [activeGlobalIndex, setActiveGlobalIndex] = useState(MIDDLE_SET_START);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [inView, setInView] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(true);

  const activeTestimonialIndex = ((activeGlobalIndex % SET_SIZE) + SET_SIZE) % SET_SIZE;

  const moveTo = useCallback(
    (index: number, animate = true) => {
      const container = track.current;
      if (!container) return;

      const targetElementIndex = Math.max(0, Math.min(index, slides.length - 1));
      targetIndex.current = targetElementIndex;

      const card = container.querySelector<HTMLElement>(
        `[data-index="${targetElementIndex}"]`,
      );
      if (!card) return;

      const targetScroll = card.offsetLeft - (container.clientWidth - card.offsetWidth) / 2;

      if (animate && motionAllowed) {
        container.style.scrollSnapType = "none";
        gsap.killTweensOf(container);

        gsap.to(container, {
          scrollLeft: targetScroll,
          duration: 0.65,
          ease: "power3.out",
          overwrite: "auto",
          onComplete: () => {
            container.style.scrollSnapType = "";
            
            // Normalize back to the middle set [20..29] seamlessly
            let normalizedIndex = targetElementIndex;
            if (targetElementIndex < MIDDLE_SET_START) {
              normalizedIndex = ((targetElementIndex % SET_SIZE) + SET_SIZE) % SET_SIZE + MIDDLE_SET_START;
            } else if (targetElementIndex >= MIDDLE_SET_START + SET_SIZE) {
              normalizedIndex = (targetElementIndex % SET_SIZE) + MIDDLE_SET_START;
            }

            if (normalizedIndex !== targetElementIndex) {
              const normalizedCard = container.querySelector<HTMLElement>(
                `[data-index="${normalizedIndex}"]`,
              );
              if (normalizedCard) {
                isTeleporting.current = true;
                const normScroll = normalizedCard.offsetLeft - (container.clientWidth - normalizedCard.offsetWidth) / 2;
                container.scrollTo({ left: normScroll, behavior: "instant" });
                targetIndex.current = normalizedIndex;
                current.current = normalizedIndex;
                setActiveGlobalIndex(normalizedIndex);
                requestAnimationFrame(() => {
                  isTeleporting.current = false;
                });
                return;
              }
            }

            current.current = targetElementIndex;
            setActiveGlobalIndex(targetElementIndex);
          },
        });
      } else {
        container.scrollTo({
          left: targetScroll,
          behavior: "instant",
        });
        current.current = targetElementIndex;
        setActiveGlobalIndex(targetElementIndex);
      }
    },
    [motionAllowed],
  );

  // Position track immediately at the middle set on initial render
  const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    const container = track.current;
    if (!container) return;
    const card = container.querySelector<HTMLElement>(
      `[data-index="${MIDDLE_SET_START}"]`,
    );
    if (card) {
      const targetScroll = card.offsetLeft - (container.clientWidth - card.offsetWidth) / 2;
      container.scrollLeft = targetScroll;
    }
  }, []);

  useEffect(() => {
    setReady(true);
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setMotionAllowed(!preference.matches);
      if (preference.matches) {
        setPlaying(false);
      }
    };
    const visibility = () => setVisible(!document.hidden);
    update();
    visibility();
    preference.addEventListener("change", update);
    document.addEventListener("visibilitychange", visibility);
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 },
    );
    if (section.current) observer.observe(section.current);

    // Initial positioning guarantee after layout is complete
    const container = track.current;
    if (container) {
      const initCard = container.querySelector<HTMLElement>(
        `[data-index="${MIDDLE_SET_START}"]`,
      );
      if (initCard) {
        const targetScroll = initCard.offsetLeft - (container.clientWidth - initCard.offsetWidth) / 2;
        container.scrollTo({ left: targetScroll, behavior: "instant" });
      }
    }

    return () => {
      observer.disconnect();
      preference.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);

  // Scroll tracking and auto-centering
  useEffect(() => {
    const container = track.current;
    if (!container) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      if (isTeleporting.current) return;

      const center = container.scrollLeft + container.clientWidth / 2;
      const cards = Array.from(
        container.querySelectorAll<HTMLElement>("[data-testimonial]"),
      );
      let closest = MIDDLE_SET_START;
      let minDistance = Infinity;

      cards.forEach((card) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const dist = Math.abs(cardCenter - center);
        if (dist < minDistance) {
          minDistance = dist;
          closest = Number(card.getAttribute("data-index") || MIDDLE_SET_START);
        }
      });

      current.current = closest;
      setActiveGlobalIndex(closest);

      if (!gsap.isTweening(container)) {
        targetIndex.current = closest;
      }

      // Normalization when user stops manually scrolling/dragging
      window.clearTimeout(scrollEndTimeout.current);
      scrollEndTimeout.current = window.setTimeout(() => {
        if (gsap.isTweening(container) || isTeleporting.current) return;
        const cur = current.current;
        if (cur < MIDDLE_SET_START || cur >= MIDDLE_SET_START + SET_SIZE) {
          const normalizedIndex = ((cur % SET_SIZE) + SET_SIZE) % SET_SIZE + MIDDLE_SET_START;
          moveTo(normalizedIndex, false);
        }
      }, 150);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const resize = new ResizeObserver(() => {
      if (!isTeleporting.current && !gsap.isTweening(container)) {
        moveTo(targetIndex.current, false);
      }
    });

    resize.observe(container);
    container.addEventListener("scroll", schedule, { passive: true });

    return () => {
      resize.disconnect();
      cancelAnimationFrame(frame);
      container.removeEventListener("scroll", schedule);
      window.clearTimeout(scrollEndTimeout.current);
    };
  }, [moveTo]);

  // Autoplay
  useEffect(() => {
    if (
      !playing ||
      !motionAllowed ||
      !inView ||
      interacting ||
      focused ||
      !visible
    )
      return;
    const timer = window.setInterval(() => {
      moveTo(current.current + 1);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [playing, motionAllowed, inView, interacting, focused, visible, activeGlobalIndex, moveTo]);

  // GSAP ScrollTrigger entrance animation on scroll arrival
  useEffect(() => {
    if (!section.current || reducedMotion || !motionAllowed) return;

    gsap.registerPlugin(ScrollTrigger);
    const cardShells = section.current.querySelectorAll(".testimonial-card-shell");
    if (!cardShells.length) return;

    gsap.set(cardShells, {
      clearProps: "transform,opacity",
    });

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardShells,
        {
          y: 60,
          rotateX: 8,
          transformPerspective: 900,
        },
        {
          y: 0,
          rotateX: 0,
          ease: "power3.out",
          stagger: {
            each: 0.02,
            from: "center",
          },
          scrollTrigger: {
            trigger: section.current,
            start: "top 85%",
            end: "top 35%",
            scrub: 0.6,
            immediateRender: false,
          },
        },
      );
    }, section);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, [motionAllowed, reducedMotion]);

  // 3D perspective tilt dynamic updates
  useEffect(() => {
    if (reducedMotion || !motionAllowed || !section.current) return;
    const figures = section.current.querySelectorAll<HTMLElement>(
      "[data-testimonial] figure",
    );
    if (!figures.length) return;

    gsap.to(figures, {
      y: (_index, element) => {
        const card = element.closest("[data-testimonial]");
        const position = Number(card?.getAttribute("data-index") ?? -1);
        return position === activeGlobalIndex ? 0 : 16;
      },
      rotateY: (_index, element) => {
        const card = element.closest("[data-testimonial]");
        const position = Number(card?.getAttribute("data-index") ?? -1);
        return position === activeGlobalIndex ? 0 : position < activeGlobalIndex ? -4 : 4;
      },
      duration: 0.6,
      stagger: {
        each: 0.02,
        from: "center",
      },
      ease: "power3.out",
      overwrite: "auto",
    });
  }, [activeGlobalIndex, motionAllowed, reducedMotion]);

  const navigate = (direction: number) => {
    moveTo(targetIndex.current + direction);
  };

  const goTo = (testimonialIndex: number) => {
    const currentTestimonial = ((activeGlobalIndex % SET_SIZE) + SET_SIZE) % SET_SIZE;
    let diff = (testimonialIndex - currentTestimonial) % SET_SIZE;
    if (diff > SET_SIZE / 2) diff -= SET_SIZE;
    if (diff < -SET_SIZE / 2) diff += SET_SIZE;
    moveTo(activeGlobalIndex + diff);
  };

  return (
    <section
      ref={section}
      aria-labelledby="depoimentos-titulo"
      aria-roledescription="carrossel"
      className="dark relative overflow-hidden border-t border-white/15 bg-[#0A1428] py-16 text-white md:min-h-[760px] md:py-[100px] lg:pt-[90px] lg:pb-[105px]"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false);
      }}
    >
      {/* Background Discreet Geometric Graphics & Halo (Desktop/PC) */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        {/* Soft cyan & royal blue ambient halo behind Fernando on PC */}
        <div className="absolute right-[2%] top-[2%] hidden h-[600px] w-[600px] rounded-full bg-[var(--brand-cyan)] opacity-[0.06] blur-[140px] lg:block" />
        <div className="absolute right-[10%] top-[25%] hidden h-[450px] w-[450px] rounded-full bg-[var(--brand-blue)] opacity-[0.12] blur-[100px] lg:block" />

        {/* Discreet geometric tech & architectural graphics */}
        <svg
          viewBox="0 0 1600 800"
          className="absolute inset-0 hidden h-full w-full object-cover opacity-40 lg:block"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="testiGradCyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00CCE1" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#1D3761" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="testiGradLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00CCE1" stopOpacity="0.0" />
              <stop offset="40%" stopColor="#00CCE1" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#00CCE1" stopOpacity="0.0" />
            </linearGradient>
            <pattern id="testiDots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#00CCE1" fillOpacity="0.12" />
            </pattern>
          </defs>

          {/* Subtle dot matrix patch in the upper right background */}
          <rect x="1050" y="40" width="480" height="320" fill="url(#testiDots)" />

          {/* Concentric orbital rings behind Fernando */}
          <circle cx="1320" cy="280" r="260" fill="none" stroke="url(#testiGradCyan)" strokeWidth="1" strokeDasharray="4 6" opacity="0.7" />
          <circle cx="1320" cy="280" r="380" fill="none" stroke="#00CCE1" strokeWidth="0.75" strokeDasharray="12 12" opacity="0.22" />
          <circle cx="1320" cy="280" r="520" fill="none" stroke="#00CCE1" strokeWidth="0.5" opacity="0.12" />

          {/* Elegant diagonal trajectory lines */}
          <line x1="880" y1="40" x2="1580" y2="680" stroke="url(#testiGradLine)" strokeWidth="1" />
          <line x1="1020" y1="20" x2="1620" y2="580" stroke="#00CCE1" strokeWidth="0.5" strokeDasharray="3 9" opacity="0.25" />

          {/* Subtle crosshair & editorial coordinate markers */}
          <g opacity="0.3" transform="translate(1120, 140)">
            <line x1="-8" y1="0" x2="8" y2="0" stroke="#00CCE1" strokeWidth="1" />
            <line x1="0" y1="-8" x2="0" y2="8" stroke="#00CCE1" strokeWidth="1" />
            <text x="14" y="4" fill="#00CCE1" fontSize="9" fontFamily="var(--mono)" letterSpacing="0.15em">EXP // 30Y</text>
          </g>

          <g opacity="0.25" transform="translate(1480, 220)">
            <line x1="-6" y1="0" x2="6" y2="0" stroke="#00CCE1" strokeWidth="1" />
            <line x1="0" y1="-6" x2="0" y2="6" stroke="#00CCE1" strokeWidth="1" />
          </g>
        </svg>
      </div>

      <img
        src={speakerSrc}
        width={621}
        height={754}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="portrait-grade-corporate pointer-events-none absolute right-[-4rem] top-16 z-10 block h-auto w-[400px] object-contain object-top opacity-70 [mask-image:linear-gradient(to_bottom,black_40%,rgba(0,0,0,0.3)_75%,transparent_95%),linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.4)_20%,black_45%)] [mask-composite:intersect] lg:top-4 lg:right-[max(0px,calc((100%_-_1380px)/2)_-_20px)] lg:w-[530px] xl:top-6 xl:right-[max(0px,calc((100%_-_1460px)/2)_+_10px)] xl:w-[590px] 2xl:w-[640px] lg:opacity-100 lg:[mask-image:linear-gradient(to_bottom,black_45%,rgba(0,0,0,0.2)_75%,transparent_95%),linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.4)_15%,black_35%)]"
      />
      <div
        className="pointer-events-none relative z-30 mx-auto max-w-[1296px] px-5 md:px-7 lg:pr-[460px] xl:pr-[500px]"
        data-aos="compose"
      >
        <div className="pointer-events-auto grid items-start gap-8 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] lg:grid-cols-[400px_minmax(0,1fr)] lg:gap-12">
          <div data-step="1">
            <p className="mb-4 font-[family-name:var(--mono)] text-[11px] uppercase tracking-[0.22em] text-[var(--on-dark-muted)]">
              <span
                aria-hidden="true"
                className="mr-2 text-[var(--on-dark-accent)]"
              >
                |
              </span>
              Depoimentos
            </p>
            <h2
              id="depoimentos-titulo"
              className="mb-0 max-w-[420px] text-[clamp(2.35rem,3.1vw,3rem)] font-light leading-[var(--line-height-h2)] tracking-[var(--tracking-h2)]"
            >
              <span className="text-[var(--on-dark-accent)]">O que dizem</span>
              <br className="hidden lg:inline" />{" "}
              sobre
              <br className="lg:hidden" />{" "}
              as
              <br className="hidden lg:inline" />{" "}
              palestras.
            </h2>
            <p className="testimonials-subtitle mb-0 mt-4 max-w-[320px] text-[var(--on-dark-muted)]">
              Mais do que conteúdo, minhas palestras provocam novas conexões,
              geram reflexões e deixam marcas reais nas pessoas e nas
              organizações.
            </p>
          </div>
        </div>
      </div>
      <div className="relative z-20 mt-10 md:mt-[20px] lg:-mt-10 xl:-mt-14">
        <div
          ref={track}
          id="depoimentos-cards"
          tabIndex={0}
          aria-label="Depoimentos dos participantes. Use as setas para navegar."
          className="relative snap-x snap-mandatory overflow-x-auto overscroll-x-contain focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--on-dark-accent)] [scrollbar-width:none] [--card-width:min(82vw,334px)] [&::-webkit-scrollbar]:hidden"
          onPointerDown={() => setInteracting(true)}
          onPointerUp={() => setInteracting(false)}
          onPointerCancel={() => setInteracting(false)}
          onTouchStart={() => setInteracting(true)}
          onTouchEnd={() => setInteracting(false)}
          onTouchCancel={() => setInteracting(false)}
          onKeyDown={(event) => {
            if (event.altKey || event.ctrlKey || event.metaKey) return;
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
              event.preventDefault();
              navigate(event.key === "ArrowRight" ? 1 : -1);
            } else if (event.key === "Home") {
              event.preventDefault();
              goTo(0);
            } else if (event.key === "End") {
              event.preventDefault();
              goTo(SET_SIZE - 1);
            }
          }}
        >
          <ul
            className="m-0 flex w-max list-none items-stretch gap-4 py-6 md:gap-7"
            style={{
              paddingLeft: "calc(50% - var(--card-width) / 2)",
              paddingRight: "calc(50% - var(--card-width) / 2)",
            }}
          >
            {slides.map((testimonial, position) => {
              const isActive = position === activeGlobalIndex;
              const itemNum = (position % SET_SIZE) + 1;

              return (
                <motion.li
                  key={`${testimonial.name}-${position}`}
                  data-testimonial=""
                  data-index={position}
                  data-active={isActive}
                  initial={false}
                  animate={{
                    scale: isActive ? 1 : 0.86,
                    opacity: isActive ? 1 : 0.6,
                    y: isActive ? 0 : 16,
                  }}
                  transition={{ type: "spring", stiffness: 220, damping: 26 }}
                  className="group flex h-[400px] w-[var(--card-width)] shrink-0 snap-center flex-col rounded-[16px] border border-white/10 bg-[#16233F]/70 p-6 pb-6 shadow-lg transition-[background-color,border-color,box-shadow] duration-500 ease-out data-[active=true]:border-[rgb(0_204_225/70%)] data-[active=true]:bg-[#1D3761] data-[active=true]:shadow-[0_20px_60px_rgb(0_204_225/12%)] motion-reduce:transition-none md:h-[460px] md:p-7 md:pb-7"
                >
                  <motion.div
                    className="testimonial-card-shell flex h-full flex-1 flex-col"
                    whileHover={
                      reducedMotion ? undefined : { y: -8, scale: 1.015 }
                    }
                    whileTap={reducedMotion ? undefined : { scale: 0.985 }}
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  >
                    <figure className="m-0 flex h-full flex-col">
                      <div className="mb-4 flex shrink-0 items-center justify-between">
                        <span className="font-[family-name:var(--mono)] text-[10px] tracking-[0.1em] text-[var(--on-dark-muted)] transition-opacity duration-500 group-data-[active=false]:opacity-[0.5]">
                          {String(itemNum).padStart(2, "0")} / {String(SET_SIZE).padStart(2, "0")}
                        </span>
                        <span
                          aria-hidden="true"
                          className="h-10 font-[family-name:var(--display)] text-[32px] leading-none text-[var(--brand-teal)] transition-opacity duration-500 group-data-[active=false]:opacity-[0.5]"
                        >
                          “
                        </span>
                      </div>
                      <blockquote className="m-0 flex-1 overflow-y-auto pr-3 text-[15px] leading-[1.65] transition-opacity duration-500 group-data-[active=false]:opacity-[0.6] group-data-[active=true]:md:text-[17px] md:text-base [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar]:w-1.5">
                        <p className="mb-0">
                          “{testimonial.quote}”
                        </p>
                      </blockquote>
                      <figcaption className="mt-5 flex shrink-0 items-center gap-4 border-t border-white/15 pt-5 md:pt-6">
                        <img
                          src={testimonial.photo}
                          width={240}
                          height={240}
                          alt={`Retrato de ${testimonial.name}`}
                          loading="lazy"
                          decoding="async"
                          className="h-12 w-12 shrink-0 rounded-full border border-white/20 object-cover"
                        />
                        <div className="min-w-0 transition-opacity duration-500 group-data-[active=false]:opacity-[0.6]">
                          <p className="mb-1 text-sm font-semibold leading-6 text-white">
                            {testimonial.name}
                          </p>
                          <p className="mb-0 text-xs leading-5 text-[var(--on-dark-muted)]">
                            {testimonial.role}
                          </p>
                        </div>
                      </figcaption>
                    </figure>
                  </motion.div>
                </motion.li>
              );
            })}
          </ul>
        </div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Depoimento anterior"
          aria-controls="depoimentos-cards"
          className={`${controlClass} absolute top-1/2 z-10 hidden -translate-y-1/2 lg:left-[max(0.75rem,calc(50%-510px))] lg:flex`}
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          type="button"
          onClick={() => navigate(1)}
          aria-label="Próximo depoimento"
          aria-controls="depoimentos-cards"
          className={`${controlClass} absolute top-1/2 z-10 hidden -translate-y-1/2 lg:right-[max(0.75rem,calc(50%-510px))] lg:flex`}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
      <div className="mx-auto mt-7 flex max-w-[1296px] flex-wrap items-center justify-center gap-5 px-5 md:px-7">
        <div
          className="flex items-center gap-2"
          role="group"
          aria-label="Escolher depoimento"
        >
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.name}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Ir para o depoimento ${index + 1} de ${SET_SIZE}: ${testimonial.name}`}
              aria-current={index === activeTestimonialIndex}
              className={`h-2 rounded-full transition-all duration-300 motion-reduce:transition-none ${
                index === activeTestimonialIndex
                  ? "w-6 bg-[var(--brand-cyan)]"
                  : "w-2 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="mx-auto mt-5 flex max-w-[1296px] flex-wrap items-center justify-between gap-5 px-5 md:px-7">
        <p className="mb-0 font-[family-name:var(--mono)] text-[10px] uppercase tracking-[0.08em] text-[var(--on-dark-muted)]">
          <span className="md:hidden">Deslize para explorar</span>
          <span className="hidden md:inline">
            Diferentes vozes. A mesma conexão.
          </span>
        </p>
        <div className={ready ? "flex items-center gap-3" : "hidden"}>
          <span
            className="mr-1 min-w-12 font-[family-name:var(--mono)] text-xs text-[var(--on-dark-muted)]"
            aria-live={playing ? "off" : "polite"}
            aria-atomic="true"
          >
            <span className="sr-only">Depoimento </span>
            {String(activeTestimonialIndex + 1).padStart(2, "0")} / {SET_SIZE}
          </span>
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Depoimento anterior"
            aria-controls="depoimentos-cards"
            className={`${controlClass} lg:hidden`}
          >
            <span aria-hidden="true">←</span>
          </button>
          {motionAllowed && (
            <button
              type="button"
              onClick={() => setPlaying(!playing)}
              aria-label={
                playing
                  ? "Pausar passagem automática"
                  : "Ativar passagem automática"
              }
              aria-pressed={playing}
              className={controlClass}
            >
              <span aria-hidden="true">{playing ? "Ⅱ" : "▷"}</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => navigate(1)}
            aria-label="Próximo depoimento"
            aria-controls="depoimentos-cards"
            className={controlClass + " lg:hidden"}
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
