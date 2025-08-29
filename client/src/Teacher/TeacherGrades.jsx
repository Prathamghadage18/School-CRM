import React from "react";

const TeacherGrades = () => {
  const students = [
    { name: "Alice Johnson", quiz1: 85, quiz2: 92, assignment: 88, grade: "A" },
    { name: "Bob Smith", quiz1: 85, quiz2: 92, assignment: 88, grade: "B+" },
    { name: "Carol Davis", quiz1: 85, quiz2: 92, assignment: 88, grade: "A-" },
  ];

  return (
    <div className="sm:p-6 p-2">
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">📝 Grade Management</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="p-3">Student</th>
                <th className="p-3">Quiz 1</th>
                <th className="p-3">Quiz 2</th>
                <th className="p-3">Assignment</th>
                <th className="p-3">Final Grade</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-3">{s.name}</td>
                  <td className="p-3"><input type="number" defaultValue={s.quiz1} className="border rounded px-2 py-1 w-20"/></td>
                  <td className="p-3"><input type="number" defaultValue={s.quiz2} className="border rounded px-2 py-1 w-20"/></td>
                  <td className="p-3"><input type="number" defaultValue={s.assignment} className="border rounded px-2 py-1 w-20"/></td>
                  <td className="p-3 font-semibold text-green-600">{s.grade}</td>
                  <td className="p-3 text-blue-600 cursor-pointer">Save</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg">Save All Grades</button>
      </div>
    </div>
  );
};

export default TeacherGrades;
