import express from "express";
import {
  login,
  getCurrentUser,
  changePassword,
} from "../controllers/authController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.post("/login", login);

// Protected routes
// router.use(auth);
router.get("/me", getCurrentUser);
router.put("/change-password", changePassword);

export default router;

