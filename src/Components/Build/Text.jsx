import { LuArrowRight } from "react-icons/lu";
const Text = () => {
  return (
    <div className="w-full px-10">
      <div className="w-full flex flex-col gap-4 p-6 items-center rounded-2xl bg-white">
        <p className="font- text-2xl">Text Input</p>
        <textarea
          className="h-44 w-full border-2 border-stone-300 rounded-2xl placeholder:text-2xl placeholder:text-stone-400 placeholder:font-light px-6 py-2"
          placeholder="Enter text to train your chatbot... "
        ></textarea>
        <div className="w-full flex justify-between">
          <button className="flex items-center justify-evenly p-3 px-6 rounded-full text-stone-400 border border-gray-400 text-2xl font-light ">
            Cancel
          </button>
          <button className="flex items-center justify-evenly py-3 px-6 gap-3 bg-blue-500 rounded-full text-white text-2xl font-light">
            Upload
            <div className="h-[30px] w-[30px] text-blue-500 bg-white rounded-full flex items-center justify-center">
              <LuArrowRight className="h-5 w-5" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Text;
