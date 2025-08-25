import { Schema, model } from "mongoose";

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
      lat: {
        type: Number,
        default: 0,
      },
      lng: {
        type: Number,
        default: 0,
      },
      lastUpdated: {
        type: Date,
        default: Date.now,
      },
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
  {
    timestamps: true,
  }
);

// Update location method
busAssignmentSchema.methods.updateLocation = function (lat, lng) {
  this.currentLocation = { lat, lng, lastUpdated: new Date() };
  this.route.push({ lat, lng, timestamp: new Date() });
  // Keep only the last 100 location points to prevent oversized documents
  if (this.route.length > 100) {
    this.route = this.route.slice(-100);
  }
  return this.save();
};

export default model("BusAssignment", busAssignmentSchema);
