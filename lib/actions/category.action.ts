"use server";

import { FilterQuery } from "mongoose";
import { connectToDatabase } from "../mongoose";
import { GetProjectByCategoryId } from "./shared.types";
import Category, { ICategory } from "@/database/category.model";
import Project from "@/database/project.model";

export async function getProjectByCategoryId(params: GetProjectByCategoryId) {
  try {
    connectToDatabase();
    const { categoryId, page = 1, pageSize = 10, searchQuery } = params;

    const skipAmount = pageSize * (page - 1);

    const categoryFilter: FilterQuery<ICategory> = { _id: categoryId };

    const category = await Category.findOne(categoryFilter).populate({
      path: "projects",
      model: Project,
      match: searchQuery
        ? { title: { $regex: new RegExp(searchQuery, "i") } }
        : {},
      options: {
        sort: { createdAt: -1 },
        skip: skipAmount,
        limit: pageSize + 1, // +1 to check if there is next page
      },
      populate: [{ path: "category", model: Category, select: "_id name" }],
    });

    if (!category) {
      throw new Error("Category not found");
    }

    const isNext = category.projects.length > pageSize;

    const projects = category.projects;

    return { projectTitle: category.name, projects, isNext };
  } catch (error) {
    console.log(error);
  }
}
