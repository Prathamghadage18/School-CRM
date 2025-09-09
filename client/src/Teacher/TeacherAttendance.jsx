import React, { useState } from "react";

const TeacherAttendance = () => {
  // Dropdown options
  const years = ["2023", "2024", "2025"];
  const classes = ["10th A", "10th B", "12th Science"];
  const subjects = ["Math", "English", "Science"];

  // Selected filters
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  // Student list (mock data now, later from API)
  const [students, setStudents] = useState([
    { id: 1, name: "Alice Johnson", roll: "001", status: null },
    { id: 2, name: "Bob Smith", roll: "002", status: null },
    { id: 3, name: "Carol Davis", roll: "003", status: null },
  ]);

  // Mark attendance
  const markAttendance = (id, status) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s))
    );
  };

  // Submit attendance
  const submitAttendance = () => {
    const payload = {
      year: selectedYear,
      class: selectedClass,
      subject: selectedSubject,
      date: new Date().toLocaleDateString(),
      students,
    };

    console.log("Submitting attendance:", payload);
    alert("✅ Attendance submitted successfully!");
  };

  return (
    <div className="relative sm:p-6 p-2 min-h-screen overflow-hidden">
      {/* Attendance Card */}
      <div className="relative bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">✅ Attendance Management</h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <select
            className="border rounded px-3 py-2"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">Select Year</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <select
            className="border rounded px-3 py-2"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">Select Class</option>
            {classes.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            className="border rounded px-3 py-2"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="">Select Subject</option>
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Student Attendance List */}
        <div className="space-y-3">
          {students.map((s) => (
            <div
              key={s.id}
              className="flex justify-between items-center p-4 border rounded-lg bg-white/80 backdrop-blur-sm"
            >
              <div>
                <p className="font-medium">{s.name}</p>
                <p className="text-sm text-gray-500">Roll No: {s.roll}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => markAttendance(s.id, "Present")}
                  className={`px-3 py-1 rounded-lg ${
                    s.status === "Present"
                      ? "bg-green-600 text-white"
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                  }`}
                >
                  Present
                </button>
                <button
                  onClick={() => markAttendance(s.id, "Absent")}
                  className={`px-3 py-1 rounded-lg ${
                    s.status === "Absent"
                      ? "bg-red-600 text-white"
                      : "bg-red-100 text-red-700 hover:bg-red-200"
                  }`}
                >
                  Absent
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          onClick={submitAttendance}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow"
        >
          Submit Attendance
        </button>
      </div>
    </div>
  );
};

export default TeacherAttendance;
