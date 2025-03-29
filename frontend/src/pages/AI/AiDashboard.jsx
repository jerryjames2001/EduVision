import React, { useState } from "react";
import Navbar2 from "../../components/Navbar/Navbar2";
import AiSlider from "../../components/Navbar/AiSlider";

const AiDashboard = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-gradient-to-tr from-[#6a11cb] via-sky-500 to-[#f44d7a] min-h-screen">
      {/* Navbar */}
      <Navbar2 />

      <div className="flex">
        {/* Left Sidebar */}
        <AiSlider isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

        {/* Right-side content */}
        <div
          className={`flex-grow p-6 transition-all duration-300 ${
            isExpanded ? "ml-48 sm:ml-52 md:ml-56 lg:ml-64 xl:ml-72" : "ml-14"
          }`}
        >
          <h1 className="text-black font-semibold text-xl">AI Dashboard</h1>
        </div>
      </div>
    </div>
  );
};

export default AiDashboard;
