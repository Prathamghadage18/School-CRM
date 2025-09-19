import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import api from "../config/api";
import { Link } from "react-router-dom";

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Filters
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [schoolFilter, setSchoolFilter] = useState("");

  console.log('render user mgmt')

  const roles = ["admin", "teacher", "student", 'principal']; // Example roles

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/api/admin/users");
        setUsers(response.data.data.users);
        console.log(response.data.data.users)
        setFilteredUsers(response.data.data.users); // initial table load
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const toggleStatus = async (id) => {
    try {
      const response = await api.patch(`/api/admin/users/${id}/toggle-status`, {});
      const { isActive } = response.data.data;

      toast.success(`User has been ${isActive ? "activated" : "deactivated"}.`);
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, isActive } : u))
      );
      setFilteredUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, isActive } : u))
      );
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  const applyFilters = () => {
    let temp = [...users];

    if (search.trim() !== "") {
      temp = temp.filter((u) =>
        (u.firstName + " " + u.lastName)
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (roleFilter) {
      temp = temp.filter((u) => u.role === roleFilter);
    }

    if (schoolFilter) {
      temp = temp.filter((u) => u.school === schoolFilter); // assumes `u.school` exists in backend
    }

    setFilteredUsers(temp);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">User Status Management</h2>

      {/* 🔹 Filters Section */}
      <div className="flex flex-wrap gap-4 mb-4 rounded">
        <input
          type="text"
          placeholder="Search by name or class"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-1/2"
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Filter by Role</option>
          {roles.map((r, i) => (
            <option key={i} value={r}>
              {r}
            </option>
          ))}
        </select>
        <button
          onClick={applyFilters}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Apply Changes
        </button>
      </div>

      {/* 🔹 User Table */}
      <div className="overflow-x-auto bg-white shadow-md">
        <table className="w-full border-collapse">
          <thead className="bg-primaryLight text-left">
            <tr>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Role</th>
              <th className="p-3 border-b">Username</th>
              <th className="p-3 border-b">Class</th>
              <th className="p-3 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((u) => (
                <tr key={u._id} className="border-b hover:bg-gray-100">
                  
                    <td className="p-3 hover:text-blue-500 hover:underline" title="see profile">
                      <Link to={`/admin-dashboard/user-management/${u._id}`}>{u.firstName + " " + u.lastName}</Link>
                    </td>
                  <td className="p-3">{u.role}</td>
                  <td className="p-3">{u.username}</td>
                  <td className="p-3">{u.studentDetails?.classes[0] || "-"}</td>
                  <td className="p-3 flex items-center gap-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={u.isActive}
                        onChange={() => toggleStatus(u._id)}
                      />
                      <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors"></div>
                      <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow-md peer-checked:translate-x-5 transition-transform"></div>
                    </label>

                    <span
                      className={
                        u.isActive
                          ? "text-green-600 font-medium"
                          : "text-red-600 font-medium"
                      }
                    >
                      {u.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default React.memo(AdminUserManagement);