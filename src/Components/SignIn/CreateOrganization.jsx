import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const CreateOrganization = () => {
  const [name, setName] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(
        `${import.meta.env.VITE_API_URL}auth/organizations/create/`,
        { name: name },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        navigate("/dashboard");
      });
  };
  return (
    // <div className="fixed inset-4 rounded-[50px] bg-gradient-to-br from-white to-indigo-300 flex justify-center items-center">
    <div className="fixed inset-0 rounded-[50px] gradient- flex justify-center items-center">
      <div className="bg-radial from-blue-300 to-white py-10 flex flex-col space-y-4 items-center rounded-xl lg:w-5/12">
          <h2 className="font-bold text-5xl">Create Organization</h2>
          <p className="text-sm text-center text-gray-500 font-semibold">
            Create an orgainzation to collaborate with your teammates now.
          </p>
        <form onSubmit={handleSubmit} className="w-full px-2">
          <div className="mb-4 bg-white shadow-xl p-4 rounded-lg flex flex-col space-y-2">
            <label className="block text-gray-700 font-bold">
              Organization
            </label>
            <input
              className="border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:ring-2 focus:ring-blue-500"
              name="name"
              type="text"
              placeholder="Enter organization name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <p className="text-xs text-gray-500">
              This name will not be public and doesn&apos;t need to be unique.
            </p>
          </div>
          {/* <div className="flex justify-end space-x-3"> */}
          {/* <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full"
              //   onClick={onCancel}
            >
              Cancel
            </button> */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
            onClick={handleSubmit}
          >
            Create Organization
          </button>
          {/* </div> */}
        </form>
      </div>
    </div>
  );
};

export default CreateOrganization;
