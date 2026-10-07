const { test } = require("@jest/globals");

const assert = require("node:assert/strict");

const { subscriberAction } = require("../../helpers/homepage.cjs");

test("invalid newsletter emails are rejected before accessing the database", async () => {
  const addSubscriber = subscriberAction(
    () => {
      throw new Error("Must not connect");
    },
    () => {
      throw new Error("Must not save");
    },
  );
  const result = await addSubscriber({ email: "invalid", path: "/" });
  assert.equal(result.success, false);
  assert.match(result.message, /valid email/);
});

test("newsletter connection and save failures return errors without invalidating the page", async () => {
  let invalidations = 0;
  for (const failure of ["connection", "save"]) {
    const addSubscriber = subscriberAction(
      async () => {
        if (failure === "connection") throw new Error("Unavailable");
      },
      async () => {
        throw new Error("Save failed");
      },
      () => invalidations++,
    );
    const result = await addSubscriber({
      email: "audit@example.com",
      path: "/",
    });
    assert.equal(result.success, false);
    assert.match(result.message, /try again/);
  }
  assert.equal(invalidations, 0);
});

test("newsletter success awaits the save and returns a serializable confirmation", async () => {
  const events = [];
  const addSubscriber = subscriberAction(
    async () => {
      events.push("connected");
    },
    async ({ email }) => {
      assert.equal(email, "audit@example.com");
      events.push("saved");
    },
    (path) => {
      assert.equal(path, "/");
      events.push("invalidated");
    },
  );
  const result = await addSubscriber({ email: "audit@example.com", path: "/" });
  assert.equal(JSON.stringify(result), '{"success":true}');
  assert.deepEqual(events, ["connected", "saved", "invalidated"]);
});
