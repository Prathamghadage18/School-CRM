import express from "express";
import auth from "../middleware/auth.js";
import requireRole from "../middleware/roleCheck.js";
import {
  getUserProfile,
  updateUserProfile,
  searchUsers,
} from "../controllers/userController.js";

const router = express.Router();

// All routes require authentication
router.use(auth);

// Get user profile
router.get("/profile/:userId", getUserProfile);

// Update user profile
router.patch("/profile/:userId", updateUserProfile);

// Search users (admin only)
router.get("/search", requireRole(["admin"]), searchUsers);

export default router;
