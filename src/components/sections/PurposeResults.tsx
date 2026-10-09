import purposeConsciencia from "../../imports/optimized/purpose-consciencia.webp";
import purposeDisposicao from "../../imports/optimized/purpose-disposicao.webp";
import purposeRelacionamento from "../../imports/optimized/purpose-relacionamento.webp";
import purposeResultados from "../../imports/optimized/purpose-resultados.webp";

const results = [
  {
    title: "Mais Disposição",
    description: "Colaboradores mais envolvidos e dispostos a participar.",
    image: purposeDisposicao.src,
    alt: "Equipe reunida em torno de uma mesa de trabalho",
  },
  {
    title: "Mais Consciência",
    description:
      "Profissionais estimulados a refletir sobre suas atitudes e responsabilidades.",
    image: purposeConsciencia.src,
    alt: "Profissionais conversando em um ambiente de trabalho aberto",
  },
  {
    title: "Melhor Relacionamento",
    description:
      "Reflexão sobre convivência, comunicação e respeito no ambiente de trabalho.",
    image: purposeRelacionamento.src,
    alt: "Pessoas colaborando e fazendo anotações durante uma reunião",
  },
  {
    title: "Melhores Resultados",
    description:
      "Uma equipe mais engajada contribui para o desempenho da organização.",
    image: purposeResultados.src,
    alt: "Equipe diversa trabalhando em conjunto em um escritório",
  },
];

export function PurposeResults() {
  return (
    <section
      className="purpose-results"
      aria-labelledby="purpose-results-title"
    >
      <div className="purpose-results-inner">
        <div className="purpose-results-intro" data-aos="compose">
          <h2 id="purpose-results-title" data-step="1">
            O que muda quando a equipe{" "}
            <span className="text-[var(--on-dark-accent)]">
              reencontra o propósito
            </span>
          </h2>
          <p className="purpose-results-lead" data-step="2">
            Colaboradores mais conscientes de seu papel e mais dispostos a
            contribuir podem fortalecer o ambiente de trabalho e favorecer
            melhores resultados.
          </p>
        </div>
        <div className="purpose-results-list" data-aos="purpose-reveal">
          {results.map((result, index) => (
            <article className="purpose-result" key={result.title}>
              <div className="purpose-result-media">
                <img
                  src={result.image}
                  width="1200"
                  height="787"
                  alt={result.alt}
                  loading="lazy"
                  decoding="async"
                />
                <span className="purpose-result-number" aria-hidden="true">
                  0{index + 1}
                </span>
              </div>
              <div className="purpose-result-copy">
                <h3>{result.title}</h3>
                <p>{result.description}</p>
              </div>
            </article>
          ))}
        </div>
        <blockquote className="purpose-results-quote" data-aos="compose">
          <span aria-hidden="true">“</span>
          <p data-step="1">
            Motivação não substitui gestão, planejamento ou estratégia. Mas pode
            ajudar pessoas a reencontrarem o propósito necessário para colocar
            tudo isso em prática.
          </p>
        </blockquote>
      </div>
    </section>
  );
}
