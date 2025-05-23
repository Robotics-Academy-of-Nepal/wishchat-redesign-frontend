import { useState } from "react";
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
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
    details: "Scale from 1,000 to unlimited messages per month",
  },
  {
    title: "Multi-Platform Integration",
    description:
      "Deploy on WhatsApp, Messenger, and your website for seamless communication.",
    icon: <FaLayerGroup />,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    details: "Connect across 10+ popular messaging platforms",
  },
  {
    title: "Easy Deployment Process",
    description:
      "Set up your chatbot within minutes using copy/paste code or API.",
    icon: <FaRocket />,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50",
    details: "One-click deployment with zero coding required",
  },
  {
    title: "Customizable Chatbot Training",
    description:
      "Train your bot with PDF, DOCX, or TXT files or input data directly.",
    icon: <FaCogs />,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
    details: "Support for 50+ file formats and live training",
  },
  {
    title: "AI Capabilities",
    description:
      "Access core to advanced AI tools — from basic interactions to enterprise-grade AI.",
    icon: <FaRobot />,
    color: "from-indigo-500 to-purple-500",
    bgColor: "bg-indigo-50",
    details: "Powered by GPT-4 and custom AI models",
  },
  {
    title: "Support Levels",
    description:
      "Get standard support with Basic and priority support with higher plans.",
    icon: <FaHandsHelping />,
    color: "from-teal-500 to-blue-500",
    bgColor: "bg-teal-50",
    details: "24/7 support with dedicated account managers",
  },
];

const FeatureCard = ({ feature, index, isActive, onHover, onLeave }) => {
  return (
    <div
      className={`group relative overflow-hidden bg-white rounded-2xl border transition-all duration-500 cursor-pointer transform hover:scale-105 ${
        isActive
          ? "shadow-2xl border-transparent ring-2 ring-blue-200"
          : "shadow-lg border-gray-100 hover:shadow-xl hover:border-transparent"
      }`}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
    >
      {/* Animated background gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
      />

      {/* Floating orb effect */}
      <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />

      <div className="relative p-8">
        {/* Icon container with pulse animation */}
        <div
          className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} text-white text-2xl mb-6 transform group-hover:rotate-6 transition-all duration-300 shadow-lg`}
        >
          <div className="group-hover:scale-110 transition-transform duration-300">
            {feature.icon}
          </div>
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
          {feature.title}
        </h3>

        <p className="text-gray-600 leading-relaxed mb-4 group-hover:text-gray-700 transition-colors duration-300">
          {feature.description}
        </p>

        {/* Expandable details */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isActive ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pt-4 border-t border-gray-100">
            <p className="text-sm text-blue-600 font-medium">
              ✨ {feature.details}
            </p>
          </div>
        </div>

        {/* Hover indicator */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </div>
    </div>
  );
};

const FeatureSection = () => {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <div className="relative pt-20 px-6 md:px-8">
      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-40 right-20 w-40 h-40 bg-purple-200/30 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
            What We Offer
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-8"></div>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Transform your business communication with our comprehensive suite
            of
            <span className="text-blue-600 font-semibold">
              {" "}
              AI-powered tools
            </span>{" "}
            and integrations
          </p>
        </div>

        {/* Enhanced Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              index={index}
              isActive={activeCard === index}
              onHover={setActiveCard}
              onLeave={() => setActiveCard(null)}
            />
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-20">
          <button className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <span className="relative z-10">Explore All Features</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <svg
              className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
