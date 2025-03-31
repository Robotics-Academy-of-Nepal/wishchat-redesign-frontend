import { LuArrowRight } from "react-icons/lu";
import Navbar from "../Navbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Playground() {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname.includes(path);
  const { id, name, api_key, azure_index, messages_used } =
    location.state ?? {};
  console.log("Playground state:", location.state);
  const [prompt, setPrompt] = useState("");

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (event.shiftKey) {
        setPrompt((prev) => prev + "\n");
      } else {
        event.preventDefault();
        navigate("/playground/chat", {
          state: {
            id,
            name,
            api_key,
            azure_index,
            prompt,
            messages_used,
          },
        });
      }
    }
  };

  return (
    <div className="fixed inset-4 rounded-4xl flex flex-col overflow-auto bg-radial-[at_0%_0%] from-white from-20% to-indigo-300">
      <Navbar
        id={id}
        name={name}
        api_key={api_key}
        azure_index={azure_index}
        messages_used={messages_used}
      />
      {isActive("/chat") ? (
        <Outlet />
      ) : (
        <div className="h-full mx-[20px] rounded-3xl flex flex-col gap-[120px]">
          <div className="ml-[150px] mt-[120px] flex flex-col gap-8">
            <h1 className="font-medium text-5xl">
              Hi there,
              <br />
              {"Let's explore the playground"}
            </h1>

            <p className="text-xl">
              You built it, now see it in action! Test
              <br /> your chatbot here.
            </p>
          </div>

          <div className="px-[150px]">
            <div className="bg-white w-full mb-36 gap-2 rounded-4xl flex px-2 items-center justify-center">
              <textarea
                type="text"
                value={prompt}
                onChange={(e) => {
                  handleInputChange(e);
                  e.target.style.height="3rem";
                  e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
                }}
                onKeyDown={handleKeyPress}
                className="w-full p-2 h-[3rem] overflow-hidden placeholder:font-medium placeholder-black rounded-lg focus:outline-none"
                placeholder="Type Whatever you want...."
              />

              <button
                onClick={() =>
                  navigate("/playground/chat", {
                    state: {
                      id,
                      name,
                      api_key,
                      azure_index,
                      prompt,
                      messages_used,
                    },
                  })
                }
                className="h-[40px] w-[42px] text-white rounded-full bg-blue-500 flex items-center justify-center"
              >
                <LuArrowRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
