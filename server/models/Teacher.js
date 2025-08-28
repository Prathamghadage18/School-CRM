import { Schema, model } from "mongoose";

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

export default model("Teacher", teacherSchema);
