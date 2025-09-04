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
      <section id="home" className=" relative z-20  w-full h-screen flex justify-center items-center bg-white text-gray-900 py-20 border-b">
        {/* Background Image with Overlay */}
        <div className="absolute z-10 inset-0 w-full h-full">
          <img
            src="https://media.istockphoto.com/id/1366797961/photo/interior-views-of-an-empty-japanese-style-classroom.jpg?b=1&s=170667a&w=0&k=20&c=9VXDSLlX2Y-TiuO8AKSLKaN0-TKYZ0CAZWj1dhAckkQ="
            alt="School CRM Illustration"
            className="object-cover w-full h-full"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-blue-950 bg-opacity-70"></div>
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left Content */}
          <div className=" text-white text-center">
            <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6">
              School CRM System
            </h1>
            <p className="text-base sm:text-lg text-gray-200 mb-6">
              A modern, scalable, and user-friendly school management platform built
              to simplify academic and administrative processes while fostering
              transparency and collaboration. The system provides role-based access
              tailored to Principals, Teachers, Students, and Parents, ensuring each
              user has the right tools at their fingertips.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/login"
                className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-primary transition"
              >
                🚀 Get Started
              </Link>
              <a
                href="/#features"
                className="border border-white text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-primary hover:border-primary transition"
              >
                👥 Explore Roles
              </a>
            </div>
          </div>
        </div>
      </section>



      {/* ⭐ Stats Section */}
      <section className=" relative z-20 bg-blue-50 py-14 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 grid-cols-2 gap-6 text-center">
          <StatCard number="50+" label="Schools Onboarded" />
          <StatCard number="500+" label="Teachers Registered" />
          <StatCard number="10,000+" label="Students Managed" />
          <StatCard number="15,000+" label="Parents Engaged" />
        </div>
      </section>

      <div className=" w-full relative z-20  bg-white py-14 sm:px-6 p-4">
        <section id="about" className=" sm:w-10/12 w-full mx-auto sm:flex gap-2 py-16 px-2  ">
          <div className="relative -z-10 top-10  ">
            {/* Circle 1 - Pink/Purple */}
            <div className="absolute w-40 h-40 top-[50px] left-[-50px] rounded-full bg-gradient-to-tr from-fuchsia-500 to-purple-400 opacity-50"></div>
            {/* Circle 2 - Cyan/Blue */}
            <div className="absolute w-40 h-40 top-[-50px] left-[50px] rounded-full bg-gradient-to-tr from-cyan-400 to-blue-400 opacity-50"></div>
            {/* Circle 3 - Purple/Blue */}
            <div className="absolute w-40 h-40 top-[-50px] left-[-50px] rounded-full bg-gradient-to-tr from-purple-500 to-indigo-400 opacity-50"></div>
          </div>

          <div className=" sm:w-1/2 w-full sm:p-4 mb-2 ">
            <h2 className="text-4xl font-bold mb-6 ">About Us</h2>
            <p className="max-w-3xl  text-gray-600 leading-relaxed text-justify">
              Welcome to <span className="font-semibold text-primary">Our School</span>,
              From its inception at the President’s Estate in 1941 as Church High School, through its transformation into Naveen Bharat School in 1947, and culminating in the establishment of DPS Mathura Road in 1949, the journey of DPS has been one of vision, growth, and revolutionising education in India. As India embarked on its journey of independence, The DPS Society emerged to fulfill the educational needs of a rapidly progressing nation . With its flagship school at DPS Mathura Road, followed by the establishment of DPS R.K. Puram in 1972, and now spanning the country with 222 schools, the DPS network continues to grow steadfastly in its commitment to serve the society.
            </p>
          </div>
          <div className=" sm:w-1/2 w-full mx-auto">
            <img src="https://www.yayskool.com/images/school/delhi-public-school-patiala-patiala-505721366.jpg" alt="" />
          </div>
        </section>
      </div>

      <section id="mission-vision-focus" className=" relative z-20  py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          {/* Section Title */}
          <h2 className="text-4xl font-bold  mb-4">Our Mission, Vision & Focus</h2>
          <p className="text-gray-600 max-w-4xl mx-auto mb-12">
            We are committed to creating a transformative school CRM that empowers
            educators, engages students, and connects parents through technology-driven
            solutions.
          </p>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission Card */}
            <div className="group relative bg-white rounded-2xl shadow-lg overflow-hidden p-8 transition duration-300 hover:scale-105 hover:shadow-xl hover:bg-primary">
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold text-primary mb-4 group-hover:text-white">
                  🎯 Mission
                </h3>
                <p className="text-gray-600 group-hover:text-gray-100">
                  To simplify academic and administrative workflows while promoting
                  collaboration between principals, teachers, students, and parents
                  through a seamless digital platform.
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="group relative bg-white rounded-2xl shadow-lg overflow-hidden p-8 transition duration-300 hover:scale-105 hover:shadow-xl hover:bg-green-600">
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold text-green-700 mb-4 group-hover:text-white">
                  🌍 Vision
                </h3>
                <p className="text-gray-600 group-hover:text-gray-100">
                  To revolutionize education management by building smart, scalable,
                  and inclusive systems that nurture transparency, efficiency, and
                  academic excellence for the future.
                </p>
              </div>
            </div>

            {/* Focus Card */}
            <div className="group relative bg-white rounded-2xl shadow-lg overflow-hidden p-8 transition duration-300 hover:scale-105 hover:shadow-xl hover:bg-purple-600">
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold text-purple-700 mb-4 group-hover:text-white">
                  🔍 Focus
                </h3>
                <p className="text-gray-600 group-hover:text-gray-100">
                  We focus on delivering user-friendly solutions, ensuring data security,
                  and creating meaningful insights that empower decision-making and
                  enhance the learning journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Features Section */}
      <section id="features" className=" relative z-20  py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center  mb-10">
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

      <section id="service" className=" relative z-20  py-16 bg-white">
        <h2 className="text-4xl font-bold text-center mb-10">Our Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          {services.map((s, ind) => (
            <div
              key={ind}
              className="bg-white border overflow-hidden shadow-sm hover:shadow-md transition relative group cursor-pointer"
            >
              {/* Image */}
              <div className="flex justify-center">
                <img
                  src={s.img}
                  alt={s.title}
                  className="object-cover w-full h-[200px] hover:scale-105 duration-200"
                />
              </div>

              {/* Text */}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-600 text-md">{s.desc}</p>
              </div>

              {/* Animated Bottom Border */}
              <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </div>

          ))}
        </div>
      </section>


      <section className=" relative z-20  py-16 bg-gray-50">
        <h2 className="text-4xl font-bold text-center mb-10">What Our Members Say</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition text-center">
              <FaUserTie className="text-primary text-5xl mx-auto mb-4" />
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

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d224220.84019214564!2d76.96519374847416!3d28.586255191619287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sDelhi%20school!5e0!3m2!1sen!2sin!4v1756968114851!5m2!1sen!2sin"
        width={"100%"}
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="relative z-20"
      ></iframe>

      {/* CTA Section */}
      <section className=" relative z-20 bg-primaryLight py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Transform Your School with Smart CRM
        </h2>
        <p className="max-w-2xl mx-auto mb-8 text-gray-500">
          Simple, powerful & accessible tools for teachers, parents, students,
          and principals. Start with the MVP today!
        </p>
        <button className="bg-white text-primary font-semibold px-8 py-3 rounded-lg shadow hover:bg-blue-50">
          Get Started
        </button>
      </section>

      {/* Newsletter Section */}
      <section id="contact" className=" w-full px-2 py-14 bg-primaryLight text-center relative overflow-hidden">

        <div className=" fixed -z-0 top-0 left-0 w-full h-full ">
          <img src="https://abandonedkansai.com/wp-content/uploads/2016/10/school-hallway-next-to-a-slope.jpg" alt="bannerimg" className=" w-full h-full object-cover" />
        </div>

        <div className=" relative z-10 max-w-2xl mx-auto bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold mb-4 text-primary">
            📬 Stay Updated with School CRM
          </h3>
          <p className="mb-6 text-gray-600">
            Subscribe to receive product updates and new features.
          </p>
          <form className="flex justify-center gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-lg border w-full focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="bg-primary text-white px-6 py-3 rounded-lg shadow hover:bg-primary">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
};

