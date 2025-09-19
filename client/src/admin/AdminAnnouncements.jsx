import React, { useEffect, useState } from "react";
import { FaBullhorn } from "react-icons/fa";
import api from "../config/api";

const AdminNotices = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("general");
  const [file, setFile] = useState(null);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkType, setLinkType] = useState("website");
  const [expiryDate, setExpiryDate] = useState("");

  console.log('render notice')

  
  const sendNotice = async () => {
    if (!title.trim() || !content.trim()) {
      alert("⚠️ Please fill in all required fields (title, content).");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", category);
      if (file) formData.append("file", file);
      if (linkUrl) {
        formData.append("linkUrl", linkUrl);
        formData.append("linkType", linkType);
      }
      if (expiryDate) formData.append("expiryDate", expiryDate);

      const res = await api.post("api/notice", formData);

      alert("✅ Notice created successfully!");
      console.log("📢 Notice:", res.data);

      // Reset form
      setTitle("");
      setContent("");
      setCategory("general");
      setFile(null);
      setLinkUrl("");
      setLinkType("website");
      setExpiryDate("");
    } catch (error) {
      console.error("Error creating notice:", error);
      alert("error creating notice");
    }
  };

  return (
     <>
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <FaBullhorn className="text-blue-600" /> Create Notice
      </h2>

      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        {/* Title */}
        <input
          type="text"
          placeholder="Notice Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Content */}
        <textarea
          placeholder="Notice Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="general">General</option>
          <option value="academic">Academic</option>
          <option value="event">Event</option>
          <option value="emergency">Emergency</option>
          <option value="exam">Exam</option>
        </select>

        {/* File Upload */}
        <div>
          <label className="block font-medium mb-1">Upload Attachment (optional)</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border rounded px-4 py-2"
          />
          {file && <p className="text-sm text-gray-600 mt-1">Selected: {file.name}</p>}
        </div>

        {/* Link URL */}
        <input
          type="url"
          placeholder="Optional Link (http://...)"
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
          className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Link Type */}
        {linkUrl && (
          <select
            value={linkType}
            onChange={(e) => setLinkType(e.target.value)}
            className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="website">Website</option>
            <option value="youtube">YouTube</option>
            <option value="drive">Google Drive</option>
          </select>
        )}

        {/* Expiry Date */}
        <div>
          <label className="block font-medium mb-1">Expiry Date (optional)</label>
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="w-full border rounded px-4 py-2"
          />
        </div>

        {/* Send Button */}
        <button
          onClick={sendNotice}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-all"
        >
          Create Notice
        </button>
      </div>

      
    </div>
    <GetNoticeComponent />
    </>
  );
};

const GetNoticeComponent = () => {
  const [notices, setNotices] = useState([]);
  const [filteredNotices, setFilteredNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const getNotice = async () => {
    try {
      const res = await api.get("/api/notice"); // ✅ await here
      console.log("API Response:", res.data.data);

      // res.data is already an array
      setNotices(res.data.data);
      setFilteredNotices(res.data.data);
    } catch (error) {
      console.error("Error fetching notices:", error);
      setNotices([]);
      setFilteredNotices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotice();
  }, []);

  // 🔍 Search + Filter logic
  useEffect(() => {
    let filtered = [...notices];

    if (search.trim()) {
      filtered = filtered.filter(
        (n) =>
          n.title.toLowerCase().includes(search.toLowerCase()) ||
          n.content.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filterCategory !== "all") {
      filtered = filtered.filter((n) => n.category === filterCategory);
    }

    setFilteredNotices(filtered);
  }, [search, filterCategory, notices]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this notice?")) return;
    try {
      await api.delete(`/api/notice/${id}`);
      setNotices(notices.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Error deleting notice:", err);
    }
  };

  const handleUpdate = (id) => {
    alert(`Navigate to update page for Notice ID: ${id}`);
    // or open modal with update form
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📢 Notices</h2>

      {/* 🔎 Search + Filter */}
      <div className="flex gap-2 mb-4"> 
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="all">All</option>
          <option value="general">General</option>
          <option value="academic">Academic</option>
          <option value="event">Event</option>
          <option value="emergency">Emergency</option>
          <option value="exam">Exam</option>
        </select>
        <input
          type="text"
          placeholder="Search notices..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      {/* 📋 Notices List */}
      {loading ? (
        <p>Loading...</p>
      ) : Array.isArray(filteredNotices) && filteredNotices.length > 0 ? (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
    {filteredNotices.map((notice) => (
      <div
        key={notice._id}
        className=" w-full bg-white p-4 rounded shadow flex flex-col gap-2"
      >
              <h3 className="text-lg font-semibold">{notice.title}</h3>
              <p className="text-gray-700 text-sm line-clamp-3">{notice.content}</p>
              <p className="text-sm text-gray-500">
                📂 Category: {notice.category} | 📅{" "}
                {new Date(notice.createdAt).toLocaleDateString()}
              </p>

              {notice.attachment?.path && (
                <a
                  href={notice.attachment.path}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📎<span className=" underline text-blue-800">{notice.attachment.originalName &&"check documents"}</span>
                  
                </a>
              )}

              {notice.link?.url && (
                <a
                  href={notice.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                   🔗<span className=" underline text-blue-800">{notice.link.type} link</span>
                  
                </a>
              )}

              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => handleUpdate(notice._id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(notice._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        
      ) : (
        <p>No notices found.</p>
      )}
    </div>
  );
};



export default React.memo(AdminNotices);
