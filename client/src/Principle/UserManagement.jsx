import React from "react";

const UserManagement = () => {
  const users = [
    {
      name: "Ms. Wilson",
      email: "m.wilson@school.edu",
      role: "Teacher",
      class: "Mathematics",
      status: "Active",
      lastLogin: "2 hours ago",
    },
    {
      name: "Alice Johnson",
      email: "alice.j@student.edu",
      role: "Student",
      class: "Class 10A",
      status: "Active",
      lastLogin: "1 day ago",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-4 lg:w-10/12 m-auto ">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">👥 User Management</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
          + Add User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <p className="text-xl font-bold text-blue-600">87</p>
          <p className="text-sm">Teachers</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <p className="text-xl font-bold text-green-600">1,247</p>
          <p className="text-sm">Students</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <p className="text-xl font-bold text-purple-600">2,156</p>
          <p className="text-sm">Parents</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg text-center">
          <p className="text-xl font-bold text-orange-600">15</p>
          <p className="text-sm">Staff</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search users..."
          className="border rounded-lg px-3 py-2 w-1/2"
        />
        <select className="border rounded-lg px-3 py-2">
          <option>All Roles</option>
          <option>Teacher</option>
          <option>Student</option>
          <option>Parent</option>
          <option>Staff</option>
        </select>
      </div>

      {/* Table */}
      <table className="w-full text-left border-t">
        <thead>
          <tr className="text-sm text-gray-600">
            <th className="py-2">User</th>
            <th>Role</th>
            <th>Class/Subject</th>
            <th>Status</th>
            <th>Last Login</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {users.map((u, i) => (
            <tr key={i} className="border-t">
              <td className="py-3">
                <div>
                  <p className="font-semibold">{u.name}</p>
                  <p className="text-gray-500 text-xs">{u.email}</p>
                </div>
              </td>
              <td>
                <span className="px-2 py-1 rounded bg-blue-100 text-blue-600 text-xs">
                  {u.role}
                </span>
              </td>
              <td>{u.class}</td>
              <td>
                <span className="px-2 py-1 rounded bg-green-100 text-green-600 text-xs">
                  {u.status}
                </span>
              </td>
              <td>{u.lastLogin}</td>
              <td className="space-x-2">
                <button className="text-blue-600">Edit</button>
                <button className="text-red-600">Disable</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
