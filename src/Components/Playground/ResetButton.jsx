import { FaArrowsRotate } from "react-icons/fa6";

const ResetButton = ({ handleClick }) => {
  return (
    <div
      className="flex items-center justify-center rounded-xl p-2 m-2 bg-gray-200 font-bold text-gray-400"
      onClick={handleClick}
    >
      <FaArrowsRotate className="h-5 w-5 hover:rotate-180 transition-transform duration-700" />
    </div>
  );
};

export default ResetButton;
