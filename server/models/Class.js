import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    section: {
      type: String,
      required: true,
      trim: true,
    },
    academicYear: {
      type: String,
      required: true,
      default: () => {
        const currentYear = new Date().getFullYear();
        return `${currentYear}-${currentYear + 1}`;
      },
    },
    classTeacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
    subjects: [
      {
        type: String,
        required: true,
      },
    ],
    schedule: {
      Monday: [
        {
          subject: String,
          startTime: String,
          endTime: String,
        },
      ],
      Tuesday: [
        {
          subject: String,
          startTime: String,
          endTime: String,
        },
      ],
      Wednesday: [
        {
          subject: String,
          startTime: String,
          endTime: String,
        },
      ],
      Thursday: [
        {
          subject: String,
          startTime: String,
          endTime: String,
        },
      ],
      Friday: [
        {
          subject: String,
          startTime: String,
          endTime: String,
        },
      ],
      Saturday: [
        {
          subject: String,
          startTime: String,
          endTime: String,
        },
      ],
    },
    capacity: {
      type: Number,
      default: 40,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to prevent duplicate classes
classSchema.index({ name: 1, section: 1, academicYear: 1 }, { unique: true });

// Virtual for student count
classSchema.virtual("studentCount", {
  ref: "Student",
  localField: "_id",
  foreignField: "class",
  count: true,
});

// Virtual for teacher count (teachers assigned to this class)
classSchema.virtual("teacherCount", {
  ref: "Teacher",
  localField: "_id",
  foreignField: "classes",
  count: true,
});

// Enable virtuals in JSON output
classSchema.set("toJSON", { virtuals: true });
classSchema.set("toObject", { virtuals: true });

export default mongoose.model("Class", classSchema);
