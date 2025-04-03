import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { useChatbot } from "../../context/ChatbotContext";
import ChatbotDetail from "./ChatbotDetail";

const ChatbotSettings = () => {
  const isActive = (path) => location.pathname.includes(path);
  const { chatbotData } = useChatbot();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navbarHeight = "64px";
  const sidebarItems = [
    { name: "Chatbot Details", url: "/chatbotSettings" },
    { name: "Analytics", url: "analytics" },
    { name: "Payment", url: "payment" },
  ];
  return (
    <div className="w-full flex" style={{ top: navbarHeight }}>
      {/* Sidebar */}
      <aside
        className={`flex flex-col bg-white shadow-lg transition-all duration-300 ease-in-out ${
          sidebarOpen
            ? "w-72 translate-x-0"
            : "w-0 overflow-hidden -translate-x-full"
        }`}
      >
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {/* Close Sidebar Button */}
            <li
              onClick={() => setSidebarOpen(false)}
              className="cursor-pointer"
            >
              <FaBars />
            </li>
            {sidebarItems.map((item) => (
              <li key={item}>
                <Link
                  to={item.url}
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="transition-all duration-300 ease-in-out flex-grow flex">
        {!sidebarOpen && (
          <div className="pl-4 pt-4 h-full flex items-start">
            <button onClick={() => setSidebarOpen(true)}>
              <FaBars />
            </button>
          </div>
        )}
        {isActive("/chatbotSettings") ? <ChatbotDetail /> : <Outlet />}
      </main>
    </div>
  );
};

export default ChatbotSettings;
