import "server-only";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import { connectToDatabase } from "@/lib/mongoose";
import Project from "@/database/project.model";
import Post from "@/database/post.model";
import Category from "@/database/category.model";
import Tag from "@/database/tag.model";
import { getCardExcerpt } from "@/lib/card-excerpt";
import { literalSearch, positivePage, searchQuery } from "@/lib/content-query";
import { publicImageSrc } from "@/lib/content-images";

interface ContentImage { src: string; alt: string }
interface RawPost { _id: unknown; title: string; content: string; image: string; createdAt: Date; tags: any[]; images?: ContentImage[] }
interface RawProject { _id: unknown; title: string; content: string; mainImage: string; createdOn: Date; dateFinished: Date; category: any[]; images?: ContentImage[]; softwareUsed?: string[]; clientName: string; url?: string }

const validId = (id: string) => /^[a-f\d]{24}$/i.test(id);
const labels = (items: any[] = []) => items.map(item => ({ _id: String(item._id), name: String(item.name) }));
const iso = (date: any) => new Date(date).toISOString();
const postCard = (post: any) => ({ _id: String(post._id), title: post.title, content: getCardExcerpt(post.content || ""),
  image: publicImageSrc(post.image, "posts", String(post._id)), createdAt: iso(post.createdAt), tags: labels(post.tags) });
const projectCard = (project: any) => ({ _id: String(project._id), title: project.title, content: getCardExcerpt(project.content || ""),
  mainImage: publicImageSrc(project.mainImage, "projects", String(project._id)), createdOn: iso(project.createdOn),
  dateFinished: iso(project.dateFinished), category: labels(project.category) });
const postFields = "title content image createdAt tags";
const projectFields = "title content mainImage createdOn dateFinished category";

const cachedPosts = unstable_cache(async (q: string, page: number, size: number) => {
  await connectToDatabase();
  const rows = await Post.find(searchQuery(q)).select(postFields).populate({ path: "tags", model: Tag, select: "name" })
    .sort({ createdAt: -1, _id: -1 }).skip((page - 1) * size).limit(size + 1).lean();
  return { posts: rows.slice(0, size).map(postCard), isNext: rows.length > size };
}, ["public-posts-v1"], { revalidate: 60, tags: ["posts"] });

const cachedProjects = unstable_cache(async (q: string, page: number, size: number, category: string) => {
  if (category && category !== "All" && !validId(category)) return { projects: [], isNext: false };
  await connectToDatabase();
  const query = { ...searchQuery(q), ...(category && category !== "All" ? { category } : {}) };
  const rows = await Project.find(query).select(projectFields).populate({ path: "category", model: Category, select: "name" })
    .sort({ createdOn: -1, _id: -1 }).skip((page - 1) * size).limit(size + 1).lean();
  return { projects: rows.slice(0, size).map(projectCard), isNext: rows.length > size };
}, ["public-projects-v1"], { revalidate: 60, tags: ["projects"] });

export function publicPosts({ searchQuery: q, page, pageSize }: { searchQuery?: string; page?: number; pageSize?: number } = {}) {
  return cachedPosts(literalSearch(q), positivePage(page), Math.min(positivePage(pageSize, 6), 24));
}
export function publicProjects({ searchQuery: q, page, pageSize, category }: { searchQuery?: string; page?: number; pageSize?: number; category?: string } = {}) {
  return cachedProjects(literalSearch(q), positivePage(page), Math.min(positivePage(pageSize, 6), 24), category || "");
}

export const publicCategories = unstable_cache(async () => {
  await connectToDatabase();
  return labels(await Category.find().select("name").sort({ name: 1 }).lean());
}, ["public-categories-v1"], { revalidate: 60, tags: ["projects"] });

export const publicRecentPosts = unstable_cache(async (exclude: string = "", q: string = "") => {
  await connectToDatabase();
  const rows = await Post.find({ ...searchQuery(literalSearch(q)), ...(validId(exclude) ? { _id: { $ne: exclude } } : {}) })
    .select(postFields).populate({ path: "tags", model: Tag, select: "name" }).sort({ createdAt: -1, _id: -1 }).limit(exclude ? 4 : 5).lean();
  return { posts: rows.map(postCard) };
}, ["public-recent-posts-v1"], { revalidate: 60, tags: ["posts"] });

export const publicRecentProjects = unstable_cache(async (exclude: string = "", q: string = "") => {
  await connectToDatabase();
  const rows = await Project.find({ ...searchQuery(literalSearch(q)), ...(validId(exclude) ? { _id: { $ne: exclude } } : {}) })
    .select(projectFields).populate({ path: "category", model: Category, select: "name" }).sort({ createdOn: -1, _id: -1 }).limit(exclude ? 6 : 7).lean();
  return { projects: rows.map(projectCard) };
}, ["public-recent-projects-v1"], { revalidate: 60, tags: ["projects"] });

export const publicRelatedPosts = unstable_cache(async (tagIds: string[], currentId: string) => {
  const ids = tagIds.filter(validId);
  if (!ids.length || !validId(currentId)) return { posts: [] };
  await connectToDatabase();
  const rows = await Post.find({ tags: { $in: ids }, _id: { $ne: currentId } }).select(postFields)
    .populate({ path: "tags", model: Tag, select: "name" }).sort({ createdAt: -1, _id: -1 }).limit(4).lean();
  return { posts: rows.map(postCard) };
}, ["public-related-posts-v1"], { revalidate: 60, tags: ["posts"] });

function gallery(images: any[] = [], collection: "posts" | "projects", id: string) {
  return images.map(image => ({ src: publicImageSrc(image.src, collection, id), alt: image.alt || "" }));
}
const cachedPost = unstable_cache(async (id: string) => {
  if (!validId(id)) return null;
  await connectToDatabase();
  const post = await Post.findById(id).select(postFields + " images").populate({ path: "tags", model: Tag, select: "name" }).lean<RawPost | null>();
  return post ? { ...postCard(post), content: post.content, images: gallery(post.images, "posts", id) } : null;
}, ["public-post-detail-v1"], { revalidate: 60, tags: ["posts"] });

const cachedProject = unstable_cache(async (id: string) => {
  if (!validId(id)) return null;
  await connectToDatabase();
  const project = await Project.findById(id).select(projectFields + " images softwareUsed clientName url")
    .populate({ path: "category", model: Category, select: "name" }).lean<RawProject | null>();
  return project ? { ...projectCard(project), content: project.content, images: gallery(project.images, "projects", id),
    softwareUsed: project.softwareUsed || [], clientName: project.clientName, url: project.url } : null;
}, ["public-project-detail-v1"], { revalidate: 60, tags: ["projects"] });

export const publicPost = cache(cachedPost);
export const publicProject = cache(cachedProject);
