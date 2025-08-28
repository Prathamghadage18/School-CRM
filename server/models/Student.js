// models/Student.js
import mongoose from "mongoose";

const { Schema, model } = mongoose;

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
    dateOfBirth: Date,
    address: String,
    phone: String,
    busAssignment: {
      type: Schema.Types.ObjectId,
      ref: "BusAssignment",
    },
  },
  {
    timestamps: true,
  }
);

const Student = model("Student", studentSchema);

// ✅ Named exports
export const findById = (id) => Student.findById(id);
export const create = (data) => Student.create(data);

// ✅ Default export
export default Student;
