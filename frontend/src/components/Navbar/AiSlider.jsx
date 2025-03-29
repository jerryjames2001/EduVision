import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegStickyNote, FaQuestionCircle } from "react-icons/fa";

const AiSlider = ({ isExpanded, setIsExpanded }) => {
  useEffect(() => {
    if (window.innerWidth < 640) {
      setIsExpanded(false); // Collapse on small screens
    }
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-gray-900 text-white transition-all duration-300 ${isExpanded ? "w-auto sm:w-32 md:w-40 lg:w-56 xl:w-64" : "w-14"
          } rounded-md p-4`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute top-1/2 -right-3.5 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full shadow-md"
        >
          {isExpanded ? "<" : ">"}
        </button>

        {/* Menu Content */}
        {isExpanded ? (
  <div className="text-center font-poppins font-semibold mt-10">
    <h2 className="text-xl font-semibold mb-8 text-blue-400">
      Dashboard Menu
    </h2>
    <Link to="/summary" className="block p-2 hover:bg-blue-700 rounded-lg mb-4">
      Note Summarizer
    </Link>
    <Link to="/question" className="block p-2 hover:bg-blue-700 rounded-lg mb-4">
      Question Generator
    </Link>
  </div>
) : (
  // Icons only when collapsed
  <div className="mt-16 flex flex-col gap-6">
    <Link to="/summary" className="text-white hover:text-blue-400">
      <FaRegStickyNote size={24} />
    </Link>
    <Link to="/question" className="text-white hover:text-blue-400">
      <FaQuestionCircle size={24} />
    </Link>
  </div>
)}

      </div>

    </div>
  );
};

export default AiSlider;
