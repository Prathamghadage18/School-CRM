import React from "react";

const AdminCredentials = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Create Credentials</h2>

      <div className="bg-white shadow-md p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Principals/Teachers */}
        <div>
          <p className="font-semibold mb-2">For Principals/Teachers (Employee ID)</p>
          <input
            type="text"
            placeholder="Enter Employee ID"
            className="w-full border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 transition">
            Generate
          </button>
        </div>

        {/* Parents */}
        <div>
          <p className="font-semibold mb-2">For Parents (Student Roll No)</p>
          <input
            type="text"
            placeholder="Enter Roll No"
            className="w-full border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
          />
          <button className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 transition">
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminCredentials;
