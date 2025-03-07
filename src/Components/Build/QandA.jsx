import { LuArrowRight } from "react-icons/lu";
import { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import axios from "axios";
const QandA = ({ id }) => {
  const [QA, setQA] = useState([{ Q: "", A: "" }]);
  const addQA = () => {
    setQA((prev) => [...prev, { Q: "", A: "" }]);
  };
  const removeQA = (index) => {
    setQA((prev) => prev.filter((_, i) => i !== index));
  };
  const handleUpload = () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    let content = QA.map(
      (item, index) => `Q${index + 1}: ${item.Q}\nA${index + 1}: ${item.A}\n`
    ).join("\n");
    const textFile = new File([content], "Q&A.txt", { type: "text/plain" });

    const formData = new FormData();
    formData.append("file", textFile);
    formData.append("filename", "Q&A");

    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
    // Array.from(formData.keys()).forEach((key) => console.log(key));

    console.log(token);

    axios
      .post(`${import.meta.env.VITE_API_URL}api/upload/${id}/`, formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="w-full flex flex-col items-center gap-3 justify-center">
      <div className="w-full flex flex-col gap-4 p-6 items-center rounded-2xl bg-white">
        <div className="text-center">
          <p className="font- text-2xl">{"Q&A"} </p>
          <p className="text-xs text-red-800">Only three QA allowed.</p>
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
      <button
        onClick={handleUpload}
        className="flex items-center justify-evenly p-4 gap-2 bg-blue-500 h-14 rounded-full text-white text-2xl font-light"
      >
        Train Chatbot
        <div className="h-[30px] w-[30px] text-blue-500 bg-white rounded-full flex items-center justify-center">
          <LuArrowRight className="h-5 w-5" />
        </div>
      </button>
    </div>
  );
};

export default QandA;
