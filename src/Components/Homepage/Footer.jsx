import { FaSquareInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { RiRobot3Line } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import { FiMapPin, FiPhone } from "react-icons/fi";
import logo from "../../assets/wishchat-logo.png";

const Footer = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-indigo-50">
      {/* Decorative elements */}
      <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-indigo-200 rounded-full opacity-10"></div>
      <div className="absolute top-1/2 -left-10 w-24 h-24 bg-blue-200 rounded-full opacity-10"></div>

      {/* Main footer content */}
      <div className="relative z-10 container mx-auto px-6">
        {/* Top wave divider */}
        <div className="w-full h-12 overflow-hidden relative -mb-1">
          <svg
            className="absolute bottom-0 w-full h-20 text-indigo-50"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>

        <div className="md:flex md:flex-row sm:flex-col sm:gap-12 justify-between py-12 border-t border-indigo-200">
          {/* Company Info */}
          <div className="flex flex-col gap-4 items-center md:items-start mb-12 md:mb-0 md:w-1/3">
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl p-3 shadow-md flex items-center justify-center">
                <img
                  src={logo}
                  className="h-[100px] w-[100px]"
                  alt="Wishchat Logo"
                />
              </div>

              <h1 className="text-gray-700 text-center md:text-left text-lg">
                Your go-to platform for seamless
                <br />
                communication.
              </h1>
            </div>

            <div className="flex gap-4 items-center justify-center md:justify-start w-full mt-2">
              <a
                href="#"
                className="text-indigo-600 hover:text-indigo-800 transition-colors duration-300 transform hover:scale-110"
              >
                <div className="bg-indigo-100 p-2 rounded-full">
                  <FaSquareInstagram className="text-2xl" />
                </div>
              </a>
              <a
                href="#"
                className="text-indigo-600 hover:text-indigo-800 transition-colors duration-300 transform hover:scale-110"
              >
                <div className="bg-indigo-100 p-2 rounded-full">
                  <FaFacebook className="text-2xl" />
                </div>
              </a>
              <a
                href="#"
                className="text-indigo-600 hover:text-indigo-800 transition-colors duration-300 transform hover:scale-110"
              >
                <div className="bg-indigo-100 p-2 rounded-full">
                  <CiLinkedin className="text-2xl" />
                </div>
              </a>
            </div>
          </div>

          {/* Useful Links and Contact */}
          <div className="flex flex-wrap justify-between gap-8 md:gap-16 md:w-2/3">
            {/* Useful Links */}
            <div className="flex flex-col">
              <h1 className="font-bold text-xl text-gray-800 mb-4 relative">
                Useful Links
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-indigo-500 rounded-full"></span>
              </h1>
              <div className="flex flex-col space-y-3 text-md">
                <a
                  href="#"
                  className="text-gray-600 hover:text-indigo-700 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-2 bg-indigo-500 rounded-full transition-all duration-300"></span>
                  <span>Home</span>
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-indigo-700 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-2 bg-indigo-500 rounded-full transition-all duration-300"></span>
                  <span>Chatbot</span>
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-indigo-700 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-2 bg-indigo-500 rounded-full transition-all duration-300"></span>
                  <span>Build</span>
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-indigo-700 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-2 bg-indigo-500 rounded-full transition-all duration-300"></span>
                  <span>Tutorials</span>
                </a>
              </div>
            </div>

            {/* Services */}
            <div className="flex flex-col">
              <h1 className="font-bold text-xl text-gray-800 mb-4 relative">
                Services
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-indigo-500 rounded-full"></span>
              </h1>
              <div className="flex flex-col space-y-3 text-md">
                <a
                  href="#"
                  className="text-gray-600 hover:text-indigo-700 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-2 bg-indigo-500 rounded-full transition-all duration-300"></span>
                  <span>Chatbot Development</span>
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-indigo-700 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-2 bg-indigo-500 rounded-full transition-all duration-300"></span>
                  <span>AI Integration</span>
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-indigo-700 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-2 bg-indigo-500 rounded-full transition-all duration-300"></span>
                  <span>Custom Solutions</span>
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-indigo-700 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-2 bg-indigo-500 rounded-full transition-all duration-300"></span>
                  <span>API Access</span>
                </a>
              </div>
            </div>

            {/* Get in Touch */}
            <div className="flex flex-col">
              <h1 className="font-bold text-xl text-gray-800 mb-4 relative">
                Get in Touch
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-indigo-500 rounded-full"></span>
              </h1>
              <div className="flex flex-col space-y-3 text-md">
                <a
                  href="#"
                  className="text-gray-600 hover:text-indigo-700 transition-colors flex items-center gap-2"
                >
                  <div className="bg-indigo-100 p-1.5 rounded-full">
                    <FiMapPin className="text-indigo-600" />
                  </div>
                  <span>Kupandol, Lalitpur</span>
                </a>
                <a
                  href="mailto:Wishchat@gmail.com"
                  className="text-gray-600 hover:text-indigo-700 transition-colors flex items-center gap-2"
                >
                  <div className="bg-indigo-100 p-1.5 rounded-full">
                    <HiOutlineMail className="text-indigo-600" />
                  </div>
                  <span>Wishchat@gmail.com</span>
                </a>
                <a
                  href="tel:123-456-789"
                  className="text-gray-600 hover:text-indigo-700 transition-colors flex items-center gap-2"
                >
                  <div className="bg-indigo-100 p-1.5 rounded-full">
                    <FiPhone className="text-indigo-600" />
                  </div>
                  <span>123-456-789</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-6 text-center border-t border-indigo-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <RiRobot3Line className="text-indigo-600 text-xl" />
              <p className="text-gray-600">
                © {new Date().getFullYear()} Wishchat. All rights reserved.
              </p>
            </div>

            <div className="flex gap-4 text-gray-600 text-sm">
              <a href="#" className="hover:text-indigo-700 transition-colors">
                Privacy Policy
              </a>
              <span>|</span>
              <a href="#" className="hover:text-indigo-700 transition-colors">
                Terms of Service
              </a>
              <span>|</span>
              <a href="#" className="hover:text-indigo-700 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
