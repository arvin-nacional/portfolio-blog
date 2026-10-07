const { test } = require("@jest/globals");

const assert = require("node:assert/strict");

const { load } = require("../../helpers/content.cjs");

test("server article rendering highlights code safely and skips grammars for plain articles", async () => {
  let imports = 0;
  const highlighter = {
    get default() {
      imports++;
      return require("prismjs");
    },
    __esModule: true,
  };
  const ParseHTML = load("components/shared/ParseHTML.tsx", {
    "server-only": {},
    "@/styles/prism.css": {},
    "@/lib/highlight-code": highlighter,
  }).default;
  const render = require("react-dom/server").renderToStaticMarkup;
  assert.match(
    render(await ParseHTML({ data: "<p>Plain article</p>" })),
    /<p>Plain article<\/p>/,
  );
  assert.equal(imports, 0);
  const html = render(
    await ParseHTML({
      data: '<pre><code class="language-javascript">const value = "&lt;script&gt;";</code></pre>',
    }),
  );
  assert.ok(imports > 0);
  assert.match(html, /token keyword/);
  assert.match(html, /&lt;script>/);
  assert.equal(html.includes("<script>"), false);
});
