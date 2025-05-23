import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  LuArrowRight, 
  LuUpload, 
  LuMessageSquare, 
  LuRocket, 
//   LuCheckCircle,
  LuPlay,
  LuFileText,
  LuSettings,
  LuGlobe
} from "react-icons/lu";
import { FiStar } from "react-icons/fi";
import { RiRobot3Line } from "react-icons/ri";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Tutorials = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  
  // Animation for floating bubbles
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      id: 1,
      title: "Build Your Knowledge Base",
      subtitle: "Upload files and texts to train your chatbot",
      description: "Start by uploading documents, PDFs, text files, or directly paste content that your chatbot will use to answer questions. Our AI will process and understand your content.",
      icon: LuUpload,
      color: "from-blue-500 to-indigo-600",
      bgColor: "from-blue-50 to-indigo-100",
      features: [
        "Upload multiple file formats (PDF, TXT, DOCX)",
        "Direct text input support",
        "Automatic content processing",
        "Smart content categorization"
      ],
      gifPlaceholder: "Step 1: Upload files and build knowledge base"
    },
    {
      id: 2,
      title: "Test in Playground",
      subtitle: "Chat and refine your bot's responses",
      description: "Use our interactive playground to test your chatbot's knowledge. Ask questions, review responses, and fine-tune the context to ensure accurate answers.",
      icon: LuMessageSquare,
      color: "from-purple-500 to-pink-600",
      bgColor: "from-purple-50 to-pink-100",
      features: [
        "Real-time chat testing",
        "Response accuracy metrics",
        "Context adjustment tools",
        "Conversation history tracking"
      ],
      gifPlaceholder: "Step 2: Test chatbot in playground environment"
    },
    {
      id: 3,
      title: "Deploy Your Chatbot",
      subtitle: "Fill forms and launch your AI assistant",
      description: "Configure your chatbot settings, customize appearance, set deployment options, and launch your AI assistant with a single click.",
      icon: LuRocket,
      color: "from-green-500 to-emerald-600",
      bgColor: "from-green-50 to-emerald-100",
      features: [
        "Custom branding options",
        "Integration settings",
        "Domain configuration",
        "One-click deployment"
      ],
      gifPlaceholder: "Step 3: Configure and deploy your chatbot"
    }
  ];

  const toggleStepCompletion = (stepId) => {
    setCompletedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden bg-gradient-to-b from-indigo-50 to-white">
      {/* Floating animated bubbles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-indigo-200 opacity-10 animate-float"
            style={{
              width: `${Math.random() * 60 + 30}px`,
              height: `${Math.random() * 60 + 30}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 15 + 10}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Header Section */}
      <div className="m-4 md:m-6 lg:m-8 rounded-3xl flex flex-col gap-6 pb-8 bg-gradient-to-br from-white via-indigo-100 to-indigo-300 shadow-xl overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-200 rounded-full opacity-20 transform translate-x-20 -translate-y-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-300 rounded-full opacity-20 transform -translate-x-10 translate-y-10 animate-pulse" style={{ animationDuration: '4s' }}></div>

        <Navbar />
        
        {/* Hero Content */}
        <div className="px-4 md:px-12 lg:px-20 pt-8">
          <div className="text-center">
            <div className="flex justify-center items-center mb-6">
              <div className="bg-indigo-600 rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
                <RiRobot3Line className="text-3xl text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent mb-4">
              Deploy Your Chatbot
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-6 max-w-3xl mx-auto">
              Follow these simple steps to create, test, and deploy your AI-powered chatbot in minutes
            </p>
            
            {/* Progress indicator */}
            <div className="flex justify-center items-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                <FiStar className="text-indigo-500" /> 3 Simple Steps
              </div>
              <div className="flex items-center gap-2">
                <FiStar className="text-indigo-500" /> Easy Setup
              </div>
              <div className="flex items-center gap-2">
                <FiStar className="text-indigo-500" /> Fast Deployment
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tutorial Steps */}
      <div className="py-16 px-4 relative">
        <div className="max-w-7xl mx-auto">
          {/* Steps Timeline */}
          <div className="flex flex-col gap-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = completedSteps.includes(step.id);
              const isActive = currentStep === index;
              
              return (
                <div key={step.id} className="relative">
                  {/* Connection line (except for last step) */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute left-1/2 top-32 w-px h-32 bg-gradient-to-b from-indigo-300 to-transparent transform -translate-x-1/2"></div>
                  )}
                  
                  <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                    {/* Content Side */}
                    <div className="flex-1 max-w-lg">
                      <div className={`bg-gradient-to-br ${step.bgColor} rounded-2xl p-8 shadow-lg transform transition-all duration-500 ${isActive ? 'scale-105 shadow-xl' : ''}`}>
                        {/* Step Header */}
                        <div className="flex items-center gap-4 mb-6">
                          <div className={`bg-gradient-to-r ${step.color} rounded-full w-12 h-12 flex items-center justify-center shadow-lg`}>
                            <Icon className="text-2xl text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                              Step {step.id}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800">
                              {step.title}
                            </h3>
                          </div>
                          
                          {/* Completion Toggle */}
                          <button 
                            onClick={() => toggleStepCompletion(step.id)}
                            className={`ml-auto transition-colors duration-300 ${isCompleted ? 'text-green-500' : 'text-gray-300 hover:text-green-400'}`}
                          >
                            {/* <LuCheckCircle className="text-2xl" /> */}
                          </button>
                        </div>
                        
                        <p className="text-lg font-medium text-gray-700 mb-2">
                          {step.subtitle}
                        </p>
                        
                        <p className="text-gray-600 mb-6">
                          {step.description}
                        </p>
                        
                        {/* Features List */}
                        <div className="space-y-3 mb-6">
                          {step.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <div className={`bg-gradient-to-r ${step.color} rounded-full w-2 h-2 flex-shrink-0`}></div>
                              <span className="text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                        
                        {/* Action Button */}
                        <button 
                          onClick={() => {
                            if (step.id === 1) navigate("/build");
                            else if (step.id === 2) navigate("/playground");
                            else if (step.id === 3) navigate("/deploy");
                          }}
                          className={`flex items-center gap-3 bg-gradient-to-r ${step.color} text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 group`}
                        >
                          {step.id === 1 && <LuFileText className="text-lg" />}
                          {step.id === 2 && <LuMessageSquare className="text-lg" />}
                          {step.id === 3 && <LuSettings className="text-lg" />}
                          Go to {step.id === 1 ? 'Build' : step.id === 2 ? 'Playground' : 'Deploy'}
                          <LuArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                    
                    {/* GIF/Video Side */}
                    <div className="flex-1 max-w-lg">
                      <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-xl">
                        {/* GIF Placeholder */}
                        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative group cursor-pointer">
                          <div className="text-center">
                            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg mb-4 mx-auto group-hover:scale-110 transition-transform">
                              <LuPlay className="text-2xl text-indigo-600 ml-1" />
                            </div>
                            <p className="text-gray-600 font-medium">
                              {step.gifPlaceholder}
                            </p>
                            <p className="text-sm text-gray-400 mt-2">
                              Click to play tutorial video
                            </p>
                          </div>
                          
                          {/* Overlay effect */}
                          <div className="absolute inset-0 bg-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                        </div>
                        
                        {/* Video Info */}
                        <div className="p-4">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            Tutorial Video - Step {step.id}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Watch how to {step.title.toLowerCase()} with our easy-to-follow guide
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Completion Summary */}
          <div className="mt-16 text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
                  <LuGlobe className="text-3xl text-white" />
                </div>
              </div>
              
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Ready to Launch?
              </h3>
              
              <p className="text-lg text-gray-600 mb-6">
                Complete all steps above to deploy your intelligent chatbot and start engaging with your users.
              </p>
              
              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => navigate("/build")}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Start Building
                  <LuArrowRight className="text-lg" />
                </button>
                
                <button 
                  onClick={() => navigate("/dashboard")}
                  className="flex items-center gap-2 bg-gray-100 text-gray-700 px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors duration-300"
                >
                  Back to Dashboard
                </button>
              </div>
              
              {/* Progress indicator */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-center items-center gap-2 text-sm text-gray-500">
                  <span>Progress: {completedSteps.length}/3 steps completed</span>
                  <div className="flex gap-1 ml-2">
                    {[1, 2, 3].map(stepId => (
                      <div 
                        key={stepId}
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          completedSteps.includes(stepId) ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      
      {/* Animation styles */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0) rotate(0);
          }
          33% {
            transform: translateY(-10px) translateX(10px) rotate(5deg);
          }
          66% {
            transform: translateY(10px) translateX(-10px) rotate(-5deg);
          }
          100% {
            transform: translateY(0) translateX(0) rotate(0);
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Tutorials;