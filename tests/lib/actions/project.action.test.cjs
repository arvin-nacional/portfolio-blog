const { test } = require("@jest/globals");

const assert = require("node:assert/strict");

const { load } = require("../../helpers/auth.cjs");

test("project publishing mutations reject unauthenticated callers before touching services", async () => {
  let connections = 0;
  const mocks = {
    "@/lib/public-content": {},
    "@/lib/auth/session": {
      requireAdmin: async () => {
        throw new Error("Unauthorized");
      },
    },
    react: { cache: (fn) => fn },
    "../mongoose": {
      connectToDatabase: async () => {
        connections++;
      },
    },
    "next/cache": { revalidatePath() {} },
    cloudinary: { v2: { config() {} } },
    mongoose: {},
    "@/database/post.model": {},
    "@/database/tag.model": {},
    "@/database/project.model": {},
    "@/database/category.model": {},
  };
  for (const [file, names] of [
    ["project", ["createProject", "updateProject", "deleteProject"]],
  ]) {
    const actions = load(`lib/actions/${file}.action.ts`, mocks);
    for (const name of names)
      await assert.rejects(actions[name]({}), /Unauthorized/);
  }
  assert.equal(connections, 0);
});

test("project create and update propagate service failures to the form", async () => {
  const actions = load("lib/actions/project.action.ts", {
    "@/lib/public-content": {},
    "@/lib/auth/session": { requireAdmin: async () => {} },
    react: { cache: (fn) => fn },
    "../mongoose": {
      connectToDatabase: async () => {
        throw new Error("Database unavailable");
      },
    },
    "next/cache": {},
    cloudinary: { v2: { config() {} } },
    mongoose: {},
    "@/database/project.model": {},
    "@/database/category.model": {},
  });
  await assert.rejects(actions.createProject({}), /Database unavailable/);
  await assert.rejects(actions.updateProject({}), /Database unavailable/);
});
