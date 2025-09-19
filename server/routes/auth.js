import express from "express";
import {
  login,
  changePassword,
  getUserProfileById,
  updateUserProfileById,
} from "../controllers/authController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.post("/login", login);

// Protected routes
router.use(auth);
router.get("/user/:user_id", getUserProfileById);
router.put("/user/:user_id", updateUserProfileById);
router.put("/change-password", changePassword);

export default router;

