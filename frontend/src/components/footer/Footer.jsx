import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa6";

const Footer = ({ scrollToAboutUs }) => {
    return (
        <footer className="bg-gray-900 text-white py-6">
            <div className="container mx-auto text-center">
                <h2 className="text-2xl font-semibold">EduVision</h2>
                <p className="text-gray-400 mt-2">Empowering students with AI-driven learning tools.</p>

                {/* Social Media Icons */}
                <div className="flex justify-center space-x-6 mt-4">
                    <a href="https://jerry-james.me" target="_blank" rel="noopener noreferrer">
                        <FaGlobe className="text-2xl bg-blue-600 hover:text-blue-600 hover:bg-white rounded-2xl transition" title="Portfolio" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <FaGithub className="text-2xl hover:text-black hover:bg-white rounded-2xl transition" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className="text-2xl hover:text-blue-600 transition" />
                    </a>
                </div>

                {/* Links */}
                <div className="mt-6 space-x-6">
                    <button onClick={scrollToAboutUs} className="text-gray-400 hover:text-white transition cursor-pointer">About</button>
                    <Link to="" className="text-gray-400 hover:text-white transition">Features</Link>
                    <Link to="" className="text-gray-400 hover:text-white transition">Contact</Link>
                    <Link to="" className="text-gray-400 hover:text-white transition">Privacy Policy</Link>
                </div>

                {/* Copyright */}
                <p className="text-gray-500 text-sm mt-4">&copy; {new Date().getFullYear()} EduVision. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;