import User from "../models/User.js";

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if user has permission to view this profile
    if (req.user.role !== "admin" && req.user.id !== req.params.userId) {
      return res.status(403).json({ message: "Access denied." });
    }

    res.json({ user });
  } catch (error) {
    console.error("Get user profile error:", error);
    res.status(500).json({
      message: "Error fetching user profile.",
      error: error.message,
    });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body;

    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check permissions
    if (req.user.role !== "admin" && req.user.id !== req.params.userId) {
      return res.status(403).json({ message: "Access denied." });
    }

    // Update fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (phone) user.phone = phone;

    await user.save();

    res.json({
      message: "Profile updated successfully.",
      user: user.toObject(),
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      message: "Error updating profile.",
      error: error.message,
    });
  }
};

// Search users
export const searchUsers = async (req, res) => {
  try {
    const { query, role, page = 1, limit = 10 } = req.query;

    const searchQuery = {};

    if (query) {
      searchQuery.$or = [
        { firstName: { $regex: query, $options: "i" } },
        { lastName: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { employeeId: { $regex: query, $options: "i" } },
        { rollNumber: { $regex: query, $options: "i" } },
      ];
    }

    if (role) {
      searchQuery.role = role;
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      select: "-password",
      sort: { createdAt: -1 },
    };

    const users = await User.paginate(searchQuery, options);

    res.json({
      users: users.docs,
      totalPages: users.totalPages,
      currentPage: users.page,
      totalUsers: users.totalDocs,
    });
  } catch (error) {
    console.error("Search users error:", error);
    res.status(500).json({
      message: "Error searching users.",
      error: error.message,
    });
  }
};
