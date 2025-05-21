import { IoTrashOutline } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeletePopup = ({ setPopUpOpen, chatbot_id }) => {
  const navigate = useNavigate();
  const deleteChatbot = async () => {
    const token = localStorage.getItem("token");
    axios
      .delete(`${import.meta.env.VITE_API_URL}auth/chatbots/${chatbot_id}/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        console.log(response);
        setPopUpOpen(false);
        localStorage.removeItem("chatbotData");
        navigate("/dashboard");
      });
  };
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 flex flex-col gap-4">
        Are you sure you want to delete the this chatbot?
        <div className="flex gap-4 justify-end">
          <div
            onClick={() => {
              setPopUpOpen(false);
            }}
            className="border border-stone-400 hover:text-white hover:bg-stone-400 p-2 rounded-lg inline transition-colors duration-300 select-none"
          >
            Cancel
          </div>
          <div
            onClick={deleteChatbot}
            className="flex border text-red-500 hover:text-white hover:bg-red-500 p-2 rounded-lg transition-colors duration-300 select-none"
          >
            <IoTrashOutline className="h-5 w-5" />
            Delete
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
