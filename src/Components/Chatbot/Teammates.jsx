import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import InvitePopUp from "./InvitePopUp";

const Teammates = () => {
  const [loading, setLoading] = useState(true);
  const [invitePopUp, setInvitePopUp] = useState(false);
  const [members, setMembers] = useState(null);
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
          // setMembers((prevMembers) => {
          //   prevMembers.filter((member) => member.id !== id);
          //   console.log(prevMembers);
          //   return prevMembers;
          // });
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
          // const teammates = [

          //   {
          //     email: "khatrinikace@gmail.com",
          //     first_name: "Nikace",
          //     id: 7,
          //     is_active: true,
          //     is_owner: false,
          //     is_staff: false,
          //     is_superuser: false,
          //     last_name: "Khatri",
          //     organization: { id: 2, name: "sabin organization" },
          //     phone_number: "",
          //     username: "khatrinikace",
          //   },
          //   {
          //     email: "aakritip512@gmail.com",
          //     first_name: "Aakriti",
          //     id: 8,
          //     is_active: true,
          //     is_owner: false,
          //     is_staff: false,
          //     is_superuser: false,
          //     last_name: "Rai",
          //     organization: { id: 2, name: "sabin organization" },
          //     phone_number: "",
          //     username: "aakritip512",
          //   },
          //    {
          //     email: "sabin11ds@gmail.com",
          //     first_name: "Sabin",
          //     id: 2,
          //     is_active: true,
          //     is_owner: true,
          //     is_staff: false,
          //     is_superuser: false,
          //     last_name: "",
          //     organization: { id: 2, name: "sabin organization" },
          //     phone_number: "",
          //     username: "sabin11ds",
          //   },
          //   {
          //     email: "shtshikhar12@gmail.com",
          //     first_name: "Shikhar",
          //     id: 9,
          //     is_active: true,
          //     is_owner: false,
          //     is_staff: false,
          //     is_superuser: false,
          //     last_name: "Shrestha",
          //     organization: { id: 2, name: "sabin organization" },
          //     phone_number: "",
          //     username: "shtshikhar12",
          //   },
          // ];
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
    <div className="">
      <h1 className="font-bold text-3xl">Teammates</h1>
      <p className="text-xl font-semibold">Members</p>

      {loading ? (
        <p className="text-center text-black">Loading chatbots...</p>
      ) : (
        <table className="border-collapse">
          <tbody>
            {members.map((member) => (
              <tr key={member.id}>
                <td className="px-1 py-2">
                  {`${member.first_name} ${member.last_name}`}
                </td>

                {is_owner && (
                  <td>
                    <button onClick={() => removeUser(member.id)}>
                      <FaTrashAlt />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {invitePopUp && <InvitePopUp setInvitePopUp={setInvitePopUp} />}
      <button
        type="button"
        onClick={() => setInvitePopUp((prev) => !prev)}
        className="border bg-green-700 text-white p-2 rounded-lg"
      >
        Invite
      </button>
    </div>
  );
};

export default Teammates;
