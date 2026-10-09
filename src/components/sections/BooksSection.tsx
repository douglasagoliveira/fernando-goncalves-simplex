import desafioCover from "../../imports/optimized/livro-desafio-conjugal.webp"
import degrauCover from "../../imports/optimized/livro-meu-degrau.webp"
import mendigoCover from "../../imports/optimized/livro-um-mendigo.webp"

const books = [
  {
    title: "O Desafio Conjugal",
    description: "Estratégias práticas e reflexões essenciais para o aprimoramento da convivência mútua e o fortalecimento dos relacionamentos.",
    cover: desafioCover,
    height: 964,
  },
  {
    title: "Meu Degrau de Hoje",
    description: "365 diretrizes práticas em frases curtas de conscientização. Mensagens de alto impacto para o desenvolvimento pessoal contínuo.",
    cover: degrauCover,
    height: 967,
  },
  {
    title: "Um Mendigo, Uma Órfã e Eu",
    description: "Narrativa autobiográfica sobre resiliência na superação de grandes obstáculos e traumas, rumo ao êxito.",
    cover: mendigoCover,
    height: 890,
  },
]

export function BooksSection() {
  return (
    <section className="about-section about-books" aria-labelledby="about-books-title">
      <div className="about-container">
        <header className="about-books-heading" data-about-reveal>
          <p className="about-label">Obras publicadas</p>
          <h2 id="about-books-title">Livros de Fernando Gonçalves</h2>
          <p>Com vocação nata para a escrita, Fernando é um legítimo autor de peças motivacionais.</p>
        </header>
        <div className="about-books-grid">
          {books.map((book) => (
            <article className="about-book" key={book.title} data-about-reveal>
              <div className="about-book-cover">
                <img
                  src={book.cover.src}
                  alt={`Capa do livro ${book.title}`}
                  width={640}
                  height={book.height}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="about-book-copy">
                <h3>{book.title}</h3>
                <p>{book.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
