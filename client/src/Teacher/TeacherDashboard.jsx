import React from "react";
import { FaHome, FaBook, FaClipboardList, FaCheckCircle } from "react-icons/fa";
import { Routes, Route, useParams } from "react-router-dom";

import ProtectedRoute from "../api/ProtectedRoute";
import TeacherAttendance from "./TeacherAttendance";
import TeacherGrades from "./TeacherGrades";
import TeacherMaterials from "./TeacherMaterials";
import TeacherHome from "./TeacherHome";

export default function teacherDashboard() {
  const params = window.location.pathname.split("/")[2] || "home"; 
 
  const NaviagationItem = [
    { icon: <FaHome />, label: "Dashboard", path: "/teacher-dashboard/", active: params === "home" },
    { icon: <FaBook />, label: "Materials", path: "/teacher-dashboard/materials", active: params === "materials" },
    { icon: <FaClipboardList />, label: "Grades", path: "/teacher-dashboard/grades", active: params === "grades" },
    { icon: <FaCheckCircle />, label: "Attendance", path: "/teacher-dashboard/attendance", active: params === "attendance" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      {/* Navbar */}
      <div className="bg-white shadow  px-10 py-4 flex items-center justify-between">
        <div className="flex space-x-4">
          {/* <button className="text-blue-600 hover:underline">← Back to Roles</button> */}
          <p className=" mr-4">Logo</p>

          {NaviagationItem.map((item, idx) => (
            <a
              key={idx}
              href={item.path}
              className={`flex text-sm items-center space-x-2 px-3 py-2 transition ${
                item.active
                  ? " text-primary  border-b-2 border-primary"
                  : "text-gray-600 hover:bg-blue-50"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <button className=" text-white bg-red-500  px-4 py-1 rounded-md">
         Logout
        </button>
        <button className=" text-white bg-primary  px-4 py-1 rounded-md">
         Login
        </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="w-full lg:h-screen lg:overflow-y-scroll">
        <Routes>
          <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
            <Route path="/" element={<TeacherHome />} />
            <Route path="/materials" element={<TeacherMaterials />} />
            <Route path="/grades" element={<TeacherGrades />} />
            <Route path="/attendance" element={<TeacherAttendance />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}
