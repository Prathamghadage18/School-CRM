import { Schema, model } from "mongoose";

const studentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Parent",
      required: true,
    },
    class: {
      type: Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    rollNumber: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    busAssignment: {
      type: Schema.Types.ObjectId,
      ref: "BusAssignment",
    },
  },
  {
    timestamps: true,
  }
);

export default model("Student", studentSchema);
