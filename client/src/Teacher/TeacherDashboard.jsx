import React, { useState } from "react";
import { FaHome, FaBook, FaClipboardList, FaCheckCircle, FaBars, FaTimes } from "react-icons/fa";
import { Routes, Route, Link, useLocation, useParams } from "react-router-dom";

import ProtectedRoute from "../api/ProtectedRoute";
import TeacherAttendance from "./TeacherAttendance";
import TeacherGrades from "./TeacherGrades";
import TeacherMaterials from "./TeacherMaterials";
import TeacherHome from "./TeacherHome";
import GradientCircles from "../components/ui/GradientCircles";

export default function TeacherDashboard() {
  const params = useParams();
  const currentPath = params["*"];
  const [menuOpen, setMenuOpen] = useState(false);

  const NavigationItem = [
    { icon: <FaHome />, label: "Dashboard", path: "/teacher-dashboard", active: currentPath === "" },
    { icon: <FaBook />, label: "Materials", path: "/teacher-dashboard/materials", active: currentPath === "materials" },
    { icon: <FaClipboardList />, label: "Grades", path: "/teacher-dashboard/grades", active: currentPath === "grades" },
    { icon: <FaCheckCircle />, label: "Attendance", path: "/teacher-dashboard/attendance", active: currentPath === "attendance" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 flex flex-col">

      <GradientCircles />
      {/* Navbar */}
      <div className=" z-20 bg-white shadow px-6 py-4 flex items-center justify-between">
        {/* Left side: Logo + Nav */}
        <div className="flex items-center gap-6">
          <Link to={'/'}>
            <p className="font-bold text-xl text-primary mx-4">Logo</p>
          </Link>
          {/* Desktop Nav */}
          <div className="hidden md:flex gap-2">
            {NavigationItem.map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 text-sm transition rounded-md ${item.active
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-600 hover:bg-blue-50"
                  }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center text-sm space-x-4">
          <button className="text-white bg-red-500 px-4 py-1 rounded-sm">Logout</button>
          <button className="text-white bg-primary px-4 py-1 rounded-sm">Login</button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-600 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
        {menuOpen && (
              <div className="md:hidden fixed w-full z-40 top-[50px] bg-white shadow p-4 space-y-2">
                <div className="md:hidden  bg-white shadow px-6 py-4 space-y-3">
                  {NavigationItem.map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.path}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md ${item.active
                        ? "text-primary bg-blue-50"
                        : "text-gray-600 hover:bg-blue-50"
                        }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  ))}
      
                  <div className="flex gap-3 pt-3 border-t">
                    <button className="flex-1 text-white bg-red-500 px-4 py-2 rounded-md">
                      Logout
                    </button>
                    <button className="flex-1 text-white bg-primary px-4 py-2 rounded-md">
                      Login
                    </button>
                  </div>
                </div>
              </div>
            )}
      

      {/* Main Content */}

      <main className="flex-1 z-20 w-full lg:h-screen lg:overflow-y-scroll p-2">

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
