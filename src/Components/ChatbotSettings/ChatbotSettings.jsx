import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import ChatbotDetail from "./ChatbotDetail";
import { useChatbot } from "../../context/ChatbotContext";

const ChatbotSettings = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname.includes(path);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navbarHeight = 144;
  const sidebarItems = [
    { name: "Chatbot Details", url: "/chatbotSettings/chatbot-details" },
    { name: "Analytics", url: "analytics" },
    { name: "Payment", url: "payment" },
  ];
  const { chatbotData } = useChatbot();
  return (
    <div
      className={`w-full flex`}
      style={{ minHeight: `calc(100vh - ${navbarHeight}px)` }}
    >
      {/* Sidebar */}
      <aside
        className={`flex flex-col bg-white shadow-lg transition-all duration-300 ease-in-out ${
          sidebarOpen
            ? "w-72 translate-x-0"
            : "w-0 overflow-hidden -translate-x-full"
        }`}
      >
        <nav className=" p-4">
          <ul className="space-y-2">
            <li
              onClick={() => setSidebarOpen(false)}
              className="cursor-pointer"
            >
              <FaBars />
            </li>
            {sidebarItems.map((item, index) => (
              <li key={index}>
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
          <div className="pl-4 pt-4">
            <button onClick={() => setSidebarOpen(true)}>
              <FaBars />
            </button>
          </div>
        )}
        {isActive("/analytics") || isActive("payment") ? (
          <Outlet context={{ chatbotData }} />
        ) : (
          <ChatbotDetail chatbotData={chatbotData} />
        )}
      </main>
    </div>
  );
};

export default ChatbotSettings;
