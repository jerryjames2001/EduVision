import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";

const NoteCard1 = ({ title, tags, content, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* Background Blur Overlay (Only Visible When Expanded) */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xl z-40 transition-opacity duration-500"
          onClick={toggleExpand} // Close when clicking outside
        />
      )}

      {/* Note Card */}
      <div
        className={`fixed ${isExpanded ? "top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] h-[30em] w-[40em] z-50" : "relative h-[18em] w-[20em] hover:-translate-y-1"
          } border-2 border-[rgba(75,30,133,0.5)] rounded-[1.5em] bg-gradient-to-br from-[rgba(75,30,133,1)] via-purple-700/80 to-[rgba(75,30,133,0.2)] text-white font-nunito p-[1.5em] flex justify-center items-left flex-col gap-[1em] backdrop-blur-[12px] hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 ease-in-out`}
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-fuchsia-500/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-[1.5em]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,50,190,0.1),transparent_60%)] group-hover/card:animate-pulse" />

        {/* Three Small Circles at the Top Right */}
        <div className="absolute top-4 right-4 flex gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-300/50" />
          <div className="w-2 h-2 rounded-full bg-purple-300/30" />
          <div className="w-2 h-2 rounded-full bg-purple-300/10" />
        </div>

        {/* Title & Content */}
        <div className="relative z-10 transition-transform duration-300 space-y-3">
          <h1 className="text-[2.2em] font-bold bg-gradient-to-r from-white via-purple-100 to-purple-200 bg-clip-text text-transparent">
            {title}
          </h1>
          <p
            className={`custom-scroll text-[0.9em] text-purple-100/90 leading-relaxed font-light 
    ${isExpanded ? "max-h-[20em] overflow-auto" : "max-h-[3.5em] overflow-hidden"}
  `}
          >
            {isExpanded ? content : `${content.substring(0, 100)}...`}
          </p>


        </div>

        {/* Expand/Shrink Button */}
        <button
          onClick={toggleExpand}
          className="relative h-fit w-fit px-[1.4em] py-[0.7em] mt-auto border-[1px] border-purple-300/30 
          rounded-full flex justify-center items-center gap-[0.7em] overflow-hidden group/btn 
          hover:border-purple-300/50 hover:shadow-lg hover:shadow-purple-500/20 active:scale-95 
          transition-all duration-300 backdrop-blur-[12px] bg-purple-500/10"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/40 via-fuchsia-500/40 to-purple-600/40 
            translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
          <p className="relative z-10 font-medium tracking-wide">
            {isExpanded ? "Shrink" : "Expand"}
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="relative z-10 w-5 h-5 group-hover/btn:translate-x-[10%] transition-transform duration-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </button>

        {/* Animated Blur Effect */}
        <div className="absolute bottom-4 left-4 w-8 h-8 rounded-full bg-gradient-to-br from-purple-400/20 to-transparent blur-sm group-hover/card:animate-pulse" />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        {/* Delete Button */}
        <button
          className="absolute bottom-2 right-2  text-white p-2 rounded-full hover:shadow-lg hover:shadow-white transition-all duration-300 flex items-center justify-center"
          onClick={onDelete}
        >
          <MdDeleteOutline className="w-6 h-6" />
        </button>
      </div>
    </>
  );
};

export default NoteCard1;
