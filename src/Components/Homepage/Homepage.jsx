import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { RiRobot3Line } from "react-icons/ri";
import { LuArrowRight } from "react-icons/lu";
import { FiStar, FiMessageCircle } from "react-icons/fi";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";

export default function Homepage() {
  const navigate = useNavigate();
  const [animationStep, setAnimationStep] = useState(0);
  
  // Animation for chat bubbles
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col bg-gradient-to-b from-indigo-50 to-white min-h-screen overflow-hidden">
      {/* Floating animated bubbles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-indigo-200 opacity-10 animate-float"
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
      </div>
      
      {/* Hero Section */}
      <div className="m-4 md:m-6 lg:m-8 rounded-3xl flex flex-col gap-6 pb-16 bg-gradient-to-br from-white via-indigo-100 to-indigo-300 shadow-xl overflow-hidden relative">
        {/* Decorative animated elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-200 rounded-full opacity-20 transform translate-x-20 -translate-y-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-300 rounded-full opacity-20 transform -translate-x-10 translate-y-10 animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute top-1/2 left-0 w-32 h-32 bg-purple-200 rounded-full opacity-10 transform -translate-x-10 animate-bounce" style={{ animationDuration: '7s' }}></div>
        <div className="absolute bottom-1/4 right-0 w-24 h-24 bg-blue-100 rounded-full opacity-20 transform translate-x-10 animate-bounce" style={{ animationDuration: '5s' }}></div>
        
        {/* Navigation Bar */}
        <Navbar />
        
        <div className="flex flex-col md:flex-row items-center px-4 md:px-12 lg:px-20">
          {/* Left side - Welcome and Text */}
          <div className="flex flex-col gap-8 z-10 md:w-1/2">
            {/* <div className="flex justify-center md:justify-start items-center mt-16">
              <button className="transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-center gap-4 border-2 border-indigo-500 rounded-full w-[280px] font-semibold text-md text-indigo-800 py-3 bg-white/80 backdrop-blur-sm shadow-md">
                  <RiRobot3Line className="text-xl text-indigo-600" /> Welcome to Wishchat
                </div>
              </button>
            </div> */}
            
            <div className="flex justify-center md:justify-start items-center text-center md:text-left text-5xl sm:text-7xl font-bold bg-gradient-to-r from-indigo-800 to-blue-600 bg-clip-text text-transparent">
              Elevate Conversations with
              <br /> smart AI
            </div>
            
            <div className="flex justify-center md:justify-start items-center font-normal text-center md:text-left text-xl sm:text-2xl text-gray-700">
              The power of AI-powered Chatbot at the click of your <br className="hidden md:block" />
              mouse.
            </div>
            
            {/* Features bullets */}
            <div className="flex justify-center md:justify-start mx-auto md:mx-0">
              <div className="flex gap-6 md:gap-8 text-sm md:text-base text-gray-700">
                <div className="flex items-center gap-2">
                  <FiStar className="text-indigo-600" /> Smart Responses
                </div>
                <div className="flex items-center gap-2">
                  <FiStar className="text-indigo-600" /> 24/7 Available
                </div>
                <div className="flex items-center gap-2">
                  <FiStar className="text-indigo-600" /> Personalized
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
                  Get Started
                </span>
                <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors duration-300">
                  <LuArrowRight className="h-5 w-5" />
                </div>
              </button>
            </div>
          </div>
          
          {/* Right side - Chatbot conversation visualization */}
          <div className="hidden md:flex flex-col items-center justify-center z-10 md:w-1/2 mt-8 md:mt-0">
            <div className="relative w-full max-w-md h-[450px] bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-indigo-100">
              {/* Bot avatar */}
              <div className="absolute -left-4 -top-4 bg-indigo-600 rounded-full w-12 h-12 flex items-center justify-center">
                <RiRobot3Line className="text-2xl text-white" />
              </div>
              
              {/* User avatar */}
              <div className="absolute -right-4 -top-4 bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center">
                <FiMessageCircle className="text-2xl text-white" />
              </div>
              
              {/* Chat bubbles */}
              <div className="flex flex-col gap-4 mt-6">
                {/* Bot message */}
                <div className={`self-start bg-indigo-100 rounded-2xl rounded-tl-none p-3 max-w-xs transition-opacity duration-500 ${animationStep >= 0 ? 'opacity-100' : 'opacity-0'}`}>
                  <p className="text-gray-800">Hello! How can I assist you today?</p>
                </div>
                
                {/* User message */}
                <div className={`self-end bg-blue-100 rounded-2xl rounded-tr-none p-3 max-w-xs transition-opacity duration-500 ${animationStep >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                  <p className="text-gray-800">Can you help me find the latest product updates?</p>
                </div>
                
                {/* Bot response */}
                <div className={`self-start bg-indigo-100 rounded-2xl rounded-tl-none p-3 max-w-xs transition-opacity duration-500 ${animationStep >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                  <p className="text-gray-800">Of course! I've found the latest updates from May 2025. Would you like me to summarize them for you?</p>
                </div>
                
                {/* Typing indicator */}
                <div className={`self-end bg-blue-100 rounded-2xl rounded-tr-none p-3 max-w-xs flex gap-1 transition-opacity duration-500 ${animationStep === 0 ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
              
              {/* Chat input mockup */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 bg-gray-100 rounded-full p-2 pr-4">
                  <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center">
                    <FiMessageCircle className="text-indigo-600" />
                  </div>
                  <div className="text-gray-400 text-sm flex-grow">Type your message...</div>
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
            Our AI-powered chatbot revolutionizes how you engage with your audience, providing intelligent responses in seconds.
          </div>
          
          {/* Conversation flow visualization */}
          <div className="w-full max-w-3xl flex justify-between items-center mb-16">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-2">
                <FiMessageCircle className="text-2xl text-indigo-600" />
              </div>
              <p className="text-gray-700 font-medium">User Query</p>
            </div>
            
            <div className="flex-grow mx-4 h-1 bg-gradient-to-r from-indigo-300 to-blue-300 relative">
              <div className="absolute -top-2 left-0 right-0 flex justify-center">
                <div className="w-4 h-4 bg-white border-2 border-indigo-300 rounded-full animate-pulse"></div>
              </div>
              <div className="absolute -top-2 left-1/3 right-0 flex justify-center">
                <div className="w-4 h-4 bg-white border-2 border-indigo-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              </div>
              <div className="absolute -top-2 left-2/3 right-0 flex justify-center">
                <div className="w-4 h-4 bg-white border-2 border-indigo-500 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <RiRobot3Line className="text-2xl text-blue-600" />
              </div>
              <p className="text-gray-700 font-medium">Smart Response</p>
            </div>
          </div>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-4">
            <div className="bg-white shadow-md rounded-xl p-6 w-64 text-center transform transition-transform hover:scale-105 duration-300">
              <div className="text-4xl font-bold text-indigo-600">98%</div>
              <div className="text-gray-600 mt-2">Customer Satisfaction</div>
            </div>
            <div className="bg-white shadow-md rounded-xl p-6 w-64 text-center transform transition-transform hover:scale-105 duration-300">
              <div className="text-4xl font-bold text-indigo-600">24/7</div>
              <div className="text-gray-600 mt-2">Always Available</div>
            </div>
            <div className="bg-white shadow-md rounded-xl p-6 w-64 text-center transform transition-transform hover:scale-105 duration-300">
              <div className="text-4xl font-bold text-indigo-600">Fast</div>
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