import { connectToDatabase } from "@/lib/mongoose";
import Post from "@/database/post.model";
import Project from "@/database/project.model";
import { embeddedImage } from "@/lib/content-images";

export async function GET(_request: Request, { params }: { params: Promise<{ collection: string; id: string; version: string }> }) {
  const { collection, id, version } = await params;
  if (!["posts", "projects"].includes(collection) || !/^[a-f\d]{24}$/i.test(id) || !/^[a-f\d]{32}$/.test(version)) return new Response(null, { status: 404 });
  await connectToDatabase();
  const model = collection === "posts" ? Post : Project;
  const record = await model.findById(id).select("image mainImage images").lean<{ image?: string; mainImage?: string; images?: { src: string }[] } | null>();
  if (!record) return new Response(null, { status: 404 });
  const sources = [record.image, record.mainImage, ...(record.images || []).map((image: any) => image.src)];
  for (const source of sources) {
    if (typeof source !== "string") continue;
    const image = embeddedImage(source);
    if (image?.version !== version) continue;
    return new Response(new Uint8Array(Buffer.from(image.base64, "base64")), { headers: {
      "Content-Type": image.mime,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    } });
  }
  return new Response(null, { status: 404 });
}
