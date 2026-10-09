export const siteUrl = "https://www.fernandosimplex.com.br"

const pages: Record<string, {
  title: string
  description: string
}> = {
  "/": {
    title: "Fernando Gonçalves | Storyteller e Palestrante Motivacional",
    description:
      "Desde 1992, Fernando Gonçalves transforma sua história de vida em reflexão e novas atitudes. Conheça sua trajetória e palestras com o método SIMPLEX.",
  },
  "/sobre": {
    title: "Sobre Fernando Gonçalves | História, trajetória e livros",
    description:
      "Conheça a trajetória de Fernando Gonçalves: storyteller, palestrante motivacional e autor. Uma história real de desafios, resiliência e recomeços.",
  },
  "/palestras": {
    title: "Palestras e método SIMPLEX | Fernando Gonçalves",
    description:
      "Conheça o método SIMPLEX, os três momentos da palestra e os formatos personalizados de Fernando Gonçalves para empresas, instituições e eventos.",
  },
  "/contato": {
    title: "Contato e proposta de palestra | Fernando Gonçalves",
    description:
      "Solicite uma proposta de palestra com Fernando Gonçalves. Informe os detalhes do seu evento e entre em contato por WhatsApp ou e-mail.",
  },
}

export function getPageMetadata(path: string) {
  const normalized = path.replace(/\/$/, "") || "/"
  return {
    ...(pages[normalized] ?? pages["/"]),
    url: siteUrl + (normalized === "/" ? "/" : normalized),
    image: `${siteUrl}/og-fernando.webp`,
  }
}

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Fernando Gonçalves",
  url: siteUrl,
  jobTitle: "Storyteller e Palestrante Motivacional",
  email: "contato@fernandosimplex.com.br",
  telephone: "+55-31-99847-5453",
  image: `${siteUrl}/og-fernando.webp`,
}
