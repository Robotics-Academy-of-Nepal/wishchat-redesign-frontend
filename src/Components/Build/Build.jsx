import { useState, useEffect } from "react";
import UploadFile from "./UploadFile";
import QandA from "./QandA";
import Text from "./Text";
import Navbar from "../Navbar";
// import Uploaded from "./Uploaded";
// import MainQuestion from "./MainQuestion";
import axios from "axios";
import { useChatbot } from "../../context/ChatbotContext";

const Build = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { chatbotData, setChatbotData } = useChatbot();
  const { chatbot_id, api_key, azure_index, messages_used } = chatbotData;
  const [textId, setTextId] = useState();
  const [textContent, setTextContent] = useState("");
  const [QAId, setQAId] = useState();
  const [QA, setQA] = useState([{ Q: "", A: "" }]);
  const [Files, setFiles] = useState([]);
  const [NoOfFiles, setNoOfFiles] = useState(0);
  const parseQA = (content) => {
    const result = {};
    let qaPositions = [];
    let currentPosition = 0;

    // Find all Q and A positions in the content
    while (currentPosition < content.length) {
      // Look for Q followed by a number
      if (
        content[currentPosition] === "Q" &&
        currentPosition + 1 < content.length &&
        !isNaN(parseInt(content[currentPosition + 1]))
      ) {
        // Find the index where this Q marker ends (at the colon)
        let markerEnd = content.indexOf(":", currentPosition);
        if (markerEnd !== -1) {
          // Extract the full marker (e.g., "Q1")
          let marker = content.substring(currentPosition, markerEnd);
          // Add to positions array with the position after the colon
          qaPositions.push({ marker: marker, position: markerEnd + 1 });
        }
      }

      // Look for A followed by a number
      if (
        content[currentPosition] === "A" &&
        currentPosition + 1 < content.length &&
        !isNaN(parseInt(content[currentPosition + 1]))
      ) {
        // Find the index where this A marker ends (at the colon)
        let markerEnd = content.indexOf(":", currentPosition);
        if (markerEnd !== -1) {
          // Extract the full marker (e.g., "A1")
          let marker = content.substring(currentPosition, markerEnd);
          // Add to positions array with the position after the colon
          qaPositions.push({ marker: marker, position: markerEnd + 1 });
        }
      }

      currentPosition++;
    }

    // Sort positions by their occurrence in the text
    qaPositions.sort((a, b) => a.position - b.position);

    // Extract content between consecutive positions
    for (let i = 0; i < qaPositions.length; i++) {
      const currentMarker = qaPositions[i].marker;
      const startPos = qaPositions[i].position;

      // If this is the last marker, extract until the end of the content
      if (i === qaPositions.length - 1) {
        result[currentMarker] = content.substring(startPos).trim();
      } else {
        const endPos =
          qaPositions[i + 1].position - qaPositions[i + 1].marker.length - 1;
        result[currentMarker] = content.substring(startPos, endPos).trim();
      }
    }
    const formattedQA = Object.keys(result)
      .filter((key) => key.startsWith("Q")) // Filter only the questions (Q1, Q2, etc.)
      .map((key, index) => ({
        Q: result[key], // Question text
        A: result[`A${index + 1}`], // Answer text (A1 for Q1, A2 for Q2, etc.)
      }));
    console.log(formattedQA);

    return formattedQA;
  };
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
            `${import.meta.env.VITE_API_URL}api/list/${chatbot_id}/`,
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );
          console.log("response: ", response);
          if (response.data.documents.length && response.status == 200) {
            console.log("Documents:", response.data.documents);
            setNoOfFiles(response.data.documents.length);
            const newFiles = response.data.documents
              .filter(
                (file) =>
                  file.filename !== `Q&A-${chatbot_id}` &&
                  file.filename !== `Text-${chatbot_id}`
              )
              .map((file) => ({
                name: `${file.filename}`,
                date: file.upload_at,
                id: file.id,
              }));
            setFiles(newFiles);

            const foundQandA = response.data.documents.find(
              (file) => file.filename === `Q&A-${chatbot_id}`
            );

            if (foundQandA) {
              setQAId(foundQandA.id);
              axios
                .get(
                  `${import.meta.env.VITE_API_URL}api/get/${chatbot_id}/${
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
                  const formattedQA = parseQA(response.data.document.content);
                  setQA(formattedQA);
                })
                .catch((error) => {
                  console.error("Error fetching Q&A:", error);
                });
            }

            const foundText = response.data.documents.find(
              (file) => file.filename === `Text-${chatbot_id}`
            );

            if (foundText) {
              setTextId(foundText.id);
              axios
                .get(
                  `${import.meta.env.VITE_API_URL}api/get/${chatbot_id}/${
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
                  setTextContent(response.data.document.content);
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
  }, [azure_index, chatbot_id]);
  const setAzureIndex = (consolidated_index) => {
    setChatbotData((prev) => ({
      ...prev,
      azure_index: consolidated_index,
    }));
  };
  return (
    // <div className="fixed inset-4 overflow-auto rounded-4xl flex flex-col bg-radial-[at_10%_25%] from-white from-20% to-indigo-300">
    //   <Navbar
    //     id={id}
    //     name={name}
    //     api_key={api_key}
    //     azure_index={azure_index}
    //     messages_used={messages_used}
    //   />
    <div className="w-full flex flex-col items-center pb-14">
      <div className="flex flex-col items-start gap-8 md:w-4/6 lg:w-auto px-1">
        <div className="mt-[50px] flex flex-col gap-3">
          <h1 className="font-medium text-4xl md:text-6xl text-wrap">
            Build Your AI
            <br />
            Chatbot
          </h1>

          <p className="text-xl text-wrap">
            Train your chatbot using files, manual Q&A, or
            <br />
            direct text input—all in one place
          </p>
        </div>

        <div className="relative w-full lg:w-[780px] h-16 rounded-full bg-white border border-gray-300 flex">
          <div className="grid grid-cols-3 justify-evenly w-full h-full z-10 relative">
            {buttons.map((button, index) => (
              <button
                key={index}
                onClick={() => handleClick(index)}
                className={`sm:text-lg z-20 relative transition-colors duration-700
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
          <UploadFile
            chatbot_id={chatbot_id}
            setAzureIndex={setAzureIndex}
            name={name}
            api_key={api_key}
            azure_index={azure_index}
            messages_used={messages_used}
            Files={Files}
            setFiles={setFiles}
            NoOfFiles={NoOfFiles}
            setNoOfFiles={setNoOfFiles}
          />
        )}
        {selectedIndex === 1 && (
          <QandA
            chatbot_id={chatbot_id}
            setAzureIndex={setAzureIndex}
            QA={QA}
            setQA={setQA}
            NoOfFiles={NoOfFiles}
            setNoOfFiles={setNoOfFiles}
            QAId={QAId}
            setQAId={setQAId}
          />
        )}
        {selectedIndex === 2 && (
          <Text
            chatbot_id={chatbot_id}
            setAzureIndex={setAzureIndex}
            textContent={textContent}
            setTextContent={setTextContent}
            NoOfFiles={NoOfFiles}
            setNoOfFiles={setNoOfFiles}
            textId={textId}
            setTextId={setTextId}
          />
        )}
        {/* {selectedIndex === 3 && azure_index && <Uploaded id={id} name={name} />}
        {selectedIndex === 4 && <MainQuestion />} */}
      </div>
    </div>
    // </div>
  );
};

export default Build;
