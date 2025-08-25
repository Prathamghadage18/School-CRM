import React from "react";
import { FaHome, FaBook, FaClipboardList, FaCheckCircle } from "react-icons/fa";
import { Routes, Route} from "react-router-dom";

import ProtectedRoute from "../api/ProtectedRoute";
import Progress from "./Progress";
import Communication from "./Communication";
import BusTracking from "./BusTracking";
import ParentHome from "./ParentHome";


export default function ParentDashboard() {
  const params = window.location.pathname.split("/")[2] || "home"; 
 
  const NaviagationItem = [
    { icon: <FaHome />, label: "Home", path: "/parent-dashboard/home", active: params === "home" },
    { icon: <FaBook />, label: "Progress", path: "/parent-dashboard/progress", active: params === "progress" },
    { icon: <FaClipboardList />, label: "Bus Tracking", path: "/parent-dashboard/bus-tracking", active: params === "bus-tracking" },
    { icon: <FaCheckCircle />, label: "Communication", path: "/parent-dashboard/communication", active: params === "communication" },
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
      <main className="w-full lg:h-screen lg:overflow-y-scroll p-6">
        <Routes>
          <Route element={<ProtectedRoute allowedRoles={["parent"]} />}>
            <Route path="/home" element={<ParentHome />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/communication" element={<Communication />} />
            <Route path="/bus-tracking" element={<BusTracking />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}
