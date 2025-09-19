import express from "express";
import {
  createNotice,
  getNotices,
  updateNotice,
  deleteNotice,
} from "../controllers/noticeController.js";
import auth from "../middleware/auth.js";
import { uploadNotice } from "../config/multer.js";

const router = express.Router();

// Protected routes
router.use(auth);
// Create Notice
router.post("/", uploadNotice.single("file"), createNotice);

// Get all Notices
router.get("/", getNotices);

// Update Notice
router.put("/:id", uploadNotice.single("file"), updateNotice);

// Delete Notice
router.delete("/:id", deleteNotice);

export default router;
