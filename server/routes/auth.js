import express from "express";
import {
  login,
  getMe,
  changePassword,
  logout,
} from "../controllers/authController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", auth, logout);
router.get("/me", auth, getMe);
router.patch("/change-password", auth, changePassword);

export default router;
