import React from 'react'

const TeacherMaterials = () => {
  return (
    <div>
    {/* Progress Report */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Subject Performance */}
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <h2 className="text-lg font-bold">📚 Subject Performance</h2>
          <SubjectCard subject="Mathematics" teacher="Ms. Wilson" grade="A" percent={90} />
          <SubjectCard subject="Science" teacher="Mr. Brown" grade="A-" percent={85} />
          <SubjectCard subject="English" teacher="Mrs. Davis" grade="A" percent={88} />
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
  )
}

export default TeacherMaterials
