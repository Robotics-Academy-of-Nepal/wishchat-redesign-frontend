import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../Navbar";

const ChatbotSettings = () => {
//   const navigate = useNavigate();
  const location = useLocation();
//   const isActive = (path) => location.pathname.includes(path);
  const { id, name, api_key, azure_index, messages_used } =
    location.state ?? {};
  console.log("Settings state:", location.state);
  const [prompt, setPrompt] = useState("");


  return (
    <div className="fixed inset-4 rounded-4xl flex flex-col overflow-auto bg-radial-[at_0%_0%] from-white from-20% to-indigo-300">
      <Navbar
        id={id}
        name={name}
        api_key={api_key}
        azure_index={azure_index}
        messages_used={messages_used}
      />
    
    </div>
  );
};

export default ChatbotSettings;
