import React, { useState } from "react";

const AdminUserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John", role: "Student", active: true },
    { id: 2, name: "Jane", role: "Teacher", active: false },
    { id: 3, name: "Mr. Smith", role: "Principal", active: true },
  ]);

  const toggleStatus = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, active: !u.active } : u));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User Status Management</h2>

      <div className="overflow-x-auto bg-white  shadow-md">
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
              <tr key={u.id} className="border-b hover:bg-gray-100">
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.role}</td>
                <td className="p-3 flex items-center gap-3">
                  {/* Custom Switch (checkbox) */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={u.active}
                      onChange={() => toggleStatus(u.id)}
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer
                      peer-checked:bg-green-500 transition-colors"></div>
                    <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow-md
                      peer-checked:translate-x-5 transition-transform"></div>
                  </label>

                  <span className={u.active ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                    {u.active ? "Active" : "Inactive"}
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
