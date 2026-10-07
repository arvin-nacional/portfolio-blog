const { test } = require("@jest/globals");

const assert = require("node:assert/strict");

const { loadSource } = require("../helpers/homepage.cjs");

test("card excerpts decode entities, omit executable content, and respect word boundaries", () => {
  const { getCardExcerpt } = loadSource("lib/card-excerpt.ts");
  assert.equal(
    getCardExcerpt(
      "<p>Design &amp; development</p><script>secret()</script><style>.hidden{}</style><p>for business</p>",
    ),
    "Design & development for business",
  );
  assert.equal(
    getCardExcerpt("<p>A clear online presence for small businesses</p>", 24),
    "A clear online presence…",
  );
  assert.equal(getCardExcerpt(""), "");
});
