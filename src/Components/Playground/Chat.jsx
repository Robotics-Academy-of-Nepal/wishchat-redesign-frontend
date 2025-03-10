import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Loading from "./Loading";
import Typewriter from "./Typewriter";
import { marked } from "marked";

const Chat = () => {
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [justAsked, setJustAsked] = useState(true);

  const token = localStorage.getItem("token");
  const { id, prompt } = location.state || {};
  console.log(id, prompt);

  useEffect(() => {
    if (!token) {
      console.error("Token not found");
      return;
    }
    if (prompt != "") {
      messages[1].query = prompt || "";
      axios
        .post(
          `${import.meta.env.VITE_API_URL}api/query/`,
          { query: prompt, chatbot_id: id },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
        .then((response) => {
          console.log("Response from backend:", response.data);
        })
        .catch((error) => {
          console.error("Error sending request:", error);
        });
    }
  });
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
        { query: input, chatbot_id: id },
        {
          headers: {
            Authorization: `Token ${token}`,
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
    <div className="w-full h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-2 p-4 mb-32">
        {messages.map((msg, index) => (
          <div key={index} className="p-2">
            <div className="flex justify-end">
              <div className="max-w-6xl p-2 text-white bg-blue-500 rounded-lg">
                {msg.query}
              </div>
            </div>
            {msg.reply && (
              <div className="p-2 inline-block max-w-2/3">
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
      <footer className="w-full h-32 p-4 rounded-xl fixed bottom-0 left-0 flex items-center gap-2 justify-center">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="p-2 max-h-24 border border-gray-400 rounded-xl bg-white placeholder:text-black w-1/2"
        />
        <button
          onClick={handlePrompt}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Send
        </button>
      </footer>
    </div>
  );
};

export default Chat;
