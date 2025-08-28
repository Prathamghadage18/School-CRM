import { Router } from "express";
const router = Router();
import {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
  getClassStudents,
  getClassTeachers,
  getClassStatistics,
  assignTeacherToClass,
  removeTeacherFromClass,
} from "../controllers/classController.js";
import { protect, authorize } from "../middleware/auth.js";

// All routes are protected
router.use(protect);

// Routes accessible to principal and teachers
router.get("/", authorize("principal", "teacher"), getAllClasses);
router.get("/:classId", authorize("principal", "teacher"), getClassById);
router.get(
  "/:classId/students",
  authorize("principal", "teacher"),
  getClassStudents
);
router.get(
  "/:classId/teachers",
  authorize("principal", "teacher"),
  getClassTeachers
);
router.get(
  "/:classId/statistics",
  authorize("principal", "teacher"),
  getClassStatistics
);

// Routes accessible only to principal
router.post("/", authorize("principal"), createClass);
router.put("/:classId", authorize("principal"), updateClass);
router.delete("/:classId", authorize("principal"), deleteClass);
router.post("/assign-teacher", authorize("principal"), assignTeacherToClass);
router.post("/remove-teacher", authorize("principal"), removeTeacherFromClass);

export default router;
