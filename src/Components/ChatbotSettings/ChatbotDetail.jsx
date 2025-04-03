import { useChatbot } from "../../context/ChatbotContext";

const ChatbotDetail = () => {
  const { chatbotData } = useChatbot();
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  const usagePercentage =
    (chatbotData.messages_used / chatbotData.message_limit) * 100;

  return (
    <div className="w-full flex flex-col p-6 px-8 mx-4 bg-white rounded-xl">
      {/* header */}
      <div className="bg-indigo-400 rounded-t-lg p-4 text-white shadow-md">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-2xl font-bold">{chatbotData.chatbot_name}</h1>
            <p className="text-blue-100">ID: {chatbotData.chatbot_id}</p>
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <div className="my-6">
        <h2 className="text-blue-800 text-lg font-semibold mb-4 border-b border-blue-100 pb-2">
          Basic Information
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            {/* <Calendar className="text-blue-500" size={20} /> */}
            <div>
              <p className="text-sm text-gray-500">Created On</p>
              <p className="font-medium">
                {formatDate(chatbotData.created_at)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* <Clock className="text-blue-500" size={20} /> */}
            <div>
              <p className="text-sm text-gray-500">Last Reset</p>
              <p className="font-medium">
                {formatDate(chatbotData.last_reset)}
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
              {chatbotData.is_trial_valid ? (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  {/* <CheckCircle size={12} /> Active */}
                </span>
              ) : (
                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  {/* <XCircle size={12} /> Expired */}
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-500">Start Date</p>
                <p>{formatDate(chatbotData.trial_start_date)}</p>
              </div>
              <div>
                <p className="text-gray-500">End Date</p>
                <p>{formatDate(chatbotData.trial_end_date)}</p>
              </div>
            </div>
          </div>

          {/* Subscription Status */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-blue-800">Subscription Status</h3>
              {chatbotData.is_subscription_valid ? (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  {/* <CheckCircle size={12} /> Active */}
                </span>
              ) : (
                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  {/* <XCircle size={12} /> Inactive */}
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-500">Start Date</p>
                <p>{formatDate(chatbotData.subscription_start_date_at)}</p>
              </div>
              <div>
                <p className="text-gray-500">End Date</p>
                <p>{formatDate(chatbotData.subscription_end_date)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Statistics */}
      <div>
        <h2 className="text-blue-700 text-lg font-semibold mb-4 border-b border-blue-100 pb-2">
          Message Usage
        </h2>
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
          <div className="flex items-center gap-3 mb-3">
            {/* <MessageSquare className="text-blue-500" size={20} /> */}
            <div>
              <p className="text-sm text-gray-600">
                {chatbotData.messages_used} of {chatbotData.message_limit}{" "}
                messages used
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${usagePercentage}%` }}
            ></div>
          </div>
          <p className="text-xs text-right text-gray-500">
            {usagePercentage.toFixed(2)}% used
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatbotDetail;
