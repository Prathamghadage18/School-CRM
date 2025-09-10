import User from "../models/User.js";
import Student from "../models/Student.js";
import { hashPassword, validatePassword } from "../utils/passwordUtils.js";
import { generateUsername, formatResponse } from "../utils/helpers.js";
import { ROLES } from "../config/constants.js";

// Create user credentials (Principal/Teacher by Employee ID, Parent by Roll Number)
// export const createUserCredentials = async (req, res) => {
//   try {
//     const {
//       employeeId,
//       rollNumber,
//       role,
//       firstName,
//       lastName,
//       email,
//       phone,
//       password,
//     } = req.body;

//     // Validate required fields based on role
//     if ([ROLES.PRINCIPAL, ROLES.TEACHER].includes(role) && !employeeId) {
//       return res
//         .status(400)
//         .json(
//           formatResponse(
//             false,
//             "Employee ID is required for principal and teacher roles."
//           )
//         );
//     }

//     if (role === ROLES.PARENT && !rollNumber) {
//       return res
//         .status(400)
//         .json(
//           formatResponse(false, "Roll number is required for parent role.")
//         );
//     }

//     // Validate password strength
//     const passwordValidation = validatePassword(password);
//     if (!passwordValidation.isValid) {
//       return res
//         .status(400)
//         .json(formatResponse(false, passwordValidation.message));
//     }

//     // For parent role, verify the roll number exists
//     if (role === ROLES.PARENT) {
//       const student = await Student.findOne({ rollNumber });
//       if (!student) {
//         return res
//           .status(404)
//           .json(
//             formatResponse(
//               false,
//               "Student with provided roll number not found."
//             )
//           );
//       }
//     }

//     // Generate username based on role
//     const username = generateUsername(
//       role,
//       role === ROLES.PARENT ? rollNumber : employeeId
//     );

//     // Check if user already exists
//     const existingUser = await User.findOne({
//       $or: [{ username }, { email }],
//     });

//     if (existingUser) {
//       return res
//         .status(400)
//         .json(
//           formatResponse(
//             false,
//             "User with this username or email already exists."
//           )
//         );
//     }

//     // Hash password
//     const hashedPassword = await hashPassword(password);

//     // Create new user
//     const newUser = new User({
//       employeeId: role !== ROLES.PARENT ? employeeId : null,
//       rollNumber: role === ROLES.PARENT ? rollNumber : null,
//       username,
//       password: hashedPassword,
//       role,
//       firstName,
//       lastName,
//       email,
//       phone,
//     });

//     await newUser.save();

//     // Return user details without password
//     res.status(201).json(
//       formatResponse(true, "User created successfully.", {
//         user: {
//           id: newUser._id,
//           username: newUser.username,
//           role: newUser.role,
//           firstName: newUser.firstName,
//           lastName: newUser.lastName,
//           email: newUser.email,
//         },
//       })
//     );
//   } catch (error) {
//     console.error("Error creating user:", error);

//     if (error.code === 11000) {
//       return res
//         .status(400)
//         .json(
//           formatResponse(
//             false,
//             "User with this email or username already exists."
//           )
//         );
//     }

//     res
//       .status(500)
//       .json(
//         formatResponse(false, "Error creating user credentials.", error.message)
//       );
//   }
// };

// my export const createUserCredentials = async (req, res) => {
//   try {
//     const {
//       employeeId,
//       rollNumber,
//       role,
//       firstName,
//       lastName,
//       email,
//       phone,
//       password,
//       username: bodyUsername, // optional from frontend
//     } = req.body;

//     // console.log(
//     //   employeeId,
//     //   rollNumber,
//     //   role,
//     //   firstName,
//     //   lastName,
//     //   email,
//     //   phone,
//     //   password,
//     //   bodyUsername
//     // );

//     // ✅ Role-based required fields
//     if ([ROLES.PRINCIPAL, ROLES.TEACHER].includes(role) && !employeeId) {
//       return res
//         .status(400)
//         .json(formatResponse(false, "Employee ID is required."));
//     }

