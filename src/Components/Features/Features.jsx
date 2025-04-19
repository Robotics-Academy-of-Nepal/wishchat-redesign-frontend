import React from "react";
import Navbar from "../Homepage/Navbar";
import FeatureSection from "./FeatureSection";

const Features = () => {
  return (
    <div>
      <div className=" md:h-screen rounded flex flex-col bg-radial-[at_0%_0%] from-white from-20% to-indigo-300 ">
        <Navbar />
        <div>
          <FeatureSection />
        </div>
      </div>
    </div>
  );
};

export default Features;
