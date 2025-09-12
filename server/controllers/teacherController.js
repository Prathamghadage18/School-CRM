import Attendance from "../models/Attendance.js";
import Grade from "../models/Grade.js";
import StudyMaterial from "../models/StudyMaterial.js";
import Class from "../models/Class.js";
import Student from "../models/Student.js";
import { formatResponse } from "../utils/helpers.js";

// Get teacher's classes
export const getMyClasses = async (req, res) => {
  try {
    const teacherId = req.user.id;

    const classes = await Class.find({
      $or: [{ classTeacher: teacherId }, { "subjects.teacher": teacherId }],
      isActive: true,
    }).populate("students", "firstName lastName rollNumber");

    res.json(
      formatResponse(true, "Classes retrieved successfully", { classes })
    );
  } catch (error) {
    console.error("Error fetching classes:", error);
    res
      .status(500)
      .json(formatResponse(false, "Error fetching classes", error.message));
  }
};

// Mark attendance
export const markAttendance = async (req, res) => {
  try {
    const { classId, date, subject, students, period } = req.body; // ✅ include period if needed
    const teacherId = req.user.id;

    // Validate classId
    if (!classId) {
      return res
        .status(403)
        .json(formatResponse(false, "Not authorized to mark attendance for this class"));
    }

    // ✅ Check if attendance already exists (classId + date + subject + period)
    const existingAttendance = await Attendance.findOne({
      class: classId,
      date: new Date(date),
      subject,
      ...(period && { period }), // only check if period exists
    });

    if (existingAttendance) {
      return res
        .status(400)
        .json(formatResponse(false, "Attendance already marked for this class, date, and subject"));
    }

    // ✅ Create new attendance record
    const attendance = new Attendance({
      class: classId,
      date: new Date(date),
      subject,
      students,
      takenBy: teacherId,
      ...(period && { period }), // save period only if provided
    });

    await attendance.save();

    return res
      .status(201)
      .json(formatResponse(true, "Attendance marked successfully", { attendance }));
  } catch (error) {
    console.error("Error marking attendance:", error);

    if (error.code === 11000) {
      return res
        .status(400)
        .json(formatResponse(false, "Attendance already exists for this combination"));
    }

    return res
      .status(500)
      .json(formatResponse(false, "Error marking attendance", error.message));
  }
};


