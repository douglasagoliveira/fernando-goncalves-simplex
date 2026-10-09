import { Icon, addCollection } from "@iconify/react/offline";
import { icons } from "@iconify-json/lucide";
import fernandoRetrato from "../../imports/fernando-goncalves-retrato.jpg";
import simplexLogo from "../../imports/optimized/simplex-branco-320.webp";

addCollection(icons);

export function PreFooterCTA() {
  return (
    <section className="relative w-full bg-[#0a1122] border-t border-[var(--glass-border)] flex flex-col lg:flex-row min-h-[500px] lg:min-h-[580px]">
      
      {/* Left Column: Content */}
      <div className="relative w-full lg:w-[55%] flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20 lg:py-28 overflow-hidden">
        
        {/* Subtle Watermark/Element to fill space */}
        <div className="absolute top-0 right-0 translate-x-[15%] -translate-y-[15%] opacity-[0.025] pointer-events-none select-none">
          <img src={simplexLogo.src} alt="" className="w-[450px] h-[450px] object-contain rotate-12" />
        </div>
        
        {/* Glow */}
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--brand-cyan)] opacity-[0.035] blur-[120px] pointer-events-none rounded-full -translate-x-1/2 translate-y-1/2 z-0" />

        <div className="relative z-10 max-w-xl">
          {/* Kicker */}
          <div className="flex items-center gap-4 mb-8">
            <span className="h-px w-10 bg-[var(--brand-cyan)]"></span>
            <span className="uppercase tracking-[calc(0.25em_+_1px)] text-[var(--brand-cyan)] text-[0.65rem] font-bold">Transformação Corporativa</span>
          </div>

          <h2 className="font-display font-light text-4xl md:text-[2.75rem] tracking-[calc(-0.025em_+_1px)] text-white mb-6 leading-[1.2]">
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
          
          <p className="text-[var(--on-dark-muted)] text-base md:text-lg mb-12 leading-relaxed font-light">
            Não deixe a desmotivação virar rotina. Agende uma conversa para entendermos o cenário da sua empresa e decidirmos juntos qual formato trará mais impacto e resultados reais.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <a href="/contato" className="inline-flex items-center justify-center gap-3 bg-[var(--brand-cyan)] text-[var(--blue-950)] px-8 py-4 rounded-full font-medium text-[0.85rem] tracking-[calc(0.1em_+_1px)] uppercase hover:bg-white transition-all shadow-[0_0_20px_rgba(0,204,225,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-cyan)]">
              Solicitar Proposta
              <Icon icon="lucide:arrow-up-right" width="18" height="18" />
            </a>
            
            {/* Secondary subtle element to balance the visual weight */}
            <div className="hidden sm:flex items-center gap-4 text-sm text-[var(--on-dark-muted)] border-l border-white/10 pl-6 h-12">
               <span className="font-light">Disponível para<br/>palestras e treinamentos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Full Bleed Image */}
      <div className="w-full lg:w-[45%] h-[400px] lg:h-auto relative">
        {/* Mobile gradient blend to transition smoothly from text */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0a1122] to-transparent z-10 lg:hidden"></div>
        
        {/* Desktop subtle gradient to blend the edge between columns */}
        <div className="hidden lg:block absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0a1122] to-transparent z-10"></div>
        
        <img 
          src={fernandoRetrato.src} 
          alt="Fernando Gonçalves" 
          className="w-full h-full object-cover object-[center_30%]"
          loading="lazy"
        />
      </div>

    </section>
  );
}
