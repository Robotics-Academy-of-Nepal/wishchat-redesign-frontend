import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { IoTrashOutline } from "react-icons/io5";
import { LuArrowRight } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
const WebsiteForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};
  const chatbotID = id;
  console.log("website faq state:", location.state);
  const token = localStorage.getItem("token");

  const [FetchedQA, setFetchedQA] = useState([{ question: "", answer: "" }]);
  const checkQAFetch = useRef([]);
  const [QA, setQA] = useState([]);
  const handleSubmit = (e) => {
    console.log("submit called!!");
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
  const removeQA = (obj, index) => {
    console.log("remove called!");
    const { id, ...otherfields } = obj;
    console.log(id);
    if (id) {
      axios
        .delete(
          `${
            import.meta.env.VITE_API_URL
          }auth/chatbots/${chatbotID}/faqs/${id}/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
        .then((response) => {
          console.log("remove data:", response.data);
          setFetchedQA((prev) => prev.filter((_, i) => i !== index));
        })
        .catch((error) => {
          console.error("form error:", error);
        });
    } else {
      console.log("noID");
      setQA((prev) => prev.filter((_, i) => i !== index));
    }
  };
  const updateQA = (obj, index) => {
    console.log("update calledddd");
    console.log(chatbotID, obj.id);
    console.log(
      `${import.meta.env.VITE_API_URL}auth/chatbots/${chatbotID}/faqs/${
        obj.id
      }/`
    );
    axios
      .put(
        `${import.meta.env.VITE_API_URL}auth/chatbots/${chatbotID}/faqs/${
          obj.id
        }/`,
        FetchedQA[index],
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("update res:", response);
      })
      .catch((error) => {
        console.error("form error:", error);
      });
  };
  useEffect(() => {
    console.log("initialfetch:", id);
    axios
      .get(`${import.meta.env.VITE_API_URL}auth/chatbots/${id}/faqs/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        console.log("fetch res:", response);
        console.log("fetch data:", response.data);
        const formattedData = response.data.map((item) => ({
          id: item.id,
          question: item.question,
          answer: item.answer,
        }));

        checkQAFetch.current = JSON.parse(JSON.stringify(formattedData));
        setFetchedQA(formattedData);
      })
      .catch((error) => {
        console.error("form error:", error);
      });
  }, [id, setFetchedQA, token]);

  return (
    <div className="rounded-2xl flex items-center justify-center p-6">
      <form
        className="w-full md:w-2/3 flex flex-col space-y-4"
        onSubmit={handleSubmit}
      >
        <h3 className="text-3xl font-medium text-center">Enter FAQs</h3>
        <div className="bg-white rounded-xl p-6 flex flex-col gap-6 shadow-lg">
          {FetchedQA.map((obj, index) => {
            const hasChanged =
              JSON.stringify(obj) !==
              JSON.stringify(checkQAFetch.current[index]);
            return (
              <div className="w-full" key={index}>
                <div className="flex items-center w-full gap-2 my-2">
                  <p className="text-start text-xl h-full">Q:</p>
                  <textarea
                    className="w-full border-2 border-stone-300 rounded-2xl placeholder:text-xl placeholder:text-stone-400 placeholder:font-light px-6 py-2 flex justify-center items-center"
                    placeholder="Enter text to train your chatbot... "
                    value={obj.question}
                    onChange={(e) => {
                      const newQA = [...FetchedQA];
                      newQA[index].question = e.target.value;
                      setFetchedQA(newQA);
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
                      const newQA = [...FetchedQA];
                      newQA[index].answer = e.target.value;
                      setFetchedQA(newQA);
                    }}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    className="text-red-600 hover:text-red-800 flex items-center gap-1 "
                    onClick={() => removeQA(obj, index)}
                    type="button"
                  >
                    <IoTrashOutline className="h-5 w-5" />
                    Remove
                  </button>
                  {hasChanged && (
                    <button
                      className="text-red-600 hover:text-red-800 flex items-center gap-1 "
                      onClick={() => updateQA(obj, index)}
                      type="button"
                    >
                      <IoTrashOutline className="h-5 w-5" />
                      Apply Change
                    </button>
                  )}
                </div>
              </div>
            );
          })}
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
                  onClick={() => removeQA(obj, index)}
                  type="button"
                >
                  <IoTrashOutline className="h-5 w-5" />
                  Remove
                </button>
              </div>
            );
          })}
          <button
            className="mt-3 px-4 py-2 text-blue-500 rounded-lg "
            onClick={() => {
              addQA();
            }}
            type="button"
          >
            + Add More
          </button>
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-500 text-white hover:text-blue-500 hover:bg-white transition-colors duration-700 rounded-full px-4 py-2 border-blue-500 border"
            >
              {FetchedQA.length ? "Apply change" : "Add QA"}
            </button>
            <button
              onClick={() => {
                navigate("/deploy/widgetColorForm/", {
                  state: location.state,
                });
              }}
              className="flex rounded-full items-center gap-1 py-2 px-4 border border-stone-400 text-gray-800 hover:bg-gray-400 hover:text-white duration-700 duration transition-all"
              type="button"
            >
              {"Next"}
              <div
                className={`h-[15px] w-[15px] rounded-full flex items-center justify-center`}
              >
                <LuArrowRight className="h-5 w-5" />
              </div>
            </button>
          </div>
        </div>
        {/* <div className="w-full flex justify-center gap-4">
        </div> */}
      </form>
    </div>
  );
};

export default WebsiteForm;
