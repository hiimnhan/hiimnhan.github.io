import { h } from "preact"

// Home-page section listing published notes whose frontmatter has `highlight: true`:
// title link plus tag pills.
const isTrue = (v) => v === true || v === "true" || v === "yes"
const Highlights = (opts) => {
  const title = opts?.title ?? "Highlighted notes"
  const Component = ({ allFiles, displayClass }) => {
    const notes = (allFiles ?? [])
      .filter((f) => isTrue(f.frontmatter?.highlight))
      .sort((a, b) => (a.frontmatter?.title ?? "").localeCompare(b.frontmatter?.title ?? ""))
    if (!notes.length) return null
    return h(
      "section",
      { class: `highlights ${displayClass ?? ""}` },
      h("h2", null, title),
      h(
        "ul",
        null,
        notes.map((f) =>
          h(
            "li",
            null,
            h("a", { href: "./" + f.slug, class: "internal" }, f.frontmatter?.title ?? f.slug),
            (f.frontmatter?.tags ?? []).length
              ? h(
                  "ul",
                  { class: "tags" },
                  f.frontmatter.tags.map((t) =>
                    h("li", null, h("a", { href: "./tags/" + t, class: "internal tag-link" }, t)),
                  ),
                )
              : null,
          ),
        ),
      ),
    )
  }
  Component.css = `
.highlights { margin-top: 2rem; }
.highlights ul { list-style: none; padding: 0; }
.highlights li { margin: 0 0 1rem; }
.highlights li > a { font-weight: 600; }
.highlights ul.tags { display: flex; flex-wrap: wrap; gap: 0.3rem; margin: 0.3rem 0 0; padding: 0; }
.highlights ul.tags > li { margin: 0; }
`
  return Component
}

export { Highlights }
