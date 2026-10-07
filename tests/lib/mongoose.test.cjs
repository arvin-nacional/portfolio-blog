const { test } = require("@jest/globals");

const assert = require("node:assert/strict");

const { loadSource } = require("../helpers/homepage.cjs");

test("concurrent database callers share a connection and connected callers reuse it", async () => {
  let calls = 0;
  let resolveConnection;
  const mongoose = {
    connection: { readyState: 0 },
    set() {},
    connect() {
      calls++;
      return new Promise((resolve) => {
        resolveConnection = () => {
          mongoose.connection.readyState = 1;
          resolve(mongoose);
        };
      });
    },
  };
  const { connectToDatabase } = loadSource(
    "lib/mongoose.ts",
    { mongoose },
    { MONGODB_URL: "mongodb://test.invalid" },
  );
  const first = connectToDatabase();
  const second = connectToDatabase();
  assert.equal(calls, 1);
  resolveConnection();
  assert.equal(await first, mongoose);
  assert.equal(await second, mongoose);
  await connectToDatabase();
  assert.equal(calls, 1);
});

test("failed connections can retry and disconnected connections are not treated as connected", async () => {
  let calls = 0;
  const mongoose = {
    connection: { readyState: 0 },
    set() {},
    async connect() {
      calls++;
      if (calls === 1) throw new Error("Unavailable");
      mongoose.connection.readyState = 1;
      return mongoose;
    },
  };
  const { connectToDatabase } = loadSource(
    "lib/mongoose.ts",
    { mongoose },
    { MONGODB_URL: "mongodb://test.invalid" },
  );
  await assert.rejects(connectToDatabase(), /Unavailable/);
  await connectToDatabase();
  assert.equal(calls, 2);
  mongoose.connection.readyState = 0;
  await connectToDatabase();
  assert.equal(calls, 3);
});

test("missing database configuration rejects before connecting", async () => {
  const mongoose = { connection: { readyState: 0 } };
  const { connectToDatabase } = loadSource("lib/mongoose.ts", { mongoose });
  await assert.rejects(connectToDatabase(), /not configured/);
});
