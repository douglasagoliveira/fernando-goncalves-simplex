import { build } from "vite"
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises"
import path from "node:path"
import { pathToFileURL } from "node:url"

const modeIndex = process.argv.indexOf("--mode")
const mode = modeIndex >= 0 ? process.argv[modeIndex + 1] : "production"
await build({ mode })
const temporary = await mkdtemp(path.resolve(".tmp-prerender-"))
try {
  await build({
    mode,
    build: {
      ssr: "src/entry-server.tsx",
      outDir: temporary,
      emptyOutDir: true,
      sourcemap: false,
      minify: false,
      copyPublicDir: false,
    },
  })
  const { renderPage, getPageMetadata, personSchema } = await import(
    pathToFileURL(path.join(temporary, "entry-server.js")).href
  )
  const template = await readFile("dist/index.html", "utf8")
  const escapeHtml = (value) =>
    value
      .replaceAll("&", "&amp;")
      .replaceAll('"', "&quot;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
  for (const route of ["/", "/sobre", "/palestras", "/contato"]) {
    const metadata = getPageMetadata(route)
    const head = [
      `<title>${escapeHtml(metadata.title)}</title>`,
      `<meta name="description" content="${escapeHtml(metadata.description)}">`,
      `<link rel="canonical" href="${metadata.url}">`,
      '<meta property="og:type" content="website">',
      '<meta property="og:locale" content="pt_BR">',
      `<meta property="og:title" content="${escapeHtml(metadata.title)}">`,
      `<meta property="og:description" content="${escapeHtml(metadata.description)}">`,
      `<meta property="og:url" content="${metadata.url}">`,
      `<meta property="og:image" content="${metadata.image}">`,
      '<meta name="twitter:card" content="summary_large_image">',
      `<meta name="twitter:title" content="${escapeHtml(metadata.title)}">`,
      `<meta name="twitter:description" content="${escapeHtml(metadata.description)}">`,
      `<meta name="twitter:image" content="${metadata.image}">`,
      `<script type="application/ld+json">${JSON.stringify(personSchema).replaceAll("<", "\\u003c")}</script>`,
    ].join("\n")
    const html = template
      .replace(/<title>[\s\S]*?<\/title>/g, "")
      .replace(
        /<meta\b[^>]*(?:name="description"|property="og:[^"]+"|name="twitter:[^"]+")[^>]*>/g,
        "",
      )
      .replace("</head>", `${head}\n</head>`)
      .replace(
        '<div id="root"></div>',
        `<div id="root">${renderPage(route)}</div>`,
      )
    const directory = route === "/" ? "dist" : path.join("dist", route.slice(1))
    await mkdir(directory, { recursive: true })
    await writeFile(path.join(directory, "index.html"), html)
    console.log(`HTML pré-renderizado: ${route}`)
  }
} finally {
  await rm(temporary, { recursive: true, force: true })
}
