import { LuArrowRight } from "react-icons/lu";
import Navbar from "./Navbar";
import { Outlet, useLocation } from "react-router-dom";
export default function Playground() {
  const location = useLocation();
  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="fixed inset-4 rounded-4xl overflow-scroll flex flex-col bg-gradient-to-br bg-gradient-radial  from-white to-indigo-300">
      <Navbar />
      {isActive("/build") ? (
        <Outlet />
      ) : (
        <div className="h-full mx-[20px] rounded-3xl flex flex-col gap-[120px] pb-36">
          <div className="ml-[150px] mt-[120px] flex flex-col gap-8">
            <h1 className="font-medium text-5xl">
              Hi there,
              <br />
              {"Let's explore the playground"}
            </h1>

            <p className="text-xl">
              You built it, now see it in action! Test
              <br /> your chatbot here.
            </p>
          </div>

          <div className="px-[150px]">
            <div className="bg-white w-full h-[50px] gap-2 rounded-4xl flex px-4 py-3 items-center justify-center">
              <input
                type="text"
                className="w-full h-[50px] placeholder:font-medium placeholder-black px-3  rounded-lg focus:outline-none"
                placeholder="Type Whatever you want...."
              />

              <div className="h-[40px] w-[42px] text-white rounded-full bg-blue-500 flex items-center justify-center">
                <LuArrowRight className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
