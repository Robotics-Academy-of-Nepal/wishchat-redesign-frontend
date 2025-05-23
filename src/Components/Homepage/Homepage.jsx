import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { RiRobot3Line } from "react-icons/ri";
import { LuArrowRight, LuSun, LuMoon } from "react-icons/lu";
import { FiStar, FiMessageCircle, FiGlobe } from "react-icons/fi";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";

export default function Homepage() {
  const navigate = useNavigate();
  const [animationStep, setAnimationStep] = useState(0);
  const [isNepali, setIsNepali] = useState(false);
  const [chatDarkMode, setChatDarkMode] = useState(false);

  // Animation for chat bubbles
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Check for system dark mode preference on initial load
  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setChatDarkMode(true);
    }
  }, []);

  // Language text mapping
  const text = {
    english: {
      greeting: "Hello! How can I assist you today?",
      userQuestion: "Can you help me find the latest product updates?",
      botResponse:
        "Of course! I've found the latest updates from May 2025. Would you like me to summarize them for you?",
      inputPlaceholder: "Type your message...",
      getStarted: "Get Started",
    },
    nepali: {
      greeting: "नमस्ते! म तपाईंलाई कसरी सहयोग गर्न सक्छु?",
      userQuestion:
        "के तपाईं मलाई नवीनतम उत्पादन अपडेटहरू फेला पार्न मद्दत गर्न सक्नुहुन्छ?",
      botResponse:
        "पक्कै! मैले मे २०२५ को नवीनतम अपडेटहरू फेला पारेको छु। के तपाईं चाहनुहुन्छ कि म तिनीहरूको सारांश प्रस्तुत गरूँ?",
      inputPlaceholder: "तपाईंको सन्देश टाइप गर्नुहोस्...",
      getStarted: "सुरु गर्नुहोस्",
    },
  };

  // Current language selection
  const currentLang = isNepali ? text.nepali : text.english;

  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden bg-gradient-to-b from-indigo-50 to-white">
      {/* Floating animated bubbles */}
      {/* <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className={`absolute rounded-full ${chatDarkMode ? 'bg-indigo-700 opacity-5' : 'bg-indigo-200 opacity-10'} animate-float`}
            style={{
              width: `${Math.random() * 80 + 40}px`,
              height: `${Math.random() * 80 + 40}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 15 + 10}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div> */}

      {/* Hero Section */}
      <div className="m-4 md:m-6 lg:m-8 rounded-3xl flex flex-col gap-6 pb-16 bg-gradient-to-br from-white via-indigo-100 to-indigo-300 shadow-xl overflow-hidden relative">
        {/* Decorative animated elements */}
        <div
          className={`absolute top-0 right-0 w-64 h-64 ${
            chatDarkMode ? "bg-indigo-600" : "bg-indigo-200"
          } rounded-full opacity-20 transform translate-x-20 -translate-y-20 animate-pulse`}
        ></div>
        <div
          className={`absolute bottom-0 left-0 w-40 h-40 ${
            chatDarkMode ? "bg-blue-700" : "bg-blue-300"
          } rounded-full opacity-20 transform -translate-x-10 translate-y-10 animate-pulse`}
          style={{ animationDuration: "4s" }}
        ></div>
        {/* <div
          className={`absolute top-1/2 left-0 w-32 h-32 ${
            chatDarkMode ? "bg-purple-700" : "bg-purple-200"
          } rounded-full opacity-10 transform -translate-x-10 animate-bounce`}
          style={{ animationDuration: "7s" }}
        ></div>
        <div
          className={`absolute bottom-1/4 right-0 w-24 h-24 ${
            chatDarkMode ? "bg-blue-600" : "bg-blue-100"
          } rounded-full opacity-20 transform translate-x-10 animate-bounce`}
          style={{ animationDuration: "5s" }}
        ></div> */}

        {/* Navigation Bar */}
        <Navbar />

        <div className="flex flex-col md:flex-row items-center px-4 md:px-12 lg:px-20">
          {/* Left side - Welcome and Text */}
          <div className="flex flex-col gap-8 z-10 lg:w-1/2">
            <div className="flex justify-center md:justify-start items-center mt-8"></div>

            <div className="flex justify-center md:justify-start items-center text-center md:text-left text-5xl sm:text-7xl font-bold bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent">
              Elevate Conversations with smart AI
            </div>

            <div className="flex justify-center md:justify-start items-center font-normal text-center md:text-left text-xl sm:text-2xl text-gray-700">
              The power of AI-powered Chatbot at the click of your mouse
            </div>

            {/* Features bullets */}
            <div className="flex justify-center md:justify-start mx-auto md:mx-0">
              <div className="flex gap-6 md:gap-8 text-sm md:text-base text-gray-700">
                <div className="flex items-center gap-2">
                  <FiStar className="text-indigo-500" /> Smart Responses
                </div>
                <div className="flex items-center gap-2">
                  <FiStar className="text-indigo-500" /> 24/7 Available
                </div>
                <div className="flex items-center gap-2">
                  <FiStar className="text-indigo-500" /> Personalized
                </div>
              </div>
            </div>

            {/* Get Started Button */}
            <div className="flex justify-center md:justify-start items-center pt-6 pb-12">
              <button
                onClick={() => navigate("/dashboard")}
                className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 w-64 h-16 rounded-full p-2 gap-4 group"
              >
                <span className="text-xl font-medium pl-8">
                  {currentLang.getStarted}
                </span>
                <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors duration-300">
                  <LuArrowRight className="h-5 w-5" />
                </div>
              </button>
            </div>
          </div>

          {/* Right side - Chatbot conversation visualization */}
          <div className="flex flex-col items-center justify-center z-10 md:w-1/2 mt-8 md:mt-0">
            <div
              className={`relative w-full max-w-md h-[450px] ${
                chatDarkMode
                  ? "bg-gray-800/90 border-gray-700"
                  : "bg-white/80 border-indigo-100"
              } backdrop-blur-md rounded-2xl shadow-lg p-6 border`}
            >
              {/* Mode and language toggle controls */}
              <div className="absolute -right-4 -top-4 flex gap-2">
                {/* Dark mode toggle */}
                <button
                  onClick={() => setChatDarkMode(!chatDarkMode)}
                  className={`${
                    chatDarkMode
                      ? "bg-gray-700 text-yellow-300"
                      : "bg-indigo-100 text-indigo-900"
                  } rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:scale-105 transition-transform`}
                >
                  {chatDarkMode ? (
                    <LuSun className="text-lg" />
                  ) : (
                    <LuMoon className="text-lg" />
                  )}
                </button>

                {/* Language toggle */}
                <button
                  onClick={() => setIsNepali(!isNepali)}
                  className={`${
                    chatDarkMode ? "bg-gray-700" : "bg-indigo-100"
                  } rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:scale-105 transition-transform`}
                >
                  <FiGlobe
                    className={`text-lg ${
                      chatDarkMode ? "text-blue-400" : "text-indigo-900"
                    }`}
                  />
                </button>
              </div>

              {/* Bot avatar */}
              <div className="absolute -left-4 -top-4 bg-indigo-600 rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                <RiRobot3Line className="text-2xl text-white" />
              </div>

              {/* WishChat logo */}
              <div className="flex items-center justify-center mb-6">
                <span className="text-lg font-semibold bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent">
                  WishChat
                </span>
              </div>

              {/* Chat bubbles */}
              <div className="flex flex-col gap-4 mt-6">
                {/* Bot message */}
                <div
                  className={`self-start ${
                    chatDarkMode
                      ? "bg-indigo-900/60 text-gray-100"
                      : "bg-indigo-100 text-gray-800"
                  } rounded-2xl rounded-tl-none p-3 max-w-xs transition-opacity duration-500 ${
                    animationStep >= 0 ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <p>{currentLang.greeting}</p>
                </div>

                {/* User message */}
                <div
                  className={`self-end ${
                    chatDarkMode
                      ? "bg-blue-900/60 text-gray-100"
                      : "bg-blue-100 text-gray-800"
                  } rounded-2xl rounded-tr-none p-3 max-w-xs transition-opacity duration-500 ${
                    animationStep >= 1 ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <p>{currentLang.userQuestion}</p>
                </div>

                {/* Bot response */}
                <div
                  className={`self-start ${
                    chatDarkMode
                      ? "bg-indigo-900/60 text-gray-100"
                      : "bg-indigo-100 text-gray-800"
                  } rounded-2xl rounded-tl-none p-3 max-w-xs transition-opacity duration-500 ${
                    animationStep >= 2 ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <p>{currentLang.botResponse}</p>
                </div>

                {/* Typing indicator */}
                <div
                  className={`self-end ${
                    chatDarkMode ? "bg-blue-900/60" : "bg-blue-100"
                  } rounded-2xl rounded-tr-none p-3 max-w-xs flex gap-1 transition-opacity duration-500 ${
                    animationStep === 0 ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div
                    className={`w-2 h-2 ${
                      chatDarkMode ? "bg-gray-300" : "bg-gray-500"
                    } rounded-full animate-bounce`}
                  ></div>
                  <div
                    className={`w-2 h-2 ${
                      chatDarkMode ? "bg-gray-300" : "bg-gray-500"
                    } rounded-full animate-bounce`}
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className={`w-2 h-2 ${
                      chatDarkMode ? "bg-gray-300" : "bg-gray-500"
                    } rounded-full animate-bounce`}
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>

              {/* Chat input mockup */}
              <div className="absolute bottom-4 left-4 right-4">
                <div
                  className={`flex items-center gap-2 ${
                    chatDarkMode ? "bg-gray-700" : "bg-gray-100"
                  } rounded-full p-2 pr-4`}
                >
                  <div
                    className={`${
                      chatDarkMode ? "bg-gray-600" : "bg-white"
                    } w-8 h-8 rounded-full flex items-center justify-center`}
                  >
                    <FiMessageCircle className="text-indigo-500" />
                  </div>
                  <div
                    className={`${
                      chatDarkMode ? "text-gray-400" : "text-gray-400"
                    } text-sm flex-grow`}
                  >
                    {currentLang.inputPlaceholder}
                  </div>
                  <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center transform rotate-45">
                    <LuArrowRight className="text-white text-sm" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="py-16 px-4 relative">
        <div className="flex flex-col items-center max-w-4xl mx-auto">
          <div className="w-24 h-1 bg-indigo-500 rounded-full mb-10"></div>
          <div className="font-bold text-4xl md:text-5xl text-center mb-8 bg-gradient-to-r from-indigo-800 to-blue-600 bg-clip-text text-transparent">
            Smart chatbot solution <br />
            for interactions.
          </div>
          <div className="text-lg text-gray-600 text-center max-w-2xl mb-12">
            Our AI-powered chatbot revolutionizes how you engage with your
            audience, providing intelligent responses in seconds.
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-4">
            <div className="bg-white shadow-md rounded-xl p-6 w-64 text-center transform transition-transform hover:scale-105 duration-300">
              <div className="text-4xl font-bold text-indigo-500">98%</div>
              <div className="text-gray-600 mt-2">Customer Satisfaction</div>
            </div>
            <div className="bg-white shadow-md rounded-xl p-6 w-64 text-center transform transition-transform hover:scale-105 duration-300">
              <div className="text-4xl font-bold text-indigo-500">24/7</div>
              <div className="text-gray-600 mt-2">Always Available</div>
            </div>
            <div className="bg-white shadow-md rounded-xl p-6 w-64 text-center transform transition-transform hover:scale-105 duration-300">
              <div className="text-4xl font-bold text-indigo-500">Fast</div>
              <div className="text-gray-600 mt-2">Response Time</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-auto">
        <Footer />
      </div>

      {/* Add required animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0) rotate(0);
          }
          33% {
            transform: translateY(-10px) translateX(10px) rotate(5deg);
          }
          66% {
            transform: translateY(10px) translateX(-10px) rotate(-5deg);
          }
          100% {
            transform: translateY(0) translateX(0) rotate(0);
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
}
