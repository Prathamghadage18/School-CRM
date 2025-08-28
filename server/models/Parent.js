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

export default model("Parent", parentSchema);
