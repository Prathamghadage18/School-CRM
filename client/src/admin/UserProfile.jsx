import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../config/api";
import { toast } from "sonner";

const UserProfile = () => {
    const { user_id } = useParams();
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});

    // Fetch user profile by ID
    const fetchUserProfile = async () => {
        try {
            const res = await api.get(`/api/auth/user/${user_id}`);
            setUser(res.data.data.user);
            setFormData(res.data.data.user);
        } catch (error) {
            console.error("Error fetching user profile:", error);
            toast.error('error to load profile');
        }
    };
    console.log('profile')

    useEffect(() => {
        fetchUserProfile();
    }, [user_id]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Update user profile
    const handleUpdate = async () => {
        try {
            const res = await api.put(`/api/auth/user/${user_id}`, formData);
            setUser(res.data.data.user);
            setIsEditing(false);
            toast.success("User updated successfully");
        } catch (error) {
            console.error("Error updating user profile:", error);
            toast.error('error to update user');
        }
    };

    if (!user) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-gray-100">
                <div className="animate-spinll h-12 w-12 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen  p-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold ">
                        {isEditing ? "Edit User Profile" : "User Profile"}
                    </h1>
                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 bg-blue-600 text-white shadow hover:bg-blue-700"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>

                {/* Profile Details */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Left Panel - Summary */}
                    <div className="bg-white shadow p-6">
                        <div className="flex flex-col  ">
                            <div className="w-14 h-14 bg-blue-200 flex items-center justify-center text-3xl font-bold text-blue-600 mb-4">
                                {user.firstName?.charAt(0)}
                            </div>
                            <h2 className="text-xl font-semibold ">
                                {user.firstName} {user.lastName}
                            </h2>
                            <p className="text-gray-500">{user.role} </p>
                            <span
                                className={`mt-2 inline-block px-3 py-1 text-smll w-fit ${user.isActive
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {user.isActive ? "Active" : "Inactive"}
                            </span>
                        </div>
                        <hr className=" border-primary my-4" />
                        <div className="mt-2 space-y-2 text-md">
                            <p className=" w-full flex justify-between items-center"><strong>Email</strong> <span> {user.email} </span></p>
                            <p className=" w-full flex justify-between items-center"><strong>Phone</strong> <span> {user.phone || "N/A"} </span></p>
                            <p className=" w-full flex justify-between items-center"><strong>Username</strong> <span> {user.username} </span></p>
                            <p className=" w-full flex justify-between items-center"><strong>Roll Number</strong> <span> {user.rollNumber} </span></p>
                            <p className=" w-full flex justify-between items-center"><strong>Last Login</strong>
                                <span className=" text-blue-800">
                                    {new Date(user.lastLogin).toLocaleString("en-IN", {
                                        dateStyle: "medium",
                                        timeStyle: "short",
                                    })}
                                </span>
                            </p>
                            <p className=" w-full flex justify-between items-center"><strong>Created </strong> <span>
                                {new Date(user.createdAt).toLocaleString("en-IN", {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                })} </span></p>
                        </div>
                    </div>

                    {/* Right Panel - Info / Form */}
                    <div className="lg:col-span-2">
                        {!isEditing ? (
                            <div className="space-y-6">
                                {/* Student Info */}
                                {user.role === "student" && (
                                    <div className="bg-white shadow p-6">
                                        <h3 className="text-lg font-semibold">
                                            Student Details
                                        </h3>
                                        <hr className=" border-primary my-2" />
                                        <p className=" w-full flex justify-between items-center"><strong>Year</strong> <span> {user.studentDetails?.year} </span></p>
                                        <p className=" w-full flex justify-between items-center"><strong>Classes</strong> <span> {user.studentDetails?.classes?.join(", ") || "N/A"} </span></p>
                                        <p className=" w-full flex justify-between items-center"><strong>Subjects</strong> <span> {user.studentDetails?.subjects?.join(", ") || "N/A"} </span></p>
                                    </div>
                                )}

                                {/* Teacher Info */}
                                {user.role === "teacher" && (
                                    <div className="bg-white shadow p-6">
                                        <h3 className="text-lg font-semibold ">
                                            Teacher Details
                                        </h3>
                                        <hr className=" border-primary my-2" />
                                        <p className=" w-full flex justify-between items-center"><strong>Classes</strong> <span> {user.teacherDetails?.classes?.join(", ") || "N/A"} </span></p>
                                        <p className=" w-full flex justify-between items-center"><strong>Years</strong> <span> {user.teacherDetails?.years?.join(", ") || "N/A"} </span></p>
                                        <p className=" w-full flex justify-between items-center my-2"><strong>Subjects</strong> <span>{user?.teacherDetails?.subjects?.length > 0
                                            ? user.teacherDetails.subjects.map((sub, i) => (
                                                <span key={i} className=" bg-blue-100 p-1 ml-2">{sub.name} </span>
                                            ))
                                            : "No subjects assigned"}
                                        </span></p>
                                        <p className=" w-full flex justify-between items-center"><strong>Class Teacher</strong> <span> {user.teacherDetails?.isClassTeacher ? "Yes" : "No"} </span></p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="bg-white shadow p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Edit Details</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName || ""}
                                        onChange={handleChange}
                                        placeholder="First Name"
                                        className="p-2 border"
                                    />
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName || ""}
                                        onChange={handleChange}
                                        placeholder="Last Name"
                                        className="p-2 border"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email || ""}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        className="p-2 border col-span-2"
                                    />
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone || ""}
                                        onChange={handleChange}
                                        placeholder="Phone"
                                        className="p-2 border col-span-2"
                                    />
                                    <select
                                        name="isActive"
                                        value={formData.isActive}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                isActive: e.target.value === "true",
                                            }))
                                        }
                                        className="p-2 border col-span-2"
                                    >
                                        <option value={true}>Active</option>
                                        <option value={false}>Inactive</option>
                                    </select>
                                </div>

                                <div className="flex gap-3 mt-6">
                                    <button
                                        onClick={handleUpdate}
                                        className="bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(UserProfile);