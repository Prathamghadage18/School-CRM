import { Schema, model } from "mongoose";

const attendanceSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Present", "Absent", "Late"],
      required: true,
    },
    markedBy: {
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

// Compound index to prevent duplicate attendance records
attendanceSchema.index({ student: 1, date: 1 }, { unique: true });

export default model("Attendance", attendanceSchema);
