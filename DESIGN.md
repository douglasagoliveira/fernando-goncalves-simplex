# Fernando Gonçalves — Sistema de Design

## Direção

Uma identidade **Swiss Corporate / SIMPLEX**: racional, precisa e humana. Os azuis corporativos da marca estruturam o site; ciano e teal entram como acentos, nunca como grandes campos luminosos. Fotografia humana, recortada e integrada ao fundo, sem arco, cápsula, círculo ou moldura ornamental. Glassmorphism limitado a formulário e ação secundária.

## Arquitetura do site

Quatro páginas independentes, conforme `src/imports/ESTRUTURA.md`, com rotas reais e conteúdo editorial resumido sem repetições:

- **Início (`/`):** manifesto, proposta de valor, resumo da história e chamadas para conhecer o trabalho.
- **Sobre (`/sobre`):** biografia, trajetória, experiência profissional, obras e habilidades.
- **Palestras (`/palestras`):** método SIMPLEX, três módulos, formatos, personalização, participação e FAQ.
- **Contato (`/contato`):** canais diretos e formulário completo para preparar uma proposta.

React Router em modo Data, layout compartilhado, indicação da página ativa, navegação mobile, título por página e retorno ao topo em mudanças de rota. As ofertas levam ao formulário com o formato pré-preenchido.

## Narrativa da home

1. **Manifesto:** adversidade transformada em força.
2. **Identificação:** a história torna o discurso crível.
3. **Trajetória:** resumo com acesso à página Sobre.
4. **Depoimentos:** dez falas reais, com nome, cargo e fotografia, imediatamente após Conheça Fernando.
5. **Trabalho:** impacto esperado com acesso à página Palestras.
6. **Conversão:** chamada para a página Contato, sem duplicar o formulário.

## Sistema de cores

Fonte: anexo `CORES_identidade.jpg`. Os valores RGB escritos no anexo são a referência numérica.

| Cor da identidade | Token primitivo  | RGB           | HEX       | Uso                                                  |
| ----------------- | ---------------- | ------------- | --------- | ---------------------------------------------------- |
| Azul principal    | `--brand-blue`   | 34, 51, 92    | `#22335C` | Marca, fundos e ações em superfícies claras          |
| Azul secundário   | `--brand-indigo` | 52, 71, 117   | `#344775` | Superfícies elevadas e degradês discretos            |
| Ciano             | `--brand-cyan`   | 0, 204, 225   | `#00CCE1` | CTA sobre fundo escuro, foco e pequenos acentos      |
| Teal              | `--brand-teal`   | 81, 168, 177  | `#51A8B1` | Apoio e escala de acentos                            |
| Cinza             | `--brand-gray`   | 204, 204, 204 | `#CCCCCC` | Escala neutra e bordas                               |
| Apoio escuro      | `--brand-plum`   | 40, 20, 40    | `#281428` | Primitivo preservado, sem uso em grandes superfícies |

O terceiro quadrado parece visualmente acinzentado, mas informa RGB 40/20/40. Preserva-se o valor escrito como primitivo; não se inventa um RGB para aproximar a miniatura.

**Azul de fundo mais escuro:** `#1e2d52` (RGB 30, 45, 82), registrado em `--blue-950` / `--ink` e aplicado no degradê do herói, em `.story`, no rodapé e nas superfícies escuras globais. Substitui `#050914` / `#070c18`. As demais variações de azul (`#0c1424`, `#0d1626`, `#101a30`, `#16233f`, `#18264a`, `--brand-blue`, `--brand-indigo`) permanecem inalteradas.

Arquitetura em `src/styles/theme.css`: primitivos → escalas → semânticos → componentes. Escalas de azul (50–950), ciano (50–900), teal (50–900) e neutros (50–900); cores de sucesso, aviso e erro não dependem apenas dos acentos da marca.

