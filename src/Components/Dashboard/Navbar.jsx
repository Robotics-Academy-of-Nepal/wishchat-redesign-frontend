import { useNavigate } from "react-router-dom";
import logo from "../../assets/wishchat-logo.png";
import { Link } from "react-router-dom";
import Profile from "../Navbar/Profile";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex w-full items-center sticky justify-between bg-inherit px-4">
      <div
        className="flex items-start justify-start"
        onClick={() => navigate("/")}
      >
        <img src={logo} className="h-28 w-28" />
      </div>

      <div className="flex items-center justify-center gap-12 py-3">
        <Link to="/">
          <button className="hover:text-blue-400">Home</button>
        </Link>
        <Link to="/dashboard">
          <button className="hover:text-blue-400">Dashboard</button>
        </Link>
        <Link to="/dashboard/teammates">
          <button className="hover:text-blue-400">Teammates</button>
        </Link>
        <Link to="/dashboard/pricing">
          <button className="hover:text-blue-400">Pricing</button>
        </Link>
      </div>

      {/* Profile button */}
      <Profile />
    </nav>
  );
};

export default Navbar;
