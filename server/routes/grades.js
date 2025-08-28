import { Router } from "express";
const router = Router();
import {
  enterGrades,
  getGradesByClass,
  updateGrade,
} from "../controllers/gradeController.js";
import { protect, authorize } from "../middleware/auth.js";

router.post("/enter", protect, authorize("teacher"), enterGrades);

router.get(
  "/class/:classId/subject/:subject/term/:term/academicYear/:academicYear",
  protect,
  authorize("teacher", "principal"),
  getGradesByClass
);

router.put("/:gradeId", protect, authorize("teacher"), updateGrade);

export default router;
