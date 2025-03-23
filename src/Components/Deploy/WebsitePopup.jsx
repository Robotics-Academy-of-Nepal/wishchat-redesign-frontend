import { useState, useEffect } from "react";
import CopyToClipboard from "./CopyToClipboard";
import axios from "axios";
const WebsitePopup = ({ id, token, setShowPopUp }) => {
  const [fetchedResponse, setFetchedResponse] = useState(null);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}auth/chatbots/${id}/colors/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        console.log("fetch res:", response);
        console.log("data:", response.data);
        const { id, created_at, updated_at, ...updatedFields } = response.data;
        setFetchedResponse(updatedFields);
        console.log(updatedFields);
      })
      .catch((error) => {
        console.error("form error:", error);
      });
  }, [token, id, setFetchedResponse]);
  return (
    <div className="fixed inset-0 left-0 top-0 h-screen w-full z-30 flex justify-center items-center bg-black/50">
      <div className="p-6 bg-white flex flex-col items-center justify-center space-y-4 rounded-xl shadow-xl m-2 w-full md:w-2/3">
        <h3 className="text-2xl font-semibold">Script</h3>
        <div className="w-full flex justify-start flex-col">
          <div className="flex w-full gap-2">
            <p className="px-2 py-3 border border-stone-400 rounded-xl w-full text-wrap overflow-x-scroll">
              {/* {fetchedResponse && fetchedResponse} */}
            </p>
            {/* <CopyToClipboard text={fetchedResponse?.webhookurl || ""} /> */}
          </div>
        </div>
        {/* <p className="text-sm text-yellow-600">{fetchedResponse.message}</p> */}
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
