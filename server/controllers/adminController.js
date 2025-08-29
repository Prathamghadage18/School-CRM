import User from "../models/User.js";
import Student from "../models/Student.js";
import {
  generateRandomPassword,
  hashPassword,
} from "../utils/passwordGenerator.js";

// Create user credentials (Principal/Teacher by Employee ID, Parent by Roll Number)
export const createUserCredentials = async (req, res) => {
  try {
    const { employeeId, rollNumber, role, firstName, lastName, email, phone } =
      req.body;

    // Validate required fields based on role
    if (["principal", "teacher"].includes(role) && !employeeId) {
      return res.status(400).json({
        message: "Employee ID is required for principal and teacher roles.",
      });
    }

    if (role === "parent" && !rollNumber) {
      return res.status(400).json({
        message: "Roll number is required for parent role.",
      });
    }

    // For parent role, verify the roll number exists
    if (role === "parent") {
      const student = await Student.findOne({ rollNumber });
      if (!student) {
        return res.status(404).json({
          message: "Student with provided roll number not found.",
        });
      }
    }

    // Generate username based on role
    let username;
    if (role === "parent") {
      username = `parent_${rollNumber}`;
    } else {
      username = employeeId;
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User with this username or email already exists.",
      });
    }

    // Generate random password
    const plainPassword = generateRandomPassword();
    const hashedPassword = await hashPassword(plainPassword);

    // Create new user
    const newUser = new User({
      employeeId: role !== "parent" ? employeeId : null,
      rollNumber: role === "parent" ? rollNumber : null,
      username,
      password: hashedPassword,
      role,
      firstName,
      lastName,
      email,
      phone,
    });

    await newUser.save();

    // Return user details with plain password (only this one time)
    res.status(201).json({
      message: "User created successfully.",
      user: {
        id: newUser._id,
        username: newUser.username,
        password: plainPassword, // Send only once for admin to share with user
        role: newUser.role,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      message: "Error creating user credentials.",
      error: error.message,
    });
  }
};

// Get all users with filtering and pagination
export const getUsers = async (req, res) => {
  try {
    const { role, page = 1, limit = 10, search } = req.query;

    const query = {};

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
      select: "-password",
      sort: { createdAt: -1 },
    };

    const users = await User.paginate(query, options);

    res.json({
      users: users.docs,
      totalPages: users.totalPages,
      currentPage: users.page,
      totalUsers: users.totalDocs,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      message: "Error fetching users.",
      error: error.message,
    });
  }
};

// Reset user password
export const resetUserPassword = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Generate new random password
    const plainPassword = generateRandomPassword();
    const hashedPassword = await hashPassword(plainPassword);

    user.password = hashedPassword;
    await user.save();

    res.json({
      message: "Password reset successfully.",
      newPassword: plainPassword, // Send only once for admin to share with user
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({
      message: "Error resetting password.",
      error: error.message,
    });
  }
};

// Deactivate/activate user
export const toggleUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.json({
      message: `User ${
        user.isActive ? "activated" : "deactivated"
      } successfully.`,
      isActive: user.isActive,
    });
  } catch (error) {
    console.error("Error toggling user status:", error);
    res.status(500).json({
      message: "Error updating user status.",
      error: error.message,
    });
  }
};
