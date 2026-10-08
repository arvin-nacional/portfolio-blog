"use server";
import { publicProjects, publicRecentProjects, publicCategories } from "@/lib/public-content";

import { requireAdmin } from "@/lib/auth/session";

import { revalidatePath, updateTag } from "next/cache";

import { v2 as cloudinary } from "cloudinary";

import { cache } from "react";

// import { FilterQuery } from "mongoose";
import { connectToDatabase } from "../mongoose";
import {
  addProjectParams,
  DeleteProjectParams,
  EditProjectParams,
  getProjectByIdParams,
  GetProjectsParams,
  GetRecentProjectParams,
} from "./shared.types";
// import image from "next/image";
import Category from "@/database/category.model";
import Project from "@/database/project.model";
import mongoose, { FilterQuery } from "mongoose";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function createProject(params: addProjectParams) {
  await requireAdmin();
  try {
    await connectToDatabase();

    const {
      title,
      content,
      category,
      images,
      mainImage,
      path,
      clientName,
      softwareUsed,
      dateFinished,
      url,
    } = params;

    // Upload the project photo to Cloudinary
    const photoUploadResult = await cloudinary.uploader.upload(mainImage, {
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

    // Create the project
    const project = await Project.create({
      title,
      content,
      mainImage: photoUploadResult.url, // Use the Cloudinary URL
      dateFinished,
      clientName,
      softwareUsed,
      url,
      images: imageUrls,
    });

    const categoryDocuments = [];

    // Create the tags or get them if they already exist
    for (const tag of category) {
      const existingTag = await Category.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { projects: project._id } },
        { upsert: true, new: true }
      );

      categoryDocuments.push(existingTag._id);
    }

    await Project.findByIdAndUpdate(project._id, {
      $push: { category: { $each: categoryDocuments } },
    });

    updateTag("projects");
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteProject(params: DeleteProjectParams) {
  await requireAdmin();
  try {
    await connectToDatabase();

    const { projectId, path } = params;
    await Project.deleteOne({ _id: projectId });
    await Category.updateMany(
      { projects: projectId },
      { $pull: { projects: projectId } }
    );

    updateTag("projects");
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  } finally {
    // Remove any categories that no longer have any projects
    await Category.deleteMany({ projects: { $size: 0 } });
    updateTag("projects");
  }
}

export async function updateProject(params: EditProjectParams) {
  await requireAdmin();
  try {
    await connectToDatabase();
    const {
      projectId,
      title,
      content,
      images,
      mainImage,
      clientName,
      softwareUsed,
      dateFinished,
      path,
      url,
    } = params;

    // Upload the project photo to Cloudinary
    const photoUploadResult = await cloudinary.uploader.upload(mainImage, {
      // Additional Cloudinary options if needed
    });

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

    const project = await Project.findById(projectId).populate("category");

    if (!project) {
      throw new Error("Project not found");
    }

    project.title = title;
    project.content = content;
    project.clientName = clientName;
    project.softwareUsed = softwareUsed;
    project.dateFinished = dateFinished;
    project.url = url;
    project.mainImage = photoUploadResult.url;
    project.images = updatedImages;

    await project.save();

    updateTag("projects");
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getProjectById(params: getProjectByIdParams) {
  try {
    await connectToDatabase();
    const { projectId } = params;
    const project = await Project.findById(projectId).populate({
      path: "category",
      model: Category,
    });

    return { project };
  } catch (error) {
    console.log(error);
  }
}

export async function getAllProjects(params: GetProjectsParams) { return publicProjects(params); }

export const getAllProjectsCached = cache(async (params: GetProjectsParams) => {
  return await getAllProjects(params);
});

export async function getAllCategoryNamesAndIds() { return publicCategories(); }

export async function getRecentProjects(params: GetRecentProjectParams) { return publicRecentProjects(params.projectId || "", params.searchQuery || ""); }

export const getRecentProjectsCached = cache(
  async (params: GetRecentProjectParams) => {
    return await getRecentProjects(params);
  }
);
