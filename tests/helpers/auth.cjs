const assert = require("node:assert/strict");

const fs = require("node:fs");

const vm = require("node:vm");

const crypto = require("node:crypto");

const ts = require("typescript");

function load(file, mocks = {}, env = {}) {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  vm.runInNewContext(code, {
    exports,
    Buffer,
    Date,
    process: { env },
    require: (name) =>
      Object.hasOwn(mocks, name) ? mocks[name] : require(name),
  });
  return exports;
}

const salt = "a".repeat(32);

const password = "test-only-long-password";

const hash = `scrypt$${salt}$${crypto.scryptSync(password, salt, 64, { N: 131072, r: 8, p: 1, maxmem: 256 * 1024 * 1024 }).toString("hex")}`;

const env = {
  ADMIN_EMAIL: "admin@example.test",
  ADMIN_PASSWORD_HASH: hash,
  AUTH_SECRET: "test-only-secret-".repeat(4),
  NODE_ENV: "production",
};

const policy = load("lib/auth/session-config.ts", {}, env);

const validSession = () => ({
  email: env.ADMIN_EMAIL,
  credentialVersion: policy.authConfig().credentialVersion,
  expiresAt: Date.now() + 10000,
});

function loginActions({
  limited = false,
  valid = true,
  databaseFails = false,
} = {}) {
  let saves = 0;
  const session = {
    save: async () => {
      saves++;
    },
  };
  const actions = load("lib/actions/auth.action.ts", {
    "next/headers": { cookies: async () => ({ delete() {} }) },
    "next/navigation": {
      redirect: (url) => {
        throw new Error("REDIRECT:" + url);
      },
    },
    "iron-session": { getIronSession: async () => session },
    "@/lib/auth/session-config": policy,
    "@/lib/auth/password": { verifyPassword: async () => valid },
    "@/lib/auth/rate-limit": {
      allowLoginAttempt: async () => {
        if (databaseFails) throw new Error("offline");
        return !limited;
      },
    },
  });
  return { actions, session, saves: () => saves };
}

function loginForm(email = env.ADMIN_EMAIL) {
  const data = new FormData();
  data.set("email", email);
  data.set("password", password);
  data.set("returnTo", "/blog/add");
  return data;
}

module.exports = {
  load,
  password,
  hash,
  env,
  policy,
  validSession,
  loginActions,
  loginForm,
};
