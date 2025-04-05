import React, { useState, useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import axios from "axios";
import Button1 from "../Button1"

const NoteCard = ({ title, tags, content }) => {
    const { backendurl } = useContext(AppContext);
    const { userData } = useContext(AppContext);
    const email = userData?.email || "Unknown User";
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [isQuestionView, setIsQuestionView] = useState(false);


    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = () => setIsExpanded(!isExpanded);

    const handleSummarize = async () => {
        setIsQuestionView(true);  // Show the question view
        setLoading(true);

        try {
            const response = await axios.post(`${backendurl}/api/ai/question`, { text: content });

            // Ensure you're setting the correct response field
            console.log("Generated Questions:", response.data);

            if (response.data.questions) {
                setQuestion(response.data.questions); // Fix: Make sure you're setting the right key
            } else {
                setQuestion("No questions were generated.");
            }
        } catch (error) {
            console.error("Question generation failed:", error);
            setQuestion("Failed to generate questions.");
        }

        setLoading(false);
    };




    return (
        <>
            {isExpanded && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-xl z-40 transition-opacity duration-500" onClick={toggleExpand} />
            )}
            {isQuestionView && (
                <div className="fixed inset-0 flex z-50 bg-black/30 backdrop-blur-3xl transition-opacity duration-500">
                    {/* Left Side - Summarized View of Original Content */}
                    {/* Left Side - Summarized View of Original Content */}
                    <div className="w-1/2 flex justify-center items-center transition-transform duration-500 ease-in-out translate-x-[-100%] opacity-0 animate-fadeInLeft">
                        <div className="h-[30em] w-[35em] bg-gradient-to-br from-[rgba(75,30,133,1)] via-purple-700/80 to-[rgba(75,30,133,0.2)] 
                                         text-white font-nunito p-[1.5em] border-2 border-[rgba(75,30,133,0.5)] rounded-[1.5em] shadow-2xl backdrop-blur-xl">
                            <h1 className="text-[2.2em] font-bold bg-gradient-to-r from-white via-purple-100 to-purple-200 bg-clip-text text-transparent">
                                {title}
                            </h1>
                            <p className="text-[2.2em] text-purple-100/90 leading-relaxed font-light max-h-[20em] overflow-auto">
                                {content}
                            </p>
                        </div>
                    </div>
                    <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2">
                        <button
                            onClick={() => setIsQuestionView(false)}
                            className="bg-red-950 text-red-400 border border-red-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                            <span className="bg-red-400 shadow-red-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]" />
                            Cancel
                        </button>
                    </div>


                    {/* Right Side - Question Output */}
                    <div className="w-1/2 flex justify-center items-center">
                        <div className="h-[30em] w-[35em] bg-gradient-to-br from-[rgba(75,30,133,1)] via-purple-700/80 to-[rgba(75,30,133,0.2)] 
                                        text-white font-nunito p-[1.5em] border-2 border-[rgba(75,30,133,0.5)] rounded-[1.5em] shadow-2xl backdrop-blur-xl">
                            <h1 className="text-[2.2em] font-bold bg-gradient-to-r from-gray-100 via-gray-300 to-gray-400 bg-clip-text text-transparent">
                                Questions
                            </h1>
                            <div className="text-[0.9em] text-gray-300 leading-relaxed font-light max-h-[20em] overflow-auto space-y-2">
                                {loading ? (
                                    "Generating questions..."
                                ) : Array.isArray(question) ? (
                                    question.map((q, i) => (
                                        <p key={i} className="text-purple-100">
                                            {q}
                                        </p>
                                    ))
                                ) : (
                                    <p>{question}</p>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            )}


            <div
                className={`fixed ${isQuestionView ? "top-[50%] left-[15%] translate-y-[-50%] h-[30em] w-[35em] z-50" : isExpanded ? "top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] h-[30em] w-[40em] z-50" : "relative h-[18em] w-[20em] hover:-translate-y-1"} border-2 border-[rgba(75,30,133,0.5)] rounded-[1.5em] bg-gradient-to-br from-[rgba(75,30,133,1)] via-purple-700/80 to-[rgba(75,30,133,0.2)] text-white font-nunito p-[1.5em] flex justify-center items-left flex-col gap-[1em] backdrop-blur-[12px] hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 ease-in-out`}
            >


                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-fuchsia-500/20 to-transparent opacity-0 transition-opacity duration-500 rounded-[1.5em]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,50,190,0.1),transparent_60%)] animate-pulse" />

                <h1 className="text-[2.2em] font-bold bg-gradient-to-r from-white via-purple-100 to-purple-200 bg-clip-text text-transparent">
                    {title}
                </h1>
                <div
                    className={`${isExpanded || isQuestionView ? "h-[calc(100%-10em)] overflow-y-auto pr-2" : "max-h-[3.5em] overflow-hidden"}`}
                    style={{
                        userSelect: 'text',
                        scrollbarWidth: 'thin',
                        scrollbarColor: 'rgba(120, 50, 190, 0.6) rgba(75, 30, 133, 0.3)'
                    }}
                >
                    <p className="text-[0.9em] text-purple-100/90 leading-relaxed font-light">
                        {isExpanded || isQuestionView ? content : `${content.substring(0, 100)}...`}
                    </p>
                </div>


                {/* Expand/Shrink Button */}
                {!isQuestionView && (
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
                )}

                {/* Question View */}

                <div className="flex flex-wrap gap-2 pb-2">
                    {tags.map((tag, index) => (
                        <span key={index} className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>

                {!isQuestionView && (
                    <div className="mt-2">

                        <div className="absolute bottom-2 right-2 p-2 flex items-center justify-center">
                            <Button1 label="Generate" onClick={handleSummarize} />
                        </div>
                    </div>
                )}
            </div>


        </>
    );
};

export default NoteCard;