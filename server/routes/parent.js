import express from "express";
import auth from "../middleware/auth.js";
import requireRole from "../middleware/roleCheck.js";
import validateStudentAccess from "../middleware/studentAccess.js";
import {
  getMyChildren,
  getChildAttendance,
  getChildGrades,
  getChildReportCard,
  getNotices,
  getStudyMaterials,
  getChildClassInfo,
  getDashboardOverview,
} from "../controllers/parentController.js";

const router = express.Router();

// All routes require authentication and parent role
router.use(auth);
router.use(requireRole(["parent"]));

// Get parent's children
router.get("/children", getMyChildren);

// Dashboard overview
router.get("/dashboard", getDashboardOverview);

// Child-specific routes (with access validation)
router.get(
  "/children/:studentId/attendance",
  validateStudentAccess,
  getChildAttendance
);
router.get(
  "/children/:studentId/grades",
  validateStudentAccess,
  getChildGrades
);
router.get(
  "/children/:studentId/report-card",
  validateStudentAccess,
  getChildReportCard
);
router.get(
  "/children/:studentId/class-info",
  validateStudentAccess,
  getChildClassInfo
);

// General parent routes
router.get("/notices", getNotices);
router.get("/materials", getStudyMaterials);

export default router;