| Papel semântico         | Token                                               | Referência                                                  |
| ----------------------- | --------------------------------------------------- | ----------------------------------------------------------- |
| Fundo / conteúdo        | `--background`, `--foreground`                      | Cinza 50 / azul 900                                         |
| Card / popover          | `--card`, `--popover`                               | Branco com texto azul profundo                              |
| Ação principal clara    | `--primary`, `--primary-foreground`                 | Azul principal / branco                                     |
| Ação no escuro          | `--accent`, `--accent-foreground`                   | Ciano / azul 950                                            |
| Texto secundário claro  | `--muted-foreground`                                | Neutro 700                                                  |
| Texto secundário escuro | `--on-dark-muted`                                   | Azul 200                                                    |
| Acento legível claro    | `--on-light-accent`                                 | Ciano 700; não usar ciano puro para texto pequeno no branco |
| Acento legível escuro   | `--on-dark-accent`                                  | Ciano 300                                                   |
| Formulário              | `--field-dark`, `--field-error`, `--input`          | Campo escuro, erro claro e borda neutra                     |
| Estados                 | `--success`, `--warning`, `--destructive`, `--ring` | Cores funcionais de alto contraste                          |
| Vidro                   | `--glass`, `--glass-border`                         | Transparência controlada e borda visível                    |

Preservados o contrato Tailwind `@theme inline`, os tokens padrão e os aliases anteriores. Variante `.dark` define texto, superfície, ação, borda e foco adequados ao fundo escuro. Espaçamento, largura máxima e raios também são centralizados.

## Tipografia

A hierarquia tipográfica do site é dividida de forma estrita e centralizada entre três famílias:

- **Títulos e subtítulos (Display):** Switzer (`var(--display)`) — estética suíça neo-grotesca, elegante e precisa. Utilizada **exclusivamente** em todos os títulos (`h1` a `h6`), subtítulos de seções (`.hero-subtitle`, `.simplex-subtitle`, `.lecture-formats-subtitle`, `.testimonials-subtitle`), cabeçalhos de dobras e marcas de impacto.
- **Corpo e Interface (Body / UI):** DM Sans (`var(--body)`) — altamente legível, neutra e contemporânea. Substitui a fonte anterior e cobre **todos os textos que não sejam títulos**: textos de corpo, descrições, parágrafos, labels e rótulos, menus e navegação, botões (`button`, `.header-cta`, `.button`), campos de formulário, textos auxiliares, legendas e informações secundárias.
- **Estrutural / Metadados (Mono):** DM Mono (`var(--mono)`) — pesos 300, 400 e 500, reservada para numeração sequencial, índices técnicos, tags e metadados (ex.: `EXP // 30Y`).

### Tokens e carregamento

- Tokens globais (`src/styles/theme.css`):
  - `--display: 'Switzer', sans-serif;`
  - `--body: 'DM Sans', sans-serif;`
  - `--mono: 'DM Mono', monospace;`
  - `--font-sans: var(--body);`
  - `--font-display: var(--display);`
  - `--font-mono: var(--mono);`
- Carregamento:
  - **Switzer:** servida localmente em WOFF2 via `@font-face` em `src/styles/fonts.css` (`/font-switzer/`) com `font-display: swap`.
  - **DM Sans & DM Mono:** carregadas via Google Fonts com `preconnect` no `<head>` de `src/layouts/MainLayout.astro` e import em `src/styles/fonts.css` com `display=swap`, prevenindo FOUT.

### Escala de subtítulos

Subtítulos sempre maiores que o corpo (16px) e menores que `h3` (24–30,4px), em peso 300:

| Papel | Token / classe | Clamp | Faixa em px |
| ----- | -------------- | ----- | ----------- |
| Subtítulo do herói (home) | `.hero-subtitle` (`src/index.css`) | `clamp(1.45rem, 2vw, 1.85rem)` | 23,2 – 29,6 |
| Subtítulo do manifesto (2ª dobra da home) | `.team-challenge__heading > p` | mesmo clamp do herói | 23,2 – 29,6 |
| Subtítulo SIMPLEX (3ª dobra da home) | `SimplexMethod.tsx` | mesmo clamp do herói | 23,2 – 29,6 |
| Subtítulos de seção | `--font-size-subtitle` (`src/styles/theme.css`) | `clamp(1.4rem, 1.8vw, 1.7rem)` | 22,4 – 27,2 |
| Subtítulo de depoimentos | `.testimonials-subtitle` | fixo `15px` | 15 |

