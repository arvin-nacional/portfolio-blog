const { test } = require("@jest/globals");

const assert = require("node:assert/strict");

const { load, password, hash } = require("../../helpers/auth.cjs");

test("password verification accepts the hash and rejects incorrect or malformed credentials", async () => {
  const { verifyPassword } = load("lib/auth/password.ts");
  assert.equal(await verifyPassword(password, hash), true);
  assert.equal(await verifyPassword("incorrect", hash), false);
  assert.equal(await verifyPassword(password, "invalid"), false);
  assert.equal(await verifyPassword("x".repeat(1025), hash), false);
});
