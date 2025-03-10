import { LuArrowRight } from "react-icons/lu";
import { useState, useEffect } from "react";
import { IoTrashOutline } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const QandA = ({ id, name, azure_index }) => {
  const navigate = useNavigate();
  const [QA, setQA] = useState([{ Q: "", A: "" }]);
  const [isTraining, setIsTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  const QAName = `Q&A-${id}`;
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
  const addQA = () => {
    setQA((prev) => [...prev, { Q: "", A: "" }]);
  };
  const removeQA = (index) => {
    setQA((prev) => prev.filter((_, i) => i !== index));
  };

  const parse = (content) => {
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

    setQA(formattedQA);
  };
  // useEffect(() => {
  //   if (azure_index) {
  //     const fetchData = async () => {
  //       const token = localStorage.getItem("token");

  //       if (!token) {
  //         console.error("Token is missing!");
  //         return;
  //       }

  //       try {
  //         const response = await axios.get(
  //           `${import.meta.env.VITE_API_URL}api/list/${id}/`,
  //           {
  //             headers: {
  //               Authorization: `Token ${token}`,
  //             },
  //           }
  //         );

  //         console.log("response: ", response);

  //         if (response.status === 200 && response.data.documents) {
  //           const document = response.data.documents.find(
  //             (doc) => doc.filename === `${QAName}`
  //           );

  //           if (document) {
  //             console.log("Document found, fetching Q&A...");

  //             try {
  //               const qa_res = await axios.get(
  //                 `${import.meta.env.VITE_API_URL}api/get/${id}/${
  //                   document.id
  //                 }/`,
  //                 {
  //                   headers: {
  //                     Authorization: `Token ${token}`,
  //                   },
  //                 }
  //               );

  //               console.log("qaRes:", qa_res);
  //               parse(qa_res.data.document.content);
  //             } catch (qaError) {
  //               console.log("Error fetching Q&A document: ", qaError);
  //             }
  //           }
  //         } else {
  //           console.log("No documents available or response not successful.");
  //         }
  //       } catch (listError) {
  //         console.log("Error fetching documents list: ", listError);
  //       }
  //     };

  //     (async () => {
  //       await fetchData();
  //     })();
  //   }
  // }, [QAName, azure_index, id]);

  const handleUpload = async () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    let content = QA.map(
      (item, index) => `Q${index + 1}: ${item.Q}\nA${index + 1}: ${item.A}\n`
    ).join("\n");
    const textFile = new File([content], `${QAName}.txt`, {
      type: "text/plain",
    });

    const formData = new FormData();
    formData.append(`${QAName}`, textFile);

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
      if (response.status == 200) {
        localStorage.setItem("has_active_chatbot", JSON.stringify(true));
        azure_index = response.data.consolidated_index;
        navigate("/playground", {
          state: { id, name, azure_index },
        });
      }
      console.log(response.data);
      clearInterval(progressInterval);
      setProgress(100);
      setTimeout(() => {
        setIsTraining(false);
        setProgress(0);
      }, 1000);
    } catch (error) {
      console.log(error);
      setIsTraining(false);
    }
  };
  return (
    <div className="w-full flex flex-col items-center gap-3 justify-center">
      <div className="w-full flex flex-col gap-4 p-6 items-center rounded-2xl bg-white">
        <div className="text-center">
          <p className="font- text-2xl">{"Q&A"} </p>
        </div>
        {QA.map((obj, index) => {
          return (
            <div className="w-full" key={index}>
              <div className="flex items-center w-full gap-2 my-2">
                <p className="text-start text-xl h-full">Q:</p>
                <textarea
                  className="w-full border-2 border-stone-300 rounded-2xl placeholder:text-xl placeholder:text-stone-400 placeholder:font-light px-6 py-2 flex justify-center items-center"
                  placeholder="Enter text to train your chatbot... "
                  value={obj.Q}
                  onChange={(e) => {
                    const newQA = [...QA];
                    newQA[index].Q = e.target.value;
                    setQA(newQA);
                  }}
                />
              </div>
              <div className="flex items-center w-full gap-2">
                <p className="text-start text-xl h-full">A:</p>
                <textarea
                  className="h-40 w-full border-2 border-stone-300 rounded-2xl placeholder:text-xl placeholder:text-stone-400 placeholder:font-light px-6 py-2"
                  placeholder="Enter text to train your chatbot... "
                  value={obj.A}
                  onChange={(e) => {
                    const newQA = [...QA];
                    newQA[index].A = e.target.value;
                    setQA(newQA);
                  }}
                />
              </div>
              {QA.length > 1 && (
                <button
                  className="text-red-600 hover:text-red-800 flex items-center gap-1 "
                  onClick={() => removeQA(index)}
                >
                  <IoTrashOutline className="h-5 w-5" />
                  Remove
                </button>
              )}
            </div>
          );
        })}
        <button
          className="mt-3 px-4 py-2 text-blue-500 rounded-lg "
          onClick={addQA}
        >
          + Add More
        </button>
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

export default QandA;
