import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Loading from "./Loading";
import Typewriter from "./Typewriter";
import { marked } from "marked";
import { IoIosSend } from "react-icons/io";

const Chat = () => {
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [justAsked, setJustAsked] = useState(true);

  const token = localStorage.getItem("token");
  const { id, prompt, api_key } = location.state || {};
  console.log("chat state:", id, prompt, api_key);

  useEffect(() => {
    if (!token) {
      console.error("Token not found");
      return;
    }
    if (prompt != "") {
      console.log("Includes prompt getting response.");
      setMessages([{ query: prompt, reply: "Loading..." }]);
      setLoading(true);
      axios
        .post(
          `${import.meta.env.VITE_API_URL}api/query/`,
          { query: prompt },
          {
            headers: {
              "X-API-KEY": `${api_key}`,
            },
          }
        )
        .then((response) => {
          console.log("Response from backend:", response.data);
          setMessages([{ query: prompt, reply: response.data.response }]);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error sending request:", error);
        });
    }
  }, [id, prompt, token, api_key]);
  const handlePrompt = () => {
    setLoading(true);
    setJustAsked(true);
    setMessages((prevMessages) => [
      ...prevMessages,
      { query: input, reply: "Loading..." },
    ]);
    setInput("");

    axios
      .post(
        `${import.meta.env.VITE_API_URL}api/query/`,
        // { query: input, chatbot_id: id },
        { query: input },
        {
          headers: {
            // Authorization: `Token ${token}`,
            "X-API-KEY": `${api_key}`,
          },
        }
      )
      .then((response) => {
        console.log("Response from backend:", response.data);
        const html_res = marked(response.data.response);
        setMessages((prevMessages) =>
          prevMessages.map((msg, index) =>
            index === prevMessages.length - 1
              ? { ...msg, reply: html_res }
              : msg
          )
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error sending request:", error);
        setMessages((prevMessages) =>
          prevMessages.map((msg, index) =>
            index === prevMessages.length - 1
              ? {
                  ...msg,
                  reply: marked(`Error getting reply...`),
                }
              : msg
          )
        );

        setLoading(false);
      });
  };

  return (
    // <div className="w-full h-screen flex flex-row bg-[url(/public/subtlebg.png)] justify-center p-4 rounded-lg">
    <div className="w-full h-screen flex flex-row justify-center p-4 rounded-lg">
      <div className="w-96 flex flex-col rounded-lg bg-white shadow-lg">
        <div className="flex-1 p-2">
          {messages.map((msg, index) => (
            <div key={index} className="p-2">
              <div className="flex justify-end">
                <div className="max-w-6xl p-3 text-white bg-blue-500 rounded-3xl">
                  {msg.query}
                </div>
              </div>
              {msg.reply && (
                <div className="p-3 inline-block max-w-2/3 bg-stone-200 rounded-3xl">
                  {index === messages.length - 1 && isLoading ? (
                    <Loading />
                  ) : index === messages.length - 1 && justAsked ? (
                    <Typewriter
                      text={messages[messages.length - 1].reply}
                      delay={5}
                      setJustAsked={setJustAsked}
                    />
                  ) : (
                    <div
                      className="prose prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: msg.reply }}
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="w-full p-2 border-t border-stone-400 sticky bottom-0 left-0 flex items-center gap-2 justify-center">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="w-full p-2 border border-gray-400 rounded-lg bg-white placeholder:text-black"
          />
          <button
            onClick={handlePrompt}
            className="px-2 py-2 bg-blue-500 text-white rounded-lg"
          >
            <IoIosSend className="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
