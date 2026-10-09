import { useEffect, useRef } from "react"
import { BooksSection } from "../sections/BooksSection"
import heroBgOffice from "../../imports/optimized/equipe-motivada-1200.webp"
import fernandoPortrait1024 from "../../imports/optimized/fernando-simplex-retrato-graded-1024.webp"
import fernandoPortrait640 from "../../imports/optimized/fernando-simplex-retrato-graded-640.webp"
import equipeMotivada1200 from "../../imports/optimized/equipe-motivada-1200.webp"
import equipeMotivada640 from "../../imports/optimized/equipe-motivada-640.webp"
import "../../styles/sobre.css"

const content = {
  "intro": {
    "headerTitle": "Uma história real. Uma experiência de vida.",
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
      }, root)
      dispose = () => media.revert()
      document.fonts.ready.then(() => { if (!cancelled) ScrollTrigger.refresh() })
    }).catch(() => { })
    return () => { cancelled = true; dispose?.() }
  }, [])

  return (
    <div ref={pageRef} className="about-page">
      <div className="about-opening relative overflow-hidden bg-[#0A1428] text-white">
        {/* Background Backdrop: Dual-tone photo mask + Atmospheric Ghost Watermark + Discreet Lighting */}
        <div className="about-backdrop absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <img
            src={heroBgOffice.src}
            alt=""
            className="w-full h-full object-cover object-[75%_center] opacity-20 mix-blend-luminosity"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, transparent 15%, black 60%, black 100%), linear-gradient(to bottom, black 80%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, transparent 15%, black 60%, black 100%), linear-gradient(to bottom, black 80%, transparent 100%)",
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1428] via-[#0A1428]/85 to-transparent" />

          {/* Subtle ghost text */}
          <span className="about-ghost" aria-hidden="true">TRAJETÓRIA</span>

          {/* Subtle ambient blur wash at lower section */}
          <div className="absolute right-[5%] bottom-[10%] h-[550px] w-[550px] rounded-full bg-[var(--brand-cyan)] opacity-[0.06] blur-[120px]" />
          <div className="absolute right-[20%] bottom-[20%] h-[450px] w-[450px] rounded-full bg-[var(--brand-blue)] opacity-[0.12] blur-[90px]" />
        </div>

        {/* Left Column: Hero Copy */}
        <div className="about-hero-content relative z-10 flex flex-col justify-center py-20 md:py-32 lg:py-36">
          <p className="mb-4 font-[family-name:var(--mono)] text-[11px] uppercase tracking-[0.22em] text-[var(--on-dark-muted)]">
            <span aria-hidden="true" className="mr-2 text-[var(--on-dark-accent)]">|</span>
            História & Atuação
          </p>

          <h1 className="about-hero-title mb-6 max-w-[720px] leading-[1.08] tracking-[calc(-0.025em_+_1px)]">
            {content.intro.headerTitle}{" "}
            <span className="text-[var(--on-dark-accent)]">{content.intro.headerTitleAccent}</span>
          </h1>

          <p className="about-hero-lead mb-8 max-w-[580px] text-[16px] leading-[1.8] text-[var(--blue-200)]">
            {content.intro.headerSubtitle}
          </p>
        </div>

        {/* Right Column: Fernando Portrait with Background Graphics & Ambient Grading */}
        <div className="about-hero-portrait-stage relative z-10 flex items-end justify-center">
          {/* Discreet SVG Tech/Architectural Background Graphics */}
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
            <svg
              viewBox="0 0 800 900"
              className="absolute inset-0 h-full w-full object-contain opacity-45"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="sobreGradCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00CCE1" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#1D3761" stopOpacity="0.0" />
                </linearGradient>
                <pattern id="sobreDots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="#00CCE1" fillOpacity="0.14" />
                </pattern>
              </defs>

              {/* Dot matrix pattern patch */}
              <rect x="250" y="80" width="450" height="300" fill="url(#sobreDots)" />

              {/* Concentric compass & orbital arcs behind Fernando */}
              <circle cx="480" cy="480" r="260" fill="none" stroke="url(#sobreGradCyan)" strokeWidth="1" strokeDasharray="4 6" opacity="0.75" />
              <circle cx="480" cy="480" r="380" fill="none" stroke="#00CCE1" strokeWidth="0.75" strokeDasharray="10 10" opacity="0.25" />
              <circle cx="480" cy="480" r="500" fill="none" stroke="#00CCE1" strokeWidth="0.5" opacity="0.12" />

              {/* Diagonal trajectory accents */}
              <line x1="80" y1="180" x2="720" y2="780" stroke="#00CCE1" strokeWidth="0.75" strokeOpacity="0.2" />
              <line x1="180" y1="120" x2="780" y2="680" stroke="#00CCE1" strokeWidth="0.5" strokeDasharray="3 8" strokeOpacity="0.25" />

              {/* Technical crosshairs & coordinate labels */}
              <g opacity="0.35" transform="translate(240, 200)">
                <line x1="-8" y1="0" x2="8" y2="0" stroke="#00CCE1" strokeWidth="1" />
                <line x1="0" y1="-8" x2="0" y2="8" stroke="#00CCE1" strokeWidth="1" />
                <text x="14" y="4" fill="#00CCE1" fontSize="9" fontFamily="var(--mono)" letterSpacing="0.15em">EXP // SINCE 1992</text>
              </g>

              <g opacity="0.3" transform="translate(680, 320)">
                <line x1="-6" y1="0" x2="6" y2="0" stroke="#00CCE1" strokeWidth="1" />
                <line x1="0" y1="-6" x2="0" y2="6" stroke="#00CCE1" strokeWidth="1" />
              </g>
            </svg>
          </div>

          {/* Background Layered Glass Panes (like Home) */}
          <div className="absolute inset-0 z-[-1] pointer-events-none flex items-center justify-center">
            <div
              className="absolute top-[22%] right-[-5%] w-[110%] h-[75%] border-r border-t border-[var(--brand-cyan)]/30 bg-gradient-to-tr from-transparent to-[var(--brand-cyan)]/8 shadow-[0_0_35px_rgba(0,204,225,0.12)] backdrop-blur-[2px]"
              style={{ clipPath: "polygon(20% 100%, 100% 0, 100% 100%)" }}
            />
            <div
              className="absolute top-[18%] right-[22%] w-[80%] h-[68%] border-l border-t border-[var(--brand-blue)]/50 bg-gradient-to-tl from-transparent to-[var(--brand-blue)]/20 backdrop-blur-[2px]"
              style={{ clipPath: "polygon(0 0, 100% 30%, 80% 100%, 0 70%)" }}
            />
          </div>

          {/* Fernando Seated Portrait with Full Corporate Ambient Grade */}
          <div className="about-hero-portrait relative z-10 w-full max-w-[540px]">
            {/* Ground Floor & Contact Shadow System underneath puff and feet */}
            <div className="about-stage-floor" aria-hidden="true">
              <div className="about-floor-line" />
              <div className="about-shadow-ambient" />
              <div className="about-shadow-occlusion" />
              <div className="about-shadow-contact-puff" />
              <div className="about-shadow-contact-feet" />
            </div>

            <img
              src={fernandoPortrait1024.src}
              srcSet={`${fernandoPortrait640.src} 640w, ${fernandoPortrait1024.src} 1024w`}
              sizes="(max-width: 900px) 90vw, 540px"
              width={1024}
              height={1536}
              alt="Fernando Gonçalves sentado em um cubo, em retrato de corpo inteiro"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="about-hero-photo portrait-grade-corporate relative z-10 w-full h-auto object-contain object-bottom"
            />

            {/* Subtle Suit Ambient Light Sheen on dark trousers and jacket */}
            <div className="about-portrait-suit-sheen" aria-hidden="true" />

            {/* 3D Foreground Glowing Glass Pane */}
            <div className="absolute inset-0 z-20 pointer-events-none">
              <div
                className="absolute bottom-[2%] left-[-15%] w-[80%] h-[40%] bg-gradient-to-t from-[var(--brand-cyan)]/15 to-transparent border-t border-r border-[var(--brand-cyan)]/35 backdrop-blur-[1px]"
                style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
              />
            </div>
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
