import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";
import axios from "axios";
import { useChatbot } from "../../context/ChatbotContext";
const CustomColorForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { chatbotData } = useChatbot();
  const { chatbot_id } = chatbotData;
  const token = localStorage.getItem("token");

  const [colors, setColors] = useState({
    headerText: "Chat",
    placeholderText: "Type your query...",
    bubbleBgColor: "#111827",
    bubbleColor: "#fafafa",

    chatBackgroundColor: "#fafafa",
    chatBorder: "#e5e7eb",
    headerBackgroundColor: "#111827",
    headerTextColor: "#fafafa",

    footerBackgroundColor: "#fafafa",

    sendButtonColor: "#111827",
    sendTextColor: "#fafafa",

    inputBorderColor: "#d1d5dc",
    inputTextColor: "#111827",
    inputBgColor: "#fafafa",

    questionTextColor: "#111827",
    questionBackgroundColor: "#e5e7eb",

    answerTextColor: "#111827",
    answerBackgroundColor: "#d1d5dc",

    faqTextColor: "#111827",
    faqBackgroundColor: "#e5e7eb",
    faqSectionBackgroundColor: "#f3f4f6",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setColors((prevColors) => ({
      ...prevColors,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Colors:", colors);

    axios
      .post(
        `${import.meta.env.VITE_API_URL}auth/chatbots/${chatbot_id}/colors/`,
        colors,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("form res:", response);
        console.log("data:", response.data);
      })
      .catch((error) => {
        console.error("form error:", error);
      });
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}auth/chatbots/${chatbot_id}/colors/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        console.log("fetch res:", response);
        console.log("data:", response.data);
        const { id, created_at, updated_at, ...requiredFields } = response.data;
        setColors(requiredFields);
      })
      .catch((error) => {
        console.error("form error:", error);
      });
  }, [token, chatbot_id]);

  return (
    <div className="rounded-2xl flex items-center justify-center p-6">
      <form className="w-full md:w-2/3 space-y-4" onSubmit={handleSubmit}>
        <h3 className="text-3xl font-medium text-center">Customize Colors</h3>
        <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
          <div className=" grid sm:grid-cols-2 gap-6 mt-4">
            {Object.keys(colors).map((colorKey) => (
              <div
                className="flex gap-2 items-center justify-start"
                key={colorKey}
              >
                {colorKey === "placeholderText" || colorKey === "headerText" ? (
                  <div className="felx flex-col">
                    <label
                      htmlFor={colorKey}
                      className="text-sm md:text-md font-medium"
                    >
                      {colorKey
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())
                        .trim()}
                    </label>
                    <input
                      type="text"
                      name={colorKey}
                      className="border border-stone-300 px-2 py-1 rounded-lg w-full"
                      value={colors[colorKey]}
                      onChange={handleChange}
                    />
                  </div>
                ) : (
                  <>
                    <input
                      type="color"
                      name={colorKey}
                      className="border border-stone-300 w-10 h-10 rounded-lg"
                      value={colors[colorKey]}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor={colorKey}
                      className="text-sm md:text-md font-medium"
                    >
                      {colorKey
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())
                        .trim()}
                    </label>
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-500 text-white hover:text-blue-500 hover:bg-white transition-colors duration-700 rounded-full py-2 px-4 border border-blue-500"
            >
              Submit
            </button>
            <button
              type="button"
              className="flex items-center gap-1 rounded-full py-2 px-4 border border-stone-400 text-gray-800 hover:text-white hover:bg-gray-400 duration-500 transition-all"
              onClick={() => {
                navigate("/deploy/websiteDomainForm/");
              }}
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
      </form>
    </div>
  );
};

export default CustomColorForm;
