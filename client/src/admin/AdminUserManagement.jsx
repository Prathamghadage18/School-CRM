import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
        const response = await axios.get("http://localhost:5000/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data.data.users);
        setUsers(response.data.data.users);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const toggleStatus = async (id) => {
  try {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
    const response = await axios.patch(
      `http://localhost:5000/api/admin/users/${id}/toggle-status`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const { isActive } = response.data.data;

    toast.success(`User has been ${isActive ? 'activated' : 'deactivated'}.`);
    // Update state after backend success
    setUsers((prev) =>
      prev.map((u) =>
        u._id === id ? { ...u, isActive } : u
      )
    );
  } catch (error) {
    console.error("Error toggling status:", error);
  }
};


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User Status Management</h2>
      <div className="overflow-x-auto bg-white shadow-md">
        <table className="w-full border-collapse">
          <thead className="bg-primaryLight text-left">
            <tr>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Role</th>
              <th className="p-3 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b hover:bg-gray-100">
                <td className="p-3">{u.firstName + " " + u.lastName}</td>
                <td className="p-3">{u.role}</td>
                <td className="p-3 flex items-center gap-3">
                  {/* Custom Switch (checkbox) */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={u.isActive}
                      onChange={() => toggleStatus(u._id)}
                    />
                    <div
                      className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors"
                    ></div>
                    <div
                      className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow-md peer-checked:translate-x-5 transition-transform"
                    ></div>
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUserManagement;
