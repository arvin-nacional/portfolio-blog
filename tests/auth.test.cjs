const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const crypto = require("node:crypto");
const ts = require("typescript");
const { sealData, unsealData } = require("iron-session");

function load(file, mocks = {}, env = {}) {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  vm.runInNewContext(code, { exports, Buffer, Date, process: { env }, require: name =>
    Object.hasOwn(mocks, name) ? mocks[name] : require(name) });
  return exports;
}

const salt = "a".repeat(32);
const password = "test-only-long-password";
const hash = `scrypt$${salt}$${crypto.scryptSync(password, salt, 64, { N: 131072, r: 8, p: 1, maxmem: 256 * 1024 * 1024 }).toString("hex")}`;
const env = { ADMIN_EMAIL: "admin@example.test", ADMIN_PASSWORD_HASH: hash, AUTH_SECRET: "test-only-secret-".repeat(4), NODE_ENV: "production" };
const policy = load("lib/auth/session-config.ts", {}, env);
const validSession = () => ({ email: env.ADMIN_EMAIL, credentialVersion: policy.authConfig().credentialVersion, expiresAt: Date.now() + 10000 });

test("password verification accepts the hash and rejects incorrect or malformed credentials", async () => {
  const { verifyPassword } = load("lib/auth/password.ts");
  assert.equal(await verifyPassword(password, hash), true);
  assert.equal(await verifyPassword("incorrect", hash), false);
  assert.equal(await verifyPassword(password, "invalid"), false);
  assert.equal(await verifyPassword("x".repeat(1025), hash), false);
});

test("local setup hides password input and saves a dotenv-safe hash rather than a password", async () => {
  let output = "";
  let rawCalls = 0;
  let saved;
  let complete;
  const finished = new Promise(resolve => { complete = resolve; });
  vm.runInNewContext(fs.readFileSync("scripts/setup-admin.cjs", "utf8"), {
    __dirname: "/fixture/scripts",
    console: { log() {}, error: message => { throw new Error(message); } },
    process: {
      stdin: {
        isTTY: true,
        setRawMode: enabled => { if (enabled) rawCalls++; },
        resume() {}, pause() {}, removeListener() {},
        on: (_event, handler) => { queueMicrotask(() => handler(Buffer.from(password + "\r"))); },
      },
      stdout: { write: text => { output += text; } },
    },
    require: name => {
      if (name === "node:fs") return {
        existsSync: () => true,
        readFileSync: () => "MONGODB_URL=existing\nNEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=obsolete\n",
        writeFileSync: (_path, text) => { saved = text; complete(); },
      };
      if (name === "node:readline/promises") return { createInterface: () => ({ question: async () => env.ADMIN_EMAIL, close() {} }) };
      return require(name);
    },
  });
  await finished;
  assert.equal(rawCalls, 2);
  assert.equal(output.includes(password), false);
  assert.equal(saved.includes(password), false);
  assert.ok(saved.includes("MONGODB_URL=existing"));
  assert.equal(saved.includes("CLERK"), false);
  const stored = saved.match(/^ADMIN_PASSWORD_HASH=(.*)$/m)[1].replaceAll("\\$", "$");
  assert.equal(await load("lib/auth/password.ts").verifyPassword(password, stored), true);
});

test("sessions require configured credentials, the admin identity, current password version, and expiry", () => {
  assert.equal(policy.isAdminSession(validSession()), true);
  for (const change of [{ email: "other@example.test" }, { credentialVersion: "old" }, { expiresAt: 0 }]) {
    assert.equal(policy.isAdminSession({ ...validSession(), ...change }), false);
  }
  assert.equal(policy.isAdminSession({}), false);
  assert.equal(load("lib/auth/session-config.ts").isAdminSession(validSession()), false);
  const options = policy.sessionOptions();
  assert.equal(options.cookieOptions.httpOnly, true);
  assert.equal(options.cookieOptions.secure, true);
  assert.equal(options.cookieOptions.sameSite, "lax");
});

test("encrypted cookies reject tampering, other secrets, and expired application sessions", async () => {
  const options = { password: env.AUTH_SECRET, ttl: 60 };
  const seal = await sealData(validSession(), options);
  assert.equal(policy.isAdminSession(await unsealData(seal, options)), true);
  assert.equal(policy.isAdminSession(await unsealData(seal.slice(0, -3) + "abc", options)), false);
  assert.equal(policy.isAdminSession(await unsealData(seal, { ...options, password: "other-secret-".repeat(5) })), false);
  const expired = await sealData({ ...validSession(), expiresAt: 0 }, options);
  assert.equal(policy.isAdminSession(await unsealData(expired, options)), false);
});

