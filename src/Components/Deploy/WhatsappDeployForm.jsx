import { useState } from "react";
import axios from "axios";
import ResponsePopup from "./ResponsePopup";
import { useChatbot } from "../../context/ChatbotContext";
const WhatsappDeployForm = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [fetchedResponse, setFetchedResponse] = useState({});

  const { chatbotData } = useChatbot();
  const { chatbot_id } = chatbotData;

  const [whatsapp_token, setWhatsappToken] = useState("");
  const [whatsapp_id, setWhatsappId] = useState("");
  const [whatsapp_url, setWhatsappUrl] = useState("");

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!whatsapp_id.trim()) newErrors.whatsapp_id = "WhatsApp ID is required.";
    if (!whatsapp_token.trim())
      newErrors.whatsapp_token = "WhatsApp Token is required.";
    else if (whatsapp_token.length < 20)
      newErrors.whatsapp_token = "Token must be at least 20 characters.";

    if (!whatsapp_url.trim()) {
      newErrors.whatsapp_url = "WhatsApp URL is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "whatsapp_id") setWhatsappId(value);
    if (name === "whatsapp_token") setWhatsappToken(value);
    if (name === "whatsapp_url") setWhatsappUrl(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    console.log(whatsapp_id, whatsapp_token, whatsapp_url);
    const token = localStorage.getItem("token");

    axios
      .post(
        `${import.meta.env.VITE_API_URL}api/credentials/`,
        {
          whatsapp_url,
          whatsapp_token,
          whatsapp_id,
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
        <h3 className="text-3xl font-medium text-center">Enter Details</h3>
        {showPopUp && (
          <ResponsePopup
            setShowPopUp={setShowPopUp}
            fetchedResponse={fetchedResponse}
          />
        )}
        <form
          className="bg-white rounded-xl p-6 flex flex-col gap-6 mt-4 shadow-lg"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="whatsapp_id">WhatsApp ID:</label>
            <input
              name="whatsapp_id"
              className="border border-stone-300 p-2 rounded-lg"
              value={whatsapp_id}
              onChange={handleChange}
            />
            {errors.whatsapp_id && (
              <p className="text-red-500">{errors.whatsapp_id}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="whatsapp_token">WhatsApp Token:</label>
            <textarea
              name="whatsapp_token"
              className="border border-stone-300 p-2 rounded-lg"
              rows={4}
              value={whatsapp_token}
              onChange={handleChange}
            />
            {errors.whatsapp_token && (
              <p className="text-red-500 text-sm">{errors.whatsapp_token}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="whatsapp_url">WhatsApp URL:</label>
            <input
              name="whatsapp_url"
              className="border border-stone-300 p-2 rounded-lg"
              value={whatsapp_url}
              onChange={handleChange}
            />
            {errors.whatsapp_url && (
              <p className="text-red-500 text-sm">{errors.whatsapp_url}</p>
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

export default WhatsappDeployForm;
