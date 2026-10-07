const assert = require("node:assert/strict");

const fs = require("node:fs");

const vm = require("node:vm");

const ts = require("typescript");

function load(file, mocks = {}) {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  }).outputText;
  vm.runInNewContext(code, {
    exports,
    Buffer,
    Date,
    URLSearchParams,
    Response,
    require: (name) =>
      Object.hasOwn(mocks, name) ? mocks[name] : require(name),
  });
  return exports;
}

const query = load("lib/content-query.ts");

const images = load("lib/content-images.ts");

const excerpt = load("lib/card-excerpt.ts");

const id = "a".repeat(24),
  tagId = "b".repeat(24);

const image =
  "data:image/png;base64," + Buffer.from("fixture-image").toString("base64");

function fixture() {
  const calls = [],
    storage = new Map(),
    configs = [];
  let connections = 0;
  const rows = Array.from({ length: 7 }, (_, index) => ({
    _id: index ? String(index).padStart(24, "0") : id,
    title: `Item ${index}`,
    content: "<p>" + "Useful content. ".repeat(100) + "</p>",
    image,
    mainImage: image,
    createdAt: new Date("2026-01-01"),
    createdOn: new Date("2026-01-01"),
    dateFinished: new Date("2026-01-01"),
    tags: [{ _id: tagId, name: "Design", posts: ["unused-heavy-data"] }],
    category: [
      { _id: tagId, name: "Websites", projects: ["unused-heavy-data"] },
    ],
    images: [{ src: image, alt: "Sample" }],
    softwareUsed: ["Next.js"],
    clientName: "Example",
  }));
  const model = (name) => ({
    find(filter = {}) {
      return build(name, filter, false);
    },
    findById(value) {
      return build(name, { _id: value }, true);
    },
  });
  function build(name, filter, single) {
    const call = { name, filter };
    calls.push(call);
    const cursor = {};
    for (const method of ["select", "populate", "sort", "skip", "limit"])
      cursor[method] = (value) => {
        call[method] = value;
        return cursor;
      };
    cursor.lean = async () =>
      single
        ? filter._id === id
          ? rows[0]
          : null
        : rows.slice(0, call.limit || rows.length);
    return cursor;
  }
  const content = load("lib/public-content.ts", {
    "server-only": {},
    "next/cache": {
      unstable_cache: (fn, keys, options) => {
        configs.push(options);
        return (...args) => {
          const key = JSON.stringify([keys, args]);
          if (!storage.has(key))
            storage.set(key, { tags: options.tags, value: fn(...args) });
          return storage.get(key).value;
        };
      },
    },
    react: { cache: (fn) => fn },
    "@/lib/mongoose": {
      connectToDatabase: async () => {
        connections++;
      },
    },
    "@/database/post.model": model("posts"),
    "@/database/project.model": model("projects"),
    "@/database/tag.model": model("tags"),
    "@/database/category.model": model("categories"),
    "@/lib/card-excerpt": excerpt,
    "@/lib/content-query": query,
    "@/lib/content-images": images,
  });
  return {
    content,
    calls,
    configs,
    connections: () => connections,
    expire: (tag) => {
      for (const [key, value] of storage)
        if (value.tags.includes(tag)) storage.delete(key);
    },
  };
}

module.exports = { load, query, images, excerpt, id, tagId, image, fixture };
