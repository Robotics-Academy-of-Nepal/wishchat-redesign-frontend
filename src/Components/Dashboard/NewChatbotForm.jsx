import { useState } from "react";

export default function NewChatbotForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({ name: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-radial from-blue-300 to-white p-6 rounded-xl shadow-lg lg:w-5/12">
        <h2 className="font-bold text-4xl text-center mb-4">Create New Chatbot</h2>
        <p className="text-sm text-center text-gray-500 font-semibold mb-4">
          Create an chatbot. Train and integrate to your site.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 bg-white shadow-lg p-4 rounded-xl">
            <label className="block text-gray-700 font-bold mb-2">
              Chatbot Name
            </label>
            <input
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring-2 focus:ring-blue-500"
              name="name"
              type="text"
              placeholder="Enter chatbot name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex space-x-3">
            <button
              type="button"
              className="border duration-500 transition-colors bg-white border-gray-400  text-gray-500 hover:text-white hover:bg-gray-400 font-bold py-1.5 px-4 rounded-lg"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 border-blue-500 border transition-colors duration-500 hover:text-blue-500 hover:bg-white text-white font-bold py-1.5 px-4 rounded-lg"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
