// Turns Obsidian Side-Notes HTML spans into single-line spans Quartz can parse,
// and adds a numbered reference marker before each numbered sidenote.
// Multi-line content (e.g. "- item" lists) would otherwise break out of the span.
const SPAN = /<span class="(sidenote|marginnote)((?: [\w-]+)*)">([\s\S]*?)<\/span>/g

export function collapse(src) {
  return src.replace(SPAN, (_, kind, extra, inner) => {
    const body = inner
      // display math inside a sidenote -> one-line inline display-style math
      .replace(/\$\$([\s\S]*?)\$\$/g, (_m, m) => `$\\displaystyle ${m.trim().replace(/\s*\n\s*/g, " ")}$`)
      .trim()
      .split(/\r?\n/)
      .map((l) => l.trim().replace(/^[-*+] /, "• "))
      .filter(Boolean)
      .join("<br>")
    const ref = kind === "sidenote" ? '<sup class="sidenote-ref"></sup>' : ""
    return `${ref}<span class="${kind}${extra}">${body}</span>`
  })
}

// Obsidian tolerates a "> $$" math block inside a callout whose following lines
// lack the "> " prefix; CommonMark ends the quote there and the math breaks.
// Re-prefix those lines until the closing $$.
export function quoteMath(src) {
  const out = []
  let prefix = null
  for (const line of src.split("\n")) {
    if (prefix === null) {
      const m = line.match(/^((?:>\s*)+)\$\$\s*$/)
      if (m) prefix = m[1].replace(/\s*$/, " ")
      out.push(line)
      continue
    }
    const fixed = line.startsWith(">") ? line : prefix + line
    out.push(fixed)
    if (/^(?:>\s*)*\$\$\s*$/.test(fixed)) prefix = null
  }
  return out.join("\n")
}

// Floats in different blocks (a <li> vs a <p>) can overlap; push later ones down.
const layoutScript = `
function snLayout() {
  const prev = {}
  for (const e of document.querySelectorAll("article .sidenote, article .marginnote")) {
    e.style.marginTop = ""
    const side = getComputedStyle(e).float
    if (side === "none" || !e.getClientRects().length) continue // hidden, e.g. folded callout
    const top = e.getBoundingClientRect().top + scrollY
    const min = (prev[side] ?? -Infinity) + 8
    if (top < min) e.style.marginTop = min - top + "px"
    prev[side] = e.getBoundingClientRect().bottom + scrollY
  }
}
// Re-run whenever layout shifts (fonts, KaTeX CSS loading late, resizes, SPA nav).
let snQueued = false
new ResizeObserver(() => {
  if (snQueued) return
  snQueued = true
  requestAnimationFrame(() => { snQueued = false; snLayout() })
}).observe(document.body)
document.addEventListener("nav", snLayout)
`

export const Sidenotes = () => ({
  name: "Sidenotes",
  externalResources() {
    return { js: [{ loadTime: "afterDOMReady", contentType: "inline", script: layoutScript }] }
  },
  textTransform(_ctx, src) {
    if (src.includes("$$")) src = quoteMath(src)
    // KaTeX has no \\label; Obsidian ignores it, so drop it.
    // Drop whole line when it holds only the label: a blank line would end the $$ block.
    src = src.replace(/^[ \t>]*\\label\{[^}]*\}[ \t]*\r?\n/gm, "").replace(/\\label\{[^}]*\}/g, "")
    return src.includes('class="sidenote') || src.includes('class="marginnote')
      ? collapse(src)
      : src
  },
})
