import Navbar from "../Navbar";
import { FaRegCheckCircle } from "react-icons/fa";
import { LuArrowRight } from "react-icons/lu";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const Deploy = () => {
  const location = useLocation();
  const { id, name, api_key, azure_index, messages_used } =
    location.state || {};
  console.log("deploy state:", location.state);
  const navigate = useNavigate();
  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="fixed inset-4 rounded-4xl overflow-auto bg-gradient-to-br bg-gradient-radial from-white to-indigo-300">
      <Navbar
        id={id}
        name={name}
        api_key={api_key}
        azure_index={azure_index}
        messages_used={messages_used}
      />
      {isActive("/deploy/whatsappForm") || isActive("/deploy/") ? (
        <Outlet />
      ) : (
        <div className="w-full flex flex-col items-center justify-center gap-12 -ml-15">
          <div className="flex flex-col items-start gap-8">
            <div className="mt-[80px] flex flex-col gap-3">
              <h1 className="font-medium text-6xl">
                Deploy Your AI
                <br />
                Chatbot in Minutes
              </h1>

              <p className="text-2xl">
                Seemlessly integrate Wishchat into your website
                <br />
                app, of favorite platform with just a few clicks
              </p>
            </div>
            <ol className="flex flex-col gap-3">
              <li className="flex items-center gap-2">
                <FaRegCheckCircle />
                Customize Your Chatbot
              </li>
              <li className="flex items-center gap-2">
                <FaRegCheckCircle />
                Copy & Paste the Code/Connect API
              </li>
              <li className="flex items-center gap-2">
                <FaRegCheckCircle />
                Go Live & Start engaging Users
              </li>
            </ol>

            <div className="mt-8 flex gap-6">
              <Link
                to={"/deploy/whatsappForm"}
                state={{ id, name, api_key, azure_index, messages_used }}
              >
                <button className="flex gap-4 items-center hover:bg-white transition-colors duration-500 py-2 px-4 text-green-700 rounded-full border-2 border-green-700">
                  Whatsapp{" "}
                  <div className="h-[23px] w-[23px] flex items-center justify-center bg-green-700 rounded-full text-white">
                    <LuArrowRight />
                  </div>
                </button>
              </Link>
              <Link
                to={"/deploy/messengerForm"}
                state={{ id, name, api_key, azure_index, messages_used }}
              >
                <button className="flex gap-4 items-center hover:bg-white transition-colors duration-500 py-2 px-4 text-blue-500 rounded-full border-2 border-blue-500">
                  Messenger
                  <div className="h-[23px] w-[23px] flex items-center justify-center bg-blue-500 rounded-full text-white">
                    <LuArrowRight />
                  </div>
                </button>
              </Link>
              <Link
                to={"/deploy/widgetColorForm"}
                state={{ id, name, api_key, azure_index, messages_used }}
              >
                <Link
                to={"/deploy/websiteForm"}
                state={{ id, name, api_key, azure_index, messages_used }}
              >
                <button className="flex gap-4 items-center hover:bg-white transition-colors duration-500 py-2 px-4 text-blue-500 rounded-full border-2 border-blue-500">
                    Websites
                    <div className="h-[23px] w-[23px] flex items-center justify-center bg-blue-500 rounded-full text-white">
                      <LuArrowRight />
                    </div>
                  </button>
              </Link>
              </Link>
              <button className="flex gap-4 items-center hover:bg-white transition-colors duration-500 py-2 px-4 text-blue-500 rounded-full border-2 border-blue-500">
                Websites
                <div className="h-[23px] w-[23px] flex items-center justify-center bg-blue-500 rounded-full text-white">
                  <LuArrowRight />
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Deploy;
