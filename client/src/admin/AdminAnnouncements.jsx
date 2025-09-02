import React, { useState } from "react";
import { FaBullhorn } from "react-icons/fa";

const AdminAnnouncements = () => {
  const [msg, setMsg] = useState("");

  const sendAnnouncement = () => {
    if (!msg.trim()) {
      alert("⚠️ Please enter an announcement before sending.");
      return;
    }
    console.log("Announcement Sent:", msg);
    alert("📢 Announcement sent!");
    setMsg("");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <FaBullhorn className="text-blue-600" /> Send Announcement
      </h2>

      <div className="bg-white shadow-md  p-6 space-y-4">
        <input
          type="text"
          placeholder="Write announcement..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="w-full border  px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          onClick={sendAnnouncement}
          className="bg-blue-600 text-white px-6 py-2  hover:bg-blue-700 transition-all"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AdminAnnouncements;