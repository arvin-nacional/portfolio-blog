import { ObjectId } from "mongoose";

export interface SidebarLink {
  imgURL: string;
  label: string;
  route: string;
}

export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}
export interface ParamsProps {
  params: { id: string };
}

export interface RelatedPostsProps {
  tagIds: ObjectId[];
  currentPostId: string;
}

export interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}

export interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

export interface TagProps {
  name: string;
  posts: string[];
}
