// models/Parent.js
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const parentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    relation: {
      type: String,
      required: true,
      enum: ["Father", "Mother", "Guardian", "Other"],
    },
    occupation: String,
    phone: {
      type: String,
      required: true,
    },
    alternatePhone: String,
    children: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Parent = model("Parent", parentSchema);

// ✅ Named exports for controller use
export const findById = (id) => Parent.findById(id);
export const findByIdAndUpdate = (id, update) =>
  Parent.findByIdAndUpdate(id, update, { new: true });
export const create = (data) => Parent.create(data);

// ✅ Default export for general use
export default Parent;
