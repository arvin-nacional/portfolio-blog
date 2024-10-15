"use server";

import {
  DeletePostParams,
  EditPostParams,
  GetPostsParams,
  GetRecentPostParams,
  TagWithPosts,
  addPostParams,
  getPostByIdParams,
} from "./shared.types";
import { connectToDatabase } from "../mongoose";
import Post, { IPost } from "@/database/post.model";

import { revalidatePath } from "next/cache";
import Tag from "@/database/tag.model";

import { v2 as cloudinary } from "cloudinary";
import { FilterQuery } from "mongoose";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function createPost(params: addPostParams) {
  try {
    connectToDatabase();

    const { title, content, tags, image, path } = params;

    // Upload the member photo to Cloudinary
    const photoUploadResult = await cloudinary.uploader.upload(image, {
      // Additional Cloudinary options if needed
    });

    // Create the question
    const post = await Post.create({
      title,
      content,
      image: photoUploadResult.url, // Use the Cloudinary URL
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

    // // Create an interaction record for the user's ask_question action
    // await Interaction.create({
    //   user: author,
    //   action: "ask_question",
    //   question: question._id,
    //   tags: tagDocuments,
    // });

    // // Increment author's reputation by +5 for creating a question
    // await User.findByIdAndUpdate(author, { $inc: { reputation: 5 } });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function getPosts(params: GetPostsParams) {
  try {
    connectToDatabase();
    const { searchQuery, page = 1, pageSize = 6 } = params;

    // Calculcate the number of posts to skip based on the page number and page size
    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Post> = {};

    console.log(searchQuery);

    if (searchQuery) {
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { content: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    const posts = await Post.find(query)
      .populate({ path: "tags", model: Tag })
      .skip(skipAmount)
      .sort({ createdAt: -1 })
      .limit(pageSize);

    const totalPosts = await Post.countDocuments(query);

    const isNext = totalPosts > skipAmount + posts.length;

    return { posts, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getPostById(params: getPostByIdParams) {
  try {
    connectToDatabase();
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

export async function getRecentPosts(params: GetRecentPostParams) {
  try {
    connectToDatabase();
    const { searchQuery, postId } = params;

    const query: FilterQuery<typeof Post> = {};

    if (searchQuery) {
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { content: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    let posts = await Post.find(query)
      .populate({ path: "tags", model: Tag })
      .sort({ createdAt: -1 }) // Sort by creation date in descending order
      .limit(5); // Limit to 5 posts to ensure we have 4 after filtering

    // Filter out the post with the given postId
    posts = posts.filter((post) => post._id.toString() !== postId);

    // If the number of posts is less than 4 after filtering, get more posts
    if (posts.length < 4) {
      const additionalPosts = await Post.find(query)
        .populate({ path: "tags", model: Tag })
        .sort({ createdAt: -1 })
        .skip(5) // Skip the first 5 posts we already retrieved
        .limit(4 - posts.length); // Limit to the number of posts needed to reach 4

      posts = posts.concat(additionalPosts);
    }

    return { posts };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getRecentlyAddedPosts() {
  try {
    connectToDatabase();
    const posts = await Post.find()
      .populate({ path: "tags", model: Tag })
      .sort({ createdAt: -1 }) // Sort by creation date in descending order
      .limit(5); // Limit to 5 posts to ensure we have 4 after filtering

    return { posts };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getRelatedPosts(
  tags: TagWithPosts[],
  currentId: string,
  limit = 4
) {
  try {
    connectToDatabase();

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
  try {
    connectToDatabase();

    const { postId, title, content, path, image } = params;
    const post = await Post.findById(postId).populate("tags");

    if (!post) {
      throw new Error("Post not found");
    }

    post.title = title;
    post.image = image;
    post.content = content;

    await post.save();

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function deletePost(params: DeletePostParams) {
  try {
    connectToDatabase();

    const { postId, path } = params;
    await Post.deleteOne({ _id: postId });
    await Tag.updateMany({ posts: postId }, { $pull: { posts: postId } });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
