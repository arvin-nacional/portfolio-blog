"use server";

import { revalidatePath } from "next/cache";

import { v2 as cloudinary } from "cloudinary";
// import { FilterQuery } from "mongoose";
import { connectToDatabase } from "../mongoose";
import {
  addProjectParams,
  DeleteProjectParams,
  EditProjectParams,
  getProjectByIdParams,
  GetProjectsParams,
} from "./shared.types";
// import image from "next/image";
import Category from "@/database/category.model";
import Project from "@/database/project.model";
import { FilterQuery } from "mongoose";

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

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProject(params: DeleteProjectParams) {
  try {
    connectToDatabase();

    const { projectId, path } = params;
    await Project.deleteOne({ _id: projectId });
    await Category.updateMany(
      { projects: projectId },
      { $pull: { projects: projectId } }
    );

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function updateProject(params: EditProjectParams) {
  try {
    connectToDatabase();
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

    console.log(params);

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
    project.mainImage = mainImage;
    project.images = images;

    await project.save();

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

export async function getAllProjects(params: GetProjectsParams) {
  try {
    connectToDatabase();
    const { searchQuery, page = 1, pageSize = 9 } = params;

    // Calculcate the number of posts to skip based on the page number and page size
    const skipAmount = (page - 1) * pageSize;
    const query: FilterQuery<typeof Project> = {};

    if (searchQuery) {
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { content: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    const projects = await Project.find(query)
      .populate({ path: "category", model: Category })
      .skip(skipAmount)
      .sort({ createdAt: -1 })
      .limit(pageSize);

    const totalProjects = await Project.countDocuments(query);

    const isNext = totalProjects > skipAmount + projects.length;

    return { projects, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function getAllCategoryNamesAndIds() {
  try {
    connectToDatabase();
    const categories = await Category.find({}, { name: 1, _id: 1 });
    return categories;
  } catch (error) {
    console.log(error);
    throw error;
  }
}