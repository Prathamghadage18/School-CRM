import mongoose from "mongoose";
import "../utils/helpers.js"; // Import to add paginate plugin

const userSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      unique: true,
      sparse: true,
    },
    rollNumber: {
      type: String,
      unique: true,
      sparse: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // Don't include password in queries by default
    },
    role: {
      type: String,
      enum: ["admin", "principal", "teacher", "parent"],
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
    },
    avatar: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

// Indexes
userSchema.index({ employeeId: 1 });
userSchema.index({ rollNumber: 1 });
userSchema.index({ role: 1 });
userSchema.index({ email: 1 });
userSchema.index({ isActive: 1 });

// Add pagination plugin
mongoose.paginate(userSchema);

const User = mongoose.model("User", userSchema);

export default User;
