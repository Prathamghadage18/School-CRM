import React from 'react';
import { Route, Routes, Link, useParams, useNavigate } from 'react-router-dom';
import { FaBell, FaUser, FaCalendarAlt, FaCheckCircle, FaUserFriends } from 'react-icons/fa';

import MenuItem from '../components/ui/MenuItem';
import ProtectedRoute from '../config/ProtectedRoute';
// import { useDispatch, useSelector } from 'react-redux';
// import { logout, selectCurrentUserRole } from '../redux/authSlice';
import AdminAddUsers from './AdminAddUser';
import AdminCredentials from './AdminCredentials';
import AdminAnnouncements from './AdminAnnouncements';
import AdminUserManagement from './AdminUserManagement';
import AdminHome from './AdminHome';

const AdminDashboard = () => {

  const para = useParams();
  const params = para['*']; // Get the wildcard parameter

  const menuItems = [
    { icon: <FaCalendarAlt />, label: 'Dashboard', path: "/admin-dashboard/", active: params === "" },
    { icon: <FaUser />, label: 'Add Users', path: "/admin-dashboard/add-users", active: params === "add-users" },
    { icon: <FaCheckCircle />, label: 'Credentials', path: "/admin-dashboard/credentials", active: params === "credentials" },
    { icon: <FaBell />, label: 'Announcements', path: "/admin-dashboard/announcements", active: params === "announcements" },
    { icon: <FaUserFriends />, label: 'User Management', path: "/admin-dashboard/user-management", active: params === "user-management" },
  ];


  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const checkUserRole = useSelector(selectCurrentUserRole);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout Successfully");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Show ONLY for large screens */}
      <div className="hidden lg:flex overscroll-auto">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md p-6 flex-col justify-between min-h-screen hidden lg:flex">
          <div>
            <Link to={'/'}><h1 className="text-2xl font-bold text-primary mb-2">CRM</h1></Link>
            <nav className="space-y-2">
              <div className='w-[200px] overflow-hidden'>
                {menuItems.map((item, idx) => (
                  <MenuItem
                    key={idx}
                    icon={item.icon}
                    label={item.label}
                    path={item.path}  
                    active={item.active}
                  />
                ))}

              </div>
            </nav>
          </div>
          <div className="flex flex-col">
            {/* {checkUserRole === "admin" && (
              <button
                onClick={handleLogout}
                className="px-4 py-2 mb-4 rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-colors shadow-md hover:shadow-lg"
              >
                Logout
              </button>
            )} */}

            <div className="mt-5 p-3 bg-primaryLight text-center rounded-lg">
              <p className="text-sm">Need help?</p>
              <Link to={'/contact'}>
                <button className="text-primary text-sm font-semibold mt-2 border border-primary rounded px-2 py-1">
                  Contact Support
                </button>
              </Link>
            </div>
          </div>
        </aside>
        {/* Main Content */}
        <main className='w-full lg:h-screen lg:overflow-y-scroll'>
          <Routes>
            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
              <Route index element={<AdminHome />} />   {/* replaces path="/" */}
              <Route path="add-users" element={<AdminAddUsers />} />
              <Route path="credentials" element={<AdminCredentials />} />
              <Route path="announcements" element={<AdminAnnouncements />} />
              <Route path="user-management" element={<AdminUserManagement />} />
            </Route>
          </Routes>

        </main>
      </div>
      {/* Mobile View: Message only */}
      <div className="flex lg:hidden items-center justify-center h-screen bg-gray-100 text-center px-4">
        <p className="text-sm font-semibold text-gray-700 bg-primaryLight border border-primary p-6 animate-pulse">
          ⚠️ The admin dashboard is only available on desktop devices.
          Please switch to a larger screen to continue.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;