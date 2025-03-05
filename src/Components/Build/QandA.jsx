import { LuArrowRight } from "react-icons/lu";
const QandA = () => {
  return (
    <div className="w-full flex items-center justify-center mt-16">
      <button
        // onClick={handleUpload}
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
