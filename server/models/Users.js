// models/Users.js
import mongoose from "mongoose";
import { hash, compare } from "bcryptjs";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["principal", "teacher", "student", "parent"],
      required: true,
    },
    passkey: {
      type: String,
      sparse: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
    children: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    teacherId: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
    },
  },
  {
    timestamps: true,
  }
);

// 🔐 Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await hash(this.password, 12);
  next();
});

// 🔍 Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await compare(candidatePassword, this.password);
};

const User = model("User", userSchema);

// ✅ Named exports for controller use
export const findOne = (query) => User.findOne(query);
export const findById = (id) => User.findById(id);
export const create = (data) => User.create(data);

// ✅ Default export
export default User;
