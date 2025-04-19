import { useState, useEffect } from "react";
import CopyToClipboard from "./CopyToClipboard";
import axios from "axios";
const WebsitePopup = ({ chatbot_id, token, api_key, setShowPopUp }) => {
  const [fetchedResponse, setFetchedResponse] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [colorsResponse, faqsResponse] = await Promise.all([
          axios.get(
            `${
              import.meta.env.VITE_API_URL
            }auth/chatbots/${chatbot_id}/colors/`,
            {
              headers: { Authorization: `Token ${token}` },
            }
          ),
          axios.get(
            `${import.meta.env.VITE_API_URL}auth/chatbots/${chatbot_id}/faqs/`,
            {
              headers: { Authorization: `Token ${token}` },
            }
          ),
        ]);

        // Extract required fields from colors response
        const {
          id: _,
          created_at,
          updated_at,
          ...requiredFields
        } = colorsResponse.data;

        // Format FAQs response
        const formattedFAQs = faqsResponse.data.map((item) => ({
          id: item.id,
          question: item.question,
          answer: item.answer,
        }));

        // Update state in one go
        setFetchedResponse({
          ...requiredFields,
          FAQs: formattedFAQs,
          Key: api_key,
        });

        console.log("Final Fetched Data:", {
          ...requiredFields,
          FAQs: formattedFAQs,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token, chatbot_id, api_key]);

  return (
    <div className="fixed inset-0 left-0 top-0 h-screen w-full z-50 flex justify-center items-center bg-black/50">
      <div className="p-6 bg-white flex flex-col items-center justify-center space-y-4 rounded-xl shadow-xl m-2 w-full md:w-2/3">
        <h3 className="text-2xl font-semibold">Script</h3>
        <div className="w-full flex justify-start flex-col">
          <div className="flex w-full gap-2 items-start">
            <p className="px-2 py-3 border border-stone-400 rounded-xl w-full text-wrap overflow-x-scroll">
              {fetchedResponse &&
                // `<script>
                // window.chatWidgetConfig = ${JSON.stringify(fetchedResponse)};
                // </script>
                // <script src="https://cdn.jsdelivr.net/gh/jATM0S/testDeliver@ad44987/chatWidget.js" defer></script>
                `<script src="https://cdn.jsdelivr.net/gh/jATM0S/testDeliver@ad44987/chatWidget.js" defer></script>
                `}
            </p>
            {fetchedResponse && (
              <CopyToClipboard
                text={`
                <script src="https://cdn.jsdelivr.net/gh/jATM0S/testDeliver@ad44987/chatWidget.js" defer></script>
                `}
              />
            )}
          </div>
        </div>
        <p className="text-sm text-yellow-600">
          Copy the script and paste it to your website.
        </p>
        <button
          onClick={() => setShowPopUp(false)}
          className="rounded-3xl bg-blue-500 text-white px-4 py-2 border border-white hover:bg-white hover:text-blue-500 hover:border-stone-400 hover:border"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default WebsitePopup;