test("login redirects stay on this website", () => {
  assert.equal(policy.safeReturnTo("/blog/add?q=hello"), "/blog/add?q=hello");
  for (const url of ["https://attacker.test", "//attacker.test", "/\\attacker.test", "/\nattacker", null]) {
    assert.equal(policy.safeReturnTo(url), "/projects");
  }
});

function loginActions({ limited = false, valid = true, databaseFails = false } = {}) {
  let saves = 0;
  const session = { save: async () => { saves++; } };
  const actions = load("lib/actions/auth.action.ts", {
    "next/headers": { cookies: async () => ({ delete() {} }) },
    "next/navigation": { redirect: url => { throw new Error("REDIRECT:" + url); } },
    "iron-session": { getIronSession: async () => session },
    "@/lib/auth/session-config": policy,
    "@/lib/auth/password": { verifyPassword: async () => valid },
    "@/lib/auth/rate-limit": { allowLoginAttempt: async () => { if (databaseFails) throw new Error("offline"); return !limited; } },
  });
  return { actions, session, saves: () => saves };
}
function loginForm(email = env.ADMIN_EMAIL) {
  const data = new FormData();
  data.set("email", email); data.set("password", password); data.set("returnTo", "/blog/add");
  return data;
}

test("successful login saves a fresh session and returns to the admin page", async () => {
  const fixture = loginActions();
  await assert.rejects(fixture.actions.signIn({ error: "" }, loginForm()), /REDIRECT:\/blog\/add/);
  assert.equal(fixture.saves(), 1);
  assert.equal(policy.isAdminSession(fixture.session), true);
});

test("wrong credentials, account mismatches, limits, and outages never create sessions", async () => {
  for (const options of [{ valid: false }, { limited: true }, { databaseFails: true }]) {
    const fixture = loginActions(options);
    assert.ok((await fixture.actions.signIn({ error: "" }, loginForm())).error);
    assert.equal(fixture.saves(), 0);
  }
  const fixture = loginActions();
  assert.ok((await fixture.actions.signIn({ error: "" }, loginForm("other@example.test"))).error);
  assert.equal(fixture.saves(), 0);
});

test("all publishing mutations reject unauthenticated callers before touching services", async () => {
  let connections = 0;
  const mocks = {
    "@/lib/auth/session": { requireAdmin: async () => { throw new Error("Unauthorized"); } },
    react: { cache: fn => fn },
    "../mongoose": { connectToDatabase: async () => { connections++; } },
    "next/cache": { revalidatePath() {} },
    cloudinary: { v2: { config() {} } },
    mongoose: {},
    "@/database/post.model": {}, "@/database/tag.model": {},
    "@/database/project.model": {}, "@/database/category.model": {},
  };
  for (const [file, names] of [["post", ["createPost", "editPost", "deletePost"]], ["project", ["createProject", "updateProject", "deleteProject"]]]) {
    const actions = load(`lib/actions/${file}.action.ts`, mocks);
    for (const name of names) await assert.rejects(actions[name]({}), /Unauthorized/);
  }
  assert.equal(connections, 0);
});

test("the login limiter denies the eleventh attempt and propagates storage failure", async () => {
  let attempts = 0;
  const { allowLoginAttempt } = load("lib/auth/rate-limit.ts", {
    "server-only": {},
    "@/lib/mongoose": { connectToDatabase: async () => ({ connection: { collection: () => ({
      findOneAndUpdate: async (_filter, update, options) => {
        assert.ok(update[0].$set.attempts.$cond);
        assert.equal(options.upsert, true);
        return { attempts: ++attempts };
      },
    }) } }) },
  });
  for (let i = 0; i < 10; i++) assert.equal(await allowLoginAttempt(), true);
  assert.equal(await allowLoginAttempt(), false);
  const unavailable = load("lib/auth/rate-limit.ts", {
    "server-only": {},
    "@/lib/mongoose": { connectToDatabase: async () => { throw new Error("offline"); } },
  });
  await assert.rejects(unavailable.allowLoginAttempt(), /offline/);
});
