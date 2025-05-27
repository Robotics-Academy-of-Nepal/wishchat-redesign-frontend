import { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
const InvitePopUp = ({ setInvitePopUp }) => {
  const [emails, setEmails] = useState([""]); // Start with one email field

  const addField = () => {
    setEmails([...emails, ""]); // Add an empty email field
  };

  const removeField = (index) => {
    if (emails.length > 1) {
      setEmails(emails.filter((_, i) => i !== index)); // Remove the field at the given index
    }
  };
  const sendInvitation = () => {
    const remove = async () => {
      try {
        const response = await axiosInstance.post(
          `auth/invitations/bulk_invite/`,
          emails
        );

        console.log("Invitations sent:", response.data);
        toast.success("Invitation sent!!");
        setInvitePopUp(false);
      } catch (error) {
        console.error("Failed to send invitations:", error);
        toast.error("Error sending invitation!!");
      }
    };

    remove();
  };

  return (
    <div className="fixed top-0 left-0 h-screen z-50 w-full flex items-center justify-center bg-black/50">
      <div className="w-[600px] p-6 rounded-xl bg-radial to-white from-blue-300 text-black shadow-lg">
        <h2 className="text-3xl text-center font-bold mb-4 text-black">
          Invite Members
        </h2>
        <p className="text-sm text-center text-gray-500 font-semibold mb-4">
          Add teammates to collaborate with.
        </p>
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <p className=""></p>
          {emails.map((email, index) => (
            <div key={index} className="flex items-center gap-2 mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  const newEmails = [...emails];
                  newEmails[index] = e.target.value;
                  setEmails(newEmails);
                }}
                className="w-full p-2 border rounded-md focus:ring-2"
                placeholder="Enter email"
              />
              <button
                onClick={addField}
                className="px-3 p-1 bg-white text-gray-500 hover:bg-gray-400 hover:text-white border border-gray-500 rounded-md transition-colors duration-500"
              >
                +
              </button>
              {emails.length > 1 && (
                <button
                  onClick={() => removeField(index)}
                  className="px-3 p-1 bg-white text-gray-500 hover:bg-gray-400 hover:text-white border border-gray-500 rounded-md transition-colors duration-500"
                >
                  -
                </button>
              )}
            </div>
          ))}
          <p className="text-xs text-gray-500">
            {/* This name will not be public and doesn&apos;t need to be unique. */}
            Enter your teammates email id and invite to collaborate.
          </p>
        </div>

        <div className="flex gap-2 mt-6">
          <button
            className="bg-blue-500 border-blue-500 border transition-colors duration-500 hover:text-blue-500 hover:bg-white text-white font-bold py-1.5 px-4 rounded-lg"
            onClick={() => sendInvitation()}
          >
            Invite
          </button>
          <button
            className="border duration-500 transition-colors bg-white border-gray-400  text-gray-500 hover:text-white hover:bg-gray-400 font-bold py-1.5 px-4 rounded-lg"
            onClick={() => setInvitePopUp(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvitePopUp;
