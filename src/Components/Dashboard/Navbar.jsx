import { useNavigate } from "react-router-dom";
import logo from "../../assets/wishchat-logo.png";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false); // State to manage dropdown visibility
  const username = localStorage.getItem("FirstName");
  const email = localStorage.getItem("email");
  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible((prevState) => !prevState);
  };

  return (
    <nav className="flex w-full items-center sticky justify-between bg-inherit px-4">
      <div className="flex items-start justify-start">
        <img src={logo} className="h-28 w-28" />
      </div>

      <div className="flex items-center justify-center gap-12 py-3">
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

      {/* Profile button */}
      <button
        type="button"
        className="w-8 h-8 rounded-full cursor-pointer border flex items-center justify-center"
        onClick={toggleDropdown}
      >
        <FaUserAlt className="w-4 h-4" />
      </button>

      {/* Dropdown menu with framer-motion for smooth transition */}
      <AnimatePresence>
        {dropdownVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="z-10 absolute mt-40 right-4 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600"
          >
            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
              <div>{username}</div>
              <div className="font-medium truncate">{email}</div>
            </div>
            <div className="py-1">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                onClick={logOut}
              >
                Sign out
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
