import React, { useState } from "react";

const AdminAddSchool = () => {
  const [school, setSchool] = useState({
    name: "",
    regNo: "",
    location: "",
    pincode: "",
    emergencyNo: "",
    email: "",
  });

  console.log("add school render");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchool((prev) => ({ ...prev, [name]: value }));
  };

  const saveSchoolDetails = () => {
    if (
      !school.name ||
      !school.regNo ||
      !school.location ||
      !school.pincode ||
      !school.emergencyNo ||
      !school.email
    ) {
      alert("⚠️ Please fill all school details.");
      return;
    }
    console.log("✅ School Details Saved:", school);
    alert("🏫 School details saved successfully!");
  };

  return (
    <div className="p-6 space-y-8">
      <div className="bg-white shadow-md p-6 rounded-lg space-y-4">
        <h3 className="text-lg font-semibold">🏫 School Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="School Name"
            value={school.name}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="text"
            name="regNo"
            placeholder="School Registration No"
            value={school.regNo}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={school.location}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={school.pincode}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="text"
            name="emergencyNo"
            placeholder="Emergency Contact No"
            value={school.emergencyNo}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-red-500 outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="School Email ID"
            value={school.email}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        <button
          onClick={saveSchoolDetails}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
        >
          Save School Info
        </button>
      </div>

      
    </div>
  );
};
export default React.memo(AdminAddSchool);