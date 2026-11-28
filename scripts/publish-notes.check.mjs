import assert from "node:assert"
import { isPublished, embeds } from "./publish-notes.mjs"
assert.equal(isPublished("---\ntags: [a]\npublish: true\n---\nx"), true)
assert.equal(isPublished("---\npublish: false\n---\n"), false)
assert.equal(isPublished("no frontmatter\npublish: true"), false)
assert.deepEqual(embeds("![[fig.png|200]] ![[Other note]] ![](img/a%20b.jpg) ![](https://x/y.png)"), ["fig.png", "img/a b.jpg"])
console.log("ok")
