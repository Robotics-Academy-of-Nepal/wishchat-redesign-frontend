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
    <div className="fixed left-0 top-0 w-full h-screen bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="font-bold text-2xl mb-4">Create new Chatbot</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
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
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
