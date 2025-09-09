// import mongoose from "mongoose";

// const studentSchema = new mongoose.Schema(
//   {
//     rollNumber: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     firstName: {
//       type: String,
//       required: true,
//     },
//     lastName: {
//       type: String,
//       required: true,
//     },
//     class: {
//       type: String,
//       required: true,
//     },
//     section: {
//       type: String,
//       required: true,
//     },
//     parentName: {
//       type: String,
//       required: true,
//     },
//     parentEmail: {
//       type: String,
//       required: true,
//     },
//     parentPhone: {
//       type: String,
//       required: true,
//     },
//     isActive: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Student = mongoose.model("Student", studentSchema);

// export default Student;

import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  rollNumber: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  section: {
    type: String,
    required: true
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  parentName: {
    type: String,
    required: true
  },
  parentEmail: {
    type: String,
    required: true
  },
  parentPhone: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date
  },
  admissionDate: {
    type: Date,
    default: Date.now
  },
  bloodGroup: {
    type: String
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String
  },
  medicalInfo: {
    allergies: [String],
    conditions: [String],
    medications: [String]
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better query performance
studentSchema.index({ rollNumber: 1 });
studentSchema.index({ parent: 1 });
studentSchema.index({ class: 1 });

const Student = mongoose.model('Student', studentSchema);

export default Student;