- Entrelinha: `--line-height-subtitle: 1,35` (depoimentos: 1,7); espaçamento abaixo: `--space-subtitle-bottom`.
- O herói é sempre maior que o subtítulo de seção em qualquer largura; os tokens acima são a única fonte de tamanho — novos subtítulos devem reutilizá-los.

## Logotipo e fotografia

- Logotipo SIMPLEX **branco original**, sem filtros ou recoloração, no cabeçalho, no rodapé e no método sobre fundo escuro.
- Logotipo **bicolor original apenas sobre fundo claro**, na apresentação dos formatos.
- Manter proporção, transparência e respiro. Não redesenhar símbolo ou tipografia do logo.
- Hero: fotografia fornecida com microfone e fundo transparente, integrada diretamente ao campo azul. Sem moldura geométrica.
- Sobre: retrato fornecido com camisa azul, também recortado e integrado ao campo azul.
- Todas as imagens usadas são WebP, com `width`/`height`. Retratos e imagem editorial possuem `srcset` e `sizes`. Apenas o retrato principal tem prioridade alta; fotografias abaixo da dobra usam lazy loading.
- Arquivos PNG fornecidos ficam preservados; a aplicação utiliza derivados otimizados em `src/imports/optimized/`.

## Componentes

- **Header:** navegação entre quatro rotas com página ativa; vira menu expansível em telas pequenas.
- **Eyebrow:** número sequencial + régua; organiza as dobras sem competir com o título.
- **Ícones:** pack **Lucide via Iconify** (`@iconify/react/offline` + `@iconify-json/lucide`), o mesmo ecossistema do `astro-icon` do Astro. Renderização síncrona no build (SVG inline, sem chamadas de API e sem JS extra — os componentes não são hidratados). Grade 24×24, traço fino (`stroke-width: 1.6`), cor herdada do acento (`currentColor`), sempre dentro de um wrapper `aria-hidden`. Uso atual: marcadores dos sinais de desmotivação na home (substituindo a numeração `01`–`04`). Novos ícones devem vir de `lucide:*`, não de emoji ou SVG solto.
- **Button:** primário claro e secundário em vidro; ambos com ícone direcional.
- **Format row:** unidade de oferta com duração, benefício e CTA.
- **Accordion:** `details` / `summary` nativos, com navegação por teclado e funcionamento sem JavaScript; um item aberto por vez.
- **Form:** labels persistentes, dados do evento, contato, validação nativa e estado com `role=status`. Prepara mensagem para WhatsApp ou e-mail; não há integração de backend nem confirmação fictícia de recebimento.

## Movimento

### Depoimentos na home

Cabeçalho com eyebrow `| DEPOIMENTOS`, título "O que dizem sobre as palestras." e descrição "Mais do que conteúdo, minhas palestras provocam novas conexões, geram reflexões e deixam marcas reais nas pessoas e nas organizações.", ao lado do recorte do Fernando palestrando com microfone (fundo transparente, com fade inferior).

Fileira de stats em DM Mono (números reais confirmados): `+1000` palestras realizadas, `+30` anos de experiência, `+50` empresas e instituições. No desktop em 3 colunas alinhadas à esquerda ao lado do título; no mobile, os 3 dados aparecem em colunas iguais que cabem na tela, sem rolagem nem faixa rolável.

Fonte das falas e cargos: `src/data/content.ts` do repositório original `douglasagoliveira/SiteFernandoGoncalves`, consultado em 30/09/2026 (commit `d9e1e02545b91dd19444131ff1a52f1af47e1868`). As dez pessoas com fotografias fornecidas estão em `src/data/testimonials.ts`, com os textos completos, sem inventar declarações. Vinícius Chaves e Vanilda Gomes não foram incluídos por não terem fotografias anexadas nesta solicitação.

Carrossel nativo com scroll-snap exibindo três cards por vez no desktop (um no mobile), com o card central em destaque (escala 1,03, borda teal, fundo índigo, opacidade total) e laterais reduzidas (escala 0,93, opacidade 0,6); superfícies azuis, fotos redondas, contador por card e dots de navegação (ativo alongado em ciano) além de setas laterais sobrepostas no desktop e controles compactos no mobile. Duas cópias decorativas nas extremidades permitem o loop contínuo; ambas usam `aria-hidden` e `inert` para não duplicar conteúdo nos leitores de tela. A passagem automática ocorre a cada 8 segundos apenas com a seção visível. Hover, foco e aba oculta pausam temporariamente; swipe, roda, teclado ou setas interrompem a passagem até reativação explícita. Há controles de anterior, próximo e pausa; teclado aceita setas, Home e End. Sem dependência adicional. Com movimento reduzido, não há autoplay, escala ou transição. As dez falas continuam disponíveis no HTML estático e pela rolagem nativa sem JavaScript. Fotos JPG originais preservadas; derivados WebP de 240px, carregamento lazy e dimensões explícitas.

