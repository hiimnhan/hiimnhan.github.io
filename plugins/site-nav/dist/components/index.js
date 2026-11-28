// Left-sidebar link list: { "Label": "/path or https://..." } from quartz.config.yaml.
import { h } from "preact"

const SiteNav = (opts) => {
  const links = Object.entries(opts?.links ?? {})
  const Component = ({ displayClass, fileData }) => {
    const here = "/" + (fileData?.slug ?? "").replace(/(^|\/)index$/, "")
    return h(
      "nav",
      { class: `site-nav ${displayClass ?? ""}` },
      h(
        "ul",
        null,
        links.map(([label, href]) => {
          const external = /^(https?:|mailto:)/.test(href)
          const active = !external && (href === here || (href !== "/" && here.startsWith(href + "/")))
          return h(
            "li",
            null,
            h(
              "a",
              {
                href,
                class: active ? "active" : undefined,
                ...(external && !href.startsWith("mailto:") ? { target: "_blank", rel: "noopener" } : {}),
              },
              label,
              external && !href.startsWith("mailto:") ? " ↗" : "",
            ),
          )
        }),
      ),
    )
  }
  Component.css = `
.site-nav ul { list-style: none; padding: 0; margin: 0.5rem 0; }
.site-nav li { margin: 0.35rem 0; }
.site-nav a { color: var(--darkgray); text-decoration: none; font-weight: 500; }
.site-nav a:hover, .site-nav a.active { color: var(--secondary); }
.site-nav a.active::before { content: "› "; }
`
  return Component
}

export { SiteNav }

