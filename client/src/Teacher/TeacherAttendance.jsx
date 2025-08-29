import React from "react";

const TeacherAttendance = () => {
  const students = [
    { name: "Alice Johnson", roll: "001" },
    { name: "Bob Smith", roll: "002" },
    { name: "Carol Davis", roll: "003" },
  ];

  return (
    <div className="relative sm:p-6 p-2 min-h-screen overflow-hidden">
      {/* Attendance Card */}
      <div className="relative bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-2">✅ Attendance Management</h2>
        <p className="text-sm text-gray-500 mb-4">
          Date: 28/8/2025 • Class 10A • 30 Students
        </p>

        <div className="space-y-3">
          {students.map((s, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center p-4 border rounded-lg bg-white/80 backdrop-blur-sm"
            >
              <div>
                <p className="font-medium">{s.name}</p>
                <p className="text-sm text-gray-500">Roll No: {s.roll}</p>
              </div>
              <div className="flex gap-3">
                <button className="px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
                  Present
                </button>
                <button className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">
                  Absent
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow">
          Submit Attendance
        </button>
      </div>
    </div>
  );
};

export default TeacherAttendance;
