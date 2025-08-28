// models/Teacher.js
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const teacherSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },
    subjects: [
      {
        type: String,
        required: true,
      },
    ],
    classes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Class",
      },
    ],
    dateOfBirth: Date,
    address: String,
    phone: String,
  },
  {
    timestamps: true,
  }
);

const Teacher = model("Teacher", teacherSchema);

// ✅ Named exports
export const findById = (id) => Teacher.findById(id);
export const create = (data) => Teacher.create(data);

// ✅ Default export
export default Teacher;
