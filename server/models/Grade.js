const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
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

module.exports = mongoose.model("Grade", gradeSchema);
