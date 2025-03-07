import { IoTrashOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Uploaded = ({ id, name }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log(token);
  if (!token) throw new Error("No token found");
  const handleRemove = () => {
    axios
      .delete(`${import.meta.env.VITE_API_URL}api/delete/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    // .finally(() => navigate("/playground/build"));
  };
  return (
    <div className="w-full px-8 flex flex-col gap-4">
      <h3 className="text-start w-full text-lg">Source File:</h3>
      <div className="w-full p-4 border border-stone-400 bg-white rounded-lg flex justify-between">
        <div className="w-full flex  gap-2">
          <div className="flex items-center justify-center h-10 w-10 bg-stone-400 text-center text- text-lg font-light text-black rounded-md">
            src
          </div>
          <span className="flex items-center">{name}.sourcefile</span>
        </div>

        <button
          className="text-red-600 hover:text-red-800 flex items-center gap-1"
          onClick={() => handleRemove()}
        >
          <IoTrashOutline className="h-5 w-5" />
          Remove{" "}
        </button>
      </div>
    </div>
  );
};

export default Uploaded;
