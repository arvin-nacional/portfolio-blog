import { Schema, models, model, Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  content: string;
  tags: Schema.Types.ObjectId[];
  views: number;
  image: string;
  createdAt: Date;
}

const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  views: { type: Number, default: 0 },
  image: String,
  createdAt: { type: Date, default: Date.now },
});

const Post = models.Post || model("Post", PostSchema);

export default Post;
