import React, { useState } from "react";
import axios from "axios";

const AdminAddUsers = () => {
  const [form, setForm] = useState({
    name: "",
    role: "student",
    id: "",
    status: "active",
  });
  const [users, setUsers] = useState([]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name || !form.id) {
      alert("⚠️ Please fill all fields!");
      return;
    }

    // Generate credentials same as backend schema
    const newUser = {
      firstName: form.name.split(" ")[0],
      lastName: form.name.split(" ")[1] || "",
      role: form.role,
      employeeId: form.role !== "student" ? form.id : undefined,
      rollNumber: form.role === "student" ? form.id : undefined,
      email: `${form.id}@school.com`,
      password: `pass_${form.id}`, // backend will hash it
      isActive: form.status === "active",
    };

    try {
      // const token = localStorage.getItem("token"); // replace with real logic
      const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
        newUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers([...users, res.data]);
      alert(`✅ ${form.role} added successfully!`);
      setForm({ name: "", role: "student", id: "", status: "active" });
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add user");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">➕ Add New User</h2>

      {/* FORM */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-3 py-2"
            placeholder="John Doe"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium">Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-3 py-2"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="principal">Principal</option>
          </select>
        </div>

        {/* ID Field */}
        <div>
          <label className="block text-sm font-medium">
            {form.role === "student" ? "Roll Number" : "Employee ID"}
          </label>
          <input
            type="text"
            name="id"
            value={form.id}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-3 py-2"
            placeholder={
              form.role === "student" ? "Enter Roll No." : "Enter Employee ID"
            }
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-3 py-2"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add User
      </button>

      {/* USERS TABLE */}
      {users.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">📋 Users List</h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Name</th>
                <th className="border p-2">Role</th>
                <th className="border p-2">ID</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={i}>
                  <td className="border p-2">
                    {u.firstName} {u.lastName}
                  </td>
                  <td className="border p-2">{u.role}</td>
                  <td className="border p-2">
                    {u.role === "student" ? u.rollNumber : u.employeeId}
                  </td>
                  <td className="border p-2">{u.email}</td>
                  <td className="border p-2">
                    {u.isActive ? "Active" : "Inactive"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminAddUsers;
