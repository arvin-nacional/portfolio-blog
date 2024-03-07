import { Schema, model, models, Document } from "mongoose";

interface ISubscriber extends Document {
  email: string;
}

const subscriberSchema = new Schema({
  email: { type: String, required: true },
});

const Subscriber =
  models.Subscriber || model<ISubscriber>("Subscriber", subscriberSchema);

export default Subscriber;
