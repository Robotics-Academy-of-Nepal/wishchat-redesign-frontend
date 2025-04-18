import { LuArrowRight } from "react-icons/lu";
import { motion } from "framer-motion";
import { useRef } from "react";

export default function Pricing() {
  const scrollContainerRef = useRef(null);

  const pricing = [
    {
      title: "Basic Plan",
      messages: "5000 Monthly messages",
      price: "NPR 5000",
      time: "monthly",
      features: [
        "Core AI chatbot functionalities.",
        "Suitable for small-scale or personal use.",
      ],
    },
    {
      title: "Standard Plan",
      messages: "7000 Monthly messages",
      price: "NPR 7000",
      time: "monthly",
      features: [
        "Everyting in the Basic Plan.",
        "Enhanced AI capabilities.",
        "Priority Support.",
      ],
    },
    {
      title: "Premium Plan",
      messages: "10000 Monthly messages",
      price: "NPR 10000",
      time: "monthly",
      features: [
        "Everything in the Standard Plan.",
        "Ideal for medium-scale business.",
      ],
    },
  ];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };
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
        className="relative w-full"
      >
        <button
          onClick={scrollLeft}
          className="absolute lg:hidden left-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 bg-blue-500/50 text-white rounded-full"
        >
          &lt;
        </button>

        <div
          ref={scrollContainerRef}
          className="w-full overflow-x-auto no-scrollbar snap-x snap-mandatory flex gap-2 p-1 lg:grid overflow-hidden   lg:grid-cols-3"
        >
          {pricing.map((detail, index) => {
            return (
              <div
                className="flex-shrink-0 flex snap-start justify-center w-full md:w-1/2 lg:w-full"
                key={index}
              >
                <div className=" h-[500px] w-full sm:w-4/5 md:w-full px-6 py-10 bg-white text-gray-800 rounded-3xl shadow-md flex flex-col justify-between">
                  <p className="font-semibold text-3xl">{detail.title}</p>
                  <p className="text-2xl mt-2">{detail.messages}</p>

                  <div className="text-lg flex flex-col justify-center h-full p-4">
                    {detail.features.map((feature, index) => {
                      return <p key={index}>{feature}</p>;
                    })}
                  </div>

                  <p className="text-4xl font-semibold mb-6">
                    {detail.price}
                    <sub className="top-2 text-sm font-light">
                      /{detail.time}
                    </sub>
                  </p>

                  <button className="flex items-center justify-center p-4 gap-2  bg-blue-500 h-14 rounded-full text-white text-lg font-extralight">
                    Get Started Now
                    <div
                      className={`h-[30px] w-[30px] text-blue-500 bg-white rounded-full flex items-center justify-center`}
                    >
                      <LuArrowRight className="h-5 w-5 " />
                    </div>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={scrollRight}
          className="absolute lg:hidden right-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 bg-blue-500/50 text-white rounded-full"
        >
          &gt;
        </button>
      </motion.div>

      <div className="shadow-lg rounded-3xl items-center mt-12 p-6 bg-gray-100 text-gray-800">
        <p className="text-xl font-semibold">Enterprise Plan</p>
        <div className="w-full flex flex-col sm:flex-row gap-2 justify-between my-2">
          <p className="text-3xl font-semibold">
            RS Contact for Pricing
            <sub className="font-normal text-xs">/monthly</sub>
          </p>
          <button
            // onClick={handleUpload}
            className="flex items-center justify-evenly p-4 gap-2 bg-blue-500 h-14 rounded-full text-white text-lg font-extralight"
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
