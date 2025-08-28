import { Router } from "express";
const router = Router();
import {
  markAttendance,
  getAttendanceByClass,
  getStudentAttendance,
} from "../controllers/attendanceController.js";
import { protect, authorize } from "../middleware/auth.js";

router.post("/mark", protect, authorize("teacher"), markAttendance);

router.get(
  "/class/:classId/date/:date",
  protect,
  authorize("teacher", "principal"),
  getAttendanceByClass
);

router.get(
  "/student/:studentId",
  protect,
  authorize("teacher", "principal", "parent"),
  getStudentAttendance
);

export default router;
