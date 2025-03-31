import { createContext } from "react";
import Navbar from "./Navbar copy";
const ChatbotSpecificFeatures = () => {
  const ChatBotContext = createContext({});
  return (
    <div className="fixed inset-4 rounded-4xl flex flex-col overflow-auto bg-radial-[at_0%_0%] from-white from-20% to-indigo-300">
      <Navbar
        // id={id}
        // name={name}
        // api_key={api_key}
        // azure_index={azure_index}
        // messages_used={messages_used}
      />
      ChatbotSpecificFeatures
    </div>
  );
};

export default ChatbotSpecificFeatures;
