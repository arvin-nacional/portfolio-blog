const { test } = require("@jest/globals");

const assert = require("node:assert/strict");

const { subscriberForm } = require("../../helpers/homepage.cjs");

test("newsletter UI preserves the input and never shows success on service or transport failure", async () => {
  for (const action of [
    async () => ({ success: false, message: "Try again" }),
    async () => {
      throw new Error("Offline");
    },
  ]) {
    const form = subscriberForm(action);
    await form.submit({ email: "audit@example.com" });
    assert.equal(form.resets(), 0);
    assert.equal(form.notices.length, 0);
    assert.ok(
      form.states.some(
        (value) => typeof value === "string" && value.length > 0,
      ),
    );
    assert.equal(form.states.at(-1), false);
  }
});

test("newsletter UI only clears the input after confirmed success", async () => {
  const form = subscriberForm(async () => ({ success: true }));
  await form.submit({ email: "audit@example.com" });
  assert.equal(form.resets(), 1);
  assert.equal(form.notices.length, 1);
  assert.equal(form.notices[0].title, "Subscribed");
});
