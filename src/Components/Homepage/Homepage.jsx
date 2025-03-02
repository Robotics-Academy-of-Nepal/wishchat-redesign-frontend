import { useNavigate } from "react-router-dom";
import bg from "../../assets/Rectangle 8.png";
import logo from "../../assets/wishchat-logo.png";
import welcome from "../../assets/Group 17.png";
import text from "../../assets/text.png";
import text2 from "../../assets/text2.png";
import Footer from "../Footer";
import { RiRobot3Line } from "react-icons/ri";
import smart from "../../assets/smart.png";
import Navbar from "../Navbar";
export default function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-[70px]">
      {/* Hero Section */}

      <div className="mx-2 rounded-4xl flex flex-col gap-[20px] pb-[30px] bg-gradient-to-br from-white to-indigo-300 ">
        {/* Navigation Bar */}
        <Navbar />

        {/* Welcome and Text Images */}
        <div className="flex flex-col gap-8">
          <div className="flex justify-center items-center">
            <button>
              {/* <img src={welcome} /> */}
              <div className="flex items-center justify-center gap-6 border-2 border-black rounded-3xl w-[310px] font-bold text-lg text-gray-800 py-2">
                <RiRobot3Line className="text-xl" /> Welcome to Wishchat
              </div>
            </button>
          </div>
          {/* <div className="flex justify-center items-center text-center text-7xl">
            <button>
              <img src={text} />
            </button>
          </div> */}

          <div className="flex justify-center items-center text-center text-7xl font-medium">
            Elevate Conversations with
            <br /> smart AI
          </div>

          {/* <div className="flex justify-center items-center">
            <button>
              <img src={text2} />
            </button>
          </div> */}
          <div className="flex justify-center items-center font-normal text-center text-2xl">
            The power of AI -powered Chatbots t the click of your <br />
            mouse.
          </div>

          {/* Get Started Button */}
          <div className="flex justify-center items-center py-[30px]">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center justify-evenly bg-blue-500 text-white font-medium py-3 px-6 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300 w-58 text-xl"
            >
              <span>Get Started</span>
              <div className="ml-2 bg-white rounded-full w-6 h-6 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="flex justify-center font-semibold font- text-5xl text-center ">
        Smart chatbot solution <br />
        for interactions.
      </div>
      {/* <div className="flex justify-center items-center text-wrap text-5xl font-semibold">
        <img src={smart} className="h-auto" />
      </div> */}

      <div className="flex flex-col gap-[40px]">
        {/* Footer Section */}
        <div>
          <div className="border mx-28 mb-14 border-gray-700"></div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
