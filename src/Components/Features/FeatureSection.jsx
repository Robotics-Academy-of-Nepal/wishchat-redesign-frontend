import React from "react";

const features = [
  {
    title: "Flexible Subscription Plans",
    description:
      "Choose from Basic, Standard, and Premium plans with monthly message limits for all business sizes.",
  },
  {
    title: "Multi-Platform Integration",
    description:
      "Deploy on WhatsApp, Messenger, and your website for seamless communication.",
  },
  {
    title: "Easy Deployment Process",
    description:
      "Set up your chatbot within minutes using copy/paste code or API.",
  },
  {
    title: "Customizable Chatbot Training",
    description:
      "Train your bot with PDF, DOCX, or TXT files or input data directly.",
  },
  {
    title: "AI Capabilities",
    description:
      "Access core to advanced AI tools — from basic interactions to enterprise-grade AI.",
  },
  {
    title: "Support Levels",
    description:
      "Get standard support with Basic and priority support with higher plans.",
  },
];

const FeatureSection = () => {
  return (
    <div className="bg-none  min-h-screen pt-12 px-4 md:px-5 rounded-t-2xl">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
        <div className="lg:w-[20%] w-full flex flex-col items-center lg:items-start">
          <h2 className="text-3xl md:text-4xl font-bold text- mt-6 text-center lg:text-left">
            Features
          </h2>
        </div>

        {/* Right Side: Cards */}
        <div className="lg:w-[80%] w-full p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-slate-50 w-[90%] p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-indigo-600 mb-1">
                  {feature.title}
                </h3>
                <p className="text-gray-700 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
