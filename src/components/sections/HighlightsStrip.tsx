const highlights = [
  { value: "+30", label: "anos de palestras" },
  { value: "+3", label: "livros publicados" },
  { value: "1000+", label: "palestras realizadas" },
  { value: "10+", label: "segmentos atendidos" },
];

export function HighlightsStrip() {
  return (
    <section
      className="highlights-strip"
      aria-label="Números de Fernando Gonçalves"
    >
      <div className="highlights-strip__inner" data-aos="compose">
        {highlights.map((highlight, index) => (
          <div key={highlight.label} data-step={index}>
            <strong>{highlight.value}</strong>
            <span>{highlight.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
