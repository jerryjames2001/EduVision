import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { AppContext } from "../../../context/AppContext";
import { CloudUpload, X } from "lucide-react"; // Icons for better UI

const FileUpload = ( { onExtractedText } ) => {
  const [files, setFiles] = useState([]);
  const { backendurl } = useContext(AppContext);

  // Handle file selection (only images)
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files).filter((file) =>
      file.type.startsWith("image/")
    ); // Ensuring only image files are selected

    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  // Remove file from list
  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  // Send files to backend
  const handleUpload = async () => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await axios.post(`${backendurl}/api/file/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Server Response:", response.data);
      if (response.data && response.data.extractedTexts) {
        onExtractedText(response.data.extractedTexts);  // <-- Call the prop here
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div className="flex flex-col items-start bg-transparent text-white">
      <h2 className="text-3xl font-bold mb-6">Upload Your Images</h2>

      {/* Drag and Drop Box */}
      <label className="w-72 h-40 bg-white flex items-center justify-center rounded-lg cursor-pointer">
        <input
          type="file"
          accept="image/png, image/jpeg"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="flex flex-col items-center">
          <CloudUpload size={32} className="text-blue-500" />
          <p className="text-gray-800 text-sm">Click or Drag image files here</p>
        </div>
      </label>

      {/* Selected Files List */}
      <div className="mt-4 w-72">
        {files.map((file, index) => (
          <motion.div
            key={index}
            className="flex justify-between items-center bg-transparent p-3 rounded-lg mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <span className="truncate">{file.name}</span>
            <button onClick={() => removeFile(index)} className="text-red-500 hover:text-red-600">
              <X size={22} />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Upload Button */}
      {files.length > 0 && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleUpload}
          className="mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition"
        >
          Upload Images
        </motion.button>
      )}
    </div>
  );
};

export default FileUpload;
