import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const Navbar2 = () => {
    const { logoutUser } = useContext(AppContext);

    return (
        <div className="bg-transparent flex items-center px-4 py-2 text-white drop-shadow-xl top-0 w-full whitespace-nowrap overflow-hidden">

            {/* Left - Brand */}
            <div className="flex-shrink-0">
                <h2 className="text-sm sm:text-base md:text-xl font-semibold text-blue-600 hover:text-white">
                    <Link to="/">EduVision</Link>
                </h2>
            </div>

            {/* Center - Navigation Links */}
            <div className="flex flex-1 justify-center space-x-2 sm:space-x-4">
                <Link
                    to="/"
                    className="hover:bg-blue-400 transition hover:text-white px-2 py-1 rounded-lg text-xs sm:text-sm md:text-base"
                >
                    Home
                </Link>
                <Link
                    to="/dashboard"
                    className="hover:bg-blue-400 transition hover:text-white px-2 py-1 rounded-lg text-xs sm:text-sm md:text-base"
                >
                    Dashboard
                </Link>
                <Link
                    to="/ai"
                    className="hover:bg-blue-400 transition hover:text-white px-2 py-1 rounded-lg text-xs sm:text-sm md:text-base"
                >
                    AI
                </Link>
            </div>

            {/* Right - Logout Button */}
            <div className="flex-shrink-0">
                <button
                    onClick={logoutUser}
                    className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition text-xs sm:text-sm md:text-base"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Navbar2;