### Ampliação do repertório

Padrões leves inspirados em BlurText (React Bits) e CountUp (Magic UI), adaptados ao AOS existente e à renderização estática, sem instalar bibliotecas visuais completas:

- Texto palavra a palavra, com desfoque curto de 3px e defasagem de 45ms, em títulos selecionados.
- Revelação por máscara nos títulos internos, além das linhas do manifesto inicial.
- Trajetória em linha do tempo: trilho teal desenhado por etapa, título sequencial e corpo com atraso de 200ms. Cada etapa entra uma única vez ao chegar ao viewport.
- Contagem de 0 a +30 na estatística da home; o HTML estático e leitores de tela recebem sempre o valor final.
- Entrada lateral dos módulos SIMPLEX e zoom discreto nas obras, com defasagem de até 200ms.
- Transição de opacidade curta na mudança de página, sem atrasar os links nem retirar conteúdo do HTML.

Lenis é a única dependência nova: importação dinâmica, suavização da roda com interpolação de 0,12, toque nativo (sem inércia artificial), teclado nativo, zoom do navegador preservado e campos de formulário excluídos da suavização. Mudanças de rota cancelam a inércia e voltam imediatamente ao topo. O parallax é limitado a 60px e reduzido em telas pequenas. Alterações em `prefers-reduced-motion` são acompanhadas em tempo real: Lenis é destruído, entradas e contadores são desativados e o conteúdo permanece visível. Sem WebGL, partículas ou animações decorativas contínuas.

Um só vocabulário, em `src/styles/motion.css` + `useSiteMotion`: réguas desenham da esquerda para a direita (eyebrow, linha dos princípios, máscara da foto na home) e o conteúdo sobe ~28px abaixo delas. AOS (carregado sob demanda) só dispara a entrada no viewport, uma vez; as transições são CSS próprias. Composições (`data-aos="compose"` + `data-step`) revelam título → conteúdo → imagem → CTA, com passos de 110ms. Heróis animam por CSS no carregamento, com título revelado por linha apenas na home. Parallax discreto no retrato do herói e nas fotos das histórias. O header vira uma barra compacta fixa ao rolar para cima, com indicador de progresso em ciano. Hover apenas em elementos clicáveis. Tudo passa pela classe `html.motion`: desativada com `prefers-reduced-motion` e removida se o JS falhar, então o HTML pré-renderizado continua visível.

## Regras de layout e responsividade

- Grade central de 1240px, com margens fluidas.
- O desktop usa assimetria entre conteúdo e retrato; abaixo de 900px, as colunas se tornam uma narrativa vertical.
- Cards de vidro apenas onde há sobreposição sobre fundo escuro (formulário e CTA secundário). O restante usa linhas finas, não caixas repetidas.
- Alvos interativos possuem contraste, foco visível e movimento curto (até 250ms).

## Especificação técnica e limites

O projeto é construído em **Astro + TypeScript / Islands** (`@astrojs/react`, React 19, Tailwind CSS v4 e Vite), gerando HTML estático performático com hidratação parcial e componentes reativos apenas onde necessário.

Aplicações concretas das diretrizes:

- `astro build` gera o HTML pré-renderizado estático das quatro páginas (`/`, `/sobre`, `/palestras`, `/contato`) em `dist/`, com conteúdo totalmente indexável e acessível sem JavaScript.
- Componentes interativos operam como Astro Islands (`client:load`, `client:visible` ou `client:idle`), garantindo JavaScript mínimo enviado ao cliente.
- SEO estático por página: título, descrição, canonical, Open Graph, Twitter Card e dados estruturados Person. O domínio usado é: `www.fernandosimplex.com.br`.
- Idioma `pt-BR`, sitemap das quatro URLs, robots com indexação permitida, favicon e imagem social otimizada.
- Links semânticos, semântica de formulário, foco visível, FAQ nativo e respeito rigoroso a `prefers-reduced-motion`.
- Build estático totalmente compatível com os pipelines de deploy (SSG).

