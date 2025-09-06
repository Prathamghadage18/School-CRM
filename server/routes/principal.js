import express from "express";
import auth from "../middleware/auth.js";
import requireRole from "../middleware/roleCheck.js";
import {
  getAllUsers,
  getAllStudents,
  getAllClasses,
  getAllAttendance,
  getAllGrades,
  getAllStudyMaterials,
  getAllNotices,
  getDashboardAnalytics,
  getTeacherActivity,
  getStudentProgress,
} from "../controllers/principalController.js";

const router = express.Router();

// All routes require authentication and principal role
router.use(auth);
router.use(requireRole(["principal"]));

// User management (read-only)
router.get("/users", getAllUsers);

// Student management (read-only)
router.get("/students", getAllStudents);

// Class management (read-only)
router.get("/classes", getAllClasses);

// Attendance (read-only)
router.get("/attendance", getAllAttendance);

// Grades (read-only)
router.get("/grades", getAllGrades);

// Study materials (read-only)
router.get("/materials", getAllStudyMaterials);

// Notices (read-only)
router.get("/notices", getAllNotices);

// Dashboard analytics
router.get("/dashboard", getDashboardAnalytics);

// Teacher activity
router.get("/teacher-activity", getTeacherActivity);

// Student progress
router.get("/student-progress", getStudentProgress);

export default router;
