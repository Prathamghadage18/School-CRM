import React, { useState } from "react";
import { FaHome, FaBook, FaClipboardList, FaCheckCircle, FaBars, FaTimes } from "react-icons/fa";
import { Routes, Route, Link, useLocation, useParams } from "react-router-dom";

import ProtectedRoute from "../api/ProtectedRoute";
import PrincipleHome from "./PrincipleHome";
import Analytics from "./Analytics";
import Announcements from "./Announcements";
import UserManagement from "./UserManagement";
import GradientCircles from "../components/ui/GradientCircles";

export default function PrincipleDashboard() {
  const params = useParams();
  const currentPath = params["*"];
  const [menuOpen, setMenuOpen] = useState(false);

  const NavigationItem = [
    { icon: <FaHome />, label: "Home", path: "/principle-dashboard", active: currentPath === "" },
    { icon: <FaBook />, label: "Analytics", path: "/principle-dashboard/analytics", active: currentPath === "analytics" },
    { icon: <FaClipboardList />, label: "User Management", path: "/principle-dashboard/user-management", active: currentPath === "user-management" },
    { icon: <FaCheckCircle />, label: "Announcement", path: "/principle-dashboard/announcement", active: currentPath === "announcement" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 flex flex-col">
      <GradientCircles />

      {/* Navbar */}
      <div className="z-20 bg-white shadow px-6 py-4 flex items-center justify-between">
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
        <div className="md:hidden z-20 bg-white shadow px-6 py-4 space-y-3">
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
      )}

      {/* Main Content */}
      <main className="flex-1 z-20 w-full lg:h-screen lg:overflow-y-scroll p-2">
        <Routes>
          <Route element={<ProtectedRoute allowedRoles={["principle"]} />}>
            <Route path="/" element={<PrincipleHome />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/announcement" element={<Announcements />} />
            <Route path="/user-management" element={<UserManagement />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}