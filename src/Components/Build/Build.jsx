import { useState } from "react";
import UploadFile from "./UploadFile";
import QandA from "./QandA";
import Text from "./Text";
import Uploaded from "./Uploaded";
import MainQuestion from "./MainQuestion";

const Build = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleClick = (index) => {
    setSelectedIndex(index);
  };
  const buttons = ["Upload Files", "Q&A", "Text", "Uploaded", "Main Question"];
  return (
    <div className="h w-full flex flex-col items-center pb-14">
      <div className="flex flex-col items-start gap-12">
        <div className="mt-[50px] flex flex-col gap-3">
          <h1 className="font-medium text-6xl">
            Build Your AI
            <br />
            Chatbot
          </h1>

          <p className="text-2xl">
            Train your chatbot using files, manual Q&A, or
            <br />
            direct text input—all in one place
          </p>
        </div>

        <div className="relative w-[780px] h-16 rounded-full bg-white border border-gray-300 flex">
          <div className="grid grid-cols-5 justify-evenly w-full h-full z-10 relative">
            {buttons.map((button, index) => (
              <button
                key={index}
                onClick={() => handleClick(index)}
                className={`text-lg z-20 relative transition-colors duration-700 
                  ${selectedIndex === index ? "text-white" : "text-black"}`}
              >
                {button}
              </button>
            ))}
          </div>
          {/* Shifting div */}
          <div
            className="absolute bottom-2 h-12 rounded-full bg-blue-500 transition-all duration-700 ease-in-out z-0"
            style={{
              width: `calc(100% / ${buttons.length} - 16px)`,
              left: `calc(100% / ${buttons.length} * ${selectedIndex} + 7px)`,
            }}
          />
        </div>
        {selectedIndex === 0 && <UploadFile />}
        {selectedIndex === 1 && <QandA />}
        {selectedIndex === 2 && <Text />}
        {selectedIndex === 3 && <Uploaded />}
        {selectedIndex === 4 && <MainQuestion />}
      </div>
    </div>
  );
};

export default Build;
