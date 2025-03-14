import { LuArrowRight } from "react-icons/lu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
const Text = ({
  id,
  name,
  api_key,
  azure_index,
  messages_used,
  textContent,
  setTextContent,
}) => {
  const navigate = useNavigate();
  const [isTraining, setIsTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  const textName = `Text-${id}`;

  const simulateProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 200);
    return interval;
  };
  const handleUpload = async () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const textFile = new File([textContent], `${textName}.txt`, {
      type: "text/plain",
    });

    const formData = new FormData();
    formData.append(`${textName}`, textFile);

    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    console.log(token);
    setIsTraining(true);
    const progressInterval = simulateProgress();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}api/upload/${id}/`,
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      if (response.status == 200) {
        localStorage.setItem("has_active_chatbot", JSON.stringify(true));
        azure_index = response.data.consolidated_index;
        navigate("/playground", {
          state: { id, name, api_key, azure_index, messages_used },
        });
      }
      clearInterval(progressInterval);
      setProgress(100);
      setTimeout(() => {
        setIsTraining(false);
        setProgress(0);
      }, 1000);
    } catch (error) {
      console.log(error);
      setIsTraining(false);
      setProgress(0);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full px- flex flex-col items-center gap-3 justify-center"
    >
      <div className="w-full flex flex-col gap-4 p-6 items-center rounded-2xl bg-white">
        <p className="font- text-2xl">Text Input</p>
        <textarea
          className="h-72 w-full border-2 border-stone-300 rounded-2xl placeholder:text-2xl placeholder:text-stone-400 placeholder:font-light px-6 py-2"
          placeholder="Enter text to train your chatbot... "
          value={textContent}
          onChange={(e) => {
            setTextContent(e.target.value);
          }}
          onInput={(e) => {
            e.target.style.height = "200px";
            const newHeight = e.target.scrollHeight;
            e.target.style.height = `${Math.min(
              Math.max(newHeight, 200),
              1200
            )}px`;
          }}
        ></textarea>
      </div>
      {isTraining && (
        <div className="w-full max-w-lg mt-4">
          <div className="relative h-4 bg-gray-200 rounded">
            <div
              className="absolute top-0 left-0 h-4 bg-blue-500 rounded"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-center text-gray-700">
            Training Progress: {progress}%
          </p>
        </div>
      )}
      <button
        onClick={handleUpload}
        className={`flex items-center justify-evenly p-4 gap-2 ${
          isTraining ? "bg-blue-400" : "bg-blue-500"
        } h-14 rounded-full text-white text-2xl font-light`}
        disabled={isTraining}
      >
        {isTraining ? (
          "Training in Progress..."
        ) : (
          <>
            {"Train Chatbot"}
            <div
              className={`h-[30px] w-[30px] ${
                isTraining && "opacity-50 cursor-not-allowed"
              } text-blue-500 bg-white rounded-full flex items-center justify-center`}
            >
              <LuArrowRight className="h-5 w-5" />
            </div>
          </>
        )}
      </button>
    </motion.div>
  );
};

export default Text;
