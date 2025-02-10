import React from "react";
import { motion } from "framer-motion";
import { FaBrain, FaBookOpen, FaCloud, FaRobot } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div>
    <div className="min-h-screen bg-gradient-to-br from-[#6a11cb] via-sky-500 to-[#f44d7a] text-white py-20 px-8">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h1
          className="text-5xl font-bold mb-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          About <span className="text-yellow-300">EduVision</span>
        </motion.h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 - AI-powered OCR */}
          <motion.div
            className="bg-gray-800 p-6 rounded-xl shadow-lg text-center flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
          >
            <FaBrain className="text-4xl text-yellow-300 mb-4" />
            <h3 className="text-2xl font-semibold">AI-powered OCR</h3>
            <p className="text-sm mt-2">Convert handwritten notes into digital text using AI.</p>
          </motion.div>

          {/* Card 2 - Smart Quiz Generator */}
          <motion.div
            className="bg-gray-800 p-6 rounded-xl shadow-lg text-center flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
          >
            <FaBookOpen className="text-4xl text-green-300 mb-4" />
            <h3 className="text-2xl font-semibold">Smart Quiz Generator</h3>
            <p className="text-sm mt-2">Automatically generate quizzes to help students prepare better.</p>
          </motion.div>

          {/* Card 3 - Cloud Storage */}
          <motion.div
            className="bg-gray-800 p-6 rounded-xl shadow-lg text-center flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
          >
            <FaCloud className="text-4xl text-blue-300 mb-4" />
            <h3 className="text-2xl font-semibold">Cloud Storage</h3>
            <p className="text-sm mt-2">Securely store and access notes anytime, anywhere.</p>
          </motion.div>

          {/* Card 4 - AI-based Learning */}
          <motion.div
            className="bg-gray-800 p-6 rounded-xl shadow-lg text-center flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
          >
            <FaRobot className="text-4xl text-pink-300 mb-4" />
            <h3 className="text-2xl font-semibold">AI-based Learning</h3>
            <p className="text-sm mt-2">Get personalized recommendations based on your study habits.</p>
          </motion.div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AboutUs;
