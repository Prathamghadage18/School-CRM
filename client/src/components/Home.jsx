import React from "react";
import {
  FaUserTie,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaUsers,
  FaShieldAlt,
  FaMobileAlt,
  FaBolt,
  FaBookOpen,
  FaClipboardCheck,
  FaBus,
} from "react-icons/fa";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import Footer from "./Footer";

export default function Home() {
  const featureCards = [
    { icon: FaShieldAlt, title: "Role-Based Access", desc: "Different permissions per role", color: "bg-blue-200 text-primary" },
    { icon: FaBookOpen, title: "Study Materials", desc: "Upload & share resources", color: "bg-green-100 text-green-600" },
    { icon: FaClipboardCheck, title: "Attendance System", desc: "Track & notify parents", color: "bg-purple-100 text-purple-600" },
    { icon: FaBus, title: "Bus Tracking", desc: "Live location updates", color: "bg-orange-100 text-orange-600" },
  ];

  const roleCards = [
    {
      icon: FaUserTie,
      role: "Principal",
      description: "Full system oversight and management",
      features: ["User Management", "School Announcements", "Analytics Dashboard", "View All Data"],
      color: "bg-purple-600",
    },
    {
      icon: FaChalkboardTeacher,
      role: "Teacher",
      description: "Manage classes and student progress",
      features: ["Upload Study Materials", "Mark Attendance", "Enter Grades", "Class Announcements"],
      color: "bg-green-600",
    },
    {
      icon: FaUserGraduate,
      role: "Student",
      description: "Access learning materials and grades",
      features: ["View Study Materials", "Check Grades", "View Attendance", "Receive Announcements"],
      color: "bg-primary",
    },
    {
      icon: FaUsers,
      role: "Parent",
      description: "Monitor child's progress and activities",
      features: ["Child's Attendance", "Grades & Reports", "Bus Location Tracking", "School Notifications"],
      color: "bg-orange-600",
    },
  ];

  const architectureCards = [
    { icon: FaShieldAlt, title: "Security & RBAC", desc: "Role-based permissions ensure users only access appropriate features and data", color: "bg-primary text-primary" },
    { icon: FaMobileAlt, title: "Mobile-First Design", desc: "Responsive interface optimized for smartphones, tablets, and desktop", color: "bg-green-100 text-green-600" },
    { icon: FaBolt, title: "Real-time Updates", desc: "Live notifications for attendance, grades, and bus tracking", color: "bg-purple-100 text-purple-600" },
  ];

  const FeatureCard = ({ icon: Icon, title, desc, color }) => (
    <div className="flex flex-col items-center bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
      <div className={`p-3 rounded-full mb-3 ${color}`}>
        <Icon size={24} />
      </div>
      <h3 className="font-semibold text-gray-800 text-2xl text-center">{title}</h3>
      <p className="text-gray-600 text-sm text-center mt-2">{desc}</p>
    </div>
  );

  const RoleCard = ({ icon: Icon, role, description, features, color }) => (
    <div className="bg-white rounded-3xl shadow-md p-6 hover:shadow-lg transition">
      <div className="flex flex-col items-center mb-4">
        <div className={`p-5 rounded-full text-white mb-3 ${color}`}>
          <Icon size={28} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{role}</h2>
        <p className="text-gray-600 text-center text-sm">{description}</p>
      </div>
      <ul className="space-y-2 text-gray-700">
        {features.map((f, i) => (
          <li key={i} className="flex items-center justify-center gap-2 text-sm w-full text-center ">
            <span className="text-green-500">●</span> {f}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <Navbar />

      {/* 🌟 Hero Section */}
      <section className="bg-gradient-to-r from-sky-300 to-sky-400 text-white py-20">
        <div className="max-w-6xl min-h-[500px] mx-auto px-6 flex flex-col lg:flex-row items-center justify-between">
          
          {/* Left Content */}
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="text-5xl font-bold leading-tight mb-6 ">
              Welcome to School Customer Relationship Management System 
            </h1>
            <p className="text-lg text-gray-100 mb-6">
              A modern platform to manage schools with role-based access for Principals, Teachers, Students, and Parents.
            </p>
            <div className="flex space-x-4">
              <Link to="/login" className="bg-primary text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-primary transition">
                🚀 Get Started
              </Link>
              <a href="#roles" className="bg-white text-primary px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-100 transition">
                👥 Explore Roles
              </a>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="lg:w-1/2 flex justify-center">
            <img
              src="https://www.matichon.co.th/wp-content/uploads/2022/11/02-192.jpg"
              alt="School CRM Illustration"
              className="w-96 lg:w-[28rem] rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* 🌟 Main Content */}
      <div className="min-h-screen bg-[#edf4ff] p-10">
        

        {/* Key Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center p-8">🎯 Key Features Demonstrated</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {featureCards.map((f, i) => (
              <FeatureCard key={i} {...f} />
            ))}
          </div>
        </section>

        {/* Roles */}
        <section id="roles" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">👥 Roles Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {roleCards.map((r, i) => (
              <RoleCard key={i} {...r} />
            ))}
          </div>
        </section>

        {/* Architecture */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">🏗️ System Architecture Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {architectureCards.map((a, i) => (
              <FeatureCard key={i} {...a} />
            ))}
          </div>
        </section>
      </div>
      <Footer/>
    </>
  );
}
