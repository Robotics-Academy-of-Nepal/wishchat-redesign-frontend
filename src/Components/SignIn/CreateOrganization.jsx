import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";

const CreateOrganization = () => {
  const [name, setName] = useState("");
  const [creatingOrganiztion, setCreatingOrganization] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreatingOrganization(true);
    axiosInstance
      .post(`${import.meta.env.VITE_API_URL}auth/organizations/create/`, {
        name: name,
      })
      .then((response) => {
        setCreatingOrganization(false);
        localStorage.setItem("org_id", response.id);
        localStorage.setItem("org_name", response.name);
        localStorage.setItem("is_owner", true);
        localStorage.setItem("companyname", response.name);
        console.log(response);
        navigate("/dashboard");
      })
      .catch((error) => {
        toast.error("Error creating organization!!");
        setCreatingOrganization(false);
        console.log(error);
      });
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="bg-radial from-blue-300 to-white p-2 py-6 flex flex-col space-y-4 items-center rounded-xl lg:w-5/12">
        <h2 className="font-bold text-5xl text-center">Create Organization</h2>
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

          <button
            type="submit"
            className={`w-full ${
              creatingOrganiztion || !name
                ? "bg-blue-400"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white font-bold py-2 px-4 rounded-lg`}
            onClick={handleSubmit}
            disabled={creatingOrganiztion || !name}
          >
            {creatingOrganiztion
              ? "Creating Organization..."
              : "Create Organization"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateOrganization;
