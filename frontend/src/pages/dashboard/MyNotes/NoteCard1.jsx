import React, { useState, useContext } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegShareSquare } from "react-icons/fa";
import { AppContext } from "../../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const NoteCard1 = ({ title, tags, content, onDelete, onShare, selectedNote, isSharedFromDB }) => {
  const { backendurl } = useContext(AppContext);
  const { userData } = useContext(AppContext);
  const email = userData?.email || "Unknown User";

  const [isExpanded, setIsExpanded] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [shareTags, setShareTags] = useState([]);
  const [isShared, setIsShared] = useState(isSharedFromDB);

  const toggleExpand = () => setIsExpanded(!isExpanded);
  const toggleShare = () => setIsSharing(!isSharing);

  const addTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() && !shareTags.includes(tagInput)) {
      setShareTags([...shareTags, tagInput.trim()]);
    }
    setTagInput("");
  };

  const removeTag = (tagToRemove) => {
    setShareTags(shareTags.filter(tag => tag !== tagToRemove));
  };

  // const handleShare = () => {
  // onShare({ title, content, email, grade, tags: shareTags });
  // setIsSharing(false);
  const handleShare = async (e) => {
    e.preventDefault();

    if (!selectedNote || !selectedNote._id) {
      toast.error("Error: No note selected for sharing.");
      return;
    }
    if (!subject.trim() || !grade.trim() || shareTags.length === 0) {
      toast.error("Please fill in all fields before sharing.");
      return;
    }

    try {
      const response = await axios.post(`${backendurl}/api/community/share`,
        {
          noteId: selectedNote._id,
          userEmail: email,
          grade,
          subject,
          tags: shareTags,
        },
        { withCredentials: true } // Ensure authentication if needed
      );

      if (response.status === 200) {
        toast.success("Note shared successfully!");
        setIsSharing(false);
        setIsShared(true);
      } else {
        toast.error("Failed to share note. Please try again.");
      }
    } catch (error) {
      console.error("Error sharing note:", error);
      toast.error("Failed to share note.");
    }
  };



  return (
    <>
      {isExpanded && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xl z-40 transition-opacity duration-500" onClick={toggleExpand} />
      )}
      {isSharing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xl z-40 transition-opacity duration-500" onClick={toggleShare} />
      )}

      <div
        className={`fixed ${isExpanded ? "top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] h-[30em] w-[40em] z-50" : "relative h-[18em] w-[20em] hover:-translate-y-1"} border-2 border-[rgba(75,30,133,0.5)] rounded-[1.5em] bg-gradient-to-br from-[rgba(75,30,133,1)] via-purple-700/80 to-[rgba(75,30,133,0.2)] text-white font-nunito p-[1.5em] flex justify-center items-left flex-col gap-[1em] backdrop-blur-[12px] hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 ease-in-out`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-fuchsia-500/20 to-transparent opacity-0 transition-opacity duration-500 rounded-[1.5em]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,50,190,0.1),transparent_60%)] animate-pulse" />

        <h1 className="text-[2.2em] font-bold bg-gradient-to-r from-white via-purple-100 to-purple-200 bg-clip-text text-transparent">
          {title}
        </h1>
        <p className={`custom-scroll text-[0.9em] text-purple-100/90 leading-relaxed font-light ${isExpanded ? "h-[calc(100%-10em)] overflow-y-auto pr-2" : "max-h-[3.5em] overflow-hidden"}`}
        style={{
          userSelect: 'text',
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(120, 50, 190, 0.6) rgba(75, 30, 133, 0.3)'
      }}
        >
          {isExpanded ? content : `${content.substring(0, 100)}...`}
        </p>

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

        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => (
            <span key={index} className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-2">
          {isShared ? (
            <span className="absolute bottom-2 left-2 flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-700 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md animate-pulse">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Shared
            </span>
          ) : (
            <button onClick={toggleShare} className="absolute bottom-2 left-2 text-white p-2 rounded-full hover:shadow-lg hover:shadow-white transition-all duration-300 flex items-center justify-center">
              <FaRegShareSquare className="w-6 h-6" />
            </button>
          )}
          <button onClick={onDelete} className="absolute bottom-2 right-2 text-white p-2 rounded-full hover:shadow-lg hover:shadow-white transition-all duration-300 flex items-center justify-center">
            <MdDeleteOutline className="w-6 h-6" />
          </button>
        </div>
      </div>

      {isSharing && (
        <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-w-md bg-gray-800 p-8 rounded-lg shadow-md z-50">
          <h2 className="text-2xl font-bold text-white mb-6">Share Your Note</h2>

          {/* Selected Module */}
          <p className="text-gray-300 text-sm mb-2">
            <span className="font-medium text-white">Selected Module:</span> {title || "No Module Selected"}
          </p>

          {/* User Email */}
          <p className="text-gray-300 text-sm mb-4">
            <span className="font-medium text-white">User:</span> {email}
          </p>

          <form>
            {/* Subject */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                placeholder="Enter subject"
              />
            </div>

            {/* Grade */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">Class / Grade</label>
              <input
                type="text"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                placeholder="Enter grade (e.g., 10th, 12th, College Year 1)"
              />
            </div>

            {/* Tags */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">Tags</label>
              <div className="flex flex-wrap bg-gray-700 p-2 rounded-md">
                {shareTags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-purple-600 text-white px-2 py-1 rounded-full text-sm mr-2 mb-2 flex items-center"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-white hover:text-red-400"
                    >
                      ×
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addTag(e)}
                  placeholder="Add tag & press Enter"
                  className="bg-gray-800 text-white p-2 flex-1 outline-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                onClick={handleShare}
                className="bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
              >
                Share Note
              </button>
            </div>
          </form>
        </div>
      )}


    </>
  );
};

export default NoteCard1;