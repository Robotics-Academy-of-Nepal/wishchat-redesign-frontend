import { useChatbot } from "../context/ChatbotContext";
import { Outlet, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar/Navbar";

const ChatbotSpecificFeatures = () => {
  const { chatbotData, setChatbotData } = useChatbot();

  useEffect(() => {
    // if the user already navigated to the ChatbotSpecificFeatures then it'll not parse the localstorage and show previous detail
    if (chatbotData.chatbot_id == null)
      setChatbotData(JSON.parse(localStorage.getItem("chatbotData")));
    console.log(
      "parsedlocalstorage:",
      JSON.parse(localStorage.getItem("chatbotData"))
    );
  }, []);


  return JSON.parse(localStorage.getItem("chatbotData")) == null ? (
    <Navigate to="/dashboard" />
  ) : (
    <div className="relative min-h-screen m-4 rounded-4xl bg-radial-[at_0%_0%] from-white from-20% to-indigo-300">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default ChatbotSpecificFeatures;
