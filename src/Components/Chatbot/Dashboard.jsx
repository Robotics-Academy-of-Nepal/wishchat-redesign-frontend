import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import bg from "../../assets/dashboard.png";
import logo from "../../assets/wishchat-logo.png";

const API_URL = "https://kfwsdw58-8000.inc1.devtunnels.ms/auth/chatbots/";

// ChatbotCard component
const ChatbotCard = ({ name }) => {
  return (
    <div className="flex flex-col items-center mb-8">
      <div
        className="h-[200px] w-[300px] flex justify-center items-center rounded-xl shadow-lg overflow-hidden relative hover:shadow-xl transition-shadow duration-300 cursor-pointer"
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
      <h2 className="font-bold text-xl mt-3">{name}</h2>
    </div>
  );
};

// NewChatbotForm component
const NewChatbotForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({ name: "", description: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-white to-indigo-300 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="font-bold text-2xl mb-4">Create New Chatbot</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Chatbot Name
            </label>
            <input
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring-2 focus:ring-blue-500"
              name="name"
              type="text"
              placeholder="Enter chatbot name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring-2 focus:ring-blue-500"
              name="description"
              placeholder="Enter chatbot description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
            >
              Create
            </button>
          </div>
        </form>
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

  // Function to get token from localStorage
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
  // if (isActive("/teammates")) {
  //   return <Outlet />;
  // } else
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-white to-indigo-300">
      <Navbar />

      {isActive("/teammates") ? (
        <Outlet />
      ) : (
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-bold text-3xl">My Chatbots</h1>
            <button
              className="bg-blue-500 text-white py-2 px-6 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300 font-medium"
              onClick={() => setShowForm(true)}
            >
              New Chatbot
            </button>
          </div>

          {loading ? (
            <p className="text-center text-gray-500">Loading chatbots...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {chatbots.map(({ id, name }) => (
                <ChatbotCard key={id} name={name} />
              ))}
            </div>
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
