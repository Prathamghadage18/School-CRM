import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import { hashPassword } from "../utils/passwordUtils.js";
import { DEFAULT_ADMIN } from "../config/constants.js";

dotenv.config();

const MONGO_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://dalvishrikant5456_db_user:5456@cluster0.fmcqzgx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const createAdminUser = async () => {
  try {
    // Connect to database
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to database");

    // Check if admin already exists by username (safer than just role)
    const existingAdmin = await User.findOne({
      username: DEFAULT_ADMIN.username,
    });

    if (existingAdmin) {
      console.log("Admin user already exists:", existingAdmin.username);
      process.exit(0);
    }

    // Hash default password
    const hashedPassword = await hashPassword(DEFAULT_ADMIN.password);

    // Create new admin user
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
    console.log(`Username: ${DEFAULT_ADMIN.username}`);
    console.log(`Password: ${DEFAULT_ADMIN.password}`);
    console.log("Please change the password after first login!");

    process.exit(0);
  } catch (error) {
    console.error("Error creating admin user:", error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
};

createAdminUser();
