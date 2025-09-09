import Student from "../models/Student.js";
import Attendance from "../models/Attendance.js";
import Grade from "../models/Grade.js";
import Notice from "../models/Notice.js";
import StudyMaterial from "../models/StudyMaterial.js";
import Class from "../models/Class.js";
import { formatResponse } from "../utils/helpers.js";

// Get parent's children
export const getMyChildren = async (req, res) => {
  try {
    const parentId = req.user.id;

    const children = await Student.find({ parent: parentId })
      .populate("class", "className section academicYear")
      .sort({ firstName: 1 });

    res.json(
      formatResponse(true, "Children retrieved successfully", { children })
    );
  } catch (error) {
    console.error("Error fetching children:", error);
    res
      .status(500)
      .json(formatResponse(false, "Error fetching children", error.message));
  }
};

// Get child's attendance
export const getChildAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { startDate, endDate, period, subject } = req.query;

    let query = { "students.student": studentId };

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    if (period) query.period = period;
    if (subject) query.subject = subject;

    const attendance = await Attendance.find(query)
      .populate("class", "className section")
      .populate("takenBy", "firstName lastName")
      .sort({ date: -1 });

    // Extract only the relevant student's attendance from each record
    const formattedAttendance = attendance.map((record) => {
      const studentRecord = record.students.find(
        (s) => s.student.toString() === studentId.toString()
      );

      return {
        _id: record._id,
        date: record.date,
        class: record.class,
        period: record.period,
        subject: record.subject,
        status: studentRecord?.status || "unknown",
        remarks: studentRecord?.remarks,
        takenBy: record.takenBy,
      };
    });

    // Calculate attendance summary
    const totalDays = formattedAttendance.length;
    const presentDays = formattedAttendance.filter(
      (a) => a.status === "present"
    ).length;
    const absentDays = formattedAttendance.filter(
      (a) => a.status === "absent"
    ).length;
    const attendancePercentage =
      totalDays > 0 ? (presentDays / totalDays) * 100 : 0;

    res.json(
      formatResponse(true, "Attendance retrieved successfully", {
        attendance: formattedAttendance,
        summary: {
          totalDays,
          presentDays,
          absentDays,
          percentage: Math.round(attendancePercentage * 100) / 100,
        },
      })
    );
  } catch (error) {
    console.error("Error fetching child attendance:", error);
    res
      .status(500)
      .json(formatResponse(false, "Error fetching attendance", error.message));
  }
};

// Get child's grades
export const getChildGrades = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { subject, term, academicYear } = req.query;

    let query = { student: studentId };

    if (subject) query.subject = subject;
    if (term) query.term = term;
    if (academicYear) query.academicYear = academicYear;

    const grades = await Grade.find(query)
      .populate("class", "className section")
      .populate("enteredBy", "firstName lastName")
      .sort({ academicYear: -1, term: 1, subject: 1 });

    // Calculate overall performance
    const totalSubjects = grades.length;
    const totalMarks = grades.reduce((sum, grade) => sum + grade.marks, 0);
    const averageMarks = totalSubjects > 0 ? totalMarks / totalSubjects : 0;

    // Group by academic year and term
    const gradesByTerm = {};
    grades.forEach((grade) => {
      const key = `${grade.academicYear}-${grade.term}`;
      if (!gradesByTerm[key]) {
        gradesByTerm[key] = {
          academicYear: grade.academicYear,
          term: grade.term,
          grades: [],
          average: 0,
        };
      }
      gradesByTerm[key].grades.push(grade);
    });

    // Calculate averages for each term
    Object.keys(gradesByTerm).forEach((key) => {
      const termData = gradesByTerm[key];
      const termMarks = termData.grades.reduce(
        (sum, grade) => sum + grade.marks,
        0
      );
      termData.average =
        termData.grades.length > 0
          ? Math.round((termMarks / termData.grades.length) * 100) / 100
          : 0;
    });

    res.json(
      formatResponse(true, "Grades retrieved successfully", {
        grades,
        summary: {
          totalSubjects,
          averageMarks: Math.round(averageMarks * 100) / 100,
          gradesByTerm: Object.values(gradesByTerm),
        },
      })
    );
  } catch (error) {
    console.error("Error fetching child grades:", error);
    res
      .status(500)
      .json(formatResponse(false, "Error fetching grades", error.message));
  }
};

