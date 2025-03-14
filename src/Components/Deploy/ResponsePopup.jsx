import CopyToClipboard from "./CopyToClipboard";
const ResponsePopup = ({ setShowPopUp, fetchedResponse }) => {
  console.log("popup prop:", fetchedResponse);
  const handleClose = () => {
    setShowPopUp(false);
  };
  return (
    <div className="fixed inset-0 left-0 top-0 h-screen w-full z-30 flex justify-center items-center bg-black/50">
      <div className="p-6 bg-white flex flex-col items-center justify-center space-y-4 rounded-xl shadow-xl m-2 w-full md:w-2/3">
        <h3 className="text-2xl font-semibold">Successful:</h3>
        <div className="w-full flex justify-start flex-col">
          <h6>Webhook URL:</h6>
          <div className="flex w-full gap-2">
            <p className="px-2 py-3 border border-stone-400 rounded-xl w-full text-wrap overflow-x-scroll">
              {fetchedResponse?.webhookurl || "N/A"}
            </p>
            <CopyToClipboard text={fetchedResponse?.webhookurl || ""} />
          </div>
        </div>
        <div className="w-full flex justify-start flex-col">
          <h6>Verify token:</h6>
          <div className="flex w-full gap-2">
            <p className="px-2 py-3 border border-stone-400 rounded-xl w-full">
              {fetchedResponse?.verify_token || "N/A"}
            </p>
            <CopyToClipboard text={fetchedResponse?.verify_token || ""} />
          </div>
        </div>
        <p className="text-sm text-yellow-600">{fetchedResponse.message}</p>
        <button
          onClick={handleClose}
          className="rounded-3xl bg-blue-500 text-white px-4 py-2 border border-white hover:bg-white hover:text-blue-500 hover:border-stone-400 hover:border"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default ResponsePopup;
