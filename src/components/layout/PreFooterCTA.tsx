import { Icon, addCollection } from "@iconify/react/offline";
import { icons } from "@iconify-json/lucide";
import fernandoRetrato from "../../imports/fernando-goncalves-retrato.jpg";
import simplexLogo from "../../imports/optimized/simplex-branco-320.webp";

addCollection(icons);

export function PreFooterCTA() {
  return (
    <section className="relative w-full overflow-hidden border-t border-white/10 bg-[#0A1428] text-white">
      {/* Ambient background glows for desktop/notebook */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-[5%] top-[20%] hidden h-[450px] w-[450px] rounded-full bg-[var(--brand-cyan)] opacity-[0.04] blur-[130px] lg:block" />
        <div className="absolute right-[8%] bottom-[10%] hidden h-[450px] w-[450px] rounded-full bg-[var(--brand-blue)] opacity-[0.14] blur-[110px] lg:block" />
        
        {/* Subtle decorative Simplex watermark on upper right background */}
        <div className="absolute -right-12 -top-12 opacity-[0.02] select-none">
          <img src={simplexLogo.src} alt="" className="h-[480px] w-[480px] object-contain rotate-12" />
        </div>
      </div>

      {/* Main Centered Content Container */}
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-12 py-16 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.18fr_0.82fr] lg:gap-14 xl:gap-20">
          
          {/* Left Column: Content */}
          <div className="flex flex-col justify-center">
            {/* Eyebrow badge */}
            <div className="mb-4 inline-flex items-center gap-2 font-[family-name:var(--mono)] text-[11px] uppercase tracking-[0.2em] text-[var(--on-dark-muted)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-cyan)]" />
              Transformação de Equipes
            </div>

            <h2 className="font-display font-light text-3xl sm:text-4xl md:text-[2.75rem] lg:text-[2.85rem] tracking-[calc(-0.025em_+_1px)] text-white mb-6 leading-[1.18]">
              <span className="md:hidden">
                Sua equipe precisa de<br />
                motivação?<br />
              </span>
              <span className="hidden md:block">
                Sua equipe precisa<br />
                de motivação?<br />
              </span>
              <em className="text-[var(--brand-cyan)] italic font-light">Vamos conversar.</em>
            </h2>
            
            <p className="text-[var(--on-dark-muted)] text-base md:text-lg mb-8 lg:mb-10 leading-relaxed font-light max-w-[540px]">
              Não deixe a desmotivação virar rotina. Agende uma conversa para entendermos o cenário da sua empresa e decidirmos juntos qual formato trará mais impacto e resultados reais.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start sm:items-center">
              <a
                href="/contato"
                className="inline-flex items-center justify-center gap-3 bg-[var(--brand-cyan)] text-[#0A1428] px-8 py-4 rounded-full font-semibold text-[0.85rem] tracking-[0.08em] uppercase hover:bg-white hover:shadow-[0_0_30px_rgba(0,204,225,0.35)] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-cyan)]"
              >
                Solicitar Proposta
                <Icon icon="lucide:arrow-up-right" width="18" height="18" />
              </a>
              
              {/* Secondary status badge on desktop */}
              <div className="hidden sm:flex items-center gap-3.5 border-l border-white/15 pl-5 py-1 text-xs leading-5 text-[var(--on-dark-muted)]">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>
                  Disponível para palestras<br />
                  <strong className="font-medium text-white">e treinamentos em todo o Brasil</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Balanced Portrait Card with Glassmorphic Frame */}
          <div className="relative mx-auto w-full max-w-[420px] lg:max-w-none">
            {/* Ambient halo behind portrait card */}
            <div className="absolute -inset-2 rounded-[28px] bg-gradient-to-tr from-[var(--brand-cyan)]/20 via-transparent to-[var(--brand-blue)]/30 opacity-70 blur-xl pointer-events-none" />

            {/* Framed Portrait Card */}
            <div className="relative overflow-hidden rounded-2xl lg:rounded-[24px] border border-white/15 bg-[#121E36]/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-sm">
              <div className="aspect-[4/4.6] sm:aspect-[4/4.5] lg:aspect-[4/4.8] w-full overflow-hidden">
                <img 
                  src={fernandoRetrato.src} 
                  alt="Fernando Gonçalves" 
                  className="h-full w-full object-cover object-[center_20%] transition-transform duration-700 ease-out hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>

              {/* Bottom Gradient overlay for badge integration */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0A1428]/90 via-[#0A1428]/40 to-transparent" />

              {/* Floating Speaker Badge on Card */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-white/15 bg-[#0A1428]/85 px-4 py-3 backdrop-blur-md shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--brand-cyan)]/15 text-[var(--brand-cyan)]">
                    <Icon icon="lucide:sparkles" width="18" height="18" />
                  </div>
                  <div>
                    <p className="text-sm font-medium leading-none text-white">Fernando Gonçalves</p>
                    <p className="mt-1 text-[11px] leading-none text-[var(--on-dark-muted)] font-[family-name:var(--mono)] uppercase tracking-wider">
                      Palestrante &amp; Storyteller
                    </p>
                  </div>
                </div>

                <span className="font-[family-name:var(--mono)] text-[10px] tracking-wider text-[var(--brand-cyan)] border border-[var(--brand-cyan)]/30 bg-[var(--brand-cyan)]/10 px-2.5 py-1 rounded-full">
                  +30 ANOS
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