// Get child's report card
export const getChildReportCard = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { academicYear } = req.query;

    const student = await Student.findById(studentId)
      .populate("class", "className section classTeacher")
      .populate("class.classTeacher", "firstName lastName");

    if (!student) {
      return res.status(404).json(formatResponse(false, "Student not found"));
    }

    const query = {
      student: studentId,
      academicYear: academicYear || student.class.academicYear,
    };

    const grades = await Grade.find(query)
      .populate("enteredBy", "firstName lastName")
      .sort({ subject: 1 });

    // Calculate term-wise performance
    const terms = ["first", "second", "third", "final"];
    const termPerformance = {};

    terms.forEach((term) => {
      const termGrades = grades.filter((g) => g.term === term);
      if (termGrades.length > 0) {
        const totalMarks = termGrades.reduce(
          (sum, grade) => sum + grade.marks,
          0
        );
        termPerformance[term] = {
          grades: termGrades,
          average: Math.round((totalMarks / termGrades.length) * 100) / 100,
          totalSubjects: termGrades.length,
        };
      }
    });

    // Get attendance summary for the academic year
    let attendanceQuery = { "students.student": studentId };

    if (academicYear) {
      const yearParts = academicYear.split("-");
      if (yearParts.length === 2) {
        const startYear = parseInt(yearParts[0]);
        const endYear = parseInt(yearParts[1]);

        const startDate = new Date(startYear, 3, 1); // April 1st of start year
        const endDate = new Date(endYear, 2, 31); // March 31st of end year

        attendanceQuery.date = { $gte: startDate, $lte: endDate };
      }
    }

    const attendanceRecords = await Attendance.find(attendanceQuery).populate(
      "class",
      "className section"
    );

    let totalDays = 0;
    let presentDays = 0;

    attendanceRecords.forEach((record) => {
      const studentRecord = record.students.find(
        (s) => s.student.toString() === studentId.toString()
      );

      if (studentRecord) {
        totalDays++;
        if (studentRecord.status === "present") {
          presentDays++;
        }
      }
    });

    const attendancePercentage =
      totalDays > 0 ? (presentDays / totalDays) * 100 : 0;

    res.json(
      formatResponse(true, "Report card retrieved successfully", {
        student,
        academicYear: academicYear || student.class.academicYear,
        termPerformance,
        attendance: {
          totalDays,
          presentDays,
          absentDays: totalDays - presentDays,
          percentage: Math.round(attendancePercentage * 100) / 100,
        },
        overallAverage:
          grades.length > 0
            ? Math.round(
                (grades.reduce((sum, g) => sum + g.marks, 0) / grades.length) *
                  100
              ) / 100
            : 0,
      })
    );
  } catch (error) {
    console.error("Error fetching report card:", error);
    res
      .status(500)
      .json(formatResponse(false, "Error fetching report card", error.message));
  }
};

// Get notices for parent
export const getNotices = async (req, res) => {
  try {
    const parentId = req.user.id;

    // Get parent's children to determine which classes to show notices for
    const children = await Student.find({ parent: parentId }).select("class");
    const classIds = children.map((child) => child.class);

    const query = {
      $or: [
        { targetAudience: "all" },
        { targetAudience: "parents" },
        {
          targetAudience: "students",
          class: { $in: classIds },
        },
      ],
      isActive: true,
      $or: [
        { expiryDate: { $exists: false } },
        { expiryDate: { $gte: new Date() } },
      ],
    };

    const notices = await Notice.find(query)
      .populate("createdBy", "firstName lastName")
      .sort({ priority: -1, createdAt: -1 });

    res.json(
      formatResponse(true, "Notices retrieved successfully", { notices })
    );
  } catch (error) {
    console.error("Error fetching notices:", error);
    res
      .status(500)
      .json(formatResponse(false, "Error fetching notices", error.message));
  }
};

