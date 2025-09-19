import React, { useEffect, useState } from "react";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUserTie,
  FaUsers,
  FaBullhorn,
  FaChartLine,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCurrentUserId } from "../redux/authSlice";
import {
  getAllAdmin,
  getAllPrincipal,
  getAllStudent,
  getAllTeacher,
  getAllUser,
} from "../config/admin";

const AdminHome = () => {
  const [users, setUsers] = useState(0);
  const [students, setStudents] = useState(0);
  const [teachers, setTeachers] = useState(0);
  const [principals, setPrincipals] = useState(0);
  const [loading, setLoading] = useState(true);

  const userId = useSelector(selectCurrentUserId);

  console.log('render home')


  useEffect(() => {
    if (userId) {
      (async () => {
        try {
          setLoading(true);
          const user = await getAllAdmin();
          setUsers(user?.length || 0);

          const student = await getAllStudent();
          setStudents(student?.length || 0);

          const teacher = await getAllTeacher();
          setTeachers(teacher?.length || 0);

          const principal = await getAllPrincipal();
          setPrincipals(principal?.length || 0);
        } catch (err) {
          console.error("Error fetching admin data:", err);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [userId]);

  const stats = [
    {
      title: "Total Admin",
      value: users,
      icon: <FaUsers />,
      color: "bg-orange-100 text-orange-600",
      link: "/admin/parents",
    },
    {
      title: "Students",
      value: students,
      icon: <FaUserGraduate />,
      color: "bg-blue-100 text-blue-600",
      link: "/admin/students",
    },
    {
      title: "Teachers",
      value: teachers,
      icon: <FaChalkboardTeacher />,
      color: "bg-green-100 text-green-600",
      link: "/admin/teachers",
    },
    {
      title: "Principals",
      value: principals,
      icon: <FaUserTie />,
      color: "bg-purple-100 text-purple-600",
      link: "/admin/principals",
    },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-6">📊 Admin Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((item, idx) => (
          <Link to={item.link} key={idx}>
            <div className="bg-white shadow-md rounded-xl p-5 flex items-center justify-between hover:shadow-lg transition">
              <div>
                <h3 className="text-gray-500 text-sm">{item.title}</h3>
                <p className="text-2xl font-bold">
                  {loading ? "..." : item.value}
                </p>
              </div>
              <div className={`p-3 rounded-full ${item.color} text-xl`}>
                {item.icon}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Announcements */}
        <Link to="/admin-dashboard/announcements">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl shadow-md p-6 hover:opacity-90 transition">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FaBullhorn /> Send Announcement
            </h3>
            <p className="text-sm mt-2">
              Reach all users instantly with important updates.
            </p>
          </div>
        </Link>

        {/* User Status Management */}
        <Link to="/admin-dashboard/user-management">
          <div className="bg-gradient-to-r from-indigo-400 to-purple-500 text-white rounded-xl shadow-md p-6 hover:opacity-90 transition">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FaChartLine /> Manage Users
            </h3>
            <p className="text-sm mt-2">
              Activate, deactivate or update user credentials.
            </p>
          </div>
        </Link>
      </div>

      {/* Analytics Section */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">📈 Recent Analytics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600">320</p>
            <p className="text-gray-500 text-sm">Active Students</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">65</p>
            <p className="text-gray-500 text-sm">Active Teachers</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">5</p>
            <p className="text-gray-500 text-sm">Principals</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-orange-600">280</p>
            <p className="text-gray-500 text-sm">Active Parents</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default React.memo(AdminHome);