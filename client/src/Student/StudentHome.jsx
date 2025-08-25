import React from 'react'

const StudentHome = () => {

    const stats = [
        { label: "Current Grade", value: "A-", color: "text-green-600" },
        { label: "Attendance", value: "95%", color: "text-blue-600" },
        { label: "Assignments Due", value: "3", color: "text-orange-600" },
        { label: "New Materials", value: "5", color: "text-purple-600" },
    ];

    const materials = [
        { title: "Mathematics Chapter 5", subject: "Math", teacher: "Ms. Wilson" },
        { title: "Science Lab Report Template", subject: "Science", teacher: "Mr. Brown" },
        { title: "History Assignment Guidelines", subject: "History", teacher: "Mrs. Taylor" },
    ];

    const events = [
        {
            title: "Math Quiz Tomorrow",
            details: "Chapter 4–5 • 10:00 AM",
            color: "bg-red-50 text-red-700",
        },
        {
            title: "Science Project Due",
            details: "Friday • Submit online",
            color: "bg-blue-50 text-blue-700",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:w-10/12 m-auto ">
            {/* Recent Materials */}
            <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                    📚 Recent Materials
                </h3>
                <div className="space-y-3">
                    {materials.map((m, idx) => (
                        <div
                            key={idx}
                            className="flex justify-between items-center p-3 rounded-lg bg-gray-50"
                        >
                            <div>
                                <div className="font-medium">{m.title}</div>
                                <div className="text-sm text-gray-600">
                                    {m.subject} • {m.teacher}
                                </div>
                            </div>
                            <button className="text-blue-600 hover:underline text-sm">
                                Download
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                    📅 Upcoming Events
                </h3>
                <div className="space-y-3">
                    {events.map((e, idx) => (
                        <div
                            key={idx}
                            className={`p-3 rounded-lg ${e.color} font-medium`}
                        >
                            <div>{e.title}</div>
                            <div className="text-sm">{e.details}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default StudentHome
