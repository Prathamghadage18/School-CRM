import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const AdminAddUsers = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    role: "student",
    username: "",
    id: "",
    email: "",
    phone: "",
    password: "Shree@5456",
    status: "active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        firstName: form.firstName,
        lastName: form.lastName,
        role: form.role,
        username: form.username,
        email: form.email,
        phone: form.phone,
        password: form.password,
        isActive: form.status === "active",
      };

      // Add role-specific IDs only if present
      if (form.role === "teacher" || form.role === "principal") {
        newUser.employeeId = form.id;
      }
      if (form.role === "student" || form.role === "parent") {
        newUser.rollNumber = form.id;
      }

      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";

      const response = await axios.post(
        "http://localhost:5000/api/admin/users",
        newUser,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(response.data.message || "User created successfully");

      setForm({
        firstName: "",
        lastName: "",
        role: "",
        username: "",
        id: "",
        email: "",
        phone: "",
        password: "Shree@5456",
        status: "active",
      });
    } catch (err) {
      const errMsg =
        err.response?.data?.message || "Error creating user. Please try again.";
      toast.error(errMsg);
      console.log(err)
    }
  };

  return (
    <div className="p-8 bg-white  shadow-md max-w-3xl m-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New User</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          className="w-full border  p-2"
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          className="w-full border  p-2"
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full border  p-2"
          required
        >
          <option value="">Select Role</option>
          <option value="principal">Principal</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
          <option value="parent">Parent</option>
          <option value="admin">Admin</option>
        </select>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full border  p-2"
          required
        />

        {/* Conditional Employee ID / Roll Number */}
        {(form.role === "teacher" ||
          form.role === "principal" ||
          form.role === "student" ||
          form.role === "parent") && (
            <input
              type="text"
              name="id"
              placeholder={
                form.role === "teacher" || form.role === "principal"
                  ? "Employee ID"
                  : "Roll Number"
              }
              value={form.id}
              onChange={handleChange}
              className="w-full border  p-2 col-span-2 md:col-span-1"
              required
            />
          )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border  p-2"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full border  p-2"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border  p-2"
          required
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border  p-2"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <div className="col-span-1 md:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2  hover:bg-blue-700"
          >
            Create User
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddUsers;
