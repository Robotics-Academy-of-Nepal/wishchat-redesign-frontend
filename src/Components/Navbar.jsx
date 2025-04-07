import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/wishchat-logo.png";
import { Link } from "react-router-dom";
import { useChatbot } from "../context/ChatbotContext";
import Profile from "./Navbar/Profile";
const Navbar = () => {
  // console.log("navbar props:", id, name, api_key, azure_index, messages_used);
  const { chatbotData } = useChatbot();
  const { id, name, api_key, azure_index, messages_used } = chatbotData;
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex items-center justify-between bg-inherit px-6">
      <div
        className="flex items-center justify-start h-full"
        onClick={() => navigate("/")}
      >
        <img src={logo} className="h-28 w-28" />
      </div>

      <div className="flex items-center justify-center gap-12">
        <Link to="/">
          <button className="hover:text-blue-400">Home</button>
        </Link>
        <Link to="/dashboard">
          <button className="hover:text-blue-400">Dashboard</button>
        </Link>
        {azure_index ? (
          <Link
            to={`${
              location.pathname.includes("playground/chat") || messages_used > 0
                ? "/playground/chat"
                : "/playground"
            }`}
          >
            <button className="hover:text-blue-400">Playground</button>
          </Link>
        ) : (
          <span className="cursor-not-allowed text-gray-500">Playground</span>
        )}
        {azure_index ? (
          <Link to="/deploy">
            <button className="hover:text-blue-400">Deploy</button>
          </Link>
        ) : (
          <span className="cursor-not-allowed text-gray-500">Deploy</span>
        )}
        <Link to="/build">
          <button className="hover:text-blue-400">Build</button>
        </Link>
        <Link to="/chatbotSettings/chatbot-details">
          <button className="hover:text-blue-400">Settings</button>
        </Link>
      </div>

      <Profile />
    </div>
  );
};

export default Navbar;
