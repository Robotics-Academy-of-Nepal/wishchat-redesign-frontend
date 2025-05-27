import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import logo from "../../assets/wishchat-logo.png";
import NewChatbotForm from "./NewChatbotForm";
import { motion } from "framer-motion";
import GridLoading from "../Dashboard/GridLoading";
import { useChatbot } from "../../context/ChatbotContext";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";

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
      className="items-center h-80 rounded-lg overflow-hidden"
      onClick={handleNavigate}
    >
      <div className="w-full flex flex-col items-center">
        <div className="w-full flex items-center justify-between h-64 max-w-60 cursor-pointer bg-indigo-300 overflow-hidden hover:brightness-75  duration-700 rounded-xl">
          <img src={logo} alt="Chatbot Logo" />
        </div>
        <h2 className="text-xl text-center">{chatbot_name}</h2>
      </div>
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

  // Fetch chatbots from API on page load
  useEffect(() => {
    if (isActive("/teammates")) return;

    const fetchChatbots = async () => {
      try {
        const response = await axiosInstance.get("auth/chatbots/");

        const data = response.data.chatbots;
        console.log(data);
        setChatbots(data);
      } catch (error) {
        console.error("Failed to fetch chatbots:", error);
        toast.error("Error creating chatbot!!");
      } finally {
        setLoading(false);
      }
    };

    fetchChatbots();
  }, [navigate]);

  // Handle chatbot creation
  const handleCreateChatbot = async (newChatbot) => {
    try {
      const response = await axiosInstance.post("auth/chatbots/", newChatbot);

      console.log(response);
      const createdChatbot = await response.data;
      setChatbots([...chatbots, createdChatbot]);
      setShowForm(false);
      toast.success("Created chatbot!!");
    } catch (error) {
      console.error("Error creating chatbot:", error);
      console.log("error data", error.response.data);
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen relative m-4 rounded-4xl bg-radial-[at_0%_0%] from-white from-20% to-indigo-300">
      <Navbar />

      {isActive("/teammates") || isActive("/pricing") ? (
        <Outlet />
      ) : (
        <div className="flex flex-col justify-center max-w-[1200px] w-full  xl:min-w-[1200px] p-10">
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-semibold text-3xl">My Chatbots</h1>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-white hover:text-blue-500 transition-colors duration-300"
              onClick={() => setShowForm(true)}
            >
              New Chatbot
            </button>
          </div>

          {loading ? (
            <GridLoading />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
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
                    last_payment_date,
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
                    last_payment_date={last_payment_date}
                    last_reset={last_reset}
                    created_at={created_at}
                  />
                )
              )}
            </motion.div>
          )}

          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <NewChatbotForm
                onSubmit={handleCreateChatbot}
                onCancel={() => setShowForm(false)}
              />
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
