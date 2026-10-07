const { test } = require("@jest/globals");

const assert = require("node:assert/strict");

const { images, id, image } = require("../helpers/content.cjs");

test("embedded images use compact content-versioned URLs, with HTTPS for Cloudinary", () => {
  const url = images.publicImageSrc(image, "posts", id);
  assert.match(url, new RegExp(`^/media/posts/${id}/[a-f0-9]{32}$`));
  assert.notEqual(images.publicImageSrc(image + "A", "posts", id), url);
  assert.equal(
    images.publicImageSrc(
      "http://res.cloudinary.com/demo/image/upload/a.png",
      "posts",
      id,
    ),
    "https://res.cloudinary.com/demo/image/upload/a.png",
  );
  assert.equal(images.embeddedImage("data:text/html;base64,AAAA"), null);
  assert.equal(images.embeddedImage("data:image/svg+xml;base64,AAAA"), null);
});
