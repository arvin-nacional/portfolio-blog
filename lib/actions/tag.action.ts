"use server";

import { FilterQuery } from "mongoose";
import { connectToDatabase } from "../mongoose";
import { GetPostsByTagIdParams } from "./shared.types";
import Tag, { ITag } from "@/database/tag.model";

export async function getPostsByTagId(params: GetPostsByTagIdParams) {
  try {
    connectToDatabase();

    const {
      tagIds,
      // page = 1,
      pageSize = 10,
      searchQuery,
      currentPostId,
    } = params;

    const tagFilter: FilterQuery<ITag> = { _id: { $in: tagIds } };

    const tags = await Tag.find(tagFilter).populate({
      path: "posts",
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: "i" } }
        : {},
      options: {
        sort: { createdAt: -1 },
        limit: pageSize + 1, // +1 to check if there is next page
      },
      populate: [{ path: "tags", model: Tag, select: "_id name" }],
    });

    // Collect all posts from the found tags
    let posts = tags.flatMap((tag) => tag.posts);

    // Remove duplicates
    const postMap = new Map();
    posts.forEach((post) => {
      if (!postMap.has(post._id.toString())) {
        postMap.set(post._id.toString(), post);
      }
    });
    posts = Array.from(postMap.values());

    // Filter out the currentPostId
    posts = posts.filter((post) => post._id.toString() !== currentPostId);

    // Limit the posts to 4
    posts = posts.slice(0, 4);

    return { posts };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
