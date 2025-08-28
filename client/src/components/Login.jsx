import React, { useState } from "react";
import { FaUserTie } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { login, setError } from "../redux/authSlice";
// import { selectAuthError } from "../redux/authSlice";

// import { toast } from "sonner";
// import Navbar from "./Navbar";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);
  // const dispatch = useDispatch();

  const navigate = useNavigate();

  console.log(' user@gmail.com user123456 /n admin@cygen.com NewAdmin@123 /n subadmin@cygen.com SubAdmin@123 ');

  // ✅ Get error directly from Redux
  // const error = useSelector(selectAuthError);

  const Submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // dispatch(setError("")); // clear any previous error in Redux

    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/login`,
        { email, password: pwd },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log(response.data);
      // dispatch(login(response.data));

      const userRole = response.data.role;
      // toast.success("Login successful! Welcome to job portal");

      if (userRole === "consultant") {
        navigate("/consultant-dashboard");
      }
      if (userRole === "user") {
        navigate("/user-dashboard");
      }
      if (userRole === "admin") {
        navigate("/admin-dashboard");
      }
      if (userRole === "sub-admin") {
        navigate("/sub-admin-dashboard");
      }

    } catch (err) {
      const errMsg =
        err.response?.data?.message || "Server error. Please try later.";
      // dispatch(setError(errMsg));
    } finally {
      setLoading(false);
    }
  };

  return (

    <>
      {/* <Navbar /> */}
      <div className="min-h-screen  flex items-center justify-center sm:px-4">
        <div className="sm:max-w-md  w-full h-screen sm:h-fit bg-white dark:bg-[#0b1225] p-8 rounded-3xl shadow-2xl sm:my-4">
          <div className="flex flex-col items-center">

            <div className="border p-4 rounded-xl mb-2">
              <FaUserTie className="text-primary text-3xl" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-600 dark:text-white mb-1">
              Log In to Your Account
            </h2>
            <p className="text-sm text-gray-500 text-center">
              Access your expert consultations and resources
            </p>
          </div>

          {/* ✅ Error Message from Redux */}
          {/* {error && (
            <div className="mt-4 bg-red-100 text-red-700 text-sm p-3 rounded">
              {error}
            </div>
          )} */}

          <form className="mt-6" onSubmit={Submit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full rounded-3xl px-4 py-2 focus:outline-none focus:ring-2 border text-gray-500 border-gray-400 focus:ring-primary dark:text-white dark:bg-slate-500"
              />
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium text-gray-500">
                  Password
                </label>
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full rounded-3xl dark:text-white border border-gray-400 px-4 py-2 text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-500"
              />
            </div>

            <div className="flex items-center mb-4">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-sm text-gray-500">
                Remember me
              </label>
            </div>

            {/* ✅ Loading State */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-3xl font-medium transition-colors ${loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary text-white hover:bg-primary"
                }`}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="text-sm my-2 text-gray-500">
            You don't have an account?{" "}
            <Link
              to={"/role-selection"}
              className="text-blue-500 underline hover:text-blue-600 cursor-pointer"
            >
              SignUp
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
