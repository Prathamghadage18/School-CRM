import Student from "../models/Student.js";

// Middleware to validate parent has access to the requested student
const validateStudentAccess = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const parentId = req.user.id;

    // Find the student and check if it belongs to the parent
    const student = await Student.findOne({
      _id: studentId,
      parent: parentId,
    });

    if (!student) {
      return res.status(403).json({
        success: false,
        message:
          "Access denied. You do not have permission to access this student.",
      });
    }

    req.student = student;
    next();
  } catch (error) {
    console.error("Student access validation error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during access validation",
    });
  }
};

export default validateStudentAccess;
