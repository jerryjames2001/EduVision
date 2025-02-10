import React, { useContext, useRef } from 'react'
import { Navbar1 } from '../../components/Navbar/Navbar1'
// import pic from '../../assets/homepage.webp'
import { AppContext } from '../../context/AppContext';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from '../../components/footer/Footer';
import AboutUs from '../aboutus/AboutUs';
import Navbar2 from '../../components/Navbar/Navbar2';

const Home = () => {
  const { isLoggedin } = useContext(AppContext);
  const aboutUsRef = useRef(null); // Create a reference for AboutUs section

  const scrollToAboutUs = () => {
    if (aboutUsRef.current) {
      aboutUsRef.current.scrollIntoView({ behavior: "smooth" }); // Smooth scroll
    }
  };
  return (
    <div className="min-h-screen bg-center text-white" >
      {isLoggedin ? <Navbar2 /> : <Navbar1 />}

      {/* style={{ backgroundImage: `url(${pic})` }} */}
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center h-screen text-center bg-gradient-to-tr from-[#6a11cb] via-sky-500 to-[#f44d7a]">
        <motion.h1
          className="text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to EduVision
        </motion.h1>
        <motion.p
          className="text-lg mb-6 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          AI-powered handwritten note digitization & intelligent quiz generation for students.
        </motion.p>
        {!isLoggedin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <Link
              to="/signup"
              className="relative rounded-sm px-6 py-3 overflow-hidden group bg-gradient-to-tr from-[#6a11cb] to-[#f44d7a] text-white hover:ring-2 hover:ring-offset-2 hover:ring-[#6a11cb] transition-all ease-out duration-300"
            >
              <span className="absolute inset-0 overflow-hidden">
                <span className="absolute w-8 h-32 -mt-12 bg-white opacity-10 rotate-12 transform translate-x-12 transition-all duration-1000 ease-in-out group-hover:translate-x-[-100%]"></span>
              </span>
              <span className="relative z-10">Get Started</span>
            </Link>
          </motion.div>
        )}
      </div>
      <div ref={aboutUsRef}>
        <AboutUs />
      </div>

      {/* Features Section */}
      <section className="py-20 px-10 bg-gray-900 text-center">
        <h2 className="text-4xl font-bold mb-6">Why Choose EduVision?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div className="bg-gray-800 p-6 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}>
            <h3 className="text-2xl font-semibold mb-2">AI-powered OCR</h3>
            <p>Accurately converts handwritten notes into editable text.</p>
          </motion.div>
          <motion.div className="bg-gray-800 p-6 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}>
            <h3 className="text-2xl font-semibold mb-2">Smart Quiz Generator</h3>
            <p>Auto-generates quizzes to help students prepare better.</p>
          </motion.div>
          <motion.div className="bg-gray-800 p-6 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}>
            <h3 className="text-2xl font-semibold mb-2">Cloud Storage</h3>
            <p>Securely saves and organizes all your notes.</p>
          </motion.div>
        </div>
      </section>
      <Footer scrollToAboutUs={scrollToAboutUs} />
    </div>
  );
};

export default Home;
