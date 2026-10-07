import { createHash } from "node:crypto";

export function embeddedImage(value: string) {
  const match = /^data:(image\/(?:png|jpeg|webp|gif|avif));base64,([A-Za-z0-9+/=\s]+)$/.exec(value);
  if (!match) return null;
  return { mime: match[1], base64: match[2], version: createHash("sha256").update(value).digest("hex").slice(0, 32) };
}

export function publicImageSrc(value: string, collection: "posts" | "projects", id: string): string {
  const image = embeddedImage(value || "");
  if (image) return `/media/${collection}/${id}/${image.version}`;
  return (value || "").replace(/^http:\/\/res\.cloudinary\.com\//, "https://res.cloudinary.com/");
}
