import { addCollection, Icon } from "@iconify/react/offline";
import { icons } from "@iconify-json/lucide";

addCollection(icons);

const signals = [
  {
    icon: "lucide:user-round-x",
    text: "Colaboradores que chegam, cumprem horário, mas não se envolvem.",
  },
  {
    icon: "lucide:list-todo",
    text: "Reuniões que não geram compromisso, só mais tarefas.",
  },
  {
    icon: "lucide:swords",
    text: "Conflitos de convivência que desgastam o ambiente de trabalho.",
  },
  {
    icon: "lucide:battery-low",
    text: "Falta de disposição para recomeçar após um período difícil.",
  },
];

export function TeamChallenge() {
  return (
    <section
      aria-labelledby="desafio-titulo"
      className="team-challenge dark bg-[linear-gradient(90deg,var(--brand-blue),var(--brand-indigo))]!"
    >
      <div className="team-challenge__inner" data-aos="compose">
        <div data-step="1" className="team-challenge__heading">
          <h2 id="desafio-titulo">
            Sua equipe está <span>desmotivada</span> e você sente isso todos os
            dias.
          </h2>
          <p>
            Uma equipe desmotivada pode apresentar queda de produtividade, menor
            envolvimento, dificuldades de relacionamento e redução do
            comprometimento com os objetivos da organização.
          </p>
        </div>
        <ul
          className="team-challenge__signals"
          aria-label="Sinais de desmotivação"
        >
          {signals.map((signal, index) => (
            <li
              key={signal.text}
              data-aos="card-up"
              data-aos-delay={String(index * 75)}
            >
              <span aria-hidden="true">
                <Icon icon={signal.icon} />
              </span>
              <p>{signal.text}</p>
            </li>
          ))}
        </ul>
        <p data-step="3" className="team-challenge__closing">
          Não é falta de esforço. É falta de conexão com o próprio propósito.
        </p>
      </div>
    </section>
  );
}
