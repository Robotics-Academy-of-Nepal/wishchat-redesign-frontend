import Navbar from "../Navbar";
import FeatureSection from "./FeatureSection";

const Features = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,_rgba(59,130,246,0.1),transparent_50%),radial-gradient(circle_at_80%_20%,_rgba(147,51,234,0.1),transparent_50%),radial-gradient(circle_at_40%_40%,_rgba(6,182,212,0.1),transparent_50%)]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <FeatureSection />
      </div>
    </div>
  );
};
export default Features;
