import { useNavigate } from "react-router-dom";
import logo from "../../assets/wishchat-logo.png";
import { Link } from "react-router-dom";
import Profile from "../Navbar/Profile";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Hamburger from "../Navbar/Hamburger";
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
    flex w-full rounded-t-4xl items-center justify-between px-3 sm:px-4 duration-300 transition-colors`}
    >
      <div
        className="flex items-start justify-start"
        onClick={() => navigate("/")}
      >
        <img src={logo} className="h-24 w-24" />
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
        <Hamburger showNavbar={showNavbar} setShowNavbar={setShowNavbar} />
      </div>
      {/* <AnimatePresence> */}
      {showNavbar && (
        <motion.nav
          className="absolute z-50 top-24 left-0 w-full h-screen bg-white"
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
