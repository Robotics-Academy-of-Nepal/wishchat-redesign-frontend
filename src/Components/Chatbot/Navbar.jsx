import { useNavigate } from "react-router-dom";
import logo from "../../assets/wishchat-logo.png";
import { Link } from "react-router-dom";
import { isActive } from "../../utils/isActive";
const Navbar = () => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className="flex items-center justify-between bg-inherit">
      <div className="flex items-start justify-start">
        <img src={logo} className="h-28 w-28" />
      </div>

      <div className="flex items-center justify-center gap-12 py-3 font-sans text-2xl">
        <Link to="/">
          <button className="hover:opacity-35">Home</button>
        </Link>
        <Link to="/dashboard">
          <button className="hover:opacity-35">Dashboard</button>
        </Link>
        <Link to="/dashboard/teammates">
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
      <div className="flex ">
        <button
          onClick={() => logOut()}
          className="flex items-center justify-center bg-red-800 text-white py-1 px-4 mt-2 me-2 rounded-xl shadow-md hover:bg-gray-100 transition-colors duration-300 font-medium text-lg"
        >
          <span>LogOut</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
