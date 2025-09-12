import React, { useState } from "react";
import { FaBullhorn } from "react-icons/fa";

const AdminAnnouncements = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [school, setSchool] = useState("");
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");

  // Example: you can fetch this list from API later
  const schools = ["School A", "School B", "School C"];

  const sendAnnouncement = () => {
    if (!title.trim() || !description.trim() || !school) {
      alert("⚠️ Please fill in all required fields (title, description, school).");
      return;
    }

    const payload = {
      title,
      description,
      school,
      link: link || null,
      file: file ? file.name : null, // later handle file upload to backend
    };

    console.log("📢 Announcement Sent:", payload);
    alert("✅ Announcement sent successfully!");

    // Reset form
    setTitle("");
    setDescription("");
    setSchool("");
    setLink("");
    setFile(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <FaBullhorn className="text-blue-600" /> Send Announcement
      </h2>

      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        {/* Title */}
        <input
          type="text"
          placeholder="Announcement Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Description */}
        <textarea
          placeholder="Announcement Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Select School */}
        <select
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">Select School</option>
          {schools.map((sch, i) => (
            <option key={i} value={sch}>
              {sch}
            </option>
          ))}
        </select>

        {/* File Upload */}
        <div>
          <label className="block font-medium mb-1">Upload File (optional)</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border rounded px-4 py-2"
          />
          {file && <p className="text-sm text-gray-600 mt-1">Selected: {file.name}</p>}
        </div>

        {/* URL Link */}
        <input
          type="url"
          placeholder="Optional Link (http://...)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Send Button */}
        <button
          onClick={sendAnnouncement}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-all"
        >
          Send Announcement
        </button>
      </div>
    </div>
  );
};

export default AdminAnnouncements;