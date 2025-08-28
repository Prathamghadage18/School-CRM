import Student from "../models/Student";
import StudyMaterial from "../models/StudyMaterial";
import Attendance from "../models/Attendance";
import Grade from "../models/Grade";
import Announcement from "../models/Announcement";
import Class from "../models/Class";
import BusAssignment from "../models/BusAssignment";

// Get student profile
export const getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user._id })
      .populate("class", "name section")
      .populate("parent", "relation phone")
      .populate("busAssignment", "bus_no current_location");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    console.error("Get student profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get study materials for student's class
export const getStudyMaterials = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user._id });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const { page = 1, limit = 10, subject } = req.query;

    let query = { class: student.class };
    if (subject) {
      query.subject = subject;
    }

    const materials = await StudyMaterial.find(query)
      .populate("class", "name section")
      .populate("uploadedBy", "name")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await StudyMaterial.countDocuments(query);

    res.status(200).json({
      success: true,
      data: materials,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get study materials error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get student's attendance
export const getAttendance = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user._id });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const { page = 1, limit = 30, startDate, endDate } = req.query;

    let query = { student: student._id };

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const attendance = await Attendance.find(query)
      .populate("markedBy", "name")
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Attendance.countDocuments(query);

    // Calculate attendance summary
    const totalDays = total;
    const presentDays = await Attendance.countDocuments({
      ...query,
      status: "Present",
    });
    const absentDays = await Attendance.countDocuments({
      ...query,
      status: "Absent",
    });
    const attendancePercentage =
      totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(2) : 0;

    res.status(200).json({
      success: true,
      data: attendance,
      summary: {
        total: totalDays,
        present: presentDays,
        absent: absentDays,
        percentage: attendancePercentage,
      },
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get attendance error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get student's grades
export const getGrades = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user._id });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const { page = 1, limit = 10, subject, term } = req.query;

    let query = { student: student._id };

    if (subject) {
      query.subject = subject;
    }

    if (term) {
      query.term = term;
    }

    const grades = await Grade.find(query)
      .populate("enteredBy", "name")
      .sort({ academicYear: -1, term: 1, subject: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Grade.countDocuments(query);

    // Calculate overall performance
    const allGrades = await Grade.find({ student: student._id });
    const totalMarks = allGrades.reduce((sum, grade) => sum + grade.marks, 0);
    const averageMarks =
      allGrades.length > 0 ? (totalMarks / allGrades.length).toFixed(2) : 0;

    res.status(200).json({
      success: true,
      data: grades,
      performance: {
        average: averageMarks,
        totalSubjects: allGrades.length,
      },
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get grades error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get announcements for student's class
export const getAnnouncements = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user._id });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const { page = 1, limit = 10 } = req.query;

    const announcements = await Announcement.find({
      $or: [
        { target: "all" },
        { target: "students" },
        { classes: student.class },
      ],
    })
      .populate("createdBy", "name")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Announcement.countDocuments({
      $or: [
        { target: "all" },
        { target: "students" },
        { classes: student.class },
      ],
    });

    res.status(200).json({
      success: true,
      data: announcements,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get announcements error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get student's bus location
export const getBusLocation = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user._id }).populate(
      "busAssignment"
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    if (!student.busAssignment) {
      return res.status(404).json({
        success: false,
        message: "Bus assignment not found for this student",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        busNo: student.busAssignment.bus_no,
        currentLocation: student.busAssignment.current_location,
        lastUpdated: student.busAssignment.updatedAt,
      },
    });
  } catch (error) {
    console.error("Get bus location error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
