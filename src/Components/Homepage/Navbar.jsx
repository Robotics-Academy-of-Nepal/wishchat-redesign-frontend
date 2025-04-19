import { useNavigate } from "react-router-dom";
import logo from "../../assets/wishchat-logo.png";
import { LuArrowRight } from "react-icons/lu";
import Profile from "../Navbar/Profile";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [showNavbar, setShowNavbar] = useState(false);
  useEffect(() => {
    if (showNavbar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showNavbar]);
  return (
    <nav
      className={`
    ${showNavbar && "bg-black/50"}
    flex items-center justify-between px-3 sm:px-6 duration-300 transition-colors`}
    >
      <div className="flex items-start justify-start h-full">
        <img src={logo} className="h-28 w-28" />
      </div>

      <div className="hidden lg:flex items-center justify-center gap-12 text-lg">
        <button className="hover:text-blue-400">Home</button>
        {/* <button className="hover:text-blue-400">Features</button>
        <button className="hover:text-blue-400">Tutorials</button> */}
        <button className="text-gray-400">Features</button>
        <button className="text-gray-400">Tutorials</button>
        <button
          className="hover:text-blue-400"
          onClick={() => navigate("/dashboard/pricing")}
        >
          Pricing
        </button>
      </div>
      {token ? (
        <div className="flex items-center gap-2">
          <Profile />
          <button
            className="relative lg:hidden w-8 h-6 flex flex-col justify-center items-center"
            onClick={() => setShowNavbar(!showNavbar)}
          >
            <span
              className={`block absolute h-0.5 w-4 ${
                showNavbar ? "bg-white" : "bg-black"
              } transition-all duration-300 ease-in-out ${
                showNavbar ? "rotate-45 top-3" : "top-2"
              }`}
            ></span>
            <span
              className={`block absolute h-0.5 w-4 ${
                showNavbar ? "bg-white" : "bg-black"
              } transition-all duration-300 ease-in-out ${
                showNavbar ? "-rotate-45 top-3" : "top-4"
              }`}
            ></span>
          </button>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center justify-center bg-white text-black hover:bg-blue-500 hover:text-white rounded-full shadow-md transition-colors duration-700 px-4 py-1.5 font-light text-sm group"
        >
          <span>Sign Up</span>
          <div className="ml-2 bg-blue-500 text-white group-hover:bg-white group-hover:text-blue-500 duration-700 transition-colors rounded-full w-6 h-6 flex items-center justify-center">
            <LuArrowRight />
          </div>
        </button>
      )}
      {/* <AnimatePresence> */}
      {showNavbar && (
        <motion.nav
          className="fixed z-50 top-32 left-0 w-full h-screen bg-white"
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -60 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="flex flex-col items-center pl-10 pt-6 gap-6 text-xl ">
            <button className="hover:text-blue-400 ">
              Home
            </button>
            {/* <button  className="hover:text-blue-400">Features</button>
            <button  className="hover:text-blue-400">Tutorials</button> */}
            <button className="text-gray-400 ">
              Features
            </button>
            <button className="text-gray-400 ">
              Tutorials
            </button>
            <button
              className="hover:text-blue-400 "
              onClick={() => navigate("/dashboard/pricing")}
            >
              Pricing
            </button>
          </div>
        </motion.nav>
      )}
      {/* </AnimatePresence> */}
    </nav>
  );
};

export default Navbar;
