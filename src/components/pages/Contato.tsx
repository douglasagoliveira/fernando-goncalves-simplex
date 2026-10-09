import { useEffect, useRef, useState } from "react"
import type { FormEvent, ReactNode } from "react"
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Arrow, Button } from "../ui"
import { Portrait } from "../ui/Portrait"
import bgHero from "../../imports/optimized/fernando_palestra_bg.jpg"
import "../../styles/contato.css"

const questions = [
  {
    "question": "A palestra funciona para o meu segmento?",
    "answer": "Sim. Fernando já atuou em indústria, comércio, serviços, cooperativas, terceiro setor, instituições religiosas e eventos corporativos. Pelo método SIMPLEX, o conteúdo é personalizado ao perfil da sua equipe."
  },
  {
    "question": "Quanto tempo leva até a palestra acontecer?",
    "answer": "Após o primeiro contato, a proposta personalizada é enviada em até 24h. A data do evento é combinada conforme a disponibilidade da agenda — recomendamos antecipar o agendamento."
  },
  {
    "question": "É possível personalizar o conteúdo para minha empresa?",
    "answer": "Sim. Essa é a essência do método SIMPLEX. São considerados: perfil da organização, perfil da equipe, objetivos da contratação, tempo disponível e conteúdos prioritários."
  },
  {
    "question": "Qual o diferencial em relação a outros palestrantes?",
    "answer": "A principal ferramenta é a própria experiência de vida do palestrante — mais de 30 anos de atuação. A abordagem parte da identificação, gera reflexão e estimula atitudes concretas de mudança. Não é apenas inspiração: é compromisso com a ação."
  }
]

const socials = [
  ["Instagram", "@fernandosimplex", "https://www.instagram.com/fernandosimplex/"],
  ["Facebook", "Fernando Simplex", "https://www.facebook.com/fernandosimplex/"],
  ["TikTok", "@fernandosimplex", "https://www.tiktok.com/@fernandosimplex"],
  ["YouTube", "@FernandoSimplexCanal", "https://www.youtube.com/@FernandoSimplexCanal"],
]

