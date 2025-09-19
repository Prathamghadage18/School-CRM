import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./config/ProtectedRoute";
import { Toaster } from "sonner";
import Loading from "./components/ui/Loading";

// Lazy load components
const Home = lazy(() => import("./components/Home"));
const Login = lazy(() => import("./components/Login"));
const Dashboard = lazy(() => import("./admin/Dashboard"));
const StudentDashboard = lazy(() => import("./Student/StudentDashboard"));
const TeacherDashboard = lazy(() => import("./Teacher/TeacherDashboard"));
const ParentDashboard = lazy(() => import("./Parent/ParentDashboard"));
const PrincipleDashboard = lazy(() => import("./Principle/PrincipleDashboard"));
// const SignupRoleSelection = lazy(() => import("./components/RoleSelection"));
// const StudentRegistrationForm = lazy(() => import("./components/StudentRegistrationForm"));

const App = () => {
  return (
    <>
      <Toaster position="top-right" richColors />

      {/* Suspense wrapper for fallback loading */}
      <Suspense fallback={<Loading/>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin-dashboard/*" element={<Dashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
            <Route path="/student-dashboard/*" element={<StudentDashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
            <Route path="/teacher-dashboard/*" element={<TeacherDashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["parent"]} />}>
            <Route path="/parent-dashboard/*" element={<ParentDashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["principal"]} />}>
            <Route
              path="/principal-dashboard/*"
              element={<PrincipleDashboard />}
            />
          </Route>

          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
