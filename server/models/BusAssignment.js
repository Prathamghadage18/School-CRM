// models/BusAssignment.js
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const busAssignmentSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    busNo: {
      type: String,
      required: true,
    },
    currentLocation: {
      lat: { type: Number, default: 0 },
      lng: { type: Number, default: 0 },
      lastUpdated: { type: Date, default: Date.now },
    },
    route: [
      {
        lat: Number,
        lng: Number,
        timestamp: Date,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// 📍 Update location method
busAssignmentSchema.methods.updateLocation = function (lat, lng) {
  this.currentLocation = { lat, lng, lastUpdated: new Date() };
  this.route.push({ lat, lng, timestamp: new Date() });
  if (this.route.length > 100) {
    this.route = this.route.slice(-100);
  }
  return this.save();
};

const BusAssignment = model("BusAssignment", busAssignmentSchema);

// ✅ Named exports
export const findById = (id) => BusAssignment.findById(id);
export const find = (query) => BusAssignment.find(query);

// ✅ Default export
export default BusAssignment;
