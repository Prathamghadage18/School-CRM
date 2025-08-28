import { Router } from "express";
const router = Router();
import { login, registerTeacher, registerStudent, registerParent, changePassword, resetPasskey } from "../controllers/authController";
import { protect, authorize } from "../middleware/auth";

// Public routes
router.post("/login", login);

// Protected routes
router.post(
  "/register/teacher",
  protect,
  authorize("principal"),
  registerTeacher
);
router.post(
  "/register/student",
  protect,
  authorize("principal"),
  registerStudent
);
router.post(
  "/register/parent",
  protect,
  authorize("principal"),
  registerParent
);
router.put("/change-password", protect, changePassword);
router.put(
  "/reset-passkey/:teacherId",
  protect,
  authorize("principal"),
  resetPasskey
);

export default router;
