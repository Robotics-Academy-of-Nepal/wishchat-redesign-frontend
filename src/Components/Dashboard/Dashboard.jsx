import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import logo from "../../assets/wishchat-logo.png";
import NewChatbotForm from "./NewChatbotForm";
import { motion } from "framer-motion";
import Loading from "../Loading";
import { useChatbot } from "../../context/ChatbotContext";
const API_URL = "https://kfwsdw58-8000.inc1.devtunnels.ms/auth/chatbots/";

// ChatbotCard component
const ChatbotCard = ({
  azure_index,
  messages_used,
  chatbot_name,
  ...props
}) => {
  const navigate = useNavigate();
  const { chatbotData, setChatbotData } = useChatbot();

  const handleNavigate = () => {
    setChatbotData({
      chatbot_name,
      azure_index,
      messages_used,
      ...props,
    });

    localStorage.setItem(
      "chatbotData",
      JSON.stringify({
        chatbot_name,
        azure_index,
        messages_used,
        ...props,
      })
    );
    console.log("chatbotdata:", chatbotData);

    if (azure_index) {
      if (messages_used > 0) {
        navigate("/playground/chat");
      } else {
        navigate("/playground");
      }
    } else {
      navigate("/build");
    }
  };
  return (
    <div
      className="flex flex-col items-center gap-4 h-80"
      onClick={handleNavigate}
    >
      <div className="h-[270px] w-60 flex justify-center items-start rounded-3xl cursor-pointer bg-gradient-to-br from-white to-indigo-400 overflow-hidden hover:brightness-75 transition duration-700">
        <img src={logo} alt="Chatbot Logo" />
      </div>
      <h2 className="text-xl">{chatbot_name}</h2>
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
    <div className="fixed inset-4 rounded-4xl overflow-auto flex flex-col items-center bg-radial-[at_0%_0%] from-white from-20% to-indigo-300 ">
      <Navbar />

      {isActive("/teammates") || isActive("/pricing") ? (
        <Outlet />
      ) : (
        <div className="flex flex-col justify-center max-w-[1400px] p-10">
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-semibold text-2xl">My Chatbots</h1>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-white hover:text-blue-500 transition-colors duration-300"
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
              className="grid md:grid-cols-3 lg:grid-cols-4 gap-24"
              // className="grid md:grid-cols-2 lg:flex flex-wrap gap-14 lg:justify-start"
            >
              {chatbots.map(
                ({
                  id,
                  name,
                  azure_index_name,
                  api_key,
                  quota: {
                    messages_used,
                    message_limit,
                    is_trial_valid,
                    trial_end_date,
                    trial_start_date,
                    is_subscription_valid,
                    subscription_end_date,
                    last_reset,
                  },
                  created_at,
                  updated_at,
                }) => (
                  <ChatbotCard
                    key={id}
                    chatbot_id={id}
                    api_key={api_key}
                    chatbot_name={name}
                    azure_index={azure_index_name}
                    messages_used={messages_used}
                    message_limit={message_limit}
                    is_trial_valid={is_trial_valid}
                    trial_end_date={trial_end_date}
                    trial_start_date={trial_start_date}
                    is_subscription_valid={is_subscription_valid}
                    subscription_end_date={subscription_end_date}
                    subscription_start_date_at={updated_at}
                    last_reset={last_reset}
                    created_at={created_at}
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
