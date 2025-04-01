import { useState } from "react";
import axios from "axios";
import ResponsePopup from "./ResponsePopup";
import { useChatbot } from "../../context/ChatbotContext";
const MessengerDeployForm = () => {

  const { chatbotData } = useChatbot();
  const { chatbot_id } = chatbotData;
  const [showPopUp, setShowPopUp] = useState(false);

  const [messenger_token, setMessengerToken] = useState("");
  const [messenger_page_id, setMessengerId] = useState("");
  const [messenger_url, setMessengerUrl] = useState("");
  const [fetchedResponse, setFetchedResponse] = useState({});

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!messenger_page_id.trim())
      newErrors.messenger_id = "Messenger ID is required.";
    if (!messenger_token.trim())
      newErrors.messenger_token = "Messenger Token is required.";
    else if (messenger_token.length < 20)
      newErrors.messenger_token = "Token must be at least 20 characters.";

    if (!messenger_url.trim()) {
      newErrors.messenger_url = "Messenger URL is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "messenger_id") setMessengerId(value);
    if (name === "messenger_token") setMessengerToken(value);
    if (name === "messenger_url") setMessengerUrl(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    console.log(messenger_page_id, messenger_token, messenger_url);
    const token = localStorage.getItem("token");

    axios
      .post(
        `${import.meta.env.VITE_API_URL}api/messenger-credentials/`,
        {
          messenger_url,
          messenger_token,
          messenger_page_id,
          chatbot_id: chatbot_id,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("form res:", response);
        console.log("data:", response.data);
        setFetchedResponse(response.data);
        setShowPopUp(true);
      })
      .catch((error) => {
        console.error("form error:", error);
      });
  };

  return (
    <div className="rounded-2xl flex items-center justify-center p-6">
      <div className="w-full md:w-2/3">
        {showPopUp && (
          <ResponsePopup
            setShowPopUp={setShowPopUp}
            fetchedResponse={fetchedResponse}
          />
        )}
        <h3 className="text-3xl font-medium text-center">Enter Details</h3>
        <form
          className="bg-white rounded-xl p-6 flex flex-col gap-6 mt-4 shadow-lg"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="messenger_id">Messenger ID:</label>
            <input
              name="messenger_id"
              className="border border-stone-300 p-2 rounded-lg"
              value={messenger_page_id}
              onChange={handleChange}
            />
            {errors.messenger_id && (
              <p className="text-red-500">{errors.messenger_id}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="messenger_token">Messenger Token:</label>
            <textarea
              name="messenger_token"
              className="border border-stone-300 p-2 rounded-lg"
              rows={4}
              value={messenger_token}
              onChange={handleChange}
            />
            {errors.messenger_token && (
              <p className="text-red-500 text-sm">{errors.messenger_token}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="messenger_url">Messenger URL:</label>
            <input
              name="messenger_url"
              className="border border-stone-300 p-2 rounded-lg"
              value={messenger_url}
              onChange={handleChange}
            />
            {errors.messenger_url && (
              <p className="text-red-500 text-sm">{errors.messenger_url}</p>
            )}
          </div>

          <div className="flex gap-6">
            <button
              type="submit"
              className="bg-blue-500 text-white hover:text-blue-500 hover:bg-white transition-colors duration-700 rounded-full py-2 px-4"
            >
              Submit
            </button>
            <button
              type="button"
              className="rounded-full py-2 px-4 border border-stone-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessengerDeployForm;