//     if ([ROLES.PARENT, ROLES.STUDENT].includes(role) && !rollNumber) {
//       return res
//         .status(400)
//         .json(formatResponse(false, "Roll number is required."));
//     }

//     // ✅ Validate password
//     const passwordValidation = validatePassword(password);
//     if (!passwordValidation.isValid) {
//       return res
//         .status(400)
//         .json(formatResponse(false, passwordValidation.message));
//     }

//     // ✅ For parent role → verify student exists
//     if (role === ROLES.PARENT) {
//       const student = await Student.findOne({ rollNumber });
//       if (!student) {
//         return res
//           .status(404)
//           .json(formatResponse(false, "Student not found."));
//       }
//     }

//     // ✅ Username: frontend provided OR generated
//     const username =
//       bodyUsername ||
//       generateUsername(
//         role,
//         role === ROLES.PARENT || role === ROLES.STUDENT
//           ? rollNumber
//           : employeeId
//       );

//     // ✅ Check duplicates safely
//     const orConditions = [];
//     if (username) orConditions.push({ username });
//     if (email) orConditions.push({ email });
//     if (
//       (role === ROLES.PARENT || role === ROLES.STUDENT) &&
//       rollNumber
//     ) {
//       orConditions.push({ rollNumber });
//     }
//     if (
//       (role === ROLES.PRINCIPAL || role === ROLES.TEACHER) &&
//       employeeId
//     ) {
//       orConditions.push({ employeeId });
//     }

//     let existingUser = null;
//     if (orConditions.length > 0) {
//       existingUser = await User.findOne({ $or: orConditions });
//     }

//     if (existingUser) {
//       let conflictField = "User";
//       if (existingUser.username === username) conflictField = "Username";
//       else if (existingUser.email === email) conflictField = "Email";
//       else if (
//         rollNumber &&
//         existingUser.rollNumber === rollNumber
//       )
//         conflictField = "Roll Number";
//       else if (
//         employeeId &&
//         existingUser.employeeId === employeeId
//       )
//         conflictField = "Employee ID";

//       return res
//         .status(400)
//         .json(formatResponse(false, `${conflictField} already exists.`));
//     }

//     // ✅ Hash password
//     const hashedPassword = await hashPassword(password);

//     // ✅ Create new user (normalize fields)
//     const newUser = new User({
//       employeeId:
//         role === ROLES.PRINCIPAL || role === ROLES.TEACHER
//           ? employeeId
//           : undefined,
//       rollNumber:
//         role === ROLES.PARENT || role === ROLES.STUDENT
//           ? rollNumber
//           : undefined,
//       username,
//       password: hashedPassword,
//       role,
//       firstName,
//       lastName,
//       email: email || undefined,
//       phone,
//     });

//     await newUser.save();

//     // ✅ Response
//     res.status(201).json(
//       formatResponse(true, "User created successfully.", {
//         user: {
//           id: newUser._id,
//           username: newUser.username,
//           role: newUser.role,
//           firstName: newUser.firstName,
//           lastName: newUser.lastName,
//           email: newUser.email,
//           employeeId: newUser.employeeId,
//           rollNumber: newUser.rollNumber,
//         },
//       })
//     );
//   } catch (error) {
//     console.error("Error creating user:", error);

//     if (error.code === 11000) {
//       return res
//         .status(400)
//         .json(formatResponse(false, "Duplicate user detected."));
//     }

