import mongoose from "mongoose";

const credentialSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    lastChanged: {
      type: Date,
      default: Date.now,
    },
    mustChange: {
      type: Boolean,
      default: true,
    },
    resetToken: String,
    resetTokenExpiry: Date,
    loginAttempts: {
      type: Number,
      default: 0,
    },
    lockUntil: Date,
  },
  {
    timestamps: true,
  }
);

// Virtual for checking if account is locked
credentialSchema.virtual("isLocked").get(function () {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Index for better performance
credentialSchema.index({ userId: 1 });

const Credential = mongoose.model("Credential", credentialSchema);

export default Credential;
