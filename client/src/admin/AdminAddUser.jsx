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
    // Student
    studentClass: "",
    studentSubjects: [{ subject: "", time: "" }],
    year: new Date().getFullYear(),
    // Teacher
    teacherSubjects: [{ subject: "", time: "" }],
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Student subject handlers
  const handleStudentSubjectChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...form.studentSubjects];
    updated[index][name] = value;
    setForm((prev) => ({ ...prev, studentSubjects: updated }));
  };
  const addStudentSubject = () =>
    setForm((prev) => ({
      ...prev,
      studentSubjects: [...prev.studentSubjects, { subject: "", time: "" }],
    }));
  const removeStudentSubject = (index) => {
    const updated = [...form.studentSubjects];
    updated.splice(index, 1);
    setForm((prev) => ({ ...prev, studentSubjects: updated }));
  };

  // Teacher subject handlers
  const handleTeacherSubjectChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...form.teacherSubjects];
    updated[index][name] = value;
    setForm((prev) => ({ ...prev, teacherSubjects: updated }));
  };
  const addTeacherSubject = () =>
    setForm((prev) => ({
      ...prev,
      teacherSubjects: [...prev.teacherSubjects, { subject: "", time: "" }],
    }));
  const removeTeacherSubject = (index) => {
    const updated = [...form.teacherSubjects];
    updated.splice(index, 1);
    setForm((prev) => ({ ...prev, teacherSubjects: updated }));
  };
  let newUser = {};
  // Submit handler
 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.firstName || !form.username || !form.email) {
    return toast.error("Please fill required fields.");
  }

  // Prepare subjects if student or teacher
  let studentSubjects = [];
  let teacherSubjects = [];

  // Inside handleSubmit:

if (form.role === "student") {
  studentSubjects = form.studentSubjects
    .filter((s) => s.subject.trim() && s.time.trim())
    .map((s) => ({ name: s.subject, time: s.time })); // ✅ match schema
}

if (form.role === "teacher") {
  teacherSubjects = form.teacherSubjects
    .filter((s) => s.subject.trim() && s.time.trim())
    .map((s) => ({ name: s.subject, teachingTime: s.time })); // ✅ match schema
}

  const newUser = {
    firstName: form.firstName,
    lastName: form.lastName,
    role: form.role,
    username: form.username,
    email: form.email,
    phone: form.phone,
    password: form.password,
    isActive: form.status === "active",
    // Role-specific ID
    ...(form.role === "teacher" || form.role === "principal"
      ? { employeeId: form.id }
      : form.role === "student" || form.role === "parent"
      ? { rollNumber: form.id }
      : {}),
    // Student fields
    ...(form.role === "student"
      ? {
          studentClass: form.studentClass,
          year: Number(form.year),
          studentSubjects: studentSubjects,
        }
      : {}),
    // Teacher fields
    ...(form.role === "teacher"
      ? {
          teacherSubjects: teacherSubjects,
          teacherClasses: [],
          teacherYears: [],
        }
      : {}),
  };

  const token = "YOUR_TOKEN_HERE"; // Replace with real token

  await toast.promise(
    axios.post("http://localhost:5000/api/admin/users", newUser, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    {
      loading: "Creating user...",
      success: (res) => {
        toast.success(res.data.message || "User created successfully");
        setForm({
          firstName: "",
          lastName: "",
          role: "student",
          username: "",
          id: "",
          email: "",
          phone: "",
          password: "Shree@5456",
          status: "active",
          studentClass: "",
          studentSubjects: [{ subject: "", time: "" }],
          year: new Date().getFullYear(),
          teacherSubjects: [{ subject: "", time: "" }],
        });
      },
      error: (err) =>
        err.response?.data?.message || "Error creating user. Please try again.",
    }
  );
};


  return (
    <div className="p-6 bg-white shadow-md max-w-4xl m-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New User</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Common Fields */}
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full border p-2"
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
          className="w-full border p-2"
          required
        />
        {(form.role === "teacher" ||
          form.role === "principal" ||
          form.role === "student" ||
          form.role === "parent") && (
            <input
              type="text"
              name="id"
              placeholder={form.role === "teacher" || form.role === "principal" ? "Employee ID" : "Register Number"}
              value={form.id}
              onChange={handleChange}
              className="w-full border p-2 col-span-2 md:col-span-1"
              required
            />
          )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border p-2"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        {/* Student Fields */}
        {form.role === "student" && (
          <div className="col-span-2">
            <h3 className="font-semibold mb-2">Student Details</h3>
            <select
              name="studentClass"
              value={form.studentClass}
              onChange={handleChange}
              className="w-full border p-2 mb-2"
              required
            >
              <option value="">Select class</option>
              {[...Array(12).keys()].map((n) => (
                <option key={n + 1} value={n + 1}>
                  {n + 1}th
                </option>
              ))}
            </select>
            <input
              type="number"
              name="year"
              placeholder="Year"
              value={form.year}
              onChange={handleChange}
              className="w-full border p-2 mb-2"
            />
            {form.studentSubjects.map((item, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={item.subject}
                  onChange={(e) => handleStudentSubjectChange(index, e)}
                  className="w-1/2 border p-2"
                />
                <input
                  type="text"
                  name="time"
                  placeholder="Study Time"
                  value={item.time}
                  onChange={(e) => handleStudentSubjectChange(index, e)}
                  className="w-1/2 border p-2"
                />
                <button
                  type="button"
                  onClick={() => removeStudentSubject(index)}
                  className="px-2 bg-red-500 text-white"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addStudentSubject}
              className="mt-2 px-3 py-1 bg-green-600 text-white"
            >
              + Add Subject
            </button>
          </div>
        )}

        {/* Teacher Fields */}
        {form.role === "teacher" && (
          <div className="col-span-2">
            <h3 className="font-semibold mb-2">Teacher Subjects & Times</h3>
            {form.teacherSubjects.map((item, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={item.subject}
                  onChange={(e) => handleTeacherSubjectChange(index, e)}
                  className="w-1/2 border p-2"
                />
                <input
                  type="text"
                  name="time"
                  placeholder="Teaching Time"
                  value={item.time}
                  onChange={(e) => handleTeacherSubjectChange(index, e)}
                  className="w-1/2 border p-2"
                />
                <button
                  type="button"
                  onClick={() => removeTeacherSubject(index)}
                  className="px-2 bg-red-500 text-white"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addTeacherSubject}
              className="mt-2 px-3 py-1 bg-green-600 text-white"
            >
              + Add Subject
            </button>
          </div>
        )}

        <div className="col-span-1 md:col-span-2">
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 "
          >
            Create User
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddUsers;