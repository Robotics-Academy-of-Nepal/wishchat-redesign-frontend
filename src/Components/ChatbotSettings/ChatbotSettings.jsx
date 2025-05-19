import { Link, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import ChatbotDetail from "./ChatbotDetail";
import { useChatbot } from "../../context/ChatbotContext";

const ChatbotSettings = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname.includes(path);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navbarHeight = 144;
  const sidebarItems = [
    { name: "Chatbot Details", url: "/chatbotSettings/chatbot-details" },
    { name: "Analytics", url: "analytics" },
    { name: "Payment", url: "payment" },
  ];
  const { chatbotData } = useChatbot();
  // useEffect(() => {
  //   if (sidebarOpen) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }

  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, [sidebarOpen]);
  useEffect(() => {
    if (window.innerWidth > 770) setSidebarOpen(true);
  }, []);
  const closeAside = () => {
    if (window.innerWidth < 770) {
      setSidebarOpen(false);
    }
  };
  return (
    <div
      className={`w-full flex relative`}
      style={{ minHeight: `calc(100vh - ${navbarHeight}px)` }}
    >
      {/* Sidebar */}
      <aside
        className={`flex flex-col md:flex-shrink-0 bg-white shadow-lg transition-all duration-300 ease-in-out ${
          sidebarOpen
            ? "absolute inset-0 w-full md:w-64 md:relative translate-x-0 "
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
              <li key={index} className="hover:bg-slate-200">
                <Link
                  to={item.url}
                  className="flex items-center rounded-md px-3 py-2 md:text-sm font-medium text-gray-700 hover:text-gray-900 text-center justify-center md:justify-start text-2xl hover:font-semibold "
                  onClick={closeAside}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="transition-all duration-300 ease-in-out flex-grow flex flex-col md:flex-row">
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
