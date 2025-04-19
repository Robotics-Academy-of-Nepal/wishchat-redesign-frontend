import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Loading from "./Loading";
import Typewriter from "./Typewriter";
import { marked } from "marked";
import { IoIosSend } from "react-icons/io";
import ChatSidebar from "./ChatSidebar";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import ResetButton from "./ResetButton";
import { useChatbot } from "../../context/ChatbotContext";

const Chat = () => {
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [justAsked, setJustAsked] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState("");
  const token = localStorage.getItem("token");

  const { chatbotData } = useChatbot();
  const { chatbot_id, api_key } = chatbotData;

  const { prompt } = location.state || {};
  const [temperature, setTemperature] = useState(0.7);

  const resetMessages = () => {
    setMessages([]);
  };
  useEffect(() => {
    if (!token) {
      console.error("Token not found");
      return;
    }
    if (typeof prompt !== "undefined" && prompt !== "") {
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
          setLoading(false);
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
        });
    }
  }, [chatbot_id, prompt, token, api_key]);
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
        { query: input, temperature: temperature },
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
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (event.shiftKey) {
        setInput((prev) => prev + "\n");
      } else {
        handlePrompt();
      }
    }
  };
  return (
    <div
      className={` h-[650px] flex flex-row items-center justify-center lg:justify-evenly rounded-xl sm:m-6 p-2`}
    >
      <ChatSidebar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        temperature={temperature}
        setTemperature={setTemperature}
        systemPrompt={systemPrompt}
        setSystemPrompt={setSystemPrompt}
        chatbot_id={chatbot_id}
      />
      <div className="w-full h-full flex flex-col lg:flex-row justify-between overflow-hidden rounded-xl">
        <TbLayoutSidebarLeftExpandFilled
          className={`h-8 w-8 text-gray-700 m-4 ${showSidebar && "hidden"}`}
          onClick={() => setShowSidebar((prev) => !prev)}
        />
        <div
          className={`w-full h-full flex justify-center rounded-xl ${
            showSidebar && "lg:flex justify-center"
          }`}
        >
          <div
            className={`w-[500px] flex flex-col justify-between rounded-lg bg-white shadow-lg m-2 ${
              showSidebar && "lg:flex"
            }`}
          >
            <div className="w-full flex justify-between">
              <ResetButton handleClick={resetMessages} />
            </div>
            <div className="p-2 overflow-y-scroll h-full">
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
            <div className="w-full p-2 border-t border-stone-300 flex items-center gap-2 justify-center">
              <textarea
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = `${Math.min(
                    e.target.scrollHeight,
                    200
                  )}px`;
                }}
                onKeyDown={handleKeyPress}
                placeholder="Type a message..."
                className="w-full h-16 p-2 border border-gray-300 rounded-lg bg-white placeholder:text-gray-500"
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
      </div>
    </div>
  );
};

export default Chat;
