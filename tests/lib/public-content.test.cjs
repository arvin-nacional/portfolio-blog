const { test } = require("@jest/globals");

const assert = require("node:assert/strict");

const { images, id, tagId, image, fixture } = require("../helpers/content.cjs");

test("listings fetch one extra row, use lean projections, and cache public DTOs across requests", async () => {
  const f = fixture();
  const first = await f.content.publicPosts({ page: 1 });
  await f.content.publicPosts({ page: 1 });
  assert.equal(f.calls.length, 1);
  assert.equal(first.posts.length, 6);
  assert.equal(first.isNext, true);
  assert.equal(f.calls[0].limit, 7);
  assert.equal(f.calls[0].populate.select, "name");
  assert.equal(first.posts[0].images, undefined);
  assert.equal(first.posts[0].tags[0].posts, undefined);
  assert.ok(first.posts[0].content.length <= 221);
  assert.match(first.posts[0].image, /^\/media\/posts\//);
  assert.equal(typeof first.posts[0]._id, "string");
  assert.equal(typeof first.posts[0].createdAt, "string");
  assert.ok(f.configs.every((config) => config.revalidate === 60));
  f.expire("posts");
  await f.content.publicPosts();
  assert.equal(f.calls.length, 2);
});

test("category filters query directly and invalid identifiers avoid database work", async () => {
  const f = fixture();
  assert.equal(
    (await f.content.publicProjects({ category: "invalid" })).projects.length,
    0,
  );
  assert.equal(await f.content.publicPost("invalid"), null);
  assert.equal(f.connections(), 0);
  await f.content.publicProjects({ category: tagId });
  assert.equal(f.calls.length, 1);
  assert.equal(f.calls[0].filter.category, tagId);
  assert.equal(f.calls[0].name, "projects");
});

test("recent and related queries exclude the current item before limiting and do not expand tags into posts", async () => {
  const f = fixture();
  await f.content.publicRecentPosts(id);
  await f.content.publicRelatedPosts([tagId], id);
  assert.equal(f.calls.length, 2);
  for (const call of f.calls) {
    assert.equal(call.name, "posts");
    assert.equal(call.filter._id.$ne, id);
    assert.equal(call.limit, 4);
  }
  assert.equal(f.calls[1].filter.tags.$in[0], tagId);
});

test("detail DTOs preserve article content and normalize gallery images without serializing image data", async () => {
  const f = fixture();
  const post = await f.content.publicPost(id);
  await f.content.publicPost(id);
  assert.equal(f.calls.length, 1);
  assert.match(post.content, /^<p>/);
  assert.match(post.images[0].src, /^\/media\/posts\//);
  assert.equal(JSON.stringify(post).includes("data:image"), false);
  assert.equal(await f.content.publicPost("c".repeat(24)), null);
});
