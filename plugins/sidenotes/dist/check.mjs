import assert from "node:assert"
import { collapse, quoteMath } from "./index.js"
assert.equal(
  collapse('x<span class="sidenote">\n- a $q$\n- b</span>\n$$y$$'),
  'x<sup class="sidenote-ref"></sup><span class="sidenote">• a $q$<br>• b</span>\n$$y$$',
)
assert.equal(collapse('<span class="marginnote left">m</span>'), '<span class="marginnote left">m</span>')
console.log("ok")
assert.equal(
  collapse('<span class="sidenote">so\n$$\na \\\\\nb\n$$\nend</span>'),
  '<sup class="sidenote-ref"></sup><span class="sidenote">so<br>$\\displaystyle a \\\\ b$<br>end</span>',
)
console.log("ok2")
assert.equal(quoteMath("> t\n> $$\nU = Q\n$$\nafter"), "> t\n> $$\n> U = Q\n> $$\nafter")
assert.equal(quoteMath("$$\nx\n$$"), "$$\nx\n$$")
console.log("ok3")
const { Sidenotes } = await import("./index.js")
assert.equal(Sidenotes().textTransform(null, "$$\nx\n\\label{eq:ir}\n$$\n$$y \\label{a}$$"), "$$\nx\n$$\n$$y $$")
console.log("ok4")
