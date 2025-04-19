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
    <div className="pt-12 px-4 md:px-5 rounded-t-2xl">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">

        <div className="lg:w-[20%] w-full flex flex-col items-center lg:items-start">
          <h2 className="text-4xl font-bold text-indigo-700 mt-6 text-center lg:text-left">
            Features
          </h2>
          <p className="text-gray-600 mt-2 text-sm text-center lg:text-left">
            All the powerful tools you need to automate your business communication.
          </p>
        </div>

        <div className="lg:w-[80%] w-full p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-slate-50 w-full p-6 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="text-white bg-indigo-500 p-3 rounded-full text-xl shadow-md">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
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
