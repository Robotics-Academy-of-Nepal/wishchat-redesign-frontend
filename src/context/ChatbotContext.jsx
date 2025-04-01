import { useContext, createContext, useState } from "react";
const ChatbotContext = createContext();

// Provider component
export const ChatbotProvider = ({ children }) => {
  const [chatbotData, setChatbotData] = useState({
    chatbot_id: null,
    chatbot_name: "",
    api_key: "",
    azure_index: null,
    messages_used: 0,
  });

  return (
    <ChatbotContext.Provider value={{ chatbotData, setChatbotData }}>
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbot = () => {
  return useContext(ChatbotContext);
};
