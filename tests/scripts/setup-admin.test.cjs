const { test } = require("@jest/globals");

const assert = require("node:assert/strict");

const fs = require("node:fs");

const vm = require("node:vm");

const { load, password, env } = require("../helpers/auth.cjs");

test("local setup hides password input and saves a dotenv-safe hash rather than a password", async () => {
  let output = "";
  let rawCalls = 0;
  let saved;
  let complete;
  const finished = new Promise((resolve) => {
    complete = resolve;
  });
  vm.runInNewContext(fs.readFileSync("scripts/setup-admin.cjs", "utf8"), {
    __dirname: "/fixture/scripts",
    console: {
      log() {},
      error: (message) => {
        throw new Error(message);
      },
    },
    process: {
      stdin: {
        isTTY: true,
        setRawMode: (enabled) => {
          if (enabled) rawCalls++;
        },
        resume() {},
        pause() {},
        removeListener() {},
        on: (_event, handler) => {
          queueMicrotask(() => handler(Buffer.from(password + "\r")));
        },
      },
      stdout: {
        write: (text) => {
          output += text;
        },
      },
    },
    require: (name) => {
      if (name === "node:fs")
        return {
          existsSync: () => true,
          readFileSync: () =>
            "MONGODB_URL=existing\nNEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=obsolete\n",
          writeFileSync: (_path, text) => {
            saved = text;
            complete();
          },
        };
      if (name === "node:readline/promises")
        return {
          createInterface: () => ({
            question: async () => env.ADMIN_EMAIL,
            close() {},
          }),
        };
      return require(name);
    },
  });
  await finished;
  assert.equal(rawCalls, 2);
  assert.equal(output.includes(password), false);
  assert.equal(saved.includes(password), false);
  assert.ok(saved.includes("MONGODB_URL=existing"));
  assert.equal(saved.includes("CLERK"), false);
  const stored = saved
    .match(/^ADMIN_PASSWORD_HASH=(.*)$/m)[1]
    .replaceAll("\\$", "$");
  assert.equal(
    await load("lib/auth/password.ts").verifyPassword(password, stored),
    true,
  );
});