// Get attendance records
export const getAttendance = async (req, res) => {
  try {
    const { classId, date, period, subject } = req.query;
    const teacherId = req.user.id;

    // Check if the teacher is authorized for this class
    const classData = await Class.findOne({
      _id: classId,
      $or: [{ classTeacher: teacherId }, { "subjects.teacher": teacherId }],
    });

    if (!classData) {
      return res
        .status(403)
        .json(
          formatResponse(
            false,
            "Not authorized to view attendance for this class"
          )
        );
    }

    const query = { class: classId };

    if (date) query.date = new Date(date);
    if (period) query.period = period;
    if (subject) query.subject = subject;

    const attendance = await Attendance.find(query)
      .populate("students.student", "firstName lastName rollNumber")
      .populate("takenBy", "firstName lastName")
      .sort({ date: -1 });

    res.json(
      formatResponse(true, "Attendance records retrieved successfully", {
        attendance,
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

// Enter grades
export const enterGrades = async (req, res) => {
  try {
    const {
      studentId,
      classId,
      subject,
      term,
      academicYear,
      marks,
      grade,
      comments,
    } = req.body;
    const teacherId = req.user.id;

    // Check if the teacher is authorized for this class and subject
    const classData = await Class.findOne({
      _id: classId,
      "subjects.teacher": teacherId,
      "subjects.name": subject,
    });

    if (!classData) {
      return res
        .status(403)
        .json(
          formatResponse(
            false,
            "Not authorized to enter grades for this subject"
          )
        );
    }

    // Check if grade already exists for this student, subject, term, and academic year
    const existingGrade = await Grade.findOne({
      student: studentId,
      subject,
      term,
      academicYear,
    });

    if (existingGrade) {
      return res
        .status(400)
        .json(
          formatResponse(
            false,
            "Grade already entered for this student, subject, term, and academic year"
          )
        );
    }

    // Create new grade record
    const newGrade = new Grade({
      student: studentId,
      class: classId,
      subject,
      term,
      academicYear,
      marks,
      grade,
      comments,
      enteredBy: teacherId,
    });

    await newGrade.save();

    res
      .status(201)
      .json(
        formatResponse(true, "Grade entered successfully", { grade: newGrade })
      );
  } catch (error) {
    console.error("Error entering grade:", error);

    if (error.code === 11000) {
      return res
        .status(400)
        .json(
          formatResponse(false, "Grade already exists for this combination")
        );
    }

    res
      .status(500)
      .json(formatResponse(false, "Error entering grade", error.message));
  }
};

// Get grades
export const getGrades = async (req, res) => {
  try {
    const { classId, subject, term, academicYear } = req.query;
    const teacherId = req.user.id;

    // Check if the teacher is authorized for this class and subject
    const classData = await Class.findOne({
      _id: classId,
      "subjects.teacher": teacherId,
    });

    if (!classData && subject) {
      // Check if teacher is authorized for this specific subject
      const subjectAuth = await Class.findOne({
        _id: classId,
        "subjects.teacher": teacherId,
        "subjects.name": subject,
      });

      if (!subjectAuth) {
        return res
          .status(403)
          .json(
            formatResponse(
              false,
              "Not authorized to view grades for this class/subject"
            )
          );
      }
    }

    const query = { class: classId };
    if (subject) query.subject = subject;
    if (term) query.term = term;
    if (academicYear) query.academicYear = academicYear;

    const grades = await Grade.find(query)
      .populate("student", "firstName lastName rollNumber")
      .populate("enteredBy", "firstName lastName")
      .sort({ subject: 1, "student.lastName": 1 });

    res.json(formatResponse(true, "Grades retrieved successfully", { grades }));
  } catch (error) {
    console.error("Error fetching grades:", error);
    res
      .status(500)
      .json(formatResponse(false, "Error fetching grades", error.message));
  }
};

// Upload study material
export const uploadStudyMaterial = async (req, res) => {
  try {
    const {
      title,
      description,
      classId,
      subject,
      isPublic,
      tags,
      linkType,
      linkUrl,
    } = req.body;
    const teacherId = req.user.id;

    // Check if the teacher is authorized for this class
    // const classData = await Class.findOne({
    //   _id: classId,
    //   $or: [{ classTeacher: teacherId }, { "subjects.teacher": teacherId }],
    // });

    // if (!classData) {
    //   return res
    //     .status(403)
    //     .json(
    //       formatResponse(
    //         false,
    //         "Not authorized to upload materials for this class"
    //       )
    //     );
    // }

    let type = "document";
    let fileData = null;
    let linkData = null;

    if (req.file) {
      // File upload
      type = req.file.mimetype === "application/pdf" ? "pdf" : "document";
      fileData = {
        filename: req.file.filename,
        path: req.file.path,
        originalName: req.file.originalname,
        size: req.file.size,
      };
    } else if (linkUrl) {
      // Link upload
      type = "link";
      linkData = {
        url: linkUrl,
        type: linkType || "website",
      };
    } else {
      return res
        .status(400)
        .json(
          formatResponse(false, "Either a file or a link must be provided")
        );
    }

    const studyMaterial = new StudyMaterial({
      title,
      description,
      type,
      file: fileData,
      link: linkData,
      class: classId,
      subject,
      uploadedBy: teacherId,
      isPublic: isPublic !== "false",
      tags: tags ? tags.split(",") : [],
    });

    await studyMaterial.save();

    res
      .status(201)
      .json(
        formatResponse(true, "Study material uploaded successfully", {
          studyMaterial,
        })
      );
  } catch (error) {
    console.error("Error uploading study material:", error);
    res
      .status(500)
      .json(
        formatResponse(false, "Error uploading study material", error.message)
      );
  }
};

// GET /api/study-materials/:id
export const getStudyMaterialsById = async (req, res) => {
  try {
    // use uploadedBy instead of teacher
    const materials = await StudyMaterial.find({ uploadedBy: req.user.id });
    res.json({ success: true, data: materials });
  } catch (error) {
    console.error("Error fetching materials:", error);
    res.status(500).json({ success: false, message: "Error fetching materials" });
  }
};



// Get study materials
export const getStudyMaterials = async (req, res) => {
  try {
    const { classId, subject, type } = req.query;
    const teacherId = req.user.id;

    // Check if the teacher is authorized for this class
    const classData = await Class.findOne({
      _id: classId,
      $or: [{ classTeacher: teacherId }, { "subjects.teacher": teacherId }],
    });

    if (!classData) {
      return res
        .status(403)
        .json(
          formatResponse(
            false,
            "Not authorized to view materials for this class"
          )
        );
    }

    const query = { class: classId };
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

// Delete study material
export const deleteStudyMaterial = async (req, res) => {
  try {
    const { materialId } = req.params;
    const teacherId = req.user.id;

    const studyMaterial = await StudyMaterial.findOne({
      _id: materialId,
      uploadedBy: teacherId,
    });

    if (!studyMaterial) {
      return res
        .status(404)
        .json(
          formatResponse(
            false,
            "Study material not found or not authorized to delete"
          )
        );
    }

    await StudyMaterial.findByIdAndDelete(materialId);

    res.json(formatResponse(true, "Study material deleted successfully"));
  } catch (error) {
    console.error("Error deleting study material:", error);
    res
      .status(500)
      .json(
        formatResponse(false, "Error deleting study material", error.message)
      );
  }
};

// Get class performance dashboard
export const getClassPerformance = async (req, res) => {
  try {
    const { classId, subject } = req.query;
    const teacherId = req.user.id;

    // Check if the teacher is authorized for this class
    const classData = await Class.findOne({
      _id: classId,
      $or: [
        { classTeacher: teacherId },
        { "subjects.teacher": teacherId, "subjects.name": subject },
      ],
    });

    if (!classData) {
      return res
        .status(403)
        .json(
          formatResponse(
            false,
            "Not authorized to view performance for this class/subject"
          )
        );
    }

    // Get all students in the class
    const students = await Student.find({
      _id: { $in: classData.students },
    }).select("firstName lastName rollNumber");

    // Get grades for these students
    const gradeQuery = {
      class: classId,
      student: { $in: classData.students },
    };

    if (subject) gradeQuery.subject = subject;

    const grades = await Grade.find(gradeQuery).populate(
      "student",
      "firstName lastName rollNumber"
    );

    // Calculate performance metrics
    const performance = students.map((student) => {
      const studentGrades = grades.filter(
        (g) => g.student._id.toString() === student._id.toString()
      );
      const average =
        studentGrades.length > 0
          ? studentGrades.reduce((sum, g) => sum + g.marks, 0) /
            studentGrades.length
          : 0;

      return {
        student,
        grades: studentGrades,
        average: Math.round(average * 100) / 100,
        count: studentGrades.length,
      };
    });

    // Calculate class average
    const classAverage =
      performance.length > 0
        ? performance.reduce((sum, p) => sum + p.average, 0) /
          performance.length
        : 0;

    res.json(
      formatResponse(true, "Class performance retrieved successfully", {
        performance,
        classAverage: Math.round(classAverage * 100) / 100,
        totalStudents: students.length,
        gradedStudents: performance.filter((p) => p.count > 0).length,
      })
    );
  } catch (error) {
    console.error("Error fetching class performance:", error);
    res
      .status(500)
      .json(
        formatResponse(false, "Error fetching class performance", error.message)
      );
  }
};