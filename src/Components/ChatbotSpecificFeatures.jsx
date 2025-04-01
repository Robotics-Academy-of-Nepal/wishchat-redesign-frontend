import { useChatbot } from "../context/ChatbotContext";
import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";

const ChatbotSpecificFeatures = () => {
  const { chatbotData, setChatbotData } = useChatbot();
  const navigate = useNavigate();
  // console.log("chatbotspecific trigerred");
  useEffect(() => {
    if (chatbotData.chatbot_id == null) {
      setChatbotData(JSON.parse(localStorage.getItem("chatbotData")));
    }

    // console.log("after setting localstorage:", chatbotData);
    // if (
    //   JSON.stringify(chatbotData) ==
    //   JSON.stringify({
    //     chatbot_id: null,
    //     chatbot_name: "",
    //     api_key: "",
    //     azure_index: null,
    //     messages_used: 0,
    //   })
    // ) {
    //   navigate("/dashboard");
    // }
  }, []);
  return (
    <div className="fixed inset-4 rounded-4xl flex flex-col overflow-auto bg-radial-[at_0%_0%] from-white from-20% to-indigo-300">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default ChatbotSpecificFeatures;
