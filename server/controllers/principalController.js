import User from "../models/User.js";
import Student from "../models/Student.js";
import Class from "../models/Class.js";
import Attendance from "../models/Attendance.js";
import Grade from "../models/Grade.js";
import StudyMaterial from "../models/StudyMaterial.js";
import Notice from "../models/Notice.js";
import { formatResponse } from "../utils/helpers.js";

// Get all users (read-only)
export const getAllUsers = async (req, res) => {
  try {
    const { role, page = 1, limit = 10, search } = req.query;

    let query = {};

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
      formatResponse(true, "Users retrieved successfully", {
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
      .json(formatResponse(false, "Error fetching users", error.message));
  }
};

// Get all students
export const getAllStudents = async (req, res) => {
  try {
    const { class: className, page = 1, limit = 10, search } = req.query;

    let query = {};

    if (className) query.class = className;
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { rollNumber: { $regex: search, $options: "i" } },
      ];
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { firstName: 1 },
    };

    const students = await Student.find(query)
      .skip((options.page - 1) * options.limit)
      .limit(options.limit);

    const totalStudents = await Student.countDocuments(query);

    res.json(
      formatResponse(true, "Students retrieved successfully", {
        students,
        totalPages: Math.ceil(totalStudents / options.limit),
        currentPage: options.page,
        totalStudents,
      })
    );
  } catch (error) {
    console.error("Error fetching students:", error);
    res
      .status(500)
      .json(formatResponse(false, "Error fetching students", error.message));
  }
};

// Get all classes
export const getAllClasses = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;

    let query = {};

    if (search) {
      query.$or = [
        { className: { $regex: search, $options: "i" } },
        { section: { $regex: search, $options: "i" } },
      ];
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { className: 1, section: 1 },
    };

    const classes = await Class.find(query)
      .populate("classTeacher", "firstName lastName")
      .populate("students", "firstName lastName rollNumber")
      .skip((options.page - 1) * options.limit)
      .limit(options.limit);

    const totalClasses = await Class.countDocuments(query);

    res.json(
      formatResponse(true, "Classes retrieved successfully", {
        classes,
        totalPages: Math.ceil(totalClasses / options.limit),
        currentPage: options.page,
        totalClasses,
      })
    );
  } catch (error) {
    console.error("Error fetching classes:", error);
    res
      .status(500)
      .json(formatResponse(false, "Error fetching classes", error.message));
  }
};

// Get all attendance records
export const getAllAttendance = async (req, res) => {
  try {
    const {
      class: classId,
      date,
      period,
      subject,
      page = 1,
      limit = 10,
    } = req.query;

    let query = {};

    if (classId) query.class = classId;
    if (date) query.date = new Date(date);
    if (period) query.period = period;
    if (subject) query.subject = subject;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { date: -1 },
    };

    const attendance = await Attendance.find(query)
      .populate("class", "className section")
      .populate("students.student", "firstName lastName rollNumber")
      .populate("takenBy", "firstName lastName")
      .skip((options.page - 1) * options.limit)
      .limit(options.limit);

    const totalAttendance = await Attendance.countDocuments(query);

    res.json(
      formatResponse(true, "Attendance records retrieved successfully", {
        attendance,
        totalPages: Math.ceil(totalAttendance / options.limit),
        currentPage: options.page,
        totalAttendance,
      })
    );
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res
      .status(500)
      .json(
        formatResponse(
          false,
          "Error fetching attendance records",
          error.message
        )
      );
  }
};

// Get all grades
export const getAllGrades = async (req, res) => {
  try {
    const {
      class: classId,
      subject,
      term,
      academicYear,
      page = 1,
      limit = 10,
    } = req.query;

    let query = {};

    if (classId) query.class = classId;
    if (subject) query.subject = subject;
    if (term) query.term = term;
    if (academicYear) query.academicYear = academicYear;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { subject: 1, term: 1 },
    };

    const grades = await Grade.find(query)
      .populate("student", "firstName lastName rollNumber")
      .populate("class", "className section")
      .populate("enteredBy", "firstName lastName")
      .skip((options.page - 1) * options.limit)
      .limit(options.limit);

    const totalGrades = await Grade.countDocuments(query);

    res.json(
      formatResponse(true, "Grades retrieved successfully", {
        grades,
        totalPages: Math.ceil(totalGrades / options.limit),
        currentPage: options.page,
        totalGrades,
      })
    );
  } catch (error) {
    console.error("Error fetching grades:", error);
    res
      .status(500)
      .json(formatResponse(false, "Error fetching grades", error.message));
  }
};

