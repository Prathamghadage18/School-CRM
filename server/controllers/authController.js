import { findOne, create, findById } from "../models/User";
import { findById as _findById, create as _create } from "../models/Teacher";
import { findById as __findById, create as __create } from "../models/student";
import { findById as ___findById, findByIdAndUpdate, create as ___create } from "../models/Parent";
import { sign } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

// Generate JWT Token
const generateToken = (id) => {
  return sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,w
  });
};

// Create initial principal account
export async function createPrincipal() {
  try {
    const principalExists = await findOne({ role: "principal" });

    if (!principalExists) {
      const principal = await create({
        name: "School Principal",
        email: "principal@school.com",
        password: "principal123", // Default password
        role: "principal",
      });

      console.log("Principal account created successfully");
      console.log("Email: principal@school.com");
      console.log("Password: principal123");
    }
  } catch (error) {
    console.error("Error creating principal account:", error);
  }
}

// Login user
export async function login(req, res) {
  try {
    const { email, password, passkey } = req.body;

    // Check if email and password or passkey provided
    if ((!email || !password) && !passkey) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password or passkey",
      });
    }

    let user;

    // Check for passkey login (for teachers)
    if (passkey) {
      user = await findOne({ passkey }).populate("teacherId");

      if (!user || user.role !== "teacher") {
        return res.status(401).json({
          success: false,
          message: "Invalid passkey",
        });
      }
    } else {
      // Regular email/password login
      user = await findOne({ email }).select("+password");

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      // Check if password matches
      const isMatch = await user.comparePassword(password);

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Account is deactivated. Please contact administrator.",
      });
    }

    // Get additional user details based on role
    let userDetails = { ...user.toObject() };
    delete userDetails.password;

    if (user.role === "teacher" && user.teacherId) {
      const teacher = await _findById(user.teacherId);
      userDetails.teacherInfo = teacher;
    } else if (user.role === "student" && user.studentId) {
      const student = await __findById(user.studentId)
        .populate("class", "name section")
        .populate("parent", "user relation phone");
      userDetails.studentInfo = student;
    } else if (user.role === "parent") {
      const parent = await ___findById(user.parentId).populate(
        "children",
        "name class"
      );
      userDetails.parentInfo = parent;
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: userDetails,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

// Register teacher with passkey
export async function registerTeacher(req, res) {
  try {
    const {
      name,
      email,
      employeeId,
      subjects,
      classes,
      dateOfBirth,
      address,
      phone,
    } = req.body;

    // Check if user already exists
    const existingUser = await findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Generate unique passkey
    const passkey = uuidv4().substring(0, 8);

    // Create user account
    const user = await create({
      name,
      email,
      role: "teacher",
      passkey,
    });

    // Create teacher profile
    const teacher = await _create({
      user: user._id,
      employeeId,
      subjects,
      classes,
      dateOfBirth,
      address,
      phone,
    });

    // Update user with teacher ID
    user.teacherId = teacher._id;
    await user.save();

    res.status(201).json({
      success: true,
      message: "Teacher registered successfully",
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        teacher: {
          employeeId: teacher.employeeId,
          subjects: teacher.subjects,
        },
        passkey,
      },
    });
  } catch (error) {
    console.error("Teacher registration error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

// Register student
export async function registerStudent(req, res) {
  try {
    const {
      name,
      email,
      rollNumber,
      classId,
      dateOfBirth,
      address,
      phone,
      parentId,
    } = req.body;

    // Check if user already exists
    const existingUser = await findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Generate a temporary password
    const tempPassword = Math.random().toString(36).slice(-8);

    // Create user account
    const user = await create({
      name,
      email,
      password: tempPassword,
      role: "student",
    });

    // Create student profile
    const student = await __create({
      user: user._id,
      parent: parentId,
      class: classId,
      rollNumber,
      dateOfBirth,
      address,
      phone,
    });

    // Update user with student ID
    user.studentId = student._id;
    await user.save();

    // Update parent with child ID
    await findByIdAndUpdate(parentId, {
      $push: { children: student._id },
    });

    res.status(201).json({
      success: true,
      message: "Student registered successfully",
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        student: {
          rollNumber: student.rollNumber,
          class: student.class,
        },
        tempPassword,
      },
    });
  } catch (error) {
    console.error("Student registration error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

// Register parent
export async function registerParent(req, res) {
  try {
    const { name, email, relation, occupation, phone, alternatePhone } =
      req.body;

    // Check if user already exists
    const existingUser = await findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Generate a temporary password
    const tempPassword = Math.random().toString(36).slice(-8);

    // Create user account
    const user = await create({
      name,
      email,
      password: tempPassword,
      role: "parent",
    });

    // Create parent profile
    const parent = await ___create({
      user: user._id,
      relation,
      occupation,
      phone,
      alternatePhone,
    });

    // Update user with parent ID
    user.parentId = parent._id;
    await user.save();

    res.status(201).json({
      success: true,
      message: "Parent registered successfully",
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        parent: {
          relation: parent.relation,
          phone: parent.phone,
        },
        tempPassword,
      },
    });
  } catch (error) {
    console.error("Parent registration error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

// Change password
export async function changePassword(req, res) {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    const user = await findById(userId).select("+password");

    // Check current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

// Reset passkey (for teachers)
export async function resetPasskey(req, res) {
  try {
    const { teacherId } = req.params;

    // Check if user has permission (principal only)
    if (req.user.role !== "principal") {
      return res.status(403).json({
        success: false,
        message: "Only principal can reset passkeys",
      });
    }

    const user = await findOne({ teacherId, role: "teacher" });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    // Generate new passkey
    const newPasskey = uuidv4().substring(0, 8);
    user.passkey = newPasskey;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Passkey reset successfully",
      passkey: newPasskey,
    });
  } catch (error) {
    console.error("Reset passkey error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}
