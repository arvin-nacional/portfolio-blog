const { test } = require("@jest/globals");

const assert = require("node:assert/strict");

const {
  load,
  password,
  env,
  policy,
  validSession,
} = require("../../helpers/auth.cjs");

test("sessions require configured credentials, the admin identity, current password version, and expiry", () => {
  assert.equal(policy.isAdminSession(validSession()), true);
  for (const change of [
    { email: "other@example.test" },
    { credentialVersion: "old" },
    { expiresAt: 0 },
  ]) {
    assert.equal(
      policy.isAdminSession({ ...validSession(), ...change }),
      false,
    );
  }
  assert.equal(policy.isAdminSession({}), false);
  assert.equal(
    load("lib/auth/session-config.ts").isAdminSession(validSession()),
    false,
  );
  const options = policy.sessionOptions();
  assert.equal(options.cookieOptions.httpOnly, true);
  assert.equal(options.cookieOptions.secure, true);
  assert.equal(options.cookieOptions.sameSite, "lax");
});

test("encrypted cookies reject tampering, other secrets, and expired application sessions", async () => {
  const { sealData, unsealData } = await import("iron-session");
  const options = { password: env.AUTH_SECRET, ttl: 60 };
  const seal = await sealData(validSession(), options);
  assert.equal(policy.isAdminSession(await unsealData(seal, options)), true);
  assert.equal(
    policy.isAdminSession(await unsealData(seal.slice(0, -3) + "abc", options)),
    false,
  );
  assert.equal(
    policy.isAdminSession(
      await unsealData(seal, {
        ...options,
        password: "other-secret-".repeat(5),
      }),
    ),
    false,
  );
  const expired = await sealData({ ...validSession(), expiresAt: 0 }, options);
  assert.equal(
    policy.isAdminSession(await unsealData(expired, options)),
    false,
  );
});

test("login redirects stay on this website", () => {
  assert.equal(policy.safeReturnTo("/blog/add?q=hello"), "/blog/add?q=hello");
  for (const url of [
    "https://attacker.test",
    "//attacker.test",
    "/\\attacker.test",
    "/\nattacker",
    null,
  ]) {
    assert.equal(policy.safeReturnTo(url), "/projects");
  }
});