//     res
//       .status(500)
//       .json(formatResponse(false, "Error creating user.", error.message));
//   }
// };
export const createUserCredentials = async (req, res) => {
  try {
    const {
      employeeId,
      rollNumber,
      role,
      firstName,
      lastName,
      email,
      phone,
      password,
      username: bodyUsername,
      // Student fields
      studentClass,
      year,
      studentSubjects,
      // Teacher fields
      teacherSubjects,
      teacherClasses,
      teacherYears,
      isClassTeacher,
      qualification,
      joiningDate,
    } = req.body;

    // ✅ Required validations
    if ([ROLES.PRINCIPAL, ROLES.TEACHER].includes(role) && !employeeId) {
      return res.status(400).json(formatResponse(false, "Employee ID is required."));
    }
    if ([ROLES.PARENT, ROLES.STUDENT].includes(role) && !rollNumber) {
      return res.status(400).json(formatResponse(false, "Roll number is required."));
    }

    // ✅ Student validations
    if (role === ROLES.STUDENT) {
      if (!studentClass) {
        return res.status(400).json(formatResponse(false, "Student class is required."));
      }
      if (!year || isNaN(Number(year)) || year.toString().length !== 4) {
        return res.status(400).json(formatResponse(false, "Valid year (e.g., 2025) is required."));
      }
      // if (!Array.isArray(studentSubjects) || studentSubjects.length === 0) {
      //   return res.status(400).json(formatResponse(false, "At least one subject is required."));
      // }
    }

    // ✅ Password validation
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return res.status(400).json(formatResponse(false, passwordValidation.message));
    }

    // ✅ Parent should have linked student
    if (role === ROLES.PARENT) {
      const student = await Student.findOne({ rollNumber });
      if (!student) {
        return res.status(404).json(formatResponse(false, "Student not found."));
      }
    }

    // ✅ Generate username
    const username =
      bodyUsername ||
      generateUsername(
        role,
        role === ROLES.PARENT || role === ROLES.STUDENT ? rollNumber : employeeId
      );

    // ✅ Duplicate check
    const orConditions = [];
    if (username) orConditions.push({ username });
    if (email) orConditions.push({ email });
    if ((role === ROLES.PARENT || role === ROLES.STUDENT) && rollNumber) {
      orConditions.push({ rollNumber });
    }
    if ((role === ROLES.PRINCIPAL || role === ROLES.TEACHER) && employeeId) {
      orConditions.push({ employeeId });
    }

    const existingUser = orConditions.length > 0 ? await User.findOne({ $or: orConditions }) : null;
    if (existingUser) {
      let conflictField = "User";
      if (existingUser.username === username) conflictField = "Username";
      else if (existingUser.email === email) conflictField = "Email";
      else if (rollNumber && existingUser.rollNumber === rollNumber) conflictField = "Roll Number";
      else if (employeeId && existingUser.employeeId === employeeId) conflictField = "Employee ID";

      return res.status(400).json(formatResponse(false, `${conflictField} already exists.`));
    }
    // ✅ Validate teacher subjects format
    if (role === ROLES.TEACHER) {
      if (
        !Array.isArray(teacherSubjects) ||
        teacherSubjects.length === 0 ||
        teacherSubjects.some(
          (s) => !s.subject || s.subject.trim() === "" // validate subject is not empty
        )
      ) {
        return res
          .status(400)
          .json(formatResponse(false, "least one valid subject is required."));
      }
    }

    // ✅ Hash password
    const hashedPassword = await hashPassword(password);

    // ✅ Build user object
    const newUser = new User({
      employeeId: [ROLES.PRINCIPAL, ROLES.TEACHER].includes(role) ? employeeId : undefined,
      rollNumber: [ROLES.PARENT, ROLES.STUDENT].includes(role) ? rollNumber : undefined,
      username,
      password: hashedPassword,
      role,
      firstName,
      lastName,
      email: email || undefined,
      phone,
      studentDetails:
        role === ROLES.STUDENT
          ? {
            classes: [studentClass], // ✅ FIXED
            year,
            subjects: studentSubjects, // [{ name, time }]
          }
          : undefined,
      teacherDetails:
        role === ROLES.TEACHER
          ? {
            subjects: teacherSubjects.map((s) => ({
              name: s.subject,
              teachingTime: s.time,
            })),
            classes: teacherClasses || [],
            years: teacherYears || [],
            isClassTeacher,
            qualification,
            joiningDate,
          }
          : undefined,
    });

    await newUser.save();

    res.status(201).json(
      formatResponse(true, "User created successfully.", {
        user: {
          id: newUser._id,
          username: newUser.username,
          role: newUser.role,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          employeeId: newUser.employeeId,
          rollNumber: newUser.rollNumber,
          studentDetails: newUser.studentDetails,
          teacherDetails: newUser.teacherDetails,
        },
      })
    );
  } catch (error) {
    console.error("Error creating user:", error);
    if (error.code === 11000) {
      return res.status(400).json(formatResponse(false, "Duplicate user detected."));
    }
    res.status(500).json(formatResponse(false, "Error creating user.", error.message));
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
      sort: { createdAt: -1 },
    };

    const users = await User.find(query)
      .select("-password")
      .skip((options.page - 1) * options.limit)
      .limit(options.limit);

    const totalUsers = await User.countDocuments(query);

    res.json(
      formatResponse(true, "Users retrieved successfully.", {
        users,
        totalPages: Math.ceil(totalUsers / options.limit),
        currentPage: options.page,
        totalUsers,
      })
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json(formatResponse(false, "Error fetching users.", error.message));
  }
};

