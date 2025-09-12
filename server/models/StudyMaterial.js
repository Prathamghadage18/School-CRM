import mongoose from "mongoose";

const studyMaterialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      enum: ["pdf", "document", "link", "video"],
      required: true,
    },
    file: {
      filename: String,
      path: String,
      originalName: String,
      size: Number,
    },
    link: {
      url: String,
      type: {
        type: String,
        enum: ["drive", "youtube", "website"],
      },
    },
    // class: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Class",
    //   required: true,
    // },
    class: { type: String, required: true },
    subject: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    tags: [String],
  },
  {
    timestamps: true,
  }
);

const StudyMaterial = mongoose.model("StudyMaterial", studyMaterialSchema);

export default StudyMaterial;
