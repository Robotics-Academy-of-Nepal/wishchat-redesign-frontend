import { useEffect, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegCalendar } from "react-icons/fa6";
import DeletePopup from "./DeletePopup";
import axiosInstance from "../../api/axiosInstance";

const ChatbotDetail = ({ chatbotData }) => {
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [fetchedDetails, setFetchedDetails] = useState({});
  console.log("chatbotdata in chatbot details:", chatbotData);
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  useEffect(() => {
    axiosInstance
      .get(`api/${chatbotData.chatbot_id}/chatbot-quota/`)
      .then((response) => {
        console.log("fetch details:", response.data);
        setFetchedDetails(response.data);
      })
      .catch((error) => {
        console.error("fetch detail error:", error);
      });
  }, [chatbotData.chatbot_id]);

  return (
    <div className="w-full flex flex-col p-6 px-8 mx-4 bg-white rounded-xl ">
      {popUpOpen && (
        <DeletePopup
          setPopUpOpen={setPopUpOpen}
          chatbot_id={chatbotData.chatbot_id}
        />
      )}
      {/* header */}
      <div className="bg-indigo-400 rounded-t-lg p-4 text-white shadow-md">
        <div className="flex items-center  justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">{chatbotData.chatbot_name}</h1>
            <p className="text-blue-100">ID: {chatbotData.chatbot_id}</p>
          </div>
          <div
            className="bg-white rounded p-2 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white"
            onClick={() => {
              setPopUpOpen(true);
            }}
          >
            <IoTrashOutline className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <div className="my-6">
        <h2 className="text-blue-800 text-lg font-semibold mb-4 border-b border-blue-100 pb-2">
          Basic Information
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <FaRegCalendar className="text-blue-500" size={20} />
            <div>
              <p className="text-sm text-gray-500">Created On</p>
              <p className="font-medium">
                {formatDate(chatbotData.created_at)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FaRegCalendar className="text-blue-500" size={20} />
            <div>
              <p className="text-sm text-gray-500">Last Reset</p>
              <p className="font-medium">
                {formatDate(fetchedDetails.last_reset)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* API Information */}
      <div className="mb-6">
        <h2 className="text-blue-800 text-lg font-semibold mb-4 border-b border-blue-100 pb-2">
          API Key
        </h2>
        <div className="flex items-center">
          <p className="font-mono bg-gray-50 p-2 rounded border text-sm overflow-x-auto max-w-xs">
            {chatbotData.api_key}
          </p>
        </div>
      </div>

      {/* Subscription Status */}
      <div className="mb-6">
        <h2 className="text-blue-800 text-lg font-semibold mb-4 border-b border-blue-100 pb-2">
          Subscription Status
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Trial Status */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-blue-800">Trial Status</h3>
              {fetchedDetails.is_trial_valid ? (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <FaRegCheckCircle /> Active
                </span>
              ) : (
                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <FaRegCheckCircle /> Expired
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-500">Start Date</p>
                <p>{formatDate(fetchedDetails.trial_start_date)}</p>
              </div>
              <div>
                <p className="text-gray-500">End Date</p>
                <p>{formatDate(fetchedDetails.trial_end_date)}</p>
              </div>
            </div>
          </div>

          {/* Subscription Status */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-blue-800">Subscription Status</h3>
              {fetchedDetails.is_subscription_valid ? (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <FaRegCheckCircle /> Active
                </span>
              ) : (
                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <FaRegCheckCircle /> Expired
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-500">Start Date</p>
                {fetchedDetails.last_payment_date ? (
                  <p>{formatDate(fetchedDetails.last_payment_date)}</p>
                ) : (
                  <p>{formatDate(fetchedDetails.subscription_start_date_at)}</p>
                )}
              </div>
              <div>
                <p className="text-gray-500">End Date</p>
                <p>{formatDate(fetchedDetails.subscription_end_date)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotDetail;
