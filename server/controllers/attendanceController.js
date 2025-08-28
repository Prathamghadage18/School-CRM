import Attendance from "../models/Attendance";
import Student from "../models/Student";
import Class from "../models/Class";
import { sendNotification } from "../utils/notifications";

// Mark attendance for a class
export const markAttendance = async (req, res) => {
  try {
    const { classId, date, attendanceData } = req.body;

    // Check if class exists
    const classExists = await Class.findById(classId);
    if (!classExists) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    const attendanceRecords = [];
    const absentStudents = [];

    for (const record of attendanceData) {
      // Check if student exists
      const student = await Student.findById(record.studentId);
      if (!student) continue;

      // Create or update attendance record
      const attendance = await Attendance.findOneAndUpdate(
        { student: record.studentId, date: new Date(date) },
        {
          student: record.studentId,
          date: new Date(date),
          status: record.status,
          markedBy: req.user.teacherId,
          class: classId,
        },
        { upsert: true, new: true }
      );

      attendanceRecords.push(attendance);

      // If student is absent, add to notification list
      if (record.status === "Absent") {
        absentStudents.push(student);
      }
    }

    // Send notifications for absent students
    if (absentStudents.length > 0) {
      for (const student of absentStudents) {
        sendNotification({
          type: "ATTENDANCE_ABSENT",
          student: student._id,
          message: `Your child ${student.name} was absent on ${new Date(
            date
          ).toLocaleDateString()}`,
        });
      }
    }

    res.status(200).json({
      success: true,
      message: "Attendance marked successfully",
      data: attendanceRecords,
    });
  } catch (error) {
    console.error("Mark attendance error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get attendance by class and date
export const getAttendanceByClass = async (req, res) => {
  try {
    const { classId, date } = req.params;

    const attendance = await Attendance.find({
      class: classId,
      date: new Date(date),
    })
      .populate("student", "name rollNumber")
      .populate("markedBy", "name");

    res.status(200).json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    console.error("Get attendance error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get attendance report for a student
export const getStudentAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { startDate, endDate } = req.query;

    const query = { student: studentId };

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const attendance = await Attendance.find(query)
      .populate("markedBy", "name")
      .sort({ date: -1 });

    // Calculate attendance summary
    const total = attendance.length;
    const present = attendance.filter((a) => a.status === "Present").length;
    const absent = attendance.filter((a) => a.status === "Absent").length;
    const late = attendance.filter((a) => a.status === "Late").length;

    res.status(200).json({
      success: true,
      data: attendance,
      summary: {
        total,
        present,
        absent,
        late,
        percentage: total > 0 ? ((present / total) * 100).toFixed(2) : 0,
      },
    });
  } catch (error) {
    console.error("Get student attendance error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
