import { Schema, model } from "mongoose";

const studyMaterialSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    fileUrl: {
      type: String,
      required: true,
    },
    class: {
      type: Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("StudyMaterial", studyMaterialSchema);
