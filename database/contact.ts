import { Schema, models, model, Document } from "mongoose";

export interface IContact extends Document {
  fullName: string;
  email: string;
  typeOfService: string;
  contactNumber: string;
  message: string;
}

const ContactFormSchema = new Schema({
  fullName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
  typeOfService: { type: String, required: true },
  message: { type: String, required: true },
});

const Contact = models.Contact || model<IContact>("Contact", ContactFormSchema);

export default Contact;
