import Grade from "../models/Grade";
import Student from "../models/Student";
import Class from "../models/Class";

// Enter grades for students
export const enterGrades = async (req, res) => {
  try {
    const { classId, subject, term, academicYear, grades } = req.body;

    // Check if class exists
    const classExists = await Class.findById(classId);
    if (!classExists) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    const gradeRecords = [];

    for (const gradeData of grades) {
      // Check if student exists
      const student = await Student.findById(gradeData.studentId);
      if (!student) continue;

      // Create or update grade record
      const grade = await Grade.findOneAndUpdate(
        {
          student: gradeData.studentId,
          subject,
          term,
          academicYear,
        },
        {
          student: gradeData.studentId,
          subject,
          marks: gradeData.marks,
          term,
          academicYear,
          enteredBy: req.user.teacherId,
          class: classId,
        },
        { upsert: true, new: true }
      );

      gradeRecords.push(grade);
    }

    res.status(200).json({
      success: true,
      message: "Grades entered successfully",
      data: gradeRecords,
    });
  } catch (error) {
    console.error("Enter grades error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get grades by class and subject
export const getGradesByClass = async (req, res) => {
  try {
    const { classId, subject, term, academicYear } = req.params;

    const grades = await Grade.find({
      class: classId,
      subject,
      term,
      academicYear,
    })
      .populate("student", "name rollNumber")
      .populate("enteredBy", "name");

    res.status(200).json({
      success: true,
      data: grades,
    });
  } catch (error) {
    console.error("Get grades error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Update a grade
export const updateGrade = async (req, res) => {
  try {
    const { gradeId } = req.params;
    const { marks } = req.body;

    const grade = await Grade.findById(gradeId);

    if (!grade) {
      return res.status(404).json({
        success: false,
        message: "Grade record not found",
      });
    }

    // Check if the teacher owns this grade record
    if (grade.enteredBy.toString() !== req.user.teacherId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this grade",
      });
    }

    grade.marks = marks;
    await grade.save();

    res.status(200).json({
      success: true,
      message: "Grade updated successfully",
      data: grade,
    });
  } catch (error) {
    console.error("Update grade error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
