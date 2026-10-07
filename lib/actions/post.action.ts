"use server";
import { publicPosts, publicRecentPosts } from "@/lib/public-content";

import { requireAdmin } from "@/lib/auth/session";

import {
  DeletePostParams,
  EditPostParams,
  GetPostsParams,
  GetRecentPostParams,
  TagWithPosts,
  addPostParams,
  getPostByIdParams,
} from "./shared.types";

import { cache } from "react";
import { connectToDatabase } from "../mongoose";
import Post, { IPost } from "@/database/post.model";

import { revalidatePath, updateTag } from "next/cache";
import Tag from "@/database/tag.model";

import { v2 as cloudinary } from "cloudinary";
import { FilterQuery } from "mongoose";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function createPost(params: addPostParams) {
  await requireAdmin();
  try {
    await connectToDatabase();

    const { title, content, tags, image, path, images } = params;

    // Upload the photo to Cloudinary
    const photoUploadResult = await cloudinary.uploader.upload(image, {
      // Additional Cloudinary options if needed
    });

    // Upload the additional images to Cloudinary
    const imageUploadResults = await Promise.all(
      images.map((image) => cloudinary.uploader.upload(image.src))
    );

    const imageUrls = imageUploadResults.map((result, index) => ({
      src: result.url,
      alt: images[index].alt,
    }));

    // Create the question
    const post = await Post.create({
      title,
      content,
      image: photoUploadResult.url, // Use the Cloudinary URL
      images: imageUrls,
    });

    const tagDocuments = [];

    // Create the tags or get them if they already exist
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { posts: post._id } },
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag._id);
    }

    await Post.findByIdAndUpdate(post._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    updateTag("posts");
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function getPosts(params: GetPostsParams) { return publicPosts(params); }

export async function getPostById(params: getPostByIdParams) {
  try {
    await connectToDatabase();
    const { postId } = params;
    const post = await Post.findById(postId).populate({
      path: "tags",
      model: Tag,
    });

    return { post };
  } catch (error) {
    console.log(error);
  }
}

export async function getRecentPosts(params: GetRecentPostParams) { return publicRecentPosts(params.postId || "", params.searchQuery || ""); }

export async function getRecentlyAddedPosts() { return publicRecentPosts(); }
export const getRecentlyAddedPostsCached = cache(async () => {
  return await getRecentlyAddedPosts();
});

export async function getRelatedPosts(
  tags: TagWithPosts[],
  currentId: string,
  limit = 4
) {
  try {
    await connectToDatabase();

    // Extract unique post IDs from tags array
    const postIds: Object[] = [];
    tags.forEach((tag) => {
      tag.posts.forEach((postId) => {
        if (!postIds.includes(postId)) {
          postIds.push(postId);
        }
      });
    });

    // Query related posts
    const query: any = {
      tags: { $in: postIds },
    };

    // Exclude current post if provided
    if (currentId) {
      // eslint-disable-next-line no-new-object
      query._id = { $ne: new Object(currentId) };
    }

    console.log(postIds);
    const relatedPosts: IPost[] = await Post.find(query).limit(limit);

    return { relatedPosts };
  } catch (error) {
    console.error("Error fetching related posts:", error);
    throw error;
  }
}

export async function editPost(params: EditPostParams) {
  await requireAdmin();
  try {
    await connectToDatabase();

    const { postId, title, content, path, image, images } = params;
    const post = await Post.findById(postId).populate("tags");

    // Upload additional images if they are in base64 format
    const updatedImages = await Promise.all(
      images.map(async (image) => {
        if (image.src.startsWith("data:image")) {
          const imageUploadResult = await cloudinary.uploader.upload(image.src);
          return { src: imageUploadResult.url, alt: image.alt };
        }
        return image;
      })
    );

    if (!post) {
      throw new Error("Post not found");
    }

    post.title = title;
    post.image = image;
    post.content = content;
    post.images = updatedImages;

    await post.save();

    updateTag("posts");
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function deletePost(params: DeletePostParams) {
  await requireAdmin();
  try {
    await connectToDatabase();

    const { postId, path } = params;
    await Post.deleteOne({ _id: postId });
    await Tag.updateMany({ posts: postId }, { $pull: { posts: postId } });

    updateTag("posts");
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  } finally {
    await Tag.deleteMany({ posts: { $size: 0 } });
    updateTag("posts");
  }
}
