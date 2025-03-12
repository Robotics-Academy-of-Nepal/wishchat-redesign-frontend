import { FaSquareInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import logo from "../../../public/Logo.png";
const Footer = () => {
  return (
    <div className="md:flex-row md:flex sm:flex-col sm:gap-[50px] justify-evenly py-14 border-t-2 border-gray-500 mx-6">
      {/* Company Info */}
      <div className="flex flex-col gap-2 items-center justify-center md:justify-start md:items-start">
        <div className="gap-2 items-start flex justify-start flex-col">
          <img src={logo} />
          <h1>
            Your go to platform for seamless
            <br />
            communication.
          </h1>
        </div>
        <div className="flex gap-2 items-center justify-start">
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
      <div className="flex gap-28">
        <div className="flex flex-col gap-2.5 items-center justify-center md:justify-start md:items-start">
          <h1 className="font-bold text-xl">Useful Links</h1>
          <div className="flex flex-col space-y-0.5 text-lg">
            <a href="#">Home</a>
            <a href="#">Chatbot</a>
            <a href="#">Build</a>
            <a href="#">Tutorials</a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-3 items-center justify-center md:justify-start md:items-start">
          <h1 className="font-bold text-xl">Get in Touch</h1>
          <div className="flex flex-col gap-0.5 ">
            <h1>Kupandol, Lalitpur</h1>
            <h1>Wishchat@gmail.com</h1>
            <h1>123-456-789</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
