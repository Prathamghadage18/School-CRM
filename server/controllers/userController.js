import User from "../models/User.js";
import { formatResponse, paginate } from "../utils/helpers.js";

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");

    if (!user) {
      return res.status(404).json(formatResponse(false, "User not found"));
    }

    res.json(
      formatResponse(true, "User profile retrieved successfully", { user })
    );
  } catch (error) {
    console.error("Get user profile error:", error);
    res
      .status(500)
      .json(formatResponse(false, "Server error retrieving user profile"));
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { firstName, lastName, email, phone },
      { new: true, runValidators: true }
    ).select("-password");

    res.json(formatResponse(true, "Profile updated successfully", { user }));
  } catch (error) {
    console.error("Update user profile error:", error);

    if (error.code === 11000) {
      return res
        .status(400)
        .json(formatResponse(false, "Email already exists"));
    }

    res
      .status(500)
      .json(formatResponse(false, "Server error updating profile"));
  }
};

// Get all users (for admin)
export const getAllUsers = async (req, res) => {
  try {
    const { role, page = 1, limit = 10, search } = req.query;

    let query = {};

    if (role) query.role = role;
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { employeeId: { $regex: search, $options: "i" } },
        { rollNumber: { $regex: search, $options: "i" } },
      ];
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 },
    };

    const users = await User.find(query)
      .select("-password")
      .skip((options.page - 1) * options.limit)
      .limit(options.limit);

    const totalUsers = await User.countDocuments(query);

    res.json(
      formatResponse(true, "Users retrieved successfully", {
        users,
        totalPages: Math.ceil(totalUsers / options.limit),
        currentPage: options.page,
        totalUsers,
      })
    );
  } catch (error) {
    console.error("Get all users error:", error);
    res
      .status(500)
      .json(formatResponse(false, "Server error retrieving users"));
  }
};
