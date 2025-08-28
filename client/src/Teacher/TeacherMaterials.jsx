import React from "react";

const TeacherMaterials = () => {
  const materials = [
    { title: "Mathematics Chapter 5", subject: "Math", date: "2024-01-15" },
    { title: "Science Lab Report Template", subject: "Science", date: "2024-01-14" },
    { title: "History Assignment Guidelines", subject: "History", date: "2024-01-13" },
  ];

  return (
    <div className="sm:p-6 p-2">
      <div className="bg-white shadow rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            📚 Study Materials
          </h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">+ Upload Material</button>
        </div>
        <div className="space-y-4">
          {materials.map((m, idx) => (
            <div key={idx} className="flex justify-between items-center p-4 border rounded-lg hover:shadow">
              <div>
                <p className="font-medium">{m.title}</p>
                <p className="text-sm text-gray-500">{m.subject} • Uploaded {m.date}</p>
              </div>
              <div className="flex gap-4">
                <button className="text-blue-600 font-medium">Edit</button>
                <button className="text-red-600 font-medium">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherMaterials;
