import { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import UploadFile from "./UploadFile";
import QandA from "./QandA";
import Text from "./Text";
import Uploaded from "./Uploaded";
import MainQuestion from "./MainQuestion";
import axios from "axios";

const Build = () => {
  const location = useLocation();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { id, name, azure_index } = location.state || null;
  console.log(id, name, azure_index);
  const handleClick = (index) => {
    setSelectedIndex(index);
  };
  const buttons = ["Upload Files", "Q&A", "Text"];
  useEffect(() => {
      if (azure_index) {
        const fetchData = async () => {
          const token = localStorage.getItem("token");
  
          if (!token) {
            console.error("Token is missing!");
            return;
          }
  
          try {
            const response = await axios.get(
              `${import.meta.env.VITE_API_URL}api/list/${id}/`,
              {
                headers: {
                  Authorization: `Token ${token}`,
                },
              }
            );
            console.log("response: ", response);
            if (response.data.documents.length && response.status == 200) {
              console.log(response.data.documents);
              const newFiles = response.data.documents
                .filter(
                  (file) =>
                    file.filename !== `Q&A-${id}` &&
                    file.filename !== `Text-${id}`
                )
                .map((file) => ({
                  file: null,
                  name: `${file.filename}`,
                  date: file.upload_at,
                }));
              setSelectedFiles(newFiles);
  
              const foundQandA = response.data.documents.find(
                (file) => file.filename === `Q&A-${id}`
              );
  
              if (foundQandA) {
                axios
                  .get(
                    `${import.meta.env.VITE_API_URL}api/get/${id}/${
                      foundQandA.id
                    }/`,
                    {
                      headers: {
                        Authorization: `Token ${token}`,
                      },
                    }
                  )
                  .then((response) => {
                    console.log("QAres:", response);
                    QandAContent = response.data.document.content;
                  })
                  .catch((error) => {
                    console.error("Error fetching Q&A:", error);
                  });
              }
              const foundText = response.data.documents.find(
                (file) => file.filename === `Text-${id}`
              );
  
              if (foundText) {
                axios
                  .get(
                    `${import.meta.env.VITE_API_URL}api/get/${id}/${
                      foundText.id
                    }/`,
                    {
                      headers: {
                        Authorization: `Token ${token}`,
                      },
                    }
                  )
                  .then((response) => {
                    console.log("textRes:", response);
                    textContent = response.data.document.content;
                  })
                  .catch((error) => {
                    console.error("Error fetching Text:", error);
                  });
              }
            }
          } catch (error) {
            console.log("fetch list error:", error);
          }
        };
  
        fetchData();
      }
    }, [azure_index, id]);
  
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
          <div className="grid grid-cols-3 justify-evenly w-full h-full z-10 relative">
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

        {selectedIndex === 0 && (
          <UploadFile id={id} name={name} azure_index={azure_index} />
        )}
        {selectedIndex === 1 && (
          <QandA id={id} name={name} azure_index={azure_index} />
        )}
        {selectedIndex === 2 && (
          <Text id={id} name={name} azure_index={azure_index} />
        )}
        {/* {selectedIndex === 3 && azure_index && <Uploaded id={id} name={name} />}
        {selectedIndex === 4 && <MainQuestion />} */}
      </div>
    </div>
  );
};

export default Build;