// Get all study materials
export const getAllStudyMaterials = async (req, res) => {
  try {
    const { class: classId, subject, type, page = 1, limit = 10 } = req.query;

    let query = {};

    if (classId) query.class = classId;
    if (subject) query.subject = subject;
    if (type) query.type = type;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 },
    };

    const studyMaterials = await StudyMaterial.find(query)
      .populate("class", "className section")
      .populate("uploadedBy", "firstName lastName")
      .skip((options.page - 1) * options.limit)
      .limit(options.limit);

    const totalMaterials = await StudyMaterial.countDocuments(query);

    res.json(
      formatResponse(true, "Study materials retrieved successfully", {
        studyMaterials,
        totalPages: Math.ceil(totalMaterials / options.limit),
        currentPage: options.page,
        totalMaterials,
      })
    );
  } catch (error) {
    console.error("Error fetching study materials:", error);
    res
      .status(500)
      .json(
        formatResponse(false, "Error fetching study materials", error.message)
      );
  }
};

// Get all notices
export const getAllNotices = async (req, res) => {
  try {
    const {
      category,
      priority,
      targetAudience,
      page = 1,
      limit = 10,
    } = req.query;

    let query = {};

    if (category) query.category = category;
    if (priority) query.priority = priority;
    if (targetAudience) query.targetAudience = targetAudience;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 },
    };

    const notices = await Notice.find(query)
      .populate("createdBy", "firstName lastName")
      .skip((options.page - 1) * options.limit)
      .limit(options.limit);

    const totalNotices = await Notice.countDocuments(query);

    res.json(
      formatResponse(true, "Notices retrieved successfully", {
        notices,
        totalPages: Math.ceil(totalNotices / options.limit),
        currentPage: options.page,
        totalNotices,
      })
    );
  } catch (error) {
    console.error("Error fetching notices:", error);
    res
      .status(500)
      .json(formatResponse(false, "Error fetching notices", error.message));
  }
};

// Get dashboard analytics
export const getDashboardAnalytics = async (req, res) => {
  try {
    // Get user counts by role
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

    // Get student counts by class
    const studentCounts = await Student.aggregate([
      {
        $group: {
          _id: "$class",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "classes",
          localField: "_id",
          foreignField: "_id",
          as: "classInfo",
        },
      },
      {
        $unwind: "$classInfo",
      },
      {
        $project: {
          className: "$classInfo.className",
          section: "$classInfo.section",
          count: 1,
        },
      },
    ]);

    // Get today's attendance summary
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayAttendance = await Attendance.aggregate([
      {
        $match: {
          date: { $gte: today, $lt: tomorrow },
        },
      },
      {
        $unwind: "$students",
      },
      {
        $group: {
          _id: "$students.status",
          count: { $sum: 1 },
        },
      },
    ]);

    // Get recent notices
    const recentNotices = await Notice.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("createdBy", "firstName lastName");

    // Get class performance averages
    const classPerformance = await Grade.aggregate([
      {
        $group: {
          _id: "$class",
          averageMarks: { $avg: "$marks" },
        },
      },
      {
        $lookup: {
          from: "classes",
          localField: "_id",
          foreignField: "_id",
          as: "classInfo",
        },
      },
      {
        $unwind: "$classInfo",
      },
      {
        $project: {
          className: "$classInfo.className",
          section: "$classInfo.section",
          averageMarks: { $round: ["$averageMarks", 2] },
        },
      },
    ]);

    // Format the data
    const userStats = {};
    userCounts.forEach((item) => {
      userStats[item._id] = {
        total: item.count,
        active: item.active,
        inactive: item.count - item.active,
      };
    });

    const attendanceStats = {};
    todayAttendance.forEach((item) => {
      attendanceStats[item._id] = item.count;
    });

    res.json(
      formatResponse(true, "Dashboard analytics retrieved successfully", {
        userStats,
        studentCounts,
        attendanceStats,
        classPerformance,
        recentNotices,
      })
    );
  } catch (error) {
    console.error("Error fetching dashboard analytics:", error);
    res
      .status(500)
      .json(
        formatResponse(
          false,
          "Error fetching dashboard analytics",
          error.message
        )
      );
  }
};

