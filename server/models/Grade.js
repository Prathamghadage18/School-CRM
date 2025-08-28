import { Schema, model } from "mongoose";

const gradeSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    marks: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    term: {
      type: String,
      required: true,
    },
    academicYear: {
      type: String,
      required: true,
    },
    enteredBy: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    class: {
      type: Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to prevent duplicate grade entries
gradeSchema.index(
  { student: 1, subject: 1, term: 1, academicYear: 1 },
  { unique: true }
);

export default model("Grade", gradeSchema);
