// import mongoose from "mongoose";
// import mongoosePaginate from "mongoose-paginate-v2";

// const userSchema = new mongoose.Schema(
//   {
//     employeeId: {
//       type: String,
//       unique: true,
//       sparse: true,
//     },
//     rollNumber: {
//       type: String,
//       unique: true,
//       sparse: true,
//     },
//     username: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//       select: false, // Hide password by default
//     },
//     role: {
//       type: String,
//       enum: ["admin", "principal", "teacher", "parent", "student"],
//       required: true,
//     },
//     firstName: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     lastName: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },
//     class: {
//       type: String,
//       unique: true,
//       lowercase: true,
//     },
//     year: {
//       type: String,
//       unique: true,
//       lowercase: true,
//     },
//     subject: [
//       {
//         type: String,
//         lowercase: true,
//         trim: true,
//       }
//     ],
//     phone: {
//       type: String,
//       trim: true,
//     },
//     isActive: {
//       type: Boolean,
//       default: true,
//     },
//     lastLogin: {
//       type: Date,
//     },
//     avatar: {
//       type: String,
//       default: null,
//     },
//     //Teacher Specific Fields
//     subjects: [
//       {
//         type: String,
//       },
//     ],
//     classes: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Class",
//       },
//     ],
//     isClassTeacher: {
//       type: Boolean,
//       default: false,
//     },
//     qualification: {
//       type: String,
//     },
//     joiningDate: {
//       type: Date,
//     },
//   },
//   {
//     timestamps: true,
//     toJSON: {
//       transform: function (doc, ret) {
//         delete ret.password;
//         return ret;
//       },
//     },
//   }
// );

// // Indexes for optimized queries
// userSchema.index({ employeeId: 1 });
// userSchema.index({ rollNumber: 1 });
// userSchema.index({ role: 1 });
// userSchema.index({ email: 1 });
// userSchema.index({ isActive: 1 });
// userSchema.plugin(mongoosePaginate);

// const User = mongoose.model("User", userSchema);

// export default User;






import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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
      select: false,
    },
    role: {
      type: String,
      enum: ["admin", "principal", "teacher", "parent", "student"],
      required: true,
    },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
    avatar: { type: String, default: null },

    // ---------------- Student-specific ----------------
    studentDetails: {
      classes: [{ type: String, lowercase: true, trim: true }], // array of class names
      year: { type: String, lowercase: true, trim: true },
      subjects: [
        {
          name: { type: String, lowercase: true, trim: true },
          time: { type: String, trim: true },
        },
      ],
    },

    // ---------------- Teacher-specific ----------------
    teacherDetails: {
      subjects: [
        {
          name: { type: String, required: true, lowercase: true, trim: true },
          teachingTime: { type: String, trim: true },
        },
      ],
      classes: [{ type: String, lowercase: true, trim: true }],
      years: [{ type: String, lowercase: true, trim: true }],
      isClassTeacher: { type: Boolean, default: false },
      qualification: { type: String, trim: true },
      joiningDate: { type: Date },
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

userSchema.plugin(mongoosePaginate);

const User = mongoose.model("User", userSchema);
export default User;