// Reset user password
export const resetUserPassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { newPassword } = req.body;

    // Validate password strength
    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.isValid) {
      return res
        .status(400)
        .json(formatResponse(false, passwordValidation.message));
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json(formatResponse(false, "User not found."));
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    user.password = hashedPassword;
    await user.save();

    res.json(formatResponse(true, "Password reset successfully."));
  } catch (error) {
    console.error("Error resetting password:", error);
    res
      .status(500)
      .json(formatResponse(false, "Error resetting password.", error.message));
  }
};

// Deactivate/activate user
// export const toggleUserStatus = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const user = await User.findById(userId);
//     console.log("user Id to be toggled", userId, user);
//     if (!user) {
//       return res.status(404).json(formatResponse(false, "User not found."));
//     }

//     // Prevent admin from deactivating themselves
//     if (user._id.toString() === req.user.id && user.role === ROLES.ADMIN) {
//       return res
//         .status(400)
//         .json(
//           formatResponse(false, "Cannot deactivate your own admin account.")
//         );
//     }

//     user.isActive = !user.isActive;
//     await user.save();

//     res.json(
//       formatResponse(
//         true,
//         `User ${user.isActive ? "activated" : "deactivated"} successfully.`,
//         {
//           isActive: user.isActive,
//         }
//       )
//     );
//   } catch (error) {
//     console.error("Error toggling user status:", error);
//     res
//       .status(500)
//       .json(
//         formatResponse(false, "Error updating user status.", error.message)
//       );
//   }
// };
export const toggleUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json(formatResponse(false, "User not found."));
    }

    // ✅ Only run this if req.user exists
    if (req.user && user._id.toString() === req.user.id && user.role === ROLES.ADMIN) {
      return res
        .status(400)
        .json(
          formatResponse(false, "Cannot deactivate your own admin account.")
        );
    }

    user.isActive = !user.isActive;
    await user.save();

    res.json(
      formatResponse(
        true,
        `User ${user.isActive ? "activated" : "deactivated"} successfully.`,
        { isActive: user.isActive }
      )
    );
  } catch (error) {
    console.error("Error toggling user status:", error);
    res
      .status(500)
      .json(formatResponse(false, "Error updating user status.", error.message));
  }
};



// Get user statistics
export const getUserStatistics = async (req, res) => {
  try {
    const userCounts = await User.aggregate([
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 },
          active: {
            $sum: { $cond: [{ $eq: ["$isActive", true] }, 1, 0] },
          },
        },
      },
    ]);

    const statistics = {};
    userCounts.forEach((item) => {
      statistics[item._id] = {
        total: item.count,
        active: item.active,
        inactive: item.count - item.active,
      };
    });

    res.json(
      formatResponse(true, "User statistics retrieved successfully.", {
        statistics,
      })
    );
  } catch (error) {
    console.error("Error fetching user statistics:", error);
    res
      .status(500)
      .json(
        formatResponse(false, "Error fetching user statistics.", error.message)
      );
  }
};