## Direção criativa

A direção visual deste projeto deve ser interpretada e aplicada como uma combinação intencional dos seguintes atributos:

- **Corporate Luxury:** transmitir sofisticação, autoridade, precisão e alto padrão por meio de composição, proporção, tipografia, espaçamento, materiais visuais e hierarquia — sem recorrer a elementos ostensivos, excesso de efeitos ou aparência de luxo genérico.
- **Swiss International Style:** priorizar grid rigoroso, alinhamento preciso, hierarquia visual clara, tipografia objetiva, espaços negativos bem definidos, composição racional e uso disciplinado da assimetria.
- **Editorial Design contemporâneo:** tratar cada página como uma composição editorial de alto nível, com ritmo entre títulos, textos, imagens, números, linhas, respiros e blocos de conteúdo. A composição deve criar narrativa visual, não apenas organizar componentes.
- **Glassmorphism sofisticado:** utilizar transparência, blur, camadas e bordas sutis somente quando contribuírem para a hierarquia ou profundidade da interface. O vidro deve parecer refinado e integrado à identidade, nunca decorativo, excessivo ou com aparência de interface genérica de IA.
- **Minimalismo de alto padrão:** reduzir elementos desnecessários, evitar ornamentação gratuita e privilegiar qualidade de composição, espaçamento, tipografia, contraste e proporção. Minimalismo não significa deixar a interface vazia; significa eliminar o que não possui função visual ou comunicacional.
- **Tipografia suíça:** aplicar a tipografia com disciplina de escala, peso, tracking, entrelinha, alinhamento e hierarquia. A tipografia deve funcionar como elemento estrutural da interface, e não apenas como conteúdo.
- **Direção de arte tecnológica, porém humana e elegante:** incorporar uma percepção contemporânea e tecnológica sem transformar o projeto em uma estética futurista, artificial, excessivamente neon ou visualmente associada a produtos de IA. A tecnologia deve aparecer na precisão, nas interações, nos detalhes e na qualidade da execução, enquanto a fotografia, a narrativa e a composição preservam uma dimensão humana.

### Regra de interpretação visual

Esses atributos devem orientar **todas as decisões visuais futuras do projeto**, incluindo layout, composição, tipografia, espaçamento, imagens, componentes, superfícies, efeitos, interações e movimento.

Antes de **qualquer alteração, criação ou refatoração visual**, a IA deve **ler e considerar este `DESIGN.md` como fonte de verdade do sistema visual**. Não deve criar uma solução visual baseada apenas em tendências, referências genéricas, padrões de UI ou preferências implícitas do modelo.

Ao implementar qualquer nova seção, página, componente ou interação:

1. preservar a identidade visual e as regras já definidas neste documento;
2. interpretar Corporate Luxury + Swiss International Style + Editorial Design como princípios de composição, e não como estilos decorativos independentes;
3. utilizar o Glassmorphism somente dentro dos limites já estabelecidos neste documento;
4. manter a aparência sofisticada por meio de proporção, tipografia, grid, espaçamento, contraste e materiais visuais, evitando excesso de efeitos;
5. preservar a dimensão humana da fotografia, narrativa e comunicação;
6. evitar estética genérica de SaaS, dashboard, landing page de IA, cyberpunk, neon, futurismo excessivo ou interfaces visualmente carregadas;
7. não introduzir novas cores, fontes, gradientes, efeitos, padrões, componentes ou tratamentos visuais que contradigam os tokens e regras existentes;
8. quando houver conflito entre uma tendência visual e as regras deste documento, **as regras deste `DESIGN.md` prevalecem**;
9. toda alteração deve parecer parte do mesmo sistema de design, e não uma nova direção visual adicionada posteriormente.

**Princípio central:** o resultado deve parecer uma experiência digital corporativa premium, editorial e contemporânea, com precisão suíça e tecnologia discreta, mantendo sofisticação, clareza e humanidade em todos os pontos de contato.
