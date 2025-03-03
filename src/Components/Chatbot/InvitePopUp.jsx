import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const InvitePopUp = ({ setInvitePopUp }) => {
  const [emails, setEmails] = useState([""]); // Start with one email field
  const getToken = () => localStorage.getItem("token");

  const navigate = useNavigate();
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
      const token = getToken();

      // Redirect to login if token is missing
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}auth/invitations/bulk_invite/`,
          {
            method: "POST",

            headers: {
              Authorization: `Token ${token}`, // Token added here
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ emails: emails }),
          }
        );

        let data = await response.json();
        if (response.ok) {
          console.log(data);
        } else {
          console.error("Error remove user:", data);
        }
      } catch (error) {
        console.error("Failed remove user:", error);
      }
    };

    remove();
  };
  return (
    <div className="fixed top-0 h-screen w-full z-30 flex items-center justify-center bg-black/50">
      <div className="w-[600px] p-6 rounded-xl border bg-white text-black shadow-lg">
        <h2 className="text-xl font-bold mb-4">Invite Members</h2>

        {emails.map((email, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                const newEmails = [...emails];
                newEmails[index] = e.target.value;
                setEmails(newEmails);
              }}
              className="w-full p-2 border rounded-md"
              placeholder="Enter email"
            />
            <button
              onClick={addField}
              className="px-3 p-1 bg-green-700 text-white rounded-md"
            >
              +
            </button>
            {emails.length > 1 && (
              <button
                onClick={() => removeField(index)}
                className="px-3 py-1 bg-red-600 text-white rounded-md"
              >
                -
              </button>
            )}
          </div>
        ))}

        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-4 py-2 bg-green-700 text-white rounded-md"
            onClick={() => {
              sendInvitation();
            }}
          >
            Invite
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
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
