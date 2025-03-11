import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import bg from "../../assets/dashboard.png";
import logo from "../../assets/wishchat-logo.png";
import NewChatbotForm from "./NewChatbotForm";
import { motion } from "framer-motion";
import Loading from "../Loading";
const API_URL = "https://kfwsdw58-8000.inc1.devtunnels.ms/auth/chatbots/";

// ChatbotCard component
const ChatbotCard = ({ id, name, api_key, azure_index, messages_used }) => {
  const navigate = useNavigate();
  console.log("dashboard destructure:", id, name, api_key, azure_index);
  const handleNavigate = () => {
    if (azure_index) {
      if (messages_used > 0) {
        navigate("/playground/chat", {
          state: { id, name, api_key, azure_index, prompt: "" },
        });
      } else {
        navigate("/playground", { state: { id, name, api_key, azure_index } });
      }
    } else {
      navigate("/build", { state: { id, name, azure_index } });
    }
  };
  return (
    <div
      className="flex flex-col items-center hover:scale-105 transiition duration-75 overflow-hidden h-80"
      onClick={handleNavigate}
    >
      <div
        className="h-[270px] w-full flex justify-center items-center overflow-hidden rounded-3xl relative transition-shadow duration-300 cursor-pointer"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <img
          src={logo}
          className="h-[120px] w-[120px] z-10"
          alt="Chatbot Logo"
        />
      </div>
      <h2 className="font-semibold text-lg mt-2">{name}</h2>
    </div>
  );
};

// Main Dashboard Component
export default function Dashboard() {
  const [chatbots, setChatbots] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isActive = (path) => location.pathname.includes(path);
  const getToken = () => localStorage.getItem("token");

  // Fetch chatbots from API on page load
  useEffect(() => {
    if (isActive("/teammates")) return;

    const fetchChatbots = async () => {
      const token = getToken();

      // Redirect to login if token is missing
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`, // Token added here
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (response.ok) {
          console.log(data);
          setChatbots(data.chatbots);
        } else {
          console.error("Error fetching chatbots:", data);
        }
      } catch (error) {
        console.error("Failed to fetch chatbots:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatbots();
  }, [navigate]);

  // Handle chatbot creation
  const handleCreateChatbot = async (newChatbot) => {
    const token = getToken();

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`, // Token added here
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newChatbot),
      });

      if (!response.ok) {
        throw new Error("Failed to create chatbot");
      }

      const createdChatbot = await response.json();
      setChatbots([...chatbots, createdChatbot]);
      setShowForm(false);
    } catch (error) {
      console.error("Error creating chatbot:", error);
    }
  };

  return (
    <div className="fixed inset-4 rounded-4xl overflow-scroll flex flex-col bg-gradient-to-br bg-gradient-radial  from-white to-indigo-300">
      <Navbar />

      {isActive("/teammates") || isActive("/pricing") ? (
        <Outlet />
      ) : (
        <div className=" p-10">
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-semibold text-3xl">My Chatbots</h1>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-white hover:text-blue-500 transition-colors duration-300"
              onClick={() => setShowForm(true)}
            >
              New Chatbot
            </button>
          </div>

          {loading ? (
            <Loading />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            >
              {chatbots.map(
                ({
                  id,
                  name,
                  azure_index_name,
                  api_key,
                  quota: { messages_used },
                }) => (
                  <ChatbotCard
                    key={id}
                    id={id}
                    api_key={api_key}
                    name={name}
                    azure_index={azure_index_name}
                    messages_used={messages_used}
                  />
                )
              )}
            </motion.div>
          )}

          {showForm && (
            <NewChatbotForm
              onSubmit={handleCreateChatbot}
              onCancel={() => setShowForm(false)}
            />
          )}
        </div>
      )}
    </div>
  );
}
