// Simple notification system (in a real app, this would integrate with email/SMS services)
export const sendNotification = (notification) => {
  console.log("Notification:", notification);
  // In a real implementation, this would send emails or push notifications
  // For now, we'll just log to console
};

export const notifyAbsence = (student, date) => {
  sendNotification({
    type: "ATTENDANCE_ABSENCE",
    student: student._id,
    parent: student.parent,
    message: `Your child ${student.name} was absent on ${date}`,
    date: new Date(),
  });
};

export const notifyNewMaterial = (material, students) => {
  students.forEach((student) => {
    sendNotification({
      type: "NEW_STUDY_MATERIAL",
      student: student._id,
      parent: student.parent,
      message: `New study material available: ${material.title}`,
      material: material._id,
    });
  });
};
