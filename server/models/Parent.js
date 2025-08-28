import { Schema, model } from "mongoose";

const parentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    relation: {
      type: String,
      enum: ["father", "mother", "guardian"],
      required: true,
    },
    occupation: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    alternatePhone: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Parent", parentSchema);
