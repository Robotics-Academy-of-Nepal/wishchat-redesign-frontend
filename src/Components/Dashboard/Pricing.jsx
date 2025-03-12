import plan from "../pricing/images/Plans.png";
import basic from "../pricing/images/Basic Plan.png";
import basicmessage from "../pricing/images/basicmessage.png";
import month from "../pricing/images/Group 22.png";
import getstarted from "../pricing/images/Group 26.png";
import enterprise from "../pricing/images/Group 29.png";
import { LuArrowRight } from "react-icons/lu";
import { motion } from "framer-motion";

const PricingCard = () => {
  return (
    <div className="flex flex-col items-center p-6 py-[40px] w-full max-w-sm border-2 gap-[80px] rounded-4xl border-gray-300 shadow-lg">
      <div className="flex flex-col items-start gap-5 w-full">
        <img src={basic} alt="Basic Plan" />
        <img src={basicmessage} alt="Basic Plan Message" />
      </div>
      <div className="flex flex-col ps-2 gap-6 items-start justify-center w-full mt-6">
        <img src={month} alt="Monthly Plan" className="h-10 ps-2" />
        <button>
          <img src={getstarted} alt="Get Started" className="h-14" />
        </button>
      </div>
    </div>
  );
};

export default function Pricing() {
  const pricing = [
    {
      title: "Basic Plan",
      messages: "5000 Monthly messages",
      price: "RS 5000",
      time: "monthly",
    },
    {
      title: "Basic Plan",
      messages: "5000 Monthly messages",
      price: "RS 5000",
      time: "monthly",
    },
    {
      title: "Basic Plan",
      messages: "5000 Monthly messages",
      price: "RS 5000",
      time: "monthly",
    },
  ];
  return (
    <div className="container mx-auto py-16 px-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-center mb-[70px]">
        <p className="text-6xl">Plans</p>
        <div className="flex justify-center items-center gap-2 bg-gray-100 p-2 rounded-3xl">
          <button className="bg-blue-500 text-white rounded-3xl px-4 py-2">
            Monthly
          </button>
          <button className="bg-gray-100 text-black rounded-3xl px-3 py-1">
            Annual
          </button>
          <button className="bg-black text-white rounded-3xl px-3 py-1">
            Save 20%
          </button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {pricing.map((detail, index) => {
          return (
            <div
              key={index}
              className="px-6 py-10 bg-white text-gray-800 rounded-3xl shadow-md"
            >
              <p className="font-semibold text-3xl">{detail.title}</p>
              <p className="text-2xl font- mt-2">{detail.messages}</p>
              <p className="text-4xl font-semibold mt-28 mb-6">
                {detail.price}
                <sub className="top-2 text-sm font-light">/{detail.time}</sub>
              </p>
              <button className="flex items-center justify-evenly p-4 gap-2  bg-blue-500 h-14 rounded-full text-white text-lg font-extralight">
                Get Started Now
                <div
                  className={`h-[30px] w-[30px] text-blue-500 bg-white rounded-full flex items-center justify-center`}
                >
                  <LuArrowRight className="h-5 w-5 " />
                </div>
              </button>
            </div>
          );
        })}
      </motion.div>

      {/* Enterprise Plan */}
      {/* <div className="mt-12 px-4">
        <div className="border-2 py-9 flex flex-col md:flex-row items-center justify-between rounded-3xl p-6 border-gray-300 shadow-lg">
          <img
            src={enterprise}
            alt="Enterprise Plan"
            className="h-20 mb-4 md:mb-0"
          />
          <button>
            <img src={getstarted} alt="Get Started" className="h-14" />
          </button>
        </div>
      </div> */}
      <div className="shadow-lg rounded-3xl items-center mt-12 p-6 bg-gray-100 text-gray-800">
        <p className="text-xl font-semibold">Enterprise Plan</p>
        <div className="w-full flex justify-between my-2">
          <p className="text-3xl font-semibold">
            RS Contact for Pricing
            <sub className="font-normal text-xs">/monthly</sub>
          </p>
          <button
            // onClick={handleUpload}
            className="flex items-center justify-evenly p-4 gap-2  bg-blue-500 h-14 rounded-full text-white text-lg font-extralight"
          >
            Get Started Now
            <div
              className={`h-[30px] w-[30px] text-blue-500 bg-white rounded-full flex items-center justify-center`}
            >
              <LuArrowRight className="h-5 w-5 " />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
