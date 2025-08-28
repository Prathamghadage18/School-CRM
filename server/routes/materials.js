import { Router } from "express";
const router = Router();
import {
  uploadMaterial,
  getMaterialsByClass,
  deleteMaterial,
} from "../controllers/materialController";
import { protect, authorize } from "../middleware/auth";
import upload from "../middleware/upload";

router.post(
  "/upload",
  protect,
  authorize("teacher"),
  upload.single("file"),
  uploadMaterial
);

router.get(
  "/class/:classId",
  protect,
  authorize("teacher", "student", "parent"),
  getMaterialsByClass
);

router.delete("/:materialId", protect, authorize("teacher"), deleteMaterial);

export default router;
