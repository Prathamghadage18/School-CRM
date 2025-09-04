import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    term: {
      type: String,
      enum: ["first", "second", "third", "final"],
      required: true,
    },
    academicYear: {
      type: String,
      required: true,
    },
    marks: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
    grade: {
      type: String,
      enum: ["A+", "A", "B+", "B", "C+", "C", "D", "F"],
      required: true,
    },
    comments: {
      type: String,
    },
    enteredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

const Grade = mongoose.model("Grade", gradeSchema);

export default Grade;
