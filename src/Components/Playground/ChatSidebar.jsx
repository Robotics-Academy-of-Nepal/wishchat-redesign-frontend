import { TbLayoutSidebarRightExpandFilled } from "react-icons/tb";
import ResetButton from "./ResetButton";
import axios from "axios";
const ChatSidebar = ({
  showSidebar,
  setShowSidebar,
  temperature,
  setTemperature,
  systemPrompt,
  setSystemPrompt,
  id,
}) => {
  console.log(id);
  const token = localStorage.getItem("token");

  const resetSidebar = () => {
    setTemperature(0.7);
  };
  const handleSliderChange = (e) => {
    setTemperature(parseFloat(e.target.value));
  };
  const handleSystemPrompt = () => {
    console.log(systemPrompt);
    axios
      .post(
        `${import.meta.env.VITE_API_URL}api/system-prompt/`,
        { chatbot_id: id, prompt: systemPrompt },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Response:", response.data);
        // const res = response.data.response;
      })
      .catch((error) => {
        console.log("response:", error);
      });
  };
  return (
    <div
      className={`flex-shrink-0 bg-white text-gray-700 w-0 overflow-hidden shadow-xl transition-all duration-300 ease-in-out ${
        showSidebar ? "w-[380px] p-4" : "w-0 p-0"
      }`}
    >
      <div className="min-w-[270px]">
        <TbLayoutSidebarRightExpandFilled
          className="h-8 w-8 cursor-pointer"
          onClick={() => setShowSidebar(false)}
        />
        <div className="mb-2 p-4 flex items-center justify-between gap-4">
          <h5 className="text-xl font-semibold text-gray-900">Settings</h5>
          <ResetButton handleClick={resetSidebar} />
        </div>
        <nav className="flex flex-col gap-8 p-2 text-base text-gray-700">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Temperature</span>
              <span className="text-blue-500 font-medium">
                {temperature.toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={temperature}
              onChange={handleSliderChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>More Focused</span>
              <span>More Creative</span>
            </div>
          </div>

          {/* <div className="p-2 border-t border-gray-200">
            <h6 className="font-medium mb-2">Status</h6>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Active</span>
            </div>
          </div> */}
          <div>
            <div className="p-2 border-t border-gray-200">
              <h6 className="font-medium mb-2">System Prompt</h6>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                rows="10"
                placeholder="Add a system prompt here..."
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
              ></textarea>
            </div>
            <p className="text-yellow-600 text-xs">
              परिवर्तनहरू गर्न &quot;Apply Changes&quot; थिच्नुहोस्।
              <br />
              Apply changes prompt to make changes.
            </p>
          </div>
          <div>
            {/* {systemPrompt.trim() !== "" && ( */}
            <button
              className="bg-blue-500 text-white hover:bg-blue-400 p-2 rounded-xl "
              onClick={handleSystemPrompt}
            >
              Apply Changes
            </button>
            {/* )} */}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default ChatSidebar;
