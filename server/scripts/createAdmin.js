import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import { hashPassword } from "../utils/passwordUtils.js";
import { DEFAULT_ADMIN } from "../config/constants.js";

dotenv.config();

const createAdminUser = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to database");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      console.log("Admin user already exists");
      process.exit(0);
    }

    // Create admin user
    const hashedPassword = await hashPassword(DEFAULT_ADMIN.password);

    const adminUser = new User({
      employeeId: DEFAULT_ADMIN.employeeId,
      username: DEFAULT_ADMIN.username,
      password: hashedPassword,
      role: DEFAULT_ADMIN.role,
      firstName: DEFAULT_ADMIN.firstName,
      lastName: DEFAULT_ADMIN.lastName,
      email: DEFAULT_ADMIN.email,
      isActive: true,
    });

    await adminUser.save();
    console.log("Admin user created successfully");
    console.log("Username: admin");
    console.log("Password: admin123");
    console.log("Please change the password after first login!");

    process.exit(0);
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  }
};

createAdminUser();