// Get teacher activity
export const getTeacherActivity = async (req, res) => {
  try {
    const { teacherId, days = 30 } = req.query;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    let query = {
      uploadedBy: { $exists: true },
      createdAt: { $gte: startDate },
    };

    if (teacherId) query.uploadedBy = teacherId;

    // Get study materials uploaded by teachers
    const studyMaterials = await StudyMaterial.find(query)
      .populate("uploadedBy", "firstName lastName")
      .populate("class", "className section")
      .sort({ createdAt: -1 });

    // Get attendance records taken by teachers
    const attendanceQuery = {
      takenBy: { $exists: true },
      createdAt: { $gte: startDate },
    };

    if (teacherId) attendanceQuery.takenBy = teacherId;

    const attendanceRecords = await Attendance.find(attendanceQuery)
      .populate("takenBy", "firstName lastName")
      .populate("class", "className section")
      .sort({ date: -1 });

    // Get grades entered by teachers
    const gradesQuery = {
      enteredBy: { $exists: true },
      createdAt: { $gte: startDate },
    };

    if (teacherId) gradesQuery.enteredBy = teacherId;

    const gradeEntries = await Grade.find(gradesQuery)
      .populate("enteredBy", "firstName lastName")
      .populate("class", "className section")
      .populate("student", "firstName lastName")
      .sort({ createdAt: -1 });

    res.json(
      formatResponse(true, "Teacher activity retrieved successfully", {
        studyMaterials,
        attendanceRecords,
        gradeEntries,
      })
    );
  } catch (error) {
    console.error("Error fetching teacher activity:", error);
    res
      .status(500)
      .json(
        formatResponse(false, "Error fetching teacher activity", error.message)
      );
  }
};

// Get student progress
export const getStudentProgress = async (req, res) => {
  try {
    const { studentId, academicYear } = req.query;

    if (!studentId) {
      return res
        .status(400)
        .json(formatResponse(false, "Student ID is required"));
    }

    // Get student details
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json(formatResponse(false, "Student not found"));
    }

    // Get grades for the student
    const gradeQuery = { student: studentId };
    if (academicYear) gradeQuery.academicYear = academicYear;

    const grades = await Grade.find(gradeQuery)
      .populate("class", "className section")
      .populate("enteredBy", "firstName lastName")
      .sort({ academicYear: 1, term: 1, subject: 1 });

    // Get attendance for the student
    const attendanceQuery = { "students.student": studentId };
    if (academicYear) {
      // Assuming academicYear is in format "2023-2024"
      const yearParts = academicYear.split("-");
      if (yearParts.length === 2) {
        const startYear = parseInt(yearParts[0]);
        const endYear = parseInt(yearParts[1]);

        const startDate = new Date(startYear, 3, 1); // April 1st of start year
        const endDate = new Date(endYear, 2, 31); // March 31st of end year

        attendanceQuery.date = { $gte: startDate, $lte: endDate };
      }
    }

    const attendanceRecords = await Attendance.find(attendanceQuery)
      .populate("class", "className section")
      .populate("takenBy", "firstName lastName");

    // Calculate attendance summary
    let totalDays = 0;
    let presentDays = 0;
    let absentDays = 0;

    attendanceRecords.forEach((record) => {
      const studentRecord = record.students.find(
        (s) => s.student.toString() === studentId.toString()
      );

      if (studentRecord) {
        totalDays++;
        if (studentRecord.status === "present") {
          presentDays++;
        } else if (studentRecord.status === "absent") {
          absentDays++;
        }
      }
    });

    const attendancePercentage =
      totalDays > 0 ? (presentDays / totalDays) * 100 : 0;

    res.json(
      formatResponse(true, "Student progress retrieved successfully", {
        student,
        grades,
        attendance: {
          totalDays,
          presentDays,
          absentDays,
          percentage: Math.round(attendancePercentage * 100) / 100,
        },
        attendanceRecords,
      })
    );
  } catch (error) {
    console.error("Error fetching student progress:", error);
    res
      .status(500)
      .json(
        formatResponse(false, "Error fetching student progress", error.message)
      );
  }
};
