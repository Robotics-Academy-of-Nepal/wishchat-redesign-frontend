import { useState } from "react";
import uploadIcon from "../../assets/uploadIcon.png";
import { LuArrowRight } from "react-icons/lu";
const UploadFile = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Handle file selection
  const handleFileChange = (event) => {
    const files = event.target.files; // Get all selected files
    if (files.length > 0) {
      setSelectedFiles(Array.from(files));
    }
  };

  // Handle file upload (for demonstration purposes, no actual upload logic here)
  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      // Placeholder logic for file upload
      selectedFiles.forEach((file) => {
        console.log("File selected:", file);
      });
      alert(`${selectedFiles.length} file(s) uploaded successfully!`);
    } else {
      alert("Please select at least one file.");
    }
  };

  return (
    <div className="w-full px-8 flex flex-col items-center gap-10 -mt-2">
      <input
        type="file"
        id="fileUpload"
        onChange={handleFileChange}
        className="hidden"
        multiple
      />
      <label
        htmlFor="fileUpload"
        className="flex flex-col justify-center items-center gap-1.5 w-full bg-white rounded-[50px] border-4 border-stone-400 border-dashed text-xl p-10"
      >
        <img src={uploadIcon} alt="Upload Icon" className="mb-2" />
        Drop your files here
        <br />
        <span className="text-lg text-stone-400">{`(PDF, DOCX, DOC or TXT)`}</span>
        {selectedFiles.length > 0 && (
          <div className="mt-4">
            <h3>Selected Files:</h3>
            <ul>
              {selectedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </label>

      <button
        onClick={handleUpload}
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

export default UploadFile;
