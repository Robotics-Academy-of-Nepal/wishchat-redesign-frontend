import { useNavigate } from "react-router-dom";
import logo from "../../assets/wishchat-logo.png";
import { LuArrowRight } from "react-icons/lu";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-start justify-start">
        <img src={logo} className="h-28 w-28" />
      </div>

      <div className="flex items-center justify-center gap-12 py-3 font-sans text-2xl">
        <button className="hover:text-blue-400">Home</button>
        <button className="hover:text-blue-400">Tutorials</button>
        <button className="hover:text-blue-400">Features</button>
        <button
          className="hover:opacity-35"
          onClick={() => navigate("/pricing")}
        >
          Pricing
        </button>
      </div>
      <div>
        <button
          onClick={() => navigate("/login")}
          className="flex items-center justify-center bg-white text-black hover:bg-blue-500 hover:text-white py-2 px-5 mt-2 me-2 rounded-full shadow-md transition-colors duration-700 w-35 font-light text-lg group"
        >
          <span>Sign Up</span>
          <div className="ml-2 bg-blue-500 text-white group-hover:bg-white group-hover:text-blue-500 duration-700 transition-colors rounded-full w-6 h-6 flex items-center justify-center">
            <LuArrowRight />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
