import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { IoTrashOutline } from "react-icons/io5";
import { LuArrowRight } from "react-icons/lu";

const WebsiteForm = () => {
  const location = useLocation();
  const { id } = location.state || {};
  console.log("deploy state:", location.state);
  const token = localStorage.getItem("token");

  const [QA, setQA] = useState([{ question: "", answer: "" }]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(QA);
    axios
      .post(`${import.meta.env.VITE_API_URL}auth/chatbots/${id}/faqs/`, QA, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        console.log("form res:", response);
        console.log("data:", response.data);
        // setFetchedResponse(response.data);
      })
      .catch((error) => {
        console.error("form error:", error);
      });
  };
  const addQA = () => {
    setQA((prev) => [...prev, { question: "", answer: "" }]);
  };
  const removeQA = (index) => {
    axios
      .post(
        `${import.meta.env.VITE_API_URL}auth/chatbots/${id}/faqs/`,
        QA[index],
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("form res:", response);
        console.log("data:", response.data);
        setQA((prev) => prev.filter((_, i) => i !== index));
        // setFetchedResponse(response.data);
      })
      .catch((error) => {
        console.error("form error:", error);
      });
  };
  const updateQA = (index) => {
    axios
      .put(
        `${import.meta.env.VITE_API_URL}auth/chatbots/${id}/faqs/`,
        QA[index],
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("form res:", response);
        console.log("data:", response.data);
        // setQA((prev) => prev.filter((_, i) => i !== index));
        // setFetchedResponse(response.data);
      })
      .catch((error) => {
        console.error("form error:", error);
      });
  };
  // useEffect(()=>{},[])
  return (
    <div className="rounded-2xl flex items-center justify-center p-6">
      <div className="w-full md:w-2/3">
        <h3 className="text-3xl font-medium text-center">Enter FAQs</h3>
        <form
          className="bg-white rounded-xl p-6 flex flex-col gap-6 mt-4 shadow-lg"
          onSubmit={handleSubmit}
        >
          {QA.map((obj, index) => {
            return (
              <div className="w-full" key={index}>
                <div className="flex items-center w-full gap-2 my-2">
                  <p className="text-start text-xl h-full">Q:</p>
                  <textarea
                    className="w-full border-2 border-stone-300 rounded-2xl placeholder:text-xl placeholder:text-stone-400 placeholder:font-light px-6 py-2 flex justify-center items-center"
                    placeholder="Enter text to train your chatbot... "
                    value={obj.question}
                    onChange={(e) => {
                      const newQA = [...QA];
                      newQA[index].question = e.target.value;
                      setQA(newQA);
                    }}
                  />
                </div>
                <div className="flex items-center w-full gap-2">
                  <p className="text-start text-xl h-full">A:</p>
                  <textarea
                    className="h-40 w-full border-2 border-stone-300 rounded-2xl placeholder:text-xl placeholder:text-stone-400 placeholder:font-light px-6 py-2"
                    placeholder="Enter text to train your chatbot... "
                    value={obj.answer}
                    onChange={(e) => {
                      const newQA = [...QA];
                      newQA[index].answer = e.target.value;
                      setQA(newQA);
                    }}
                  />
                </div>
                <button
                  className="text-red-600 hover:text-red-800 flex items-center gap-1 "
                  onClick={() => removeQA(index)}
                >
                  <IoTrashOutline className="h-5 w-5" />
                  Remove
                </button>
              </div>
            );
          })}
          <button
            className="mt-3 px-4 py-2 text-blue-500 rounded-lg "
            onClick={addQA}
          >
            + Add More
          </button>
        </form>
        <button
          onClick={handleSubmit}
          className={`flex items-center justify-evenly p-4 gap-2 h-14 rounded-full text-white text-2xl font-light`}
        >
          {"Train Chatbot"}
          <div
            className={`h-[30px] w-[30px] text-blue-500 bg-white rounded-full flex items-center justify-center`}
          >
            <LuArrowRight className="h-5 w-5" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default WebsiteForm;
