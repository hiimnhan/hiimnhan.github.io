#!/usr/bin/env node
// Copy only the vault notes marked `publish: true` into content/notes/.
// The vault itself never enters this repo; content/notes/ is regenerated each run.
//
//   npm run publish-notes            # vault defaults to ~/personal/brainrot
//   VAULT=/path/to/vault npm run publish-notes
//
// Embedded images/PDFs (![[x.png]], ![](x.png)) of published notes are copied too.
import fs from "node:fs"
import path from "node:path"
import os from "node:os"

const VAULT = process.env.VAULT ?? path.join(os.homedir(), "personal/brainrot")
const OUT = path.resolve(import.meta.dirname, "../content/notes")
const SKIP_DIRS = new Set(["Templates", "node_modules"])

export function isPublished(src) {
  const fm = src.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  return !!fm && /^publish:\s*(true|yes)\s*$/im.test(fm[1])
}

export function embeds(src) {
  const out = new Set()
  for (const m of src.matchAll(/!\[\[([^\]|#]+)(?:[|#][^\]]*)?\]\]/g)) out.add(m[1].trim())
  for (const m of src.matchAll(/!\[[^\]]*\]\(([^)\s]+)\)/g))
    if (!/^[a-z]+:/i.test(m[1])) out.add(decodeURIComponent(m[1]))
  // only files with a non-markdown extension (note embeds stay links)
  return [...out].filter((e) => path.extname(e) && path.extname(e) !== ".md")
}

function walk(dir, files = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith(".") || SKIP_DIRS.has(e.name)) continue // .obsidian, .trash, ...
    const p = path.join(dir, e.name)
    e.isDirectory() ? walk(p, files) : files.push(p)
  }
  return files
}

function main() {
  if (!fs.existsSync(VAULT)) throw new Error(`Vault not found: ${VAULT} (set VAULT=...)`)
  const files = walk(VAULT)
  const byName = new Map(files.map((f) => [path.basename(f), f]))

  // Regenerate everything except the hand-written notes/index.md landing page.
  fs.mkdirSync(OUT, { recursive: true })
  for (const e of fs.readdirSync(OUT)) if (e !== "index.md") fs.rmSync(path.join(OUT, e), { recursive: true })
  fs.mkdirSync(path.join(OUT, "attachments"), { recursive: true })

  const seen = new Map()
  let assets = 0
  for (const f of files.filter((f) => f.endsWith(".md"))) {
    const src = fs.readFileSync(f, "utf8")
    if (!isPublished(src)) continue
    const name = path.basename(f)
    if (name === "index.md") throw new Error(`Rename ${f}: "index.md" is reserved for the notes landing page`)
    if (seen.has(name)) throw new Error(`Two published notes named "${name}":\n  ${seen.get(name)}\n  ${f}`)
    seen.set(name, f)
    fs.copyFileSync(f, path.join(OUT, name))
    for (const e of embeds(src)) {
      const file = byName.get(path.basename(e))
      if (!file) { console.warn(`  missing embed in ${name}: ${e}`); continue }
      fs.copyFileSync(file, path.join(OUT, "attachments", path.basename(e)))
      assets++
    }
  }
  console.log(`Published ${seen.size} note(s), ${assets} attachment(s) -> content/notes/`)
  for (const [n, f] of seen) console.log(`  ${n}  <-  ${path.relative(VAULT, f)}`)
}

if (process.argv[1] === import.meta.filename) main()
