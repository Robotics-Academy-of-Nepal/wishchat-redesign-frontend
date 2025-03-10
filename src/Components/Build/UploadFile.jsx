import { useState, useEffect } from "react";
import axios from "axios";
import uploadIcon from "../../assets/uploadIcon.png";
import { useNavigate } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";
import { IoTrashOutline } from "react-icons/io5";

const UploadFile = ({ id, name, azure_index }) => {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isTraining, setIsTraining] = useState(false);
  let QandAContent = "";
  let textContent = "";
  const handleFileChange = (event) => {
    // if (selectedFiles.length >= 3) return;

    const files = Array.from(event.target.files).slice(0, 3); // Limit to 3 files
    const newFiles = files.map((file) => ({
      file,
      name: file.name,
      date: new Date().toISOString().split("T")[0],
    }));

    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles].slice(0, 3));
  };
  const handleDeselectFile = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };
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
  const handleTrain = async () => {
    if (selectedFiles.length === 0) return;

    try {
      setIsTraining(true);
      const progressInterval = simulateProgress();

      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const formData = new FormData();

      selectedFiles.forEach((fileObj) => {
        formData.append(` ${fileObj.name}`, fileObj.file);
      });
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }
      // console.log(formData);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}api/upload/${id}/`,
        {
          method: "POST",
          headers: { Authorization: `Token ${token}` },
          body: formData,
        }
      );
      if (response.status === 200) {
        const data = await response.json(); // Parse the JSON response
        console.log("trainresponse:", data);
        localStorage.setItem("has_active_chatbot", JSON.stringify(true));
        console.log(data.consolidated_index); // Access the parsed data

        const azure_index = data.consolidated_index;
        navigate("/playground", {
          state: { id, name, azure_index },
        });
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      clearInterval(progressInterval);
      setProgress(100);
      setTimeout(() => {
        setIsTraining(false);
        setProgress(0);
      }, 1000);
    } catch (error) {
      console.error("Error uploading files:", error);
      setIsTraining(false);
      setProgress(0);
    }
  };
  
  return (
    <div className="w-full px-8 flex flex-col items-center gap-10 -mt-2">
      <input
        type="file"
        id="fileUpload"
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.doc,.docx,.txt"
        multiple
      />
      <label
        htmlFor="fileUpload"
        className="flex flex-col justify-center items-center gap-1.5 w-full bg-white rounded-[50px] border-4 border-stone-400 border-dashed text-xl p-10"
      >
        <img src={uploadIcon} alt="Upload Icon" className="mb-2" />
        Drop your files here
        <br />
        <span className="text-lg text-stone-400">{`(PDF, DOCX, DOC or TXT)`}</span>
        <p className="text-xs text-red-800 text-center">
          Only three files allowed. File should be less that 200mb.
          <br />
          Q/A and text are also considered as file.
        </p>
      </label>
      {selectedFiles.length > 0 && (
        <>
          <h3 className="text-start w-full -mb-6 text-lg">Selected Files:</h3>
          <div className=" w-full bg-white border-stone-400 p-6 rounded-xl">
            <ul className="flex flex-col gap-1.5 w-full">
              {selectedFiles.map((file, index) => (
                <li
                  key={index}
                  className="flex justify-between gap-2 border border-stone-400 bg-white w-full p-4 rounded-lg"
                >
                  <div className="w-full flex  gap-2">
                    <div className="flex items-center justify-center h-10 w-10 bg-stone-400 text-center text- text-lg font-light text-black rounded-md">
                      {file.name.split(".").pop().toLowerCase()}
                    </div>
                    <span className="flex items-center">{file.name}</span>
                  </div>

                  <button
                    className="text-red-600 hover:text-red-800 flex items-center gap-1"
                    onClick={() => handleDeselectFile(index)}
                  >
                    <IoTrashOutline className="h-5 w-5" />
                    Remove{" "}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
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
        onClick={handleTrain}
        className={`flex items-center justify-evenly p-4 gap-2 ${
          selectedFiles.length > 0 || isTraining ? "bg-blue-500" : "bg-blue-400"
        } h-14 rounded-full text-white text-2xl font-light`}
        disabled={selectedFiles.length === 0 || isTraining}
      >
        {isTraining ? (
          "Training in Progress..."
        ) : (
          <>
            {"Train Chatbot"}
            <div
              className={`h-[30px] w-[30px] ${
                (isTraining || selectedFiles.length === 0) &&
                "opacity-50 cursor-not-allowed"
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

export default UploadFile;
