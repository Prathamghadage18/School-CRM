import express from "express";
import auth from "../middleware/auth.js";
import requireRole from "../middleware/roleCheck.js";
import {
  createUserCredentials,
  getUsers,
  resetUserPassword,
  toggleUserStatus,
  getUserStatistics,
} from "../controllers/adminController.js";

const router = express.Router();

// All routes require authentication and admin role
router.use(auth);
router.use(requireRole(["admin"]));

// Create user credentials
router.post("/users", createUserCredentials);

// Get all users with filtering
router.get("/users", getUsers);

// Get user statistics
router.get("/stats/users", getUserStatistics);

// Reset user password
router.patch("/users/:userId/reset-password", resetUserPassword);

// Deactivate/activate user
router.patch("/users/:userId/toggle-status", toggleUserStatus);

export default router;
