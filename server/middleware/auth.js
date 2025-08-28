import jwt from "jsonwebtoken";
const { verify } = jwt;
import { findById } from "../models/Users.js";

// Protect routes - verify JWT token
export async function protect(req, res, next) {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res
        .status(401)
        .json({ message: "Not authorized to access this route" });
    }

    try {
      const decoded = verify(token, process.env.JWT_SECRET);

      // Get user from token
      const user = await findById(decoded.id);

      if (!user) {
        return res
          .status(401)
          .json({ message: "Not authorized to access this route" });
      }

      // Populate based on role
      if (user.role === "teacher") {
        await user.populate("teacherId");
      } else if (user.role === "student") {
        await user.populate("studentId");
      } else if (user.role === "parent") {
        await user.populate("parentId");
      }

      req.user = user;
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Not authorized to access this route" });
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// Grant access to specific roles
export function authorize(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `User role ${req.user.role} is not authorized to access this route`,
      });
    }
    next();
  };
}
