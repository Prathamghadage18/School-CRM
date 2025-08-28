import { Router } from "express";
const router = Router();
import {
  markAttendance,
  getAttendanceByClass,
  getStudentAttendance,
} from "../controllers/attendanceController";
import { protect, authorize } from "../middleware/auth";

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
