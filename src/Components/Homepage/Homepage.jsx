import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { RiRobot3Line } from "react-icons/ri";
import { LuArrowRight } from "react-icons/lu";
import Navbar from "./Navbar";
export default function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-[70px]">
      {/* Hero Section */}

      <div className="mx-2 rounded-4xl flex flex-col gap-[20px] pb-[30px] bg-gradient-to-br from-white to-indigo-300 ">
        {/* Navigation Bar */}
        <Navbar />

        {/* Welcome and Text Images */}
        <div className="flex flex-col gap-8 ">
          <div className="flex justify-center items-center mt-12">
            <button>
              <div className="flex items-center justify-center gap-6 border-2 border-black rounded-4xl w-[310px] font-semibold text-lg text-gray-800 py-2.5">
                <RiRobot3Line className="text-xl" /> Welcome to Wishchat
              </div>
            </button>
          </div>

          <div className="flex justify-center items-center text-center text-7xl font-medium">
            Elevate Conversations with
            <br /> smart AI
          </div>

          <div className="flex justify-center items-center font-normal text-center text-2xl">
            The power of AI -powered Chatbot the click of your <br />
            mouse.
          </div>

          {/* Get Started Button */}
          <div className="flex justify-center items-center py-[30px]">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center justify-evenly bg-blue-500 text-white shadow-md hover:bg-white hover:text-blue-500 transition-colors duration-700  w-[238.02px] h-[78.09px]  top-[556px] left-[574px] rounded-[48.16px] p-[20.94px] gap-[20.94px] group"
            >
              <span className="text-[25.13px] leading-[25.13px]">
                Get Started
              </span>
              <div className="bg-white rounded-full w-10 text-blue-500 group-hover:bg-blue-500 transition-colors duration-700 group-hover:text-white h-10 flex items-center justify-center">
                <LuArrowRight className="h-8 w-8" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="flex justify-center font-medium text-5xl text-center my-10">
        Smart chatbot solution <br />
        for interactions.
      </div>

      <div className="flex flex-col gap-[40px]">
        {/* Footer Section */}
        <div>
          <div className="border mb-14 border-gray-700"></div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
