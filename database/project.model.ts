import { Schema, model, models, Document } from "mongoose";

export interface IProject extends Document {
  mainImage: string;
  title: string;
  createdOn: Date;
  dateFinished: Date;
  softwaresUsed: string[];
  clientName: string;
  details: string;
  images: string[];
  category: Schema.Types.ObjectId;
  url: string;
}

const ProjectSchema = new Schema({
  mainImage: { type: String, required: true },
  title: { type: String, required: true },
  createdOn: { type: Date, default: Date.now },
  dateFinished: { type: Date, required: true },
  softwaresUsed: [{ type: String, required: true }],
  clientName: { type: String, required: true },
  shortText: { type: String, required: true },
  images: [{ type: String }], // Array of image URLs
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  url: String,
});

const Project = models.Project || model("Poroject", ProjectSchema);

export default Project;
