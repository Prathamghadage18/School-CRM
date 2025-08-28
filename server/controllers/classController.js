import Class from "../models/Class.js";
import Student from "../models/Student.js";
import Teacher from "../models/Teacher.js";
// import User from "../models/User.js";

// Create a new class
export const createClass = async (req, res) => {
  try {
    const {
      name,
      section,
      academicYear,
      classTeacher,
      subjects,
      schedule,
      capacity,
    } = req.body;

    // Check if class already exists
    const existingClass = await Class.findOne({ name, section, academicYear });
    if (existingClass) {
      return res.status(400).json({
        success: false,
        message:
          "Class with this name, section, and academic year already exists",
      });
    }

    // Validate class teacher if provided
    if (classTeacher) {
      const teacher = await Teacher.findById(classTeacher);
      if (!teacher) {
        return res.status(404).json({
          success: false,
          message: "Class teacher not found",
        });
      }
    }

    const newClass = await Class.create({
      name,
      section,
      academicYear,
      classTeacher,
      subjects,
      schedule,
      capacity,
    });

    await newClass.populate("classTeacher", "user employeeId");
    await newClass.populate({
      path: "classTeacher",
      populate: {
        path: "user",
        select: "name email",
      },
    });

    res.status(201).json({
      success: true,
      message: "Class created successfully",
      data: newClass,
    });
  } catch (error) {
    console.error("Create class error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get all classes
export const getAllClasses = async (req, res) => {
  try {
    const { page = 1, limit = 10, academicYear, isActive } = req.query;

    let query = {};

    if (academicYear) {
      query.academicYear = academicYear;
    }

    if (isActive !== undefined) {
      query.isActive = isActive === "true";
    }

    const classes = await Class.find(query)
      .populate("classTeacher", "user employeeId")
      .populate({
        path: "classTeacher",
        populate: {
          path: "user",
          select: "name email",
        },
      })
      .sort({ name: 1, section: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Class.countDocuments(query);

    res.status(200).json({
      success: true,
      data: classes,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get all classes error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get class by ID
export const getClassById = async (req, res) => {
  try {
    const { classId } = req.params;

    const classData = await Class.findById(classId)
      .populate("classTeacher", "user employeeId")
      .populate({
        path: "classTeacher",
        populate: {
          path: "user",
          select: "name email",
        },
      })
      .populate("studentCount")
      .populate("teacherCount");

    if (!classData) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    res.status(200).json({
      success: true,
      data: classData,
    });
  } catch (error) {
    console.error("Get class by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Update class
export const updateClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const updateData = req.body;

    // Validate class teacher if provided
    if (updateData.classTeacher) {
      const teacher = await Teacher.findById(updateData.classTeacher);
      if (!teacher) {
        return res.status(404).json({
          success: false,
          message: "Class teacher not found",
        });
      }
    }

    const updatedClass = await Class.findByIdAndUpdate(classId, updateData, {
      new: true,
      runValidators: true,
    })
      .populate("classTeacher", "user employeeId")
      .populate({
        path: "classTeacher",
        populate: {
          path: "user",
          select: "name email",
        },
      });

    if (!updatedClass) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Class updated successfully",
      data: updatedClass,
    });
  } catch (error) {
    console.error("Update class error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Delete class
export const deleteClass = async (req, res) => {
  try {
    const { classId } = req.params;

    // Check if class has students
    const studentCount = await Student.countDocuments({ class: classId });
    if (studentCount > 0) {
      return res.status(400).json({
        success: false,
        message:
          "Cannot delete class with students. Please reassign students first.",
      });
    }

    const deletedClass = await Class.findByIdAndDelete(classId);

    if (!deletedClass) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Class deleted successfully",
    });
  } catch (error) {
    console.error("Delete class error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get students in a class
export const getClassStudents = async (req, res) => {
  try {
    const { classId } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const classData = await Class.findById(classId);
    if (!classData) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    const students = await Student.find({ class: classId })
      .populate("user", "name email")
      .populate("parent", "relation phone")
      .populate("busAssignment", "bus_no")
      .sort({ rollNumber: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Student.countDocuments({ class: classId });

    res.status(200).json({
      success: true,
      data: students,
      classInfo: {
        name: classData.name,
        section: classData.section,
        academicYear: classData.academicYear,
      },
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get class students error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get teachers assigned to a class
export const getClassTeachers = async (req, res) => {
  try {
    const { classId } = req.params;

    const classData = await Class.findById(classId);
    if (!classData) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    const teachers = await Teacher.find({ classes: classId })
      .populate("user", "name email")
      .select("employeeId subjects");

    res.status(200).json({
      success: true,
      data: teachers,
      classInfo: {
        name: classData.name,
        section: classData.section,
      },
    });
  } catch (error) {
    console.error("Get class teachers error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get class statistics
export const getClassStatistics = async (req, res) => {
  try {
    const { classId } = req.params;

    const classData = await Class.findById(classId);
    if (!classData) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    // Get student count
    const studentCount = await Student.countDocuments({ class: classId });

    // Get teacher count
    const teacherCount = await Teacher.countDocuments({ classes: classId });

    // Get attendance statistics (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const attendanceStats = await Student.aggregate([
      { $match: { class: classId } },
      {
        $lookup: {
          from: "attendances",
          localField: "_id",
          foreignField: "student",
          as: "attendance",
        },
      },
      {
        $project: {
          name: 1,
          presentCount: {
            $size: {
              $filter: {
                input: "$attendance",
                as: "att",
                cond: {
                  $and: [
                    { $eq: ["$$att.status", "Present"] },
                    { $gte: ["$$att.date", thirtyDaysAgo] },
                  ],
                },
              },
            },
          },
          totalCount: {
            $size: {
              $filter: {
                input: "$attendance",
                as: "att",
                cond: { $gte: ["$$att.date", thirtyDaysAgo] },
              },
            },
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        studentCount,
        teacherCount,
        capacity: classData.capacity,
        attendanceStats,
      },
    });
  } catch (error) {
    console.error("Get class statistics error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Assign teacher to class
export const assignTeacherToClass = async (req, res) => {
  try {
    const { classId, teacherId } = req.body;

    const classData = await Class.findById(classId);
    if (!classData) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    // Add class to teacher's classes array if not already present
    if (!teacher.classes.includes(classId)) {
      teacher.classes.push(classId);
      await teacher.save();
    }

    res.status(200).json({
      success: true,
      message: "Teacher assigned to class successfully",
    });
  } catch (error) {
    console.error("Assign teacher to class error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Remove teacher from class
export const removeTeacherFromClass = async (req, res) => {
  try {
    const { classId, teacherId } = req.body;

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    // Remove class from teacher's classes array
    teacher.classes = teacher.classes.filter(
      (classObj) => classObj.toString() !== classId
    );
    await teacher.save();

    res.status(200).json({
      success: true,
      message: "Teacher removed from class successfully",
    });
  } catch (error) {
    console.error("Remove teacher from class error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
