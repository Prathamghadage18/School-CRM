import express from "express";
import auth from "../middleware/auth.js";
import requireRole from "../middleware/roleCheck.js";
import { uploadMaterial } from "../config/multer.js";
import {
  getMyClasses,
  markAttendance,
  getAttendance,
  enterGrades,
  getGrades,
  uploadStudyMaterial,
  getStudyMaterials,
  deleteStudyMaterial,
  getClassPerformance,
} from "../controllers/teacherController.js";

const router = express.Router();

// All routes require authentication and teacher role
router.use(auth);
router.use(requireRole(["teacher"]));

// Class routes
router.get("/classes", getMyClasses);

// Attendance routes
router.post("/attendance", markAttendance);
router.get("/attendance", getAttendance);

// Grade routes
router.post("/grades", enterGrades);
router.get("/grades", getGrades);

// Study material routes
router.post("/materials", uploadMaterial.single("file"), uploadStudyMaterial);
router.get("/materials", getStudyMaterials);
router.delete("/materials/:materialId", deleteStudyMaterial);

// Dashboard routes
router.get("/performance", getClassPerformance);

export default router;
