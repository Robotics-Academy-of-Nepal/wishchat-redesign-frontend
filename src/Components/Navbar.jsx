import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/wishchat-logo.png";
import { Link } from "react-router-dom";
import { useChatbot } from "../context/ChatbotContext";
import Profile from "./Navbar/Profile";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
const Navbar = () => {
  // console.log("navbar props:", id, name, api_key, azure_index, messages_used);
  const { chatbotData } = useChatbot();
  const { id, name, api_key, azure_index, messages_used } = chatbotData;
  const navigate = useNavigate();
  const location = useLocation();
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
    <div
      className={`${
        showNavbar && "bg-black/50"
      } flex items-center justify-between px-6 duration-500 transition-colors`}
    >
      {/* logo */}
      <div
        className="flex items-center justify-start h-full"
        onClick={() => navigate("/")}
      >
        <img src={logo} className="h-28 w-28" />
      </div>

      {/* navoptions */}
      <div className="lg:flex items-center justify-center gap-12 hidden">
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
          >
            <button className="hover:text-blue-400">Playground</button>
          </Link>
        ) : (
          <span className="cursor-not-allowed text-gray-500">Playground</span>
        )}
        {azure_index ? (
          <Link to="/deploy">
            <button className="hover:text-blue-400">Deploy</button>
          </Link>
        ) : (
          <span className="cursor-not-allowed text-gray-500">Deploy</span>
        )}
        <Link to="/build">
          <button className="hover:text-blue-400">Build</button>
        </Link>
        <Link to="/chatbotSettings/chatbot-details">
          <button className="hover:text-blue-400">Settings</button>
        </Link>
      </div>

      {/* navbar and hamburger */}
      <div className="flex items-center gap-2">
        <Profile />
        <button
          className="relative lg:hidden w-8 h-6 flex flex-col justify-center items-center"
          onClick={() => setShowNavbar(!showNavbar)}
        >
          <span
            className={`block absolute h-0.5 w-4 bg-black transition-all duration-300 ease-in-out ${
              showNavbar ? "rotate-45 top-3" : "top-2"
            }`}
          ></span>
          <span
            className={`block absolute h-0.5 w-4 bg-black transition-all duration-300 ease-in-out ${
              showNavbar ? "-rotate-45 top-3" : "top-4"
            }`}
          ></span>
        </button>
      </div>

      {showNavbar && (
        <motion.nav
          className="fixed z-50 top-32 left-0 w-full h-screen bg-white"
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex flex-col items-center pt-6 gap-6 text-xl">
            <Link to="/">
              <button className="hover:text-blue-400">Home</button>
            </Link>
            <Link to="/dashboard">
              <button className="hover:text-blue-400">Dashboard</button>
            </Link>
            {azure_index ? (
              <Link
                to={`${
                  location.pathname.includes("playground/chat") ||
                  messages_used > 0
                    ? "/playground/chat"
                    : "/playground"
                }`}
              >
                <button className="hover:text-blue-400">Playground</button>
              </Link>
            ) : (
              <span className="cursor-not-allowed text-gray-500">
                Playground
              </span>
            )}
            {azure_index ? (
              <Link to="/deploy">
                <button className="hover:text-blue-400">Deploy</button>
              </Link>
            ) : (
              <span className="cursor-not-allowed text-gray-500">Deploy</span>
            )}
            <Link to="/build">
              <button className="hover:text-blue-400">Build</button>
            </Link>
            <Link to="/chatbotSettings/chatbot-details">
              <button className="hover:text-blue-400">Settings</button>
            </Link>
          </div>
        </motion.nav>
      )}
    </div>
  );
};

export default Navbar;
