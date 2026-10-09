import { useEffect, useRef } from "react"
import { BooksSection } from "../sections/BooksSection"
import equipeMotivada1200 from "../../imports/optimized/equipe-motivada-1200.webp"
import equipeMotivada640 from "../../imports/optimized/equipe-motivada-640.webp"
import "../../styles/sobre.css"

const content = {
  "intro": {
    "headerTitle": "Uma história real.",
    "headerTitleAccent": "Uma mensagem que conecta.",
    "headerSubtitle": "Fernando Gonçalves é storyteller e palestrante motivacional desde 1992. Sua experiência nasceu muito antes dos palcos, em uma vida marcada por dificuldades, recomeços e pela busca de caminhos quando parecia não haver saída.",
    "sectionLabel": "Minha História",
    "sectionTitle": "Das dificuldades à decisão de não desistir",
    "paragraphs": [
      "Durante a infância e adolescência, enfrentou situações extremamente adversas: problemas de saúde, extrema pobreza, bullying, violência familiar, dificuldades comportamentais e emocionais relacionadas ao TDAH e experiências traumáticas durante sua formação.",
      "Filho de um homem que enfrentou a condição de andarilho e ex morador de rua e de uma mulher órfã que passou por experiências de extrema exploração durante a infância, Fernando cresceu conhecendo de perto realidades que poderiam facilmente produzir desesperança.",
      "Na adolescência, foi enviado para um internato, onde enfrentou humilhações e diferentes formas de violência. Apesar de tudo isso, decidiu não desistir. Essa decisão tornou se o ponto de partida de uma trajetória construída com resiliência, perseverança, paciência, otimismo, disposição para recomeçar e, principalmente, responsabilidade pelas próprias escolhas.",
      "Hoje, Fernando transforma essa experiência em conteúdo, reflexão e inspiração para pessoas que precisam recuperar a disposição para seguir em frente. Mais do que contar uma história, Fernando utiliza sua história para provocar novas histórias."
    ]
  },
  "timeline": [
    {
      "year": "Infância",
      "title": "Primeiros desafios",
      "description": "Problemas de saúde, extrema pobreza, bullying, violência familiar, dificuldades comportamentais e emocionais relacionadas ao TDAH e experiências traumáticas durante a formação."
    },
    {
      "year": "Adolescência",
      "title": "Internato e superação",
      "description": "Enviado para um internato, enfrentou humilhações e diferentes formas de violência. Estudou inicialmente até a antiga 6ª série. Apesar de tudo, decidiu não desistir."
    },
    {
      "year": "Retomada",
      "title": "Volta aos estudos",
      "description": "Anos mais tarde, decidiu retomar os estudos, prestou o ENEM e concluiu o ensino médio. Ingressou posteriormente em um curso superior de Marketing, mas direcionou sua carreira para a comunicação visual e para a comunicação com pessoas."
    },
    {
      "year": "1992",
      "title": "Início como palestrante",
      "description": "Foi em pequenas reuniões e encontros religiosos que começou a desenvolver sua experiência como palestrante. Até que, em determinado momento, simplesmente contou sua própria história a um grupo de pessoas. A reação foi surpreendente."
    },
    {
      "year": "Década de 1990",
      "title": "Experiência corporativa",
      "description": "Atuou como coordenador de treinamento motivacional de uma das maiores empresas de assistência médica do Brasil, desenvolvendo atividades em Belo Horizonte e em diversas cidades de Minas Gerais."
    },
    {
      "year": "Evolução",
      "title": "Os convites começaram a surgir",
      "description": "Algumas pessoas se identificaram com suas experiências e passaram a aplicar em suas próprias vidas atitudes que Fernando havia desenvolvido ao longo de sua trajetória: resiliência, perseverança, paciência, otimismo, coragem para recomeçar e responsabilidade pelas próprias escolhas."
    },
    {
      "year": "Hoje",
      "title": "+30 anos transformando vidas",
      "description": "Uma carreira construída não apenas sobre conhecimento teórico, mas sobre experiência, observação, relacionamento humano e vivência prática. Mais de três décadas dedicadas à comunicação, ao desenvolvimento humano e à motivação."
    }
  ],
  "experience": [
    {
      "title": "Palestras motivacionais",
      "description": "Para empresas da indústria, comércio e serviços que buscam renovar o engajamento e a atitude de suas equipes.",
      "tag": "Corporativo"
    },
    {
      "title": "Treinamentos para equipes de vendas",
      "description": "Motivação, atitude, perseverança, relacionamento interpessoal e foco inegociável em resultados.",
      "tag": "Vendas & Performance"
    },
    {
      "title": "Treinamentos para cooperados",
      "description": "Fortalecimento do senso de união, cooperação mútua e visão de futuro para grupos e associações.",
      "tag": "Cooperativismo"
    },
    {
      "title": "Instituições religiosas e terceiro setor",
      "description": "Igrejas, ministérios, ONGs e projetos sociais com foco em propósito, restauração e superação.",
      "tag": "Social & Terceiro Setor"
    },
    {
      "title": "Grupos familiares",
      "description": "Encontros e momentos de reflexão sobre convivência, perdão, inteligência emocional e fortalecimento de laços.",
      "tag": "Família & Vida"
    },
    {
      "title": "Convenções e grandes plenárias",
      "description": "Congressos, convenções anuais, alinhamento estratégico de líderes e eventos de grande escala.",
      "tag": "Convenções"
    }
  ],
  "quote": "Conhecer os dois lados da relação profissional faz diferença. Fernando entende que motivação não acontece isoladamente. Ela está relacionada ao ambiente, às relações, à liderança, ao reconhecimento, à comunicação e, principalmente, à maneira como cada pessoa percebe seu papel dentro de um grupo.",
  "differences": [
    {
      "icon": "★",
      "title": "Uma história verdadeira",
      "description": "A principal ferramenta de Fernando é sua própria experiência de vida."
    },
    {
      "icon": "★",
      "title": "+30 anos de atuação",
      "description": "Experiência como palestrante desde 1992."
    },
    {
      "icon": "★",
      "title": "Experiência corporativa",
      "description": "Atuação junto a empresas e equipes de diferentes segmentos."
    },
    {
      "icon": "★",
      "title": "Vivência dos dois lados",
      "description": "Experiência tanto como colaborador quanto como gestor."
    },
    {
      "icon": "★",
      "title": "Identificação com o público",
      "description": "A abordagem parte da realidade de uma pessoa comum enfrentando desafios reais."
    },
    {
      "icon": "★",
      "title": "Interatividade",
      "description": "Dinâmicas, participação do público, brincadeiras e atividades práticas."
    },
    {
      "icon": "★",
      "title": "Personalização",
      "description": "O conteúdo pode ser adaptado ao perfil e aos objetivos de cada contratante."
    },
    {
      "icon": "★",
      "title": "Foco em atitude",
      "description": "A palestra não termina na inspiração. O participante é estimulado a definir atitudes concretas para começar a mudança."
    }
  ],
  "knowledge": [
    "Relações Humanas",
    "Comunicação Interpessoal",
    "Gerenciamento de Equipes",
    "Oratória",
    "Liderança Organizacional",
    "Análise Comportamental",
    "Comunicação Eleitoral",
    "Assessoria Parlamentar"
  ],
  "closing": "Além de proficiência técnica e criativa em Design Gráfico, Design Digital, Redação e Produção de Mídias."
}

