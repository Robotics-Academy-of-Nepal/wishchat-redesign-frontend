import { useNavigate } from "react-router-dom";
import logo from "../../assets/wishchat-logo.png";
import { LuArrowRight } from "react-icons/lu";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between px-6">
      <div className="flex items-start justify-start h-full">
        <img src={logo} className="h-28 w-28" />
      </div>

      <div className="flex items-center justify-center gap-12 text-lg">
        <button className="hover:text-blue-400">Home</button>
        <button className="hover:text-blue-400">Features</button>
        <button className="hover:text-blue-400">Tutorials</button>
        <button
          className="hover:opacity-35"
          onClick={() => navigate("/dashboard/pricing")}
        >
          Pricing
        </button>
      </div>
      <button
        onClick={() => navigate("/login")}
        className="flex items-center justify-center bg-white text-black hover:bg-blue-500 hover:text-white rounded-full shadow-md transition-colors duration-700 px-4 py-1.5 font-light text-sm group"
      >
        <span>Sign Up</span>
        <div className="ml-2 bg-blue-500 text-white group-hover:bg-white group-hover:text-blue-500 duration-700 transition-colors rounded-full w-6 h-6 flex items-center justify-center">
          <LuArrowRight />
        </div>
      </button>
    </div>
  );
};

export default Navbar;
