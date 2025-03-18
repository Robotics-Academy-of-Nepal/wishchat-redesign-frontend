import { FaSquareInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import logo from "../../assets/wishchat-logo.png";
const Footer = () => {
  return (
    <div className="md:flex-row md:flex sm:flex-col sm:gap-[50px] justify-evenly py-12 border-t-2 border-gray-500 mx-6">
      {/* Company Info */}
      <div className="flex flex-col gap-2 items-center justify-center md:justify-start md:items-start">
        <div className="gap-2 items-start flex justify-start flex-col">
          <div className="w-full flex justify-center">
            <img src={logo} className="h-[150px] w-[150px] bg-white" />
          </div>
          <h1>
            Your go to platform for seamless
            <br />
            communication.
          </h1>
        </div>
        <div className="flex gap-2 items-center justify-center w-full">
          <a href="" className="text-3xl">
            <FaSquareInstagram />
          </a>
          <a href="" className="text-3xl">
            <FaFacebook />
          </a>
          <a href="" className="text-4xl">
            <CiLinkedin />
          </a>
        </div>
      </div>

      {/* Useful Links */}
      <div className="flex justify-evenly md:gap-28 mt-10">
        <div className="flex flex-col md:justify-start">
          <h1 className="font-bold text-xl">Useful Links</h1>
          <div className="flex flex-col space-y-0.5 text-md">
            <a href="#">Home</a>
            <a href="#">Chatbot</a>
            <a href="#">Build</a>
            <a href="#">Tutorials</a>
          </div>
        </div>
        <div className="flex flex-col md:justify-start">
          <h1 className="font-bold text-xl">Get in Touch</h1>
          <div className="flex flex-col space-y-0.5 text-md">
            <a href="#">Kupandol, Lalitpur</a>
            <a href="#">Wishchat@gmail.com</a>
            <a href="#">123-456-789</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