export default function Sobre() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    let dispose: (() => void) | undefined
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled || !pageRef.current) return
      gsap.registerPlugin(ScrollTrigger)
      const root = pageRef.current
      const media = gsap.matchMedia()
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(root.querySelectorAll(".about-opening .about-hero-content > *"), { y: 24, opacity: 0, duration: 0.9, stagger: 0.12, ease: "power3.out", clearProps: "opacity,transform" })
        root.querySelectorAll<HTMLElement>("[data-about-reveal]").forEach((element) => {
          gsap.from(element, { y: 24, opacity: 0, duration: 0.85, ease: "power3.out", clearProps: "all", scrollTrigger: { trigger: element, start: "top 94%", once: true } })
        })
        gsap.fromTo(root.querySelector("[data-about-progress]"), { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: root.querySelector(".about-timeline"), start: "top 65%", end: "bottom 65%", scrub: 0.5 } })

        const heroOpening = root.querySelector(".about-opening")
        const ghost = root.querySelector(".about-ghost")
        if (ghost && heroOpening) {
          gsap.killTweensOf(ghost)
          gsap.to(ghost, {
            xPercent: -50,
            ease: "none",
            scrollTrigger: {
              trigger: heroOpening,
              start: "top top",
              end: "bottom top",
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          })
        }
      }, root)
      dispose = () => media.revert()
      document.fonts?.ready?.then(() => { if (!cancelled) ScrollTrigger.refresh() })
      window.addEventListener("resize", () => { if (!cancelled) ScrollTrigger.refresh() })
    }).catch(() => { })
    return () => { cancelled = true; dispose?.() }
  }, [])

  return (
    <div ref={pageRef} className="about-page">
      <div className="about-opening relative overflow-hidden bg-[#0A1428] text-white">
        {/* Full-bleed Responsive Background Image: Desktop (topo-site-sobre.jpg) & Mobile (topo-site-sobre-mob.jpg) */}
        <div className="about-hero-bg absolute inset-0 z-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
          <picture className="w-full h-full block">
            <source media="(max-width: 768px)" srcSet="/topo-site-sobre-mob.jpg" />
            <img
              src="/topo-site-sobre.jpg"
              alt=""
              className="about-hero-bg-img w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </picture>

          {/* Desktop Scrim: Protects text legibility on the left while keeping Fernando crisp and vibrant on the right */}
          <div className="about-hero-scrim-desktop hidden md:block absolute inset-0 bg-gradient-to-r from-[#0A1428]/95 via-[#0A1428]/70 via-50% to-transparent pointer-events-none" />

          {/* Mobile Scrim: Protects text legibility on the top while keeping Fernando seated clearly visible below */}
          <div className="about-hero-scrim-mobile md:hidden absolute inset-0 bg-gradient-to-b from-[#0A1428]/95 via-[#0A1428]/80 via-45% to-transparent pointer-events-none" />

          {/* Bottom transition blend */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0A1428] to-transparent pointer-events-none" />

          {/* Subtle ghost text */}
          <span className="about-ghost" aria-hidden="true">TRAJETÓRIAS</span>
        </div>

        {/* Hero Content overlaid on background */}
        <div className="about-hero-content relative z-10 flex flex-col justify-center">
          <h1 className="about-hero-title mb-6 max-w-[700px] leading-[1.08] tracking-[calc(-0.025em_+_1px)]">
            <span className="md:block">{content.intro.headerTitle}</span>{" "}
            <span className="text-[var(--on-dark-accent)]">
              <span className="md:block">Uma mensagem</span>{" "}
              <span className="md:block">que conecta.</span>
            </span>
          </h1>

          <p className="about-hero-lead mb-8 max-w-[560px] text-[16px] md:text-[17px] leading-[1.8] text-[var(--blue-200)]">
            {content.intro.headerSubtitle}
          </p>
          <div className="flex">
            <a href="/contato" className="button bg-accent text-accent-foreground hover:bg-[var(--cyan-300)] border-none shadow-lg shadow-cyan-950/40">
              Solicite uma palestra <span aria-hidden="true" className="arrow">↗</span>
            </a>
          </div>
        </div>
      </div>
      <section className="about-section about-journey" aria-labelledby="about-journey-title">
        <div className="about-container about-split">
          <header className="about-sticky-heading">
            <p className="about-label">Trajetória</p>
            <h2 id="about-journey-title" data-about-reveal>De uma infância de dificuldades a uma carreira dedicada a pessoas</h2>
          </header>
          <div className="about-timeline">
            <div className="about-timeline-track" aria-hidden="true"><span data-about-progress /></div>
            {content.timeline.map((item) => <article key={item.year} data-about-reveal className="about-timeline-item"><p className="about-label">{item.year}</p><h3>{item.title}</h3><p>{item.description}</p></article>)}
          </div>
        </div>
      </section>
      <section className="about-section about-experience" aria-labelledby="about-experience-title">
        <div className="about-container">
          <header className="about-experience-header" data-about-reveal>
            <p className="about-label">
              <span aria-hidden="true" className="about-label-accent">|</span> Experiência & Atuação
            </p>
            <h2 id="about-experience-title">
              Décadas de experiência falando com pessoas e equipes
            </h2>
            <p className="about-experience-lead">
              Ao longo de sua trajetória, Fernando Gonçalves acumulou vivência prática conectando-se diretamente com diferentes públicos, culturas organizacionais e desafios humanos reais.
            </p>
          </header>

          <div className="about-experience-layout">
            {/* Visual Column: Team Photography Showcase with Glassmorphism Overlays */}
            <div className="about-experience-showcase" data-about-reveal>
              <div className="about-experience-photo-card">
                <div className="about-experience-photo-frame">
                  <img
                    src={equipeMotivada1200.src}
                    srcSet={`${equipeMotivada640.src} 640w, ${equipeMotivada1200.src} 1200w`}
                    sizes="(max-width: 1023px) 100vw, 540px"
                    alt="Equipe motivada e engajada durante dinâmica de treinamento corporativo"
                    className="about-experience-photo"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="about-experience-photo-overlay" aria-hidden="true" />
                </div>

                {/* Floating Glassmorphism Micro-Card */}
                <div className="about-experience-floating-badge" aria-hidden="true">
                  <div className="about-floating-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <div className="about-floating-copy">
                    <span className="about-floating-title">Conexão & Engajamento</span>
                    <span className="about-floating-desc">Dinâmicas que transformam atitudes em equipe</span>
                  </div>
                </div>
              </div>

              {/* Thought Leadership Quote Card */}
              <blockquote className="about-experience-quote-card">
                <div className="about-quote-mark" aria-hidden="true">“</div>
                <p className="about-quote-text">
                  {content.quote}
                </p>
                <footer className="about-quote-author">
                  <span className="about-quote-name">Fernando Gonçalves</span>
                  <span className="about-quote-role">Storyteller & Palestrante Motivacional</span>
                </footer>
              </blockquote>
            </div>

            {/* Content Column: Experience Domain Cards */}
            <div className="about-experience-domains">
              <div className="about-experience-grid">
                {content.experience.map((item, idx) => (
                  <article
                    key={item.title}
                    data-about-reveal
                    className="about-experience-card"
                  >
                    <div className="about-card-top">
                      <span className="about-card-number">0{idx + 1}</span>
                      <span className="about-card-tag">{item.tag}</span>
                    </div>
                    <h3 className="about-card-heading">{item.title}</h3>
                    <p className="about-card-description">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <BooksSection />
      <section className="about-section about-differences" aria-labelledby="about-differences-title">
        <div className="about-container">
          <header className="about-section-heading" data-about-reveal><p className="about-label">Diferenciais</p><h2 id="about-differences-title">Por que contratar Fernando Gonçalves?</h2></header>
          <div className="about-differences-grid">{content.differences.map((item) => <article key={item.title} data-about-reveal><span className="about-star" aria-hidden="true">{item.icon}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></article>)}</div>
        </div>
      </section>
      <section className="about-section about-knowledge" aria-labelledby="about-knowledge-title">
        <div className="about-container about-split">
          <header data-about-reveal><p className="about-label">Conhecimentos</p><h2 id="about-knowledge-title">Áreas de atuação e estudo</h2><p>Em constante busca por aprimoramento, Fernando possui conhecimento em áreas estratégicas do desenvolvimento humano e corporativo.</p></header>
          <div>
            <div className="about-knowledge-list" role="list">
              {content.knowledge.map((item) => (
                <div
                  key={item}
                  data-about-reveal
                  role="listitem"
                  tabIndex={0}
                  className="about-knowledge-item"
                >
                  <h3 className="text-inherit m-0 font-light">{item}</h3>
                </div>
              ))}
            </div>
            <p className="about-knowledge-note" data-about-reveal>{content.closing}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
