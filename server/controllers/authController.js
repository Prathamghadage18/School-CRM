import User from "../models/User.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { generateToken, formatResponse } from "../utils/helpers.js";

// Login user
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("credentials",username, password)

    // Check if user exists
    // Check if user exists (and include password)
const user = await User.findOne({ username }).select("+password");
if (!user) {
  return res.status(401).json(formatResponse(false, "Invalid credentials"));
}

    // Check if user is active
    if (!user.isActive) {
      return res
        .status(401)
        .json(
          formatResponse(
            false,
            "Account is deactivated. Please contact administrator."
          )
        );
    }

    // Check password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json(formatResponse(false, "Invalid credentials"));
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    // Return user info and token
    res.json(
  formatResponse(true, "Login successful", {
    token,
    user: {
      id: user._id,
      username: user.username,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  })
);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json(formatResponse(false, "Server error during login"));
  }
};

// Get user profile by ID
export const getUserProfileById = async (req, res) => {
  try {
    const { user_id } = req.params; // extract user_id from URL

    // Fetch user by ID
    const user = await User.findById(user_id);

    if (!user) {
      return res.status(404).json(formatResponse(false, "User not found"));
    }

    res.json(formatResponse(true, "User profile retrieved successfully", { user }));
  } catch (error) {
    console.error("Get user profile by ID error:", error);
    res.status(500).json(formatResponse(false, "Server error retrieving user profile"));
  }
};

// update user profile
export const updateUserProfileById = async (req, res) => {
  try {
    const { user_id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(user_id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json(formatResponse(false, "User not found"));
    }

    res.json(formatResponse(true, "User updated successfully", { user: updatedUser }));
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json(formatResponse(false, "Server error updating user"));
  }
};

// Change password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    // Verify current password
    const isCurrentPasswordValid = await comparePassword(
      currentPassword,
      user.password
    );
    if (!isCurrentPasswordValid) {
      return res
        .status(400)
        .json(formatResponse(false, "Current password is incorrect"));
    }

    // Update password
    user.password = await hashPassword(newPassword);
    await user.save();

    res.json(formatResponse(true, "Password changed successfully"));
  } catch (error) {
    console.error("Change password error:", error);
    res
      .status(500)
      .json(formatResponse(false, "Server error changing password"));
  }
};