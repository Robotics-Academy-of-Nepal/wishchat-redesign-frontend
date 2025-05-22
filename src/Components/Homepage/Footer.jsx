import { FaSquareInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { RiRobot3Line } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import { FiMapPin, FiPhone } from "react-icons/fi";
import logo from "../../assets/footer-logo.png";

const Footer = () => {
  const handleSubmit = (e) => {
    console.log("submit clicked");
    e.preventDefault();
    const email = e.target.email.value;
    const message = e.target.message.value;
    const subject = e.target.subject.value;

    // Basic validation
    if (!email) {
      alert("Please fill in all fields");
      return;
    }

    // Create mailto link with both name and email
    window.location.href = `mailto:info@goodwish.com?subject=${subject}&body=${encodeURIComponent(
      message
    )}`;

    // alert("Thank you for your message! We will get back to you soon.");
    e.target.reset();
  };

  return (
    <>
      <div className="relative overflow-hidden bg-gradient-to-b from-white to-indigo-50">
        {/* Decorative elements */}
        <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-indigo-200 rounded-full opacity-10"></div>
        <div className="absolute top-1/2 -left-10 w-24 h-24 bg-blue-200 rounded-full opacity-10"></div>

        {/* Main footer content */}
        <div 
        // className="bg-blue-200"
        >
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

          <div className="px-4 md:px-6 lg:px-10 md:flex md:flex-row sm:flex-col justify-between py-12">
            {/* Company Info */}
            <div className="flex flex-col gap-4 items-center md:items-start mb-12 md:mb-0 md:w-1/3">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-start">
                  <img
                    src={logo}
                    className="h-[80px] w-[80px]"
                    alt="Wishchat Logo"
                  />
                </div>

                <h1 className="text-gray-700 text-center md:text-left ">
                  Your go-to platform for seamless
                  <br />
                  communication.
                </h1>
              </div>
            </div>

            {/* Useful Links and Contact */}
            <div className="grid sm:grid-cols-2 justify-between gap-8 md:gap-12 md:w-2/3">
              {/* Useful Links */}
              <div className="flex flex-col">
                <h1 className="font-bold text-xl text-gray-800 mb-4 relative">
                  Useful Links
                  <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-indigo-500 rounded-full"></span>
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

              {/* contact us form */}
              <div className="flex flex-col">
                <h1 className="font-bold text-xl text-gray-800 mb-4 relative">
                  Contact Us
                  <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-indigo-500 rounded-full"></span>
                </h1>
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-2">

                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    required
                  />
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    required
                  />
                  </div>
                  <input
                    type="text"
                    name="message"
                    placeholder="Your Message here"
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors w-fit"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 md:px-6 lg:px-8 py-6 text-center border-t border-indigo-200">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <p className="text-gray-600">
              © {new Date().getFullYear()} Goodwish Engineering. All rights
              reserved.
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
