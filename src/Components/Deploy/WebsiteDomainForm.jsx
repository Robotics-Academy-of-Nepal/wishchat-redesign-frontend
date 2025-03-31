import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import WebsitePopup from "./WebsitePopup";
import { LuArrowRight } from "react-icons/lu";

const WebsiteDomainForm = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const location = useLocation();
  const { id, api_key } = location.state || {};
  const [domain, setDomain] = useState("");
  console.log("domain state:", location.state);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}auth/${id}/colors/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        console.log("fetch res:", response);
        console.log("data:", response.data);
      })
      .catch((error) => {
        console.error("form error:", error);
      });
  }, [token, id]);
  const handleSubmit = (e) => {
    e.preventDefault();

    const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,6}$/;

    if (!domainRegex.test(domain)) {
      console.log("Invalid domain");
      return;
    }

    axios
      .post(
        `${import.meta.env.VITE_API_URL}auth/${id}/add/domain/`,
        { domain_name: domain },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Submitted domain:", domain);
        console.log("form res:", response);
        console.log("data:", response.data);
      })
      .catch((error) => {
        console.error("form error:", error);
      });
  };

  return (
    <div className="rounded-2xl flex items-center justify-center p-6">
      {showPopUp && (
        <WebsitePopup
          id={id}
          token={token}
          api_key={api_key}
          setShowPopUp={setShowPopUp}
        />
      )}
      <form className="w-full md:w-2/3 space-y-4" onSubmit={handleSubmit}>
        <h3 className="text-3xl font-medium text-center">Enter Domain</h3>
        <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
          <div className=" flex flex-col w-full items-center">
            <input
              className="w-full text-lg border-2 border-stone-300 rounded-2xl placeholder:text-xl placeholder:text-stone-400 placeholder:font-light px-6 py-4 flex justify-center items-center"
              placeholder="Enter text to train your chatbot... "
              value={domain}
              onChange={(e) => {
                setDomain(e.target.value);
              }}
            />
          </div>
          <p className="text-center text-yellow-500">
            The domain enter here is only allowed for the use this chatbot.
          </p>
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-500 text-white hover:text-blue-500 hover:bg-white transition-colors duration-700 rounded-full py-2 px-4 border border-blue-500"
            >
              Submit
            </button>
            <button
              onClick={() => setShowPopUp(true)}
              className="flex rounded-full items-center gap-1 py-2 px-4 border border-stone-400 text-gray-800 hover:bg-gray-400 hover:text-white duration-700 duration transition-all"
              type="button"
            >
              {"Next"}
              <div
                className={`h-[15px] w-[15px] rounded-full flex items-center justify-center`}
              >
                <LuArrowRight className="h-5 w-5" />
              </div>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default WebsiteDomainForm;
