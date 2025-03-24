import React, { useState, useContext } from "react";
import { FaPlusSquare } from "react-icons/fa";
import { AppContext } from "../../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const CommunityCard = ({ noteId, title, tags, content, userNotes, noteOwner }) => {
    const { backendurl } = useContext(AppContext);
    const { userData } = useContext(AppContext);
    // const email = userData?.email || "Unknown User";

    const isOwner = userData?.email === noteOwner; // Compare with owner's email
    const isAlreadyAdded = isOwner || (Array.isArray(userNotes) && userNotes.some(note => note.noteId === noteId));


    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = () => setIsExpanded(!isExpanded);

    const handleAddToMyNotes = async () => {
        if (isAlreadyAdded) {
            toast.info("This note is already in My Notes.");
            return;
        }

        try {
            const response = await axios.post(`${backendurl}/api/mynotes/add`, {
                noteId,
                title,
                content,
                tags,
                userEmail: email,
            }, { withCredentials: true });

            if (response.status === 200) {
                toast.success("Note added to My Notes successfully!");
            } else {
                toast.error("Failed to add note. Please try again.");
            }
        } catch (error) {
            console.error("Error adding note:", error);
            toast.error("Failed to add note.");
        }
    };

    return (
        <>
            {isExpanded && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-xl z-40 transition-opacity duration-500" onClick={toggleExpand} />
            )}

            <div
                className={`fixed ${isExpanded ? "top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] h-[30em] w-[40em] z-50" : "relative h-[18em] w-[20em] hover:-translate-y-1"} border-2 border-[rgba(75,30,133,0.5)] rounded-[1.5em] bg-gradient-to-br from-[rgba(75,30,133,1)] via-purple-700/80 to-[rgba(75,30,133,0.2)] text-white font-nunito p-[1.5em] flex justify-center items-left flex-col gap-[1em] backdrop-blur-[12px] hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 ease-in-out`}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-fuchsia-500/20 to-transparent opacity-0 transition-opacity duration-500 rounded-[1.5em]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,50,190,0.1),transparent_60%)] animate-pulse" />

                <h1 className="text-[2.2em] font-bold bg-gradient-to-r from-white via-purple-100 to-purple-200 bg-clip-text text-transparent">
                    {title}
                </h1>
                <p className={`custom-scroll text-[0.9em] text-purple-100/90 leading-relaxed font-light ${isExpanded ? "max-h-[20em] overflow-auto" : "max-h-[3.5em] overflow-hidden"}`}>
                    {isExpanded ? content : `${content.substring(0, 100)}...`}
                </p>

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
                    {isOwner && (
                        <p className="absolute bottom-2 left-2 flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-700 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md animate-pulse">
                            Owned
                        </p>
                    )}
                    {!isAlreadyAdded && (
                        <button onClick={handleAddToMyNotes} className="absolute bottom-2 left-2 text-white p-2 rounded-full hover:shadow-lg hover:shadow-white transition-all duration-300 flex items-center justify-center">
                            <FaPlusSquare className="w-6 h-6" />
                        </button>
                    )}
                </div>

            </div>
        </>
    );
};

export default CommunityCard;
