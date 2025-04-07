import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";

const Profile = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const picture = localStorage.getItem("Picture");
  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };
  const toggleDropdown = () => {
    setDropdownVisible((prevState) => !prevState);
  };
  return (
    <>
      <button
        type="button"
        className="w-12 h-12 rounded-full overflow-hidden cursor-pointer border-2 border-blue-500 flex items-center justify-center "
        onClick={toggleDropdown}
      >
        {picture ? (
          <img src={picture}></img>
        ) : (
          <FaUserAlt className="w-6 h-6 text-blue-500" />
        )}
      </button>
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
    </>
  );
};

export default Profile;
