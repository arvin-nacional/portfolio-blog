import { ObjectId } from "mongoose";

export interface addSubscriberParams {
  email: string;
  path: string;
}
export interface addContactParams {
  fullName: string;
  email: string;
  path: string;
  contactNumber: string;
  typeOfService: string;
  message: string;
}

export interface addPostParams {
  title: string;
  content: string;
  tags: string[];
  image: string;
  path: string;
}

export interface addProjectParams {
  category: string[];
  title: string;
  content: string;
  mainImage: string;
  clientName: string;
  softwareUsed: string[];
  images?: string[];
  dateFinished: string;
  path: string;
  url?: string;
}
export interface EditPostParams {
  postId: string;
  title: string;
  content: string;
  path: string;
  image: string;
}

export interface DeletePostParams {
  postId: string | undefined;
  path: string;
}

export interface GetPostsParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
}
export interface GetRecentPostParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
  postId?: string;
}

export interface getPostByIdParams {
  postId: string;
}

export interface getProjectByIdParams {
  projectId: string;
}

export interface GetRelatedPostsParams {
  tags: [];
}
export interface TagWithPosts {
  _id: ObjectId;
  posts: ObjectId[];
}

export interface GetPostsByTagIdParams {
  tagIds: ObjectId[];
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  currentPostId: string;
}
