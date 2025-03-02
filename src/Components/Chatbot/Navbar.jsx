import { useNavigate } from "react-router-dom";
import logo from "../../assets/wishchat-logo.png";
import { Link } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between bg-inherit">
      <div className="flex items-start justify-start">
        {/* <img src={logo} className="h-[200px] w-[200px]" /> */}
        <img src={logo} className="h-28 w-28" />
      </div>

      <div className="flex items-center justify-center gap-12 py-3 font-sans text-2xl">
        <Link to="/">
          <button className="hover:opacity-35">Home</button>
        </Link>
        <Link to="/dashboard">
          <button className="hover:opacity-35">Dashboard</button>
        </Link>
        <Link to="/teammates">
          {/* left to be made */}
          <button className="hover:opacity-35">Teammates</button>
        </Link>
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
          className="flex items-center justify-center bg-white text-black py-2 px-5 mt-2 me-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300 w-35 font-medium text-lg"
        >
          <span>Sign Up</span>
          <div className="ml-2 bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
