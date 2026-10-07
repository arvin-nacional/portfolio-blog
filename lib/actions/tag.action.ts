"use server";
import { publicRelatedPosts } from "@/lib/public-content";

import { FilterQuery } from "mongoose";
import { connectToDatabase } from "../mongoose";
import { GetPostsByTagIdParams } from "./shared.types";
import Tag, { ITag } from "@/database/tag.model";

export async function getPostsByTagId(params: GetPostsByTagIdParams) { return publicRelatedPosts(params.tagIds.map(String).sort(), params.currentPostId || ""); }