// Get study materials for parent's children
export const getStudyMaterials = async (req, res) => {
  try {
    const parentId = req.user.id;
    const { subject, type } = req.query;

    // Get parent's children to determine which classes to show materials for
    const children = await Student.find({ parent: parentId }).select("class");
    const classIds = children.map((child) => child.class);

    const query = {
      class: { $in: classIds },
      isPublic: true,
    };

    if (subject) query.subject = subject;
    if (type) query.type = type;

    const studyMaterials = await StudyMaterial.find(query)
      .populate("class", "className section")
      .populate("uploadedBy", "firstName lastName")
      .sort({ createdAt: -1 });

    res.json(
      formatResponse(true, "Study materials retrieved successfully", {
        studyMaterials,
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

// Get child's class information
export const getChildClassInfo = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await Student.findById(studentId)
      .populate("class", "className section academicYear classTeacher")
      .populate("class.classTeacher", "firstName lastName email phone");

    if (!student) {
      return res.status(404).json(formatResponse(false, "Student not found"));
    }

    // Get subject teachers for the class
    const classInfo = await Class.findById(student.class._id).populate(
      "subjects.teacher",
      "firstName lastName email phone"
    );

    res.json(
      formatResponse(true, "Class information retrieved successfully", {
        classInfo: student.class,
        subjectTeachers: classInfo.subjects,
      })
    );
  } catch (error) {
    console.error("Error fetching class information:", error);
    res
      .status(500)
      .json(
        formatResponse(false, "Error fetching class information", error.message)
      );
  }
};

// Get parent dashboard overview
export const getDashboardOverview = async (req, res) => {
  try {
    const parentId = req.user.id;

    // Get parent's children
    const children = await Student.find({ parent: parentId }).populate(
      "class",
      "className section"
    );

    // Get recent notices
    const classIds = children.map((child) => child.class._id);
    const recentNotices = await Notice.find({
      $or: [
        { targetAudience: "all" },
        { targetAudience: "parents" },
        {
          targetAudience: "students",
          class: { $in: classIds },
        },
      ],
      isActive: true,
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("createdBy", "firstName lastName");

    // Get attendance summary for each child
    const childrenWithAttendance = await Promise.all(
      children.map(async (child) => {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const attendanceRecords = await Attendance.find({
          "students.student": child._id,
          date: { $gte: thirtyDaysAgo },
        });

        let presentDays = 0;
        let totalDays = 0;

        attendanceRecords.forEach((record) => {
          const studentRecord = record.students.find(
            (s) => s.student.toString() === child._id.toString()
          );

          if (studentRecord) {
            totalDays++;
            if (studentRecord.status === "present") {
              presentDays++;
            }
          }
        });

        const attendancePercentage =
          totalDays > 0 ? (presentDays / totalDays) * 100 : 0;

        // Get recent grades
        const recentGrades = await Grade.find({ student: child._id })
          .sort({ createdAt: -1 })
          .limit(3);

        return {
          ...child.toObject(),
          attendance: {
            presentDays,
            totalDays,
            percentage: Math.round(attendancePercentage * 100) / 100,
          },
          recentGrades,
        };
      })
    );

    res.json(
      formatResponse(true, "Dashboard overview retrieved successfully", {
        children: childrenWithAttendance,
        recentNotices,
        totalChildren: children.length,
      })
    );
  } catch (error) {
    console.error("Error fetching dashboard overview:", error);
    res
      .status(500)
      .json(
        formatResponse(
          false,
          "Error fetching dashboard overview",
          error.message
        )
      );
  }
};
