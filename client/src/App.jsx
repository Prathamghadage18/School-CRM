import React from 'react'
import Home from './components/Home'
import Login from './components/Login'
import ProtectedRoute from './config/ProtectedRoute'
import Dashboard from './admin/Dashboard'
import StudentDashboard from './Student/StudentDashboard'
import TeacherDashboard from './Teacher/TeacherDashboard'
import ParentDashboard from './Parent/ParentDashboard'
import PrincipleDashboard from './Principle/PrincipleDashboard'
import { Routes, Route } from 'react-router-dom'
// import SignupRoleSelection from './components/RoleSelection'
// import StudentRegistrationForm from './components/StudentRegistrationForm'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        {/* <Route path='/role-selection' element={<SignupRoleSelection />} /> */}
        {/* <Route path='/student' element={<StudentRegistrationForm />} /> */}

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path='/admin-dashboard/*' element={<Dashboard />} />
        </Route>

        {/* <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
          <Route path='/student-dashboard/*' element={<StudentDashboard />} />
        </Route> */}

        <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
          <Route path='/teacher-dashboard/*' element={<TeacherDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["parent"]} />}>
          <Route path='/parent-dashboard/*' element={<ParentDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["principle"]} />}>
          <Route path='/principle-dashboard/*' element={<PrincipleDashboard />} />
        </Route>
        
        <Route path='*' element={<h1>Page Not Found</h1>} />
      </Routes>

    </>
  )
}

export default App