const FeatureCard = ({ image, title, desc }) => (
  <div className="bg-white border rounded-xl p-6 text-center shadow-sm hover:shadow-md transition overflow-hidden group">

    <div className="relative -z-0 top-10 group-hover:inset-5 inset-0 duration-200 ">
      {/* Circle 1 - Pink/Purple */}
      <div className="absolute w-20 h-20 top-[-50px] left-[-50px] rounded-full bg-gradient-to-tr from-fuchsia-500 to-purple-400 opacity-50"></div>
      {/* Circle 2 - Cyan/Blue */}
      <div className="absolute w-20 h-20 top-[-80px] left-[-10px] rounded-full bg-gradient-to-tr from-cyan-400 to-blue-400 opacity-50"></div>
      {/* Circle 3 - Purple/Blue */}
      <div className="absolute w-20 h-20 top-[-80px] left-[-50px] rounded-full bg-gradient-to-tr from-purple-500 to-indigo-400 opacity-50"></div>
    </div>

    <div className="mb-4 flex justify-center">
      <img
        src={image}
        alt={title}
        className="w-16 h-16 object-contain"
      />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{desc}</p>

    <div className="relative  -z-0 bottom-0 right-0 group-hover:inset-5 inset-0 duration-200 ">
      {/* Circle 1 - Pink/Purple */}
      <div className="absolute w-20 h-20 top-[-50px] right-[-50px] rounded-full bg-gradient-to-tr from-fuchsia-500 to-purple-400 opacity-50"></div>
      {/* Circle 2 - Cyan/Blue */}
      <div className="absolute w-20 h-20 top-[-30px] right-[-10px] rounded-full bg-gradient-to-tr from-cyan-400 to-blue-400 opacity-50"></div>
      {/* Circle 3 - Purple/Blue */}
      <div className="absolute w-20 h-20 top-[-80px] right-[-50px] rounded-full bg-gradient-to-tr from-purple-500 to-indigo-400 opacity-50"></div>
    </div>
  </div>
);

const StatCard = ({ number, label }) => (
  <div className="bg-white border rounded-xl shadow-sm p-6 hover:shadow-md transition">
    <h3 className="text-3xl font-bold text-primary">{number}</h3>
    <p className="text-gray-600 mt-2">{label}</p>
  </div>
);

export default HomePage;
