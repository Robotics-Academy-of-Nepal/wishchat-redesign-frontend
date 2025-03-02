import { FaSquareInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import logo from "../assets/wishchat-logo.png"
const Footer = () => {
  return (
       <div className="md:flex-row md:flex sm:flex-col sm:gap-[50px] justify-evenly">
        
            {/* Company Info */}
            <div className="flex flex-col gap-2 items-center justify-center md:justify-start md:items-start">
              <div className="items-start flex justify-start flex-col">
                <img src={logo} className="h-[150px] w-[150px]" />
                <h1>Your go to platform for seamless<br />communication.</h1>
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
            <div className="flex flex-col gap-3 items-center justify-center md:justify-start md:items-start">
              <h1 className="font-bold">Useful Links</h1>
              <div className="flex flex-col gap-1 space-y-2.5">
                <a href="#">Home</a>
                <a href="#">Chatbot</a>
                <a href="#">Build</a>
                <a href="#">Tutorials</a>
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-3 items-center justify-center md:justify-start md:items-start">
              <h1 className="font-bold">Get in Touch</h1>
              <div className="flex flex-col gap-1">
                <h1>Kupandol, Lalitpur</h1>
                <h1>Wishchat@gmail.com</h1>
                <h1>123-456-789</h1>
              </div>
            </div>
          </div>
  )
}

export default Footer
