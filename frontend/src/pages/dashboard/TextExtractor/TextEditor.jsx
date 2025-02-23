import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import axios from "axios";
import { AppContext } from "../../../context/AppContext";

const TextEditor = ({ extractedTexts, fileName }) => {
  const { backendurl } = useContext(AppContext);

  const [editedText, setEditedText] = useState(""); // Single text state
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [noteFileName, setNoteFileName] = useState(fileName || "");

  // Combine all extracted texts into a single text block
  useEffect(() => {
    if (Array.isArray(extractedTexts)) {
      setEditedText(extractedTexts.join("\n\n")); // Combine with spacing
    } else {
      setEditedText(extractedTexts || "");
    }
    setNoteFileName(fileName || "");
  }, [extractedTexts, fileName]);

  // Handle tag addition
  const handleTagInputChange = (e) => setTagInput(e.target.value);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags((prevTags) => [...prevTags, tagInput.trim()]);
    }
    setTagInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // Save all notes
  const handleSaveAllNotes = async () => {
    if (!editedText.trim()) return;

    try {
      const response = await axios.post(`${backendurl}/api/notes/save-note`, {
        text: editedText,
        fileName: noteFileName,
        tags,
      });
      console.log("Note Saved:", response.data);
      alert("Notes saved successfully!");
    } catch (error) {
      console.error("Error saving notes:", error);
    }
  };

  return (
    <div className="w-full bg-transparent p-4 rounded-lg text-white">
      <h3 className="text-2xl font-semibold mb-4 text-center">Extracted Text</h3>

      {/* File name input */}
      <div className="mb-4 text-center">
        <label className="block text-sm font-semibold mb-2">Module Name</label>
        <input
          type="text"
          className="w-full sm:w-3/4 lg:w-2/4 mx-auto p-2 bg-gray-800 text-white rounded-lg"
          value={noteFileName}
          onChange={(e) => setNoteFileName(e.target.value)}
          placeholder="Enter module name"
          required
        />
      </div>

      {/* Tags input */}
      <div className="mb-4 text-center">
        <label className="block text-sm font-semibold mb-2">Tags</label>
        <div className="flex flex-wrap justify-center gap-2 mb-2">
          {tags.map((tag, index) => (
            <span key={index} className="bg-blue-500 text-white py-1 px-3 rounded-full">
              {tag}
              <span
                onClick={() => handleRemoveTag(tag)}
                className="ml-2 cursor-pointer"
              >
                &times;
              </span>
            </span>
          ))}
        </div>
        <input
          type="text"
          className="w-full sm:w-3/4 lg:w-2/4 mx-auto p-2 bg-gray-800 text-white rounded-lg overflow-x-auto text-ellipsis"
          value={tagInput}
          onChange={handleTagInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Add tags (comma separated)"
        />
      </div>

      {/* Single combined text editor */}
      {editedText.trim() === "" ? (
        <p className="text-white text-center">Upload an image to extract text.</p>
      ) : (
        <textarea
          className="w-full h-80 bg-gray-800 text-white p-4 rounded-lg resize-y"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
        />
      )}

      {/* Save Button */}
      {editedText.trim() && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSaveAllNotes}
          className="w-auto h-auto py-2 px-4 bg-gradient-to-tr from-purple-600 via-sky-500 to-pink-500 
                     hover:from-purple-700 hover:via-sky-600 hover:to-pink-600 
                     rounded-2xl shadow-lg hover:shadow-2xl 
                     transition-all duration-300 flex justify-center items-center mx-auto mt-6"
        >
          <Save size={28} className="text-white" />
        </motion.button>
      )}
    </div>
  );
};

export default TextEditor;
