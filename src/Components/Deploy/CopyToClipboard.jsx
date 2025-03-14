import { FaRegCopy } from "react-icons/fa6";
import { useState } from "react";

const CopyToClipboard = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <button
        onClick={handleCopy}
        className="py-2 px-1 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition flex items-center justify-between gap-1"
      >
        <FaRegCopy /> {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
};

export default CopyToClipboard;
