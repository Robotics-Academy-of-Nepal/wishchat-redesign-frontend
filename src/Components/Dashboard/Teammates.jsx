import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoTrashOutline } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import InvitePopUp from "./InvitePopUp";
import Loading from "../Loading";
import GridLoading from "./GridLoading";
const Teammates = () => {
  const [loading, setLoading] = useState(true);
  const [invitePopUp, setInvitePopUp] = useState(false);
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();
  const getToken = () => localStorage.getItem("token");
  const is_owner = JSON.parse(localStorage.getItem("is_owner"));
  const removeUser = (id) => {
    console.log("deletedID:", id);
    const remove = async () => {
      const token = getToken();

      // Redirect to login if token is missing
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}auth/organization-members/${id}/`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Token ${token}`, // Token added here
              "Content-Type": "application/json",
            },
          }
        );

        let data = await response.json();
        if (response.ok) {
          console.log(data);
          setMembers((prevMembers) => {
            const updatedMembers = prevMembers.filter(
              (member) => member.id !== id
            );
            return updatedMembers;
          });
        } else {
          console.error("Error remove user:", data);
        }
      } catch (error) {
        console.error("Failed remove user:", error);
      }
    };

    remove();
  };

  useEffect(() => {
    const fetchMembers = async () => {
      const token = getToken();

      // Redirect to login if token is missing
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}auth/organization-members/`,
          {
            method: "GET",
            headers: {
              Authorization: `Token ${token}`, // Token added here
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          console.log("response data:", data);
          const sortedTeammates = data.sort((a, b) => b.is_owner - a.is_owner);
          console.log("sorted:", sortedTeammates);
          setMembers(sortedTeammates);
        } else {
          console.error("Error fetching chatbots:", data);
        }
      } catch (error) {
        console.error("Failed to fetch chatbots:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [navigate]);

  return (
    <div className="flex flex-col justify-center max-w-[1200px] sm:min-w-[640px] md:min-w-[768px] lg:min-w-[1024px] xl:min-w-[1200px] p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-semibold text-3xl">Teammates</h1>
        <button
          type="button"
          onClick={() => setInvitePopUp((prev) => !prev)}
          className="bg-blue-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-white hover:text-blue-500 transition-colors duration-700"
        >
          Invite
        </button>
      </div>
      {loading ? (
        <GridLoading />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="space-y-4"
        >
          {/* Render Members as List (Cards) */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {members.map((member) => (
              <div
                key={member.id}
                className="p-6 bg-white hover:scale-105 duration-300 transition shadow-md rounded-xl flex flex-col items-start space-y-3"
              >
                <div className="text-lg font-semibold text-gray-800 overflow-hidden text-ellipsis w-full">
                  {`${member.first_name} ${member.last_name}`}
                </div>
                <div className="text-sm text-gray-600 overflow-hidden text-ellipsis w-full">
                  {member.email}
                </div>
                <div className="text-sm text-gray-600 overflow-hidden text-ellipsis w-full">
                  {member.username}
                </div>

                {is_owner && (
                  <button
                    onClick={() => removeUser(member.id)}
                    className="mt-4 text-red-600 hover:text-red-800 flex items-center gap-1"
                  >
                    <IoTrashOutline className="h-5 w-5" />
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}
      {invitePopUp && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <InvitePopUp setInvitePopUp={setInvitePopUp} />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default Teammates;
