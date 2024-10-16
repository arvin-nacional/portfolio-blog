import { Schema, model, models, Document } from "mongoose";

export interface IProject extends Document {
  mainImage: string;
  title: string;
  createdOn: Date;
  dateFinished: Date;
  softwareUsed: string[];
  clientName: string;
  content: string;
  images: string[];
  category: Schema.Types.ObjectId[];
  url: string;
}

const ProjectSchema = new Schema({
  mainImage: { type: String, required: true },
  title: { type: String, required: true },
  createdOn: { type: Date, default: Date.now },
  dateFinished: { type: Date, required: true },
  softwareUsed: [{ type: String, required: true }],
  clientName: { type: String, required: true },
  content: { type: String, required: true },
  images: [{ type: String }], // Array of image URLs
  category: [{ type: Schema.Types.ObjectId, ref: "Category", required: true }],
  url: String,
});

const Project = models.Project || model("Project", ProjectSchema);

export default Project;
