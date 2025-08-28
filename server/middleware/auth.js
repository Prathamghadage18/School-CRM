import { verify } from "jsonwebtoken";
import { findById } from "../models/User";

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

      // Get user from token and populate relevant fields based on role
      let userQuery = findById(decoded.id);

      if (decoded.role === "teacher") {
        userQuery = userQuery.populate("teacherId");
      } else if (decoded.role === "student") {
        userQuery = userQuery.populate("studentId");
      } else if (decoded.role === "parent") {
        userQuery = userQuery.populate("parentId");
      }

      req.user = await userQuery;

      if (!req.user) {
        return res
          .status(401)
          .json({ message: "Not authorized to access this route" });
      }

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
