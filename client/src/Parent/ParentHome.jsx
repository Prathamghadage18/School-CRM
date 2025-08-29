import React from 'react'

const ParentHome = () => {
  const StatCard = ({ title, value, color }) => (
    <div className={`flex flex-col items-center justify-center bg-white shadow-md rounded-xl p-6 ${color}`}>
      <h3 className="text-sm text-gray-600">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );

  const SubjectCard = ({ subject, Parent, grade, percent }) => (
    <div className="flex justify-between items-center bg-white rounded-lg p-4 shadow">
      <div>
        <h4 className="font-semibold text-gray-800">{subject}</h4>
        <p className="text-gray-500 text-sm">{Parent}</p>
      </div>
      <div className="text-right">
        <span className="text-lg font-bold">{grade}</span>
        <p className="text-sm text-gray-500">{percent}%</p>
      </div>
    </div>
  );

  const ActivityCard = ({ title, desc, status }) => (
    <div className={`p-4 rounded-lg shadow text-sm ${status}`}>
      <h4 className="font-semibold">{title}</h4>
      <p>{desc}</p>
    </div>
  );

  return (
    <div className="min-h-screen  p-6 space-y-8 lg:w-10/12 m-auto">
      {/* Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard title="Overall Grade" value="A-" color="text-green-600" />
        <StatCard title="Attendance" value="95%" color="text-blue-600" />
        <StatCard title="Class Rank" value="7th" color="text-purple-600" />
        <StatCard title="Assignments Due" value="3" color="text-red-600" />
      </div>

      {/* Progress Report */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Subject Performance */}
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <h2 className="text-lg font-bold">📚 Subject Performance</h2>
          <SubjectCard subject="Mathematics" Parent="Ms. Wilson" grade="A" percent={90} />
          <SubjectCard subject="Science" Parent="Mr. Brown" grade="A-" percent={85} />
          <SubjectCard subject="English" Parent="Mrs. Davis" grade="A" percent={88} />
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <h2 className="text-lg font-bold">📝 Recent Activity</h2>
          <ActivityCard title="Math Quiz Completed" desc="Score: 92/100 • Yesterday" status="bg-green-50" />
          <ActivityCard title="Science Assignment Submitted" desc="On time • 2 days ago" status="bg-blue-50" />
          <ActivityCard title="History Project Due" desc="Tomorrow • Not submitted" status="bg-red-50" />
        </div>
      </div>
    </div>
  );
};

export default ParentHome;
