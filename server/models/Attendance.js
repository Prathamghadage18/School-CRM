import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    class: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "Class",
      type: String,
      required: true,
    },
    students: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
          required: true,
        },
        status: {
          type: String,
          enum: ["present", "absent", "late", "excused"],
          default: "present",
        },
        remarks: String,
      },
    ],
    takenBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subject: {
      type: String,
    },
    period: {
      type: String,
      enum: ["morning", "afternoon", "full-day"],
      default: "full-day",
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to prevent duplicate attendance records
attendanceSchema.index(
  { date: 1, class: 1, period: 1, subject: 1 },
  { unique: true }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
