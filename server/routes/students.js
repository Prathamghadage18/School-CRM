import { Router } from "express";
const router = Router();
import {
  getStudentProfile,
  getStudyMaterials,
  getAttendance,
  getGrades,
  getAnnouncements,
  getBusLocation,
} from "../controllers/studentController";
import { protect, authorize } from "../middleware/auth";

// All routes are protected and only accessible to students
router.use(protect);
router.use(authorize("student"));

// Student profile
router.get("/profile", getStudentProfile);

// Study materials
router.get("/materials", getStudyMaterials);

// Attendance
router.get("/attendance", getAttendance);

// Grades
router.get("/grades", getGrades);

// Announcements
router.get("/announcements", getAnnouncements);

// Bus location
router.get("/bus-location", getBusLocation);

export default router;
