import React from "react";
import {
  FaUsers,
  FaBook,
  FaChartLine,
  FaBus,
  FaClipboardList,
  FaCheckCircle,
  FaUserTie,
  FaStar,
} from "react-icons/fa";

import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const HomePage = () => {

  const services = [
    { title: "Quality Education", desc: "Smart classrooms and modern learning methods.", img: "https://www.the-report.com/site/assets/files/5710/a-new-plan-for-education-in-brazil_1.647x389.jpg" },
    { title: "Expert Teachers", desc: "Highly qualified and passionate educators.", img: "https://media.istockphoto.com/id/1401278253/photo/yes-you-tell-me-the-answer-to-my-question.webp?b=1&s=612x612&w=0&k=20&c=gIyaTCfI-fh4YwkVu0FdybJHcYyaxQsODkjElixDUCM=" },
    { title: "Cultural Activities", desc: "Opportunities to explore talents beyond academics.", img: "https://i.ytimg.com/vi/qHzvAT6ASqE/maxresdefault.jpg" },
    { title: "Sports & Fitness", desc: "Encouraging physical growth and teamwork.", img: "https://tse1.mm.bing.net/th/id/OIP.5PaVpZf5eqHitM6ednisbwHaE7?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" },
  ];

  const testimonials = [
    {
      name: "Ravi Sharma",
      role: "Parent",
      text: "The school has transformed my child’s confidence and learning ability.",
    },
    {
      name: "Sneha Patil",
      role: "Student",
      text: "Amazing teachers and great opportunities in academics & extracurriculars.",
    },
    {
      name: "Arjun Mehta",
      role: "Alumni",
      text: "This school shaped my future with discipline and knowledge.",
    },
  ];

  return (
    <>
      <Navbar />

      {/* 🌟 Hero Section */}
      <section id="home" className="bg-white text-gray-900 py-20 border-b">
        <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left Content */}
          <div className="lg:w-1/2">
            <h1 className="text-5xl font-bold leading-tight mb-6 text-blue-700">
              School CRM System
            </h1>
            <p className="text-sm text-gray-600 mb-6">
              A modern, scalable, and user-friendly school management platform built to simplify academic and administrative processes while fostering transparency and collaboration. The system provides role-based access tailored to Principals, Teachers, Students, and Parents, ensuring each user has the right tools at their fingertips.
            </p>
            <div className="flex gap-4">
              <Link
                to="/login"
                className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
              >
                🚀 Get Started
              </Link>
              <a
                href="#roles"
                className="border border-blue-600 text-blue-600 px-5 py-2 rounded-lg font-semibold shadow hover:bg-blue-50 transition"
              >
                👥 Explore Roles
              </a>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="lg:w-1/2 flex justify-center">
            <img
              src="https://www.matichon.co.th/wp-content/uploads/2022/11/02-192.jpg"
              alt="School CRM Illustration"
              className="w-96 lg:w-[28rem] rounded-2xl "
            />
          </div>
        </div>
      </section>

      <div className="w-full">
        {/* ⭐ Stats Section */}
        <section className="bg-blue-50 py-14 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 grid-cols-2 gap-6 text-center">
            <StatCard number="50+" label="Schools Onboarded" />
            <StatCard number="500+" label="Teachers Registered" />
            <StatCard number="10,000+" label="Students Managed" />
            <StatCard number="15,000+" label="Parents Engaged" />
          </div>
        </section>

        <section id="about" className="py-16 px-2 bg-gray-50 text-center">
          <h2 className="text-4xl font-bold mb-6">About Us</h2>
          <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed">
            Welcome to <span className="font-semibold text-indigo-600">Our School</span>,
            where education meets innovation. We focus on nurturing young minds with
            a perfect balance of academics, co-curricular activities, and real-world learning.
          </p>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 px-6 bg-white">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">
            Core Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FeatureCard
              image="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              title="Role-Based Access"
              desc="Secure dashboards for Principals, Teachers, Students & Parents."
            />

            <FeatureCard
              image="https://cdn-icons-png.flaticon.com/512/3135/3135673.png"
              title="Study Materials"
              desc="Teachers upload notes, PDFs & assignments. Students & parents access easily."
            />

            <FeatureCard
              image="https://cdn-icons-png.flaticon.com/512/3135/3135681.png"
              title="Attendance Management"
              desc="Mark daily attendance & notify parents instantly if absent."
            />

            <FeatureCard
              image="https://cdn-icons-png.flaticon.com/512/3135/3135698.png"
              title="Grades & Reports"
              desc="Simple report cards & progress tracking for students and parents."
            />

            <FeatureCard
              image="https://cdn-icons-png.flaticon.com/512/3135/3135712.png"
              title="Bus Tracking"
              desc="Parents view live bus location (manual/GPS updates)."
            />

            <FeatureCard
              image="https://cdn-icons-png.flaticon.com/512/3135/3135706.png"
              title="Parent Portal"
              desc="Announcements, child profile, materials, grades & attendance."
            />
          </div>
        </section>

        <section id="service" className="py-16 bg-white">
          <h2 className="text-4xl font-bold text-center mb-10">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
            {services.map((s, i) => (
              <div className="bg-white border  overflow-hidden shadow-sm hover:shadow-md transition">
                <div className=" flex justify-center">
                  <img
                    src={s.img}
                    alt={s.title}
                    className=" object-cover w-full h-[200px] hover:scale-105 duration-200"
                  />
                </div>
                
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{s.desc}</h3>
                <p className="text-gray-600 text-sm">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>


        <section className="py-16 bg-gray-50">
          <h2 className="text-4xl font-bold text-center mb-10">What Our Members Say</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition text-center">
                <FaUserTie className="text-indigo-600 text-5xl mx-auto mb-4" />
                <p className="text-gray-600 italic mb-4">“{t.text}”</p>
                <h4 className="text-lg font-semibold">{t.name}</h4>
                <p className="text-sm text-gray-500">{t.role}</p>
                <div className="flex justify-center mt-3 text-yellow-400">
                  {[...Array(5)].map((_, idx) => (
                    <FaStar key={idx} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-700 text-white py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Transform Your School with Smart CRM
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-blue-100">
            Simple, powerful & accessible tools for teachers, parents, students,
            and principals. Start with the MVP today!
          </p>
          <button className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg shadow hover:bg-blue-50">
            Get Started
          </button>
        </section>


        {/* Newsletter Section */}
        <section id="contact" className="py-14 bg-blue-50 text-center">
          <h3 className="text-2xl font-bold mb-4 text-blue-700">
            📬 Stay Updated with School CRM
          </h3>
          <p className="mb-6 text-gray-600">
            Subscribe to receive product updates and new features.
          </p>
          <form className="flex justify-center gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-lg border w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700">
              Subscribe
            </button>
          </form>
        </section>
      </div>

      <Footer />
    </>
  );
};




const FeatureCard = ({ image, title, desc }) => (
  <div className="bg-white border rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">
    <div className="mb-4 flex justify-center">
      <img
        src={image}
        alt={title}
        className="w-16 h-16 object-contain"
      />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </div>
);

const StatCard = ({ number, label }) => (
  <div className="bg-white border rounded-xl shadow-sm p-6 hover:shadow-md transition">
    <h3 className="text-3xl font-bold text-blue-700">{number}</h3>
    <p className="text-gray-600 mt-2">{label}</p>
  </div>
);

const StepCard = ({ step, title, desc }) => (
  <div className="p-6 bg-white border rounded-xl shadow-sm hover:shadow-md transition">
    <div className="text-4xl font-bold text-blue-600 mb-4">{step}</div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </div>
);

const TestimonialCard = ({ name, role, text }) => (
  <div className="bg-white border rounded-xl shadow p-6 hover:shadow-md transition">
    <p className="text-gray-600 italic mb-4">“{text}”</p>
    <h4 className="font-semibold text-lg text-gray-900">{name}</h4>
    <span className="text-sm text-gray-500">{role}</span>
  </div>
);

export default HomePage;
