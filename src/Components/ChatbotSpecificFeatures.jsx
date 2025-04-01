import { useChatbot } from "../context/ChatbotContext";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const ChatbotSpecificFeatures = () => {
  const { chatbotData } = useChatbot();
  console.log("chatbotData:", chatbotData);

  return (
    <div className="fixed inset-4 rounded-4xl flex flex-col overflow-auto bg-radial-[at_0%_0%] from-white from-20% to-indigo-300">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default ChatbotSpecificFeatures;
