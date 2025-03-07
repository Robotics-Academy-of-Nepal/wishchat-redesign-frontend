import { LuArrowRight } from "react-icons/lu";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Text = ({ id, azure_index }) => {
  const navigate = useNavigate();
  const [isTraining, setIsTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (azure_index) {
      const token = localStorage.getItem("token");
      try {
        const response = axios.get(
          `${import.meta.env.VITE_API_URL}api/list/${id}/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        if (response.ok) {
          console.log(response);
          // const allFileRes = axios.get(
          //   `${import.meta.env.VITE_API_URL}api/list/${id}/`,
          //   {
          //     headers: {
          //       Authorization: `Token ${token}`,
          //     },
          //   }
          // );
          // console.log(allFileRes);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [navigate, azure_index, id]);
  useEffect(() => {
    if (azure_index) {
      const fetchData = async () => {
        const token = localStorage.getItem("token");
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}api/list/${id}/`,
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );
          console.log(response);
        } catch (error) {
          console.log("Error fetching data: ", error);
        }
      };

      fetchData();
    }
  }, [navigate, azure_index, id]);

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

    const textFile = new File([content], "Q&A.txt", { type: "text/plain" });

    const formData = new FormData();
    formData.append("file", textFile);
    formData.append("filename", "Text");

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
      if (response.ok) {
        console.log(response);
        localStorage.setItem("has_active_chatbot", JSON.stringify(true));
        navigate("/playground");
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
    <div className="w-full px-10 flex flex-col items-center gap-3 justify-center">
      <div className="w-full flex flex-col gap-4 p-6 items-center rounded-2xl bg-white">
        <p className="font- text-2xl">Text Input</p>
        <textarea
          className="h-44 w-full border-2 border-stone-300 rounded-2xl placeholder:text-2xl placeholder:text-stone-400 placeholder:font-light px-6 py-2"
          placeholder="Enter text to train your chatbot... "
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></textarea>
        {/* <div className="w-full flex justify-between">
          <button className="flex items-center justify-evenly p-3 px-6 rounded-full text-stone-400 border border-gray-400 text-2xl font-light ">
            Cancel
          </button>
          <button className="flex items-center justify-evenly py-3 px-6 gap-3 bg-blue-500 rounded-full text-white text-2xl font-light">
            Upload
            <div className="h-[30px] w-[30px] text-blue-500 bg-white rounded-full flex items-center justify-center">
              <LuArrowRight className="h-5 w-5" />
            </div>
          </button>
        </div> */}
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
    </div>
  );
};

export default Text;
