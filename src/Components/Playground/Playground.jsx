import { LuArrowRight } from "react-icons/lu";
import Navbar from "../Navbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Playground() {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname.includes(path);
  console.log(location);
  const { id, name, api_key, azure_index } = location.state ?? {};
  console.log("Playground state:", id, name, api_key, azure_index);
  const [prompt, setPrompt] = useState("");

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  return (
    <div className="fixed inset-4 overflow-auto rounded-4xl flex flex-col bg-gradient-to-br bg-gradient-radial from-white to-indigo-300">
      <Navbar id={id} name={name} api_key={api_key} azure_index={azure_index} />
      {isActive("/chat") ? (
        <Outlet />
      ) : (
        <div className="h-full mx-[20px] rounded-3xl flex flex-col gap-[120px] pb-36">
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
            <div className="bg-white w-full h-[50px] gap-2 rounded-4xl flex px-4 py-3 items-center justify-center">
              <input
                type="text"
                value={prompt}
                onChange={handleInputChange}
                className="w-full h-[50px] placeholder:font-medium placeholder-black px-3 rounded-lg focus:outline-none"
                placeholder="Type Whatever you want...."
              />

              <button
                onClick={() =>
                  navigate("/playground/chat", {
                    state: { id, name, api_key, azure_index, prompt },
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
