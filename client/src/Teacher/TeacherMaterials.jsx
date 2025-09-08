import React, { useState } from "react";

const TeacherMaterials = () => {
  // Dropdowns
  const years = ["2023", "2024", "2025"];
  const classes = ["10th A", "10th B", "12th Science"];
  const subjects = ["Math", "Science", "History"];

  const [form, setForm] = useState({
    year: "",
    className: "",
    subject: "",
    title: "",
    description: "",
    file: null,
  });

  const [materials, setMaterials] = useState([]);

  // Handle change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setForm((prev) => ({ ...prev, file: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Upload material
  const handleUpload = () => {
    if (!form.year || !form.className || !form.subject || !form.title || !form.description || !form.file) {
      alert("⚠️ Please fill all fields before uploading.");
      return;
    }

    const newMaterial = {
      id: Date.now(),
      ...form,
      date: new Date().toISOString().split("T")[0],
      fileUrl: URL.createObjectURL(form.file), // preview link
    };

    setMaterials((prev) => [newMaterial, ...prev]);

    // reset form
    setForm({
      year: "",
      className: "",
      subject: "",
      title: "",
      description: "",
      file: null,
    });
  };

  // Delete material
  const handleDelete = (id) => {
    setMaterials((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="sm:p-6 p-2">
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">📚 Upload Study Material</h2>

        {/* Upload Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <select
            name="year"
            value={form.year}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          >
            <option value="">Select Year</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <select
            name="className"
            value={form.className}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          >
            <option value="">Select Class</option>
            {classes.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          >
            <option value="">Select Subject</option>
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="border rounded px-3 py-2 md:col-span-2"
          />

          <input
            type="file"
            name="file"
            onChange={handleChange}
            className="md:col-span-2"
          />
        </div>

        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Upload Material
        </button>
      </div>

      {/* Uploaded Materials */}
      <div className="bg-white shadow rounded-xl p-6 mt-6">
        <h2 className="text-lg font-semibold mb-4">📂 Uploaded Materials</h2>

        {materials.length === 0 ? (
          <p className="text-gray-500">No materials uploaded yet.</p>
        ) : (
          <div className="space-y-4">
            {materials.map((m) => (
              <div
                key={m.id}
                className="p-4 border rounded-lg flex flex-col md:flex-row justify-between gap-4 hover:shadow"
              >
                <div>
                  <p className="font-medium">{m.title}</p>
                  <p className="text-sm text-gray-600">{m.subject} • {m.className} • {m.year}</p>
                  <p className="text-sm text-gray-500">{m.description}</p>
                  <p className="text-xs text-gray-400">Uploaded on {m.date}</p>
                  {m.file && (
                    <a
                      href={m.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline text-sm"
                    >
                      View Document
                    </a>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(m.id)}
                  className="text-red-600 font-medium self-start md:self-center"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherMaterials;
