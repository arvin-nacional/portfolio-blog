const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");

// Execute the source with isolated service adapters. No remote database writes.
function loadSource(file, mocks = {}, env = {}) {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  }).outputText;
  vm.runInNewContext(
    code,
    {
      exports,
      process: { env },
      require: (name) =>
        Object.hasOwn(mocks, name) ? mocks[name] : require(name),
    },
    { filename: file },
  );
  return exports;
}

test("card excerpts decode entities, omit executable content, and respect word boundaries", () => {
  const { getCardExcerpt } = loadSource("lib/card-excerpt.ts");
  assert.equal(
    getCardExcerpt(
      "<p>Design &amp; development</p><script>secret()</script><style>.hidden{}</style><p>for business</p>",
    ),
    "Design & development for business",
  );
  assert.equal(
    getCardExcerpt("<p>A clear online presence for small businesses</p>", 24),
    "A clear online presence…",
  );
  assert.equal(getCardExcerpt(""), "");
});

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

function subscriberAction(
  connectToDatabase,
  create,
  revalidatePath = () => {},
) {
  const { SubscriberFormSchema } = loadSource("lib/validations.ts", {
    "./utils": { validateDate: () => true },
  });
  return loadSource("lib/actions/subscriber.action.ts", {
    "@/database/subscriber": { create },
    "../mongoose": { connectToDatabase },
    "next/cache": { revalidatePath },
    "../validations": { SubscriberFormSchema },
  }).addSubscriber;
}

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

function subscriberForm(action) {
  const React = require("react");
  let submit;
  let resets = 0;
  const notices = [];
  const states = [];
  const component = () => null;
  const { default: Subscriber } = loadSource(
    "components/forms/Subscriber.tsx",
    {
      react: {
        ...React,
        useState: (value) => [value, (next) => states.push(next)],
      },
      "react-hook-form": {
        useForm: () => ({
          handleSubmit: (fn) => {
            submit = fn;
            return fn;
          },
          reset: () => resets++,
        }),
      },
      "@/lib/validations": {
        SubscriberFormSchema: require("zod").z.object({
          email: require("zod").z.string().email(),
        }),
      },
      "@/lib/utils": { cn: (x) => x },
      "@/components/ui/button": { Button: component },
      "@/components/ui/form": Object.fromEntries(
        [
          "Form",
          "FormControl",
          "FormField",
          "FormItem",
          "FormLabel",
          "FormMessage",
        ].map((name) => [name, component]),
      ),
      "@/components/ui/input": { Input: component },
      "@/lib/actions/subscriber.action": { addSubscriber: action },
      "next/navigation": { usePathname: () => "/" },
      "../ui/use-toast": { toast: (value) => notices.push(value) },
    },
  );
  Subscriber({ type: "" });
  return {
    submit: (values) => submit(values),
    states,
    notices,
    resets: () => resets,
  };
}

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

test("each homepage data section contains request failures and handles an empty response", async () => {
  const fallback = () => null;
  for (const [file, actionModule, actionName, collection] of [
    [
      "components/Projects.tsx",
      "@/lib/actions/project.action",
      "getRecentProjectsCached",
      "projects",
    ],
    [
      "components/Blogs.tsx",
      "@/lib/actions/post.action",
      "getRecentlyAddedPostsCached",
      "posts",
    ],
  ]) {
    for (const empty of [false, true]) {
      const { default: Section } = loadSource(file, {
        "./shared/DataSectionFallback": fallback,
        "@/components/ui/card": {},
        "@/components/ui/carousel": {},
        "@/lib/utils": {},
        "./ui/projectCard": {},
        "./ui/blogCard": {},
        "./ui/button": {},
        [actionModule]: {
          [actionName]: async () => {
            if (!empty) throw new Error("Unavailable");
            return { [collection]: [] };
          },
        },
      });
      const result = await Section();
      assert.equal(result.type, fallback);
      assert.equal(result.props.empty === true, empty);
    }
  }
});
