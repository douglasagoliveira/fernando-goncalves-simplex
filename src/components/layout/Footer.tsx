import { addCollection, Icon } from "@iconify/react/offline";
import { icons } from "@iconify-json/lucide";
import simplexLogo from "../../imports/optimized/simplex-branco-320.webp";

addCollection(icons);

export function Footer() {
  return (
    <footer className="dark bg-[var(--blue-950)] text-[var(--foreground)] pt-14 pb-10 md:pt-18 md:pb-12 border-t border-[var(--glass-border)] mt-auto w-full">
      {/* Full-width container optimized for Desktop / Notebook and mobile */}
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 xl:gap-14 2xl:gap-16 items-start">

          {/* Column 1: Logo & Identity (4 cols on PC) */}
          <div className="lg:col-span-4 flex flex-col justify-start">
            <a
              href="/"
              aria-label="Fernando Gonçalves - Início"
              className="inline-block mb-5 w-fit focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--brand-cyan)] rounded-md transition-opacity hover:opacity-90"
            >
              <img
                src={simplexLogo.src}
                alt="SIMPLEX"
                width={320}
                height={315}
                className="w-28 md:w-36 object-contain"
                decoding="async"
              />
            </a>
            <div>
              <h2 className="footer-identity-name text-[var(--on-dark)] text-2xl font-light tracking-tight mb-2">
                Fernando Gonçalves
              </h2>
              <p className="text-[var(--on-dark-muted)] text-sm leading-relaxed mb-6 max-w-sm">
                Storyteller e Palestrante Motivacional. Transformando histórias em grandes conexões e atitudes transformadoras.
              </p>
              <div className="flex items-center gap-2 text-xs text-[var(--on-dark-muted)]">
                <span className="inline-block w-2 h-2 rounded-full bg-[var(--brand-cyan)] animate-pulse" />
                <span>Disponível para palestras em todo o Brasil</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation & Socials (3 cols on PC) */}
          <div className="lg:col-span-3 lg:pl-2 xl:pl-6 flex flex-col justify-center lg:self-center">
            <h3 className="font-display font-light text-lg md:text-xl text-[var(--white)] tracking-[calc(0.05em_+_1px)] uppercase mb-5">
              Navegação
            </h3>
            <nav
              className="flex flex-col gap-1.5 text-sm font-medium tracking-[calc(0.03em_+_1px)] uppercase"
              aria-label="Navegação do rodapé"
            >
              <a
                href="/"
                className="text-[var(--on-dark-muted)] hover:text-[var(--brand-cyan)] transition-colors w-fit focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-cyan)] rounded-sm py-0.5"
              >
                Início
              </a>
              <a
                href="/sobre"
                className="text-[var(--on-dark-muted)] hover:text-[var(--brand-cyan)] transition-colors w-fit focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-cyan)] rounded-sm py-0.5"
              >
                Sobre Fernando
              </a>
              <a
                href="/palestras"
                className="text-[var(--on-dark-muted)] hover:text-[var(--brand-cyan)] transition-colors w-fit focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-cyan)] rounded-sm py-0.5"
              >
                Método SIMPLEX
              </a>
              <a
                href="/contato"
                className="text-[var(--on-dark-muted)] hover:text-[var(--brand-cyan)] transition-colors w-fit focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-cyan)] rounded-sm py-0.5"
              >
                Fale Conosco
              </a>
            </nav>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-7">
              <a
                href="https://wa.me/5531998475453"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--brand-cyan)] text-[var(--blue-950)] hover:bg-[var(--white)] transition-all shadow-[0_0_15px_rgba(0,204,225,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-cyan)]"
                aria-label="Fale pelo WhatsApp"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/fernandosimplex/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--glass)] hover:bg-[var(--glass-border)] text-[var(--white)] transition-colors border border-[var(--glass-border)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-cyan)]"
                aria-label="Instagram"
              >
                <Icon icon="lucide:instagram" width="18" height="18" />
              </a>
              <a
                href="https://www.youtube.com/@FernandoSimplexCanal"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--glass)] hover:bg-[var(--glass-border)] text-[var(--white)] transition-colors border border-[var(--glass-border)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-cyan)]"
                aria-label="YouTube"
              >
                <Icon icon="lucide:youtube" width="18" height="18" />
              </a>
              <a
                href="https://linkedin.com/in/fernandogoncalves"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--glass)] hover:bg-[var(--glass-border)] text-[var(--white)] transition-colors border border-[var(--glass-border)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-cyan)]"
                aria-label="LinkedIn"
              >
                <Icon icon="lucide:linkedin" width="18" height="18" />
              </a>
            </div>
          </div>

          {/* Column 3: Contact / Decision CTA Card (5 cols on PC) */}
          <div className="lg:col-span-5 flex w-full">
            <div className="relative w-full bg-gradient-to-br from-[var(--brand-blue)] to-[#152342] rounded-2xl p-7 md:p-8 xl:p-9 border border-[var(--glass-border)] hover:border-[var(--brand-cyan)]/40 shadow-[0_15px_35px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col justify-between transition-colors duration-300">
              {/* Glow effect inside card */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--brand-cyan)] opacity-[0.07] blur-3xl pointer-events-none rounded-full translate-x-1/3 -translate-y-1/3" />
              
              <div className="relative z-10">
                <span className="text-xs font-bold uppercase tracking-[calc(0.08em_+_1px)] text-[var(--brand-cyan)] block mb-2">
                  Próximo Passo
                </span>
                <h3 className="font-display font-light text-xl md:text-2xl text-white mb-3 leading-snug">
                  Qual é o próximo passo para sua equipe?
                </h3>
                <p className="text-[var(--on-dark-muted)] text-sm mb-6 leading-relaxed">
                  Descubra como o Método SIMPLEX pode transformar desafios em resultados reais para sua liderança e colaboradores.
                </p>
                <div>
                  <a
                    href="/contato"
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[var(--brand-cyan)] text-[var(--blue-950)] font-bold text-xs uppercase tracking-wider hover:bg-white shadow-[0_0_20px_rgba(0,204,225,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span>Solicitar uma proposta</span>
                    <span aria-hidden="true" className="text-sm font-bold">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-6 border-t border-[var(--glass-border)] flex flex-col sm:flex-row justify-between items-center text-center sm:text-left text-xs text-[var(--on-dark-muted)] gap-3">
          <p>© {new Date().getFullYear()} Fernando Gonçalves · Todos os direitos reservados</p>
          <p className="text-[11px] uppercase tracking-wider text-[var(--on-dark-muted)]/70">
            Método SIMPLEX — Performances de Excelência
          </p>
        </div>
      </div>
    </footer>
  );
}
