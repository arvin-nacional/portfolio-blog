const { test } = require("@jest/globals");

const assert = require("node:assert/strict");

const { loadSource } = require("../helpers/homepage.cjs");

test("Projects contains request failures and handles an empty response", async () => {
  const fallback = () => null;
  for (const [file, actionModule, actionName, collection] of [
    [
      "components/Projects.tsx",
      "@/lib/actions/project.action",
      "getRecentProjectsCached",
      "projects",
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
