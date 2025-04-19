import { useNavigate } from "react-router-dom";
import logo from "../../assets/wishchat-logo.png";
import { Link } from "react-router-dom";
import Profile from "../Navbar/Profile";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
const Navbar = () => {
  const navigate = useNavigate();
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
    flex w-full items-center justify-between px-4 duration-300 transition-colors`}
    >
      <div
        className="flex items-start justify-start"
        onClick={() => navigate("/")}
      >
        <img src={logo} className="h-28 w-28" />
      </div>

      <div className="hidden lg:flex items-center justify-center gap-12 py-3">
        <Link to="/">
          <button className="hover:text-blue-400">Home</button>
        </Link>
        <Link to="/dashboard">
          <button className="hover:text-blue-400">Dashboard</button>
        </Link>
        <Link to="/dashboard/teammates">
          <button className="hover:text-blue-400">Teammates</button>
        </Link>
        <Link to="/dashboard/pricing">
          <button className="hover:text-blue-400">Pricing</button>
        </Link>
      </div>

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
            className={`block absolute h-0.5 w-4  ${
              showNavbar ? "bg-white" : "bg-black"
            } transition-all duration-300 ease-in-out ${
              showNavbar ? "-rotate-45 top-3" : "top-4"
            }`}
          ></span>
        </button>
      </div>
      {/* <AnimatePresence> */}
      {showNavbar && (
        <motion.nav
          className="fixed z-50 top-32 left-0 w-full h-screen bg-white"
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -60 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="flex flex-col items-center pt-6 gap-6 text-xl ">
            <Link to="/" onClick={() => setShowNavbar(!showNavbar)}>
              <button className="hover:text-blue-400">Home</button>
            </Link>
            <Link to="/dashboard" onClick={() => setShowNavbar(!showNavbar)}>
              <button className="hover:text-blue-400">Dashboard</button>
            </Link>
            <Link
              to="/dashboard/teammates"
              onClick={() => setShowNavbar(!showNavbar)}
            >
              <button className="hover:text-blue-400">Teammates</button>
            </Link>
            <Link
              to="/dashboard/pricing"
              onClick={() => setShowNavbar(!showNavbar)}
            >
              <button className="hover:text-blue-400">Pricing</button>
            </Link>
          </div>
        </motion.nav>
      )}
      {/* </AnimatePresence> */}
    </nav>
  );
};

export default Navbar;
