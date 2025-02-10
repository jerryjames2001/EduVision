import React from "react";
import { Link } from "react-router-dom";

export const Navbar1 = () => {
    return (
        <div className="bg-transparent flex items-center justify-between px-4 py-3 drop-shadow-lg absolute top-0 w-full">
            {/* Left - Brand */}
            <div className="flex justify-start">
                <h2 className="text-xl font-semibold text-blue-600 hover:text-white">
                    <Link to="/">EduVision</Link>
                </h2>
            </div>

            {/* Center - Navigation Links */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-6">
                <Link to="/" className="hover:bg-blue-400 transition hover:text-white p-1 rounded-3xl">Home</Link>
            </div>

            {/* Right - Login Button */}
            <div className="flex justify-end">
                <Link to="/login" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                    Login
                </Link>
            </div>
        </div>
    );
};
