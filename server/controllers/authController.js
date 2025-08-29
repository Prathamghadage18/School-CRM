import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { comparePassword } from "../utils/passwordGenerator.js";

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

// Login user
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        message: "Please provide username and password.",
      });
    }

    // Check for user
    const user = await User.findOne({
      $or: [{ username }, { email: username }],
    }).select("+password");

    if (!user || !user.isActive) {
      return res.status(401).json({
        message: "Invalid credentials.",
      });
    }

    // Check password
    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid credentials.",
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    // Remove password from response
    const userResponse = { ...user.toObject() };
    delete userResponse.password;

    res.json({
      message: "Login successful.",
      token,
      user: userResponse,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Error during login.",
      error: error.message,
    });
  }
};

// Get current user
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ user });
  } catch (error) {
    console.error("Get me error:", error);
    res.status(500).json({
      message: "Error fetching user data.",
      error: error.message,
    });
  }
};

// Change password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Verify current password
    const isCurrentPasswordValid = await comparePassword(
      currentPassword,
      user.password
    );
    if (!isCurrentPasswordValid) {
      return res
        .status(400)
        .json({ message: "Current password is incorrect." });
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password changed successfully." });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({
      message: "Error changing password.",
      error: error.message,
    });
  }
};

// Logout (client-side token removal)
export const logout = async (req, res) => {
  try {
    res.json({ message: "Logout successful." });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      message: "Error during logout.",
      error: error.message,
    });
  }
};
