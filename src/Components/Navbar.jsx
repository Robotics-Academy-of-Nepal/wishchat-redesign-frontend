import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/wishchat-logo.png";
// import logo from "../assets/wishchat-logo.png";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
const Navbar = ({ id, name, api_key, azure_index, messages_used }) => {
  console.log("navbar props:", id, name, api_key, azure_index, messages_used);
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const username = localStorage.getItem("username");
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
    <div className="flex items-center justify-between bg-inherit px-6">
      <div className="flex items-center justify-start h-full">
        <img src={logo} className="h-28 w-28" />
      </div>

      <div className="flex items-center justify-center gap-12 font-sans text-lg">
        <Link to="/">
          <button className="hover:text-blue-400">Home</button>
        </Link>
        <Link to="/dashboard">
          <button className="hover:text-blue-400">Dashboard</button>
        </Link>
        {azure_index ? (
          <Link
            to={`${
              location.pathname.includes("playground/chat") || messages_used > 0
                ? "/playground/chat"
                : "/playground"
            }`}
            state={{ id, name, api_key, azure_index, messages_used }}
          >
            <button className="hover:text-blue-400">Playground</button>
          </Link>
        ) : (
          <span className="cursor-not-allowed text-gray-500">Playground</span>
        )}
        <Link
          to="/deploy"
          state={{ id, name, api_key, azure_index, messages_used }}
        >
          <button className="hover:text-blue-400">Deploy</button>
        </Link>
        <Link
          to="/build"
          state={{ id, name, api_key, azure_index, messages_used }}
        >
          <button className="hover:text-blue-400">Build</button>
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
    </div>
  );
};

export default Navbar;
