const { test } = require("@jest/globals");

const assert = require("node:assert/strict");

const { load } = require("../../helpers/auth.cjs");

test("the login limiter denies the eleventh attempt and propagates storage failure", async () => {
  let attempts = 0;
  const { allowLoginAttempt } = load("lib/auth/rate-limit.ts", {
    "server-only": {},
    "@/lib/mongoose": {
      connectToDatabase: async () => ({
        connection: {
          collection: () => ({
            findOneAndUpdate: async (_filter, update, options) => {
              assert.ok(update[0].$set.attempts.$cond);
              assert.equal(options.upsert, true);
              return { attempts: ++attempts };
            },
          }),
        },
      }),
    },
  });
  for (let i = 0; i < 10; i++) assert.equal(await allowLoginAttempt(), true);
  assert.equal(await allowLoginAttempt(), false);
  const unavailable = load("lib/auth/rate-limit.ts", {
    "server-only": {},
    "@/lib/mongoose": {
      connectToDatabase: async () => {
        throw new Error("offline");
      },
    },
  });
  await assert.rejects(unavailable.allowLoginAttempt(), /offline/);
});
