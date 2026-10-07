const { test } = require("@jest/globals");

const assert = require("node:assert/strict");

const {
  load,
  images,
  id,
  image,
} = require("../../../../../helpers/content.cjs");

test("image endpoint validates identifiers and returns versioned binary content", async () => {
  let connections = 0;
  const route = load("app/media/[collection]/[id]/[version]/route.ts", {
    "@/lib/mongoose": {
      connectToDatabase: async () => {
        connections++;
      },
    },
    "@/lib/content-images": images,
    "@/database/post.model": {
      findById: () => ({
        select: () => ({ lean: async () => ({ image, images: [] }) }),
      }),
    },
    "@/database/project.model": {},
  });
  const request = (params) =>
    route.GET(null, { params: Promise.resolve(params) });
  assert.equal(
    (await request({ collection: "private", id, version: "a".repeat(32) }))
      .status,
    404,
  );
  assert.equal(connections, 0);
  const response = await request({
    collection: "posts",
    id,
    version: images.embeddedImage(image).version,
  });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("Content-Type"), "image/png");
  assert.match(response.headers.get("Cache-Control"), /immutable/);
  assert.equal(
    Buffer.from(await response.arrayBuffer()).toString(),
    "fixture-image",
  );
  assert.equal(
    (await request({ collection: "posts", id, version: "0".repeat(32) }))
      .status,
    404,
  );
});
