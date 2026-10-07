const { test } = require("@jest/globals");

const assert = require("node:assert/strict");

const { query } = require("../helpers/content.cjs");

test("search treats regex metacharacters literally and rejects invalid page values", () => {
  assert.equal(query.positivePage("-1"), 1);
  assert.equal(query.positivePage("abc"), 1);
  assert.equal(query.positivePage("2.5"), 1);
  assert.equal(query.positivePage("100000"), 1000);
  assert.equal(query.positivePage("2"), 2);
  const escaped = query.escapeRegex("[design] (a+b)?");
  assert.ok(new RegExp(escaped).test("[design] (a+b)?"));
  assert.equal(query.literalSearch("x".repeat(500)).length, 120);
});
