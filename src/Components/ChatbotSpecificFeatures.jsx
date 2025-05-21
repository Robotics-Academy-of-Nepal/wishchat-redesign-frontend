import { useChatbot } from "../context/ChatbotContext";
import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar/Navbar";

const ChatbotSpecificFeatures = () => {
  const { chatbotData, setChatbotData } = useChatbot();
  const navigate = useNavigate();
  // console.log("chatbotspecific trigerred");
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("chatbotData")) == null) {
      navigate("/dashboard");
    } else if (chatbotData.chatbot_id == null)
      setChatbotData(JSON.parse(localStorage.getItem("chatbotData")));
    // console.log(
    //   "parsedlocalstorage:",
    //   JSON.parse(localStorage.getItem("chatbotData"))
    // );
  }, []);
  return (
    <div className="relative min-h-screen m-4 rounded-4xl bg-radial-[at_0%_0%] from-white from-20% to-indigo-300">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default ChatbotSpecificFeatures;
