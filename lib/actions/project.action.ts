"use server";

import { revalidatePath } from "next/cache";

import { v2 as cloudinary } from "cloudinary";
// import { FilterQuery } from "mongoose";
import { connectToDatabase } from "../mongoose";
import { addProjectParams, getProjectByIdParams } from "./shared.types";
// import image from "next/image";
import Category from "@/database/category.model";
import Project from "@/database/project.model";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function createProject(params: addProjectParams) {
  try {
    connectToDatabase();

    const {
      title,
      content,
      category,
      // images,
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

    // Create the project
    const project = await Project.create({
      title,
      content,
      mainImage: photoUploadResult.url, // Use the Cloudinary URL
      dateFinished,
      clientName,
      softwareUsed,
      url,
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

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function getProjectById(params: getProjectByIdParams) {
  try {
    connectToDatabase();
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