function ContactMagnet({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  const horizontal = useMotionValue(0)
  const vertical = useMotionValue(0)
  const positionX = useSpring(horizontal, { stiffness: 220, damping: 24 })
  const positionY = useSpring(vertical, { stiffness: 220, damping: 24 })
  useEffect(() => {
    if (reduced) { horizontal.set(0); vertical.set(0) }
  }, [reduced, horizontal, vertical])
  const reset = () => { horizontal.set(0); vertical.set(0) }
  return <motion.div className="contact-magnet" style={{ x: reduced ? 0 : positionX, y: reduced ? 0 : positionY }} onPointerMove={event => {
    if (reduced || event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return
    const bounds = event.currentTarget.getBoundingClientRect()
    horizontal.set((event.clientX - bounds.left - bounds.width / 2) * 0.08)
    vertical.set((event.clientY - bounds.top - bounds.height / 2) * 0.12)
  }} onPointerLeave={reset} onBlur={reset}>{children}</motion.div>
}

export default function Contato() {
  const [selectedFormat] = useState(() => typeof window === "undefined" ? "" : new URLSearchParams(window.location.search).get("formato") ?? "")
  const [whatsappUrl, setWhatsappUrl] = useState("")
  const [emailUrl, setEmailUrl] = useState("")
  const root = useRef<HTMLDivElement>(null)
  const status = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const media = gsap.matchMedia()
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".contact-page-hero [data-contact-reveal]", { y: 24, opacity: 0, duration: 0.85, stagger: 0.1, ease: "power3.out", clearProps: "all" })
      gsap.utils.toArray<HTMLElement>(".contact-page-section [data-contact-reveal]").forEach(element => {
        gsap.from(element, { y: 24, opacity: 0, duration: 0.7, ease: "power3.out", clearProps: "all", scrollTrigger: { trigger: element, start: "top 94%", once: true } })
      })
    }, root)
    return () => media.revert()
  }, [])

  useEffect(() => {
    if (whatsappUrl) status.current?.focus({ preventScroll: true })
  }, [whatsappUrl])

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const labels = [
      ["nome", "Nome"],
      ["empresa", "Empresa / instituição"],
      ["email", "E-mail"],
      ["telefone", "Telefone"],
      ["cidade", "Cidade"],
      ["participantes", "Participantes"],
      ["evento", "Tipo de evento"],
      ["data", "Data desejada"],
      ["tempo", "Tempo disponível"],
      ["formato", "Formato"],
      ["objetivo", "Objetivo"],
    ]
    const message = `Olá! Gostaria de solicitar uma proposta de palestra com Fernando Gonçalves.\n\n${labels.map(([field, label]) => `${label}: ${data.get(field) || "A definir"}`).join("\n")}`
    setWhatsappUrl(
      `https://wa.me/5531998475453?text=${encodeURIComponent(message)}`,
    )
    setEmailUrl(
      `mailto:contato@fernandosimplex.com.br?subject=${encodeURIComponent("Solicitação de proposta — palestra")}&body=${encodeURIComponent(message)}`,
    )
  }


  return (
    <div className="contact-page" ref={root}>
      <section className="contact-page-hero relative overflow-hidden" aria-labelledby="contact-page-title">
        {/* Background Graphic */}
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
          <img src={bgHero.src} alt="" className="w-full h-full object-cover opacity-25 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-blue)] via-[var(--brand-blue)]/80 to-transparent" />
        </div>
        <div className="contact-page-container contact-page-hero-grid relative z-10">
          <div className="contact-page-hero-copy">
            <h1 id="contact-page-title" data-contact-reveal>Sua equipe precisa de motivação? <span>Vamos conversar.</span></h1>
            <p className="contact-page-hero-text" data-contact-reveal>Se sua empresa, instituição ou organização deseja proporcionar uma experiência motivacional capaz de estimular reflexão, participação e mudança de atitude, entre em contato. Fernando Gonçalves está disponível para palestras, treinamentos, eventos e projetos motivacionais personalizados.</p>
            <div className="contact-page-hero-cta" data-contact-reveal>
              <Button href="#contact-form">Solicite uma palestra</Button>
            </div>
          </div>
          <div className="contact-page-portrait" data-contact-reveal><Portrait variant="portrait" critical className="contact-page-photo" /></div>
        </div>
      </section>
      <section className="contact-page-section contact-page-main" id="contact-form" aria-labelledby="contact-form-title">
        <div className="contact-page-container contact-page-main-grid">
          <div className="contact-page-form-column">
            <header data-contact-reveal><p className="contact-page-label">Solicite uma Proposta</p><h2 id="contact-form-title">Preencha os dados abaixo</h2><p>Informe os dados do evento e nossa equipe entrará em contato para apresentar a melhor proposta.</p></header>
            <form className="contact-page-form" onSubmit={submit} onChange={() => { setWhatsappUrl(""); setEmailUrl("") }} aria-labelledby="contact-form-title">
              <input type="hidden" name="formato" value={selectedFormat} />
              <label>Nome *<input name="nome" autoComplete="name" required placeholder="Seu nome completo" /></label>
              <div className="contact-page-form-row">
                <label>Empresa / Instituição *<input name="empresa" autoComplete="organization" required placeholder="Nome da empresa" /></label>
                <label>Cidade *<input name="cidade" autoComplete="address-level2" required placeholder="Cidade / Estado" /></label>
              </div>
              <div className="contact-page-form-row">
                <label>E-mail *<input name="email" type="email" autoComplete="email" required placeholder="seu@email.com" /></label>
                <label>Telefone / WhatsApp *<input name="telefone" type="tel" autoComplete="tel" required placeholder="(00) 00000-0000" /></label>
              </div>
              <div className="contact-page-form-row">
                <label>Número Estimado de Participantes<input name="participantes" type="number" min="1" step="1" placeholder="Quantidade" /></label>
                <label>Tipo de Evento<select name="evento" defaultValue=""><option value="">Palestra / Treinamento / Congresso / Convenção / Outro</option>{["Palestra", "Treinamento", "Congresso", "Convenção", "Outro"].map(item => <option key={item}>{item}</option>)}</select></label>
              </div>
              <div className="contact-page-form-row">
                <label>Data Desejada<input name="data" type="date" /></label>
                <label>Tempo Disponível<select name="tempo" defaultValue=""><option value="">2h / 3-4h / Até 6h</option>{["2h", "3-4h", "Até 6h"].map(item => <option key={item}>{item}</option>)}</select></label>
              </div>
              <label>Objetivo da Palestra<textarea name="objetivo" rows={5} placeholder="Descreva o objetivo da contratação, perfil do público, expectativas..." /></label>
              <p className="contact-page-disclosure">* Campos obrigatórios. Nenhum dado é enviado antes de você confirmar a mensagem no canal escolhido.</p>
              <ContactMagnet><button type="submit" className="button contact-page-submit">Solicitar Proposta <Arrow /></button></ContactMagnet>
              {whatsappUrl && <div className="contact-page-status" ref={status} tabIndex={-1} role="status"><p>Sua mensagem está pronta, mas ainda não foi enviada. Escolha um canal e confirme o envio:</p><div className="contact-page-status-actions"><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="button">Enviar pelo WhatsApp <Arrow /></a><a href={emailUrl} className="button button--secondary">Enviar por e-mail <Arrow /></a></div></div>}
            </form>
          </div>
          <aside className="contact-page-aside" aria-labelledby="contact-direct-title">
            <div className="contact-page-direct" data-contact-reveal>
              <p className="contact-page-label">Informações</p><h2 id="contact-direct-title">Fale diretamente</h2>
              <a href="https://wa.me/5531998475453" target="_blank" rel="noopener noreferrer" className="contact-page-channel"><span className="contact-page-channel-icon" aria-hidden="true">↗</span><span><span className="contact-page-channel-label">WhatsApp</span><span className="contact-page-channel-value">(31) 99847-5453</span></span></a>
              <a href="mailto:contato@fernandosimplex.com.br" className="contact-page-channel"><span className="contact-page-channel-icon" aria-hidden="true">@</span><span><span className="contact-page-channel-label">E-mail</span><span className="contact-page-channel-value">contato@fernandosimplex.com.br</span></span></a>
              <div className="contact-page-channel contact-page-location"><span className="contact-page-channel-icon" aria-hidden="true">◎</span><div><p className="contact-page-channel-label">Localização</p><p className="contact-page-channel-value">Belo Horizonte, MG — Brasil</p><p>Atendemos eventos em todo o Brasil.</p></div></div>
              <div className="contact-page-socials"><h3>Redes Sociais</h3>{socials.map(([platform, handle, url]) => <a key={platform} href={url} target="_blank" rel="noopener noreferrer"><span>{platform}: <span>{handle}</span></span><Arrow /></a>)}</div>
            </div>
          </aside>
        </div>
      </section>
      <section className="contact-page-section contact-page-faq" aria-labelledby="contact-faq-title"><div className="contact-page-container contact-page-faq-grid"><header data-contact-reveal><h2 id="contact-faq-title">Perguntas Frequentes</h2></header><div>{questions.map((item,index) => <details key={item.question} className="contact-page-question" open={index === 0} data-contact-reveal><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div></div></section>
      </div>
  )
}
