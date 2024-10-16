import { Schema, models, model, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  description: string;
  projects: Schema.Types.ObjectId[];
}

const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
});

const Category = models.Category || model("Category", CategorySchema);

export default Category;
