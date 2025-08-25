import React, { useState } from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
  FaRobot,
  FaArrowRight,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
} from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
// import logo from '../../../assets/logo.png';

const Footer = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeLink, setActiveLink] = useState(null);

  const solutions = [
    'Cloud Architecture',
    'Cybersecurity',
    'Data Analytics',
    'DevOps',
    'Blockchain',
    'AI Integration'
  ];

  const company = [
    'About Us',
    'Careers',
    'Case Studies',
    'Press',
    'Partners',
    'Contact'
  ];

  const resources = [
    'Blog',
    'Whitepapers',
    'Webinars',
    'Documentation',
    'Community',
    'Support'
  ];

  return (
    <div id="contact" className="bg-gray-900 text-white relative overflow-hidden">
      {/* Geometric background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-repeat bg-[length:40px_40px]" style={{ backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)' }}></div>
      </div>

      {/* Main footer content */}
      <footer className="pt-20 pb-12 px-6 md:px-10 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company info */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img src={'mmmsms.png'} alt="Logo" className="h-10 w-auto object-contain" />
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">Project name</span>
              </div>
              <p className="text-gray-400 mb-6">
                Empowering businesses with cutting-edge technical solutions through our global network of experts.
              </p>
              <div className="flex gap-5 mb-6">
                {[FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center cursor-pointer hover:bg-primary transition-all duration-300 group"
                  >
                    <Icon className="text-gray-400 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="font-bold text-lg text-white mb-6 pb-2 border-b border-gray-700">Solutions</h4>
              <ul className="space-y-3">
                {solutions.map((item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className={`flex items-center text-gray-400 hover:text-primary transition-colors ${activeLink === `sol-${index}` ? 'text-primary' : ''}`}
                      onMouseEnter={() => setActiveLink(`sol-${index}`)}
                      onMouseLeave={() => setActiveLink(null)}
                    >
                      <FaArrowRight className="mr-2 text-xs opacity-0 transition-opacity duration-200" style={{ opacity: activeLink === `sol-${index}` ? 1 : 0 }} />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company links */}
            <div>
              <h4 className="font-bold text-lg text-white mb-6 pb-2 border-b border-gray-700">Company</h4>
              <ul className="space-y-3">
                {company.map((item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className={`flex items-center text-gray-400 hover:text-primary transition-colors ${activeLink === `comp-${index}` ? 'text-primary' : ''}`}
                      onMouseEnter={() => setActiveLink(`comp-${index}`)}
                      onMouseLeave={() => setActiveLink(null)}
                    >
                      <FaArrowRight className="mr-2 text-xs opacity-0 transition-opacity duration-200" style={{ opacity: activeLink === `comp-${index}` ? 1 : 0 }} />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact info */}
            <div>
              <h4 className="font-bold text-lg text-white mb-6 pb-2 border-b border-gray-700">Contact Us</h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-primary mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-400">123 Tech Park, Silicon Valley, CA 94025</span>
                </div>
                <div className="flex items-center">
                  <FaPhoneAlt className="text-primary mr-3" />
                  <span className="text-gray-400">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <MdOutlineEmail className="text-primary text-xl mr-3" />
                  <span className="text-gray-400">contact@worklify.com</span>
                </div>
                <div className="flex items-center">
                  <FaClock className="text-primary mr-3" />
                  <span className="text-gray-400">Mon-Fri: 9AM - 6PM PST</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom footer */}
          <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Worklify Technologies. All rights reserved.
            </div>
            <div className="flex space-x-6 flex-wrap justify-center text-sm">
              {['Privacy Policy', 'Terms of Service', 'Security', 'GDPR'].map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-500 hover:text-primary transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* CTA floating button */}
        {/* <div className="fixed bottom-8 right-8 z-50">
          <button
            className="relative bg-gradient-to-r from-primary to-cyan-600 p-4 rounded-full shadow-2xl cursor-pointer hover:scale-105 transition-all duration-300 group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <FaRobot className="text-white text-2xl" />
            {isHovered && (
              <div className="absolute -top-12 -left-32 bg-gray-800 px-4 py-2 rounded-lg shadow-lg whitespace-nowrap text-sm">
                Need help? Chat with us!
                <div className="absolute -bottom-1 right-4 w-3 h-3 bg-gray-800 transform rotate-45"></div>
              </div>
            )}
          </button>
        </div> */}
      </footer>
    </div>
  );
};

export default Footer;