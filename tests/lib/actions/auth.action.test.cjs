const { test } = require("@jest/globals");

const assert = require("node:assert/strict");

const { policy, loginActions, loginForm } = require("../../helpers/auth.cjs");

test("successful login saves a fresh session and returns to the admin page", async () => {
  const fixture = loginActions();
  await assert.rejects(
    fixture.actions.signIn({ error: "" }, loginForm()),
    /REDIRECT:\/blog\/add/,
  );
  assert.equal(fixture.saves(), 1);
  assert.equal(policy.isAdminSession(fixture.session), true);
});

test("wrong credentials, account mismatches, limits, and outages never create sessions", async () => {
  for (const options of [
    { valid: false },
    { limited: true },
    { databaseFails: true },
  ]) {
    const fixture = loginActions(options);
    assert.ok((await fixture.actions.signIn({ error: "" }, loginForm())).error);
    assert.equal(fixture.saves(), 0);
  }
  const fixture = loginActions();
  assert.ok(
    (
      await fixture.actions.signIn(
        { error: "" },
        loginForm("other@example.test"),
      )
    ).error,
  );
  assert.equal(fixture.saves(), 0);
});
