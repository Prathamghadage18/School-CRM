import express from "express";
import auth from "../middleware/auth.js";
import requireRole from "../middleware/roleCheck.js";
import {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
} from "../controllers/userController.js";

const router = express.Router();

// All routes require authentication
router.use(auth);

// Get user profile
router.get("/profile/:userId", getUserProfile);

// Update own profile
router.put("/profile", updateUserProfile);

// Get all users (admin only)
router.get("/", requireRole(["admin"]), getAllUsers);

export default router;
