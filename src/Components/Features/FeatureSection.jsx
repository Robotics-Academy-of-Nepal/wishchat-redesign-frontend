import React from "react";
import {
  FaRegLightbulb,
  FaLayerGroup,
  FaRocket,
  FaCogs,
  FaRobot,
  FaHandsHelping,
} from "react-icons/fa";

const features = [
  {
    title: "Flexible Subscription Plans",
    description:
      "Choose from Basic, Standard, and Premium plans with monthly message limits for all business sizes.",
    icon: <FaRegLightbulb />,
  },
  {
    title: "Multi-Platform Integration",
    description:
      "Deploy on WhatsApp, Messenger, and your website for seamless communication.",
    icon: <FaLayerGroup />,
  },
  {
    title: "Easy Deployment Process",
    description:
      "Set up your chatbot within minutes using copy/paste code or API.",
    icon: <FaRocket />,
  },
  {
    title: "Customizable Chatbot Training",
    description:
      "Train your bot with PDF, DOCX, or TXT files or input data directly.",
    icon: <FaCogs />,
  },
  {
    title: "AI Capabilities",
    description:
      "Access core to advanced AI tools — from basic interactions to enterprise-grade AI.",
    icon: <FaRobot />,
  },
  {
    title: "Support Levels",
    description:
      "Get standard support with Basic and priority support with higher plans.",
    icon: <FaHandsHelping />,
  },
];

const FeatureSection = () => {
  return (
    <div className="pt-16 px-4 md:px-8 rounded-t-3xl mb-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* Section Header */}
        <div className="lg:w-1/4 w-full flex flex-col items-center lg:items-start">
          <span className="text-blue-600 font-medium text-sm uppercase tracking-wider mb-2">
            What We Offer
          </span>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-blue-700 bg-clip-text text-transparent mt-2 text-center lg:text-left">
            Features
          </h2>
          <div className="h-1 w-20 bg-blue-500 rounded-full mt-4 mb-6"></div>
          <p className="text-gray-600 text-base leading-relaxed text-center lg:text-left">
            All the powerful tools you need to automate your business
            communication.
          </p>
        </div>

        {/* Features Grid */}
        <div className="lg:w-3/4 w-full pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white w-full p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-indigo-100 group"
              >
                <div className="flex items-start gap-5">
                  <div className="text-white bg-gradient-to-br from-blue-500 to-blue-700 p-3 rounded-lg text-xl shadow-md group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
