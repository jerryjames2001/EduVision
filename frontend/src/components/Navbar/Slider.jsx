import React from 'react';
import { Link } from 'react-router-dom';

const Slider = () => {
  return (
    <div className="flex flex-col bg-gray-800 text-white sm:w-auto w-35 md:w-55 lg:w-64 h-screen rounded-md p-4 text-center font-poppins font-semibold">
      <h2 className="text-xl font-semibold mb-8 text-blue-400">Dashboard Menu</h2>
      <Link to='/textextract' className="p-2 hover:bg-blue-700 rounded-lg mb-4">Note Digitlizer</Link>
      <Link to='/mynotes' className="p-2 hover:bg-blue-700 rounded-lg mb-4">My Notes</Link>
      <Link to='/community' className="p-2 hover:bg-blue-700 rounded-lg mb-4">Community</Link>
    </div>
  );
};

export default Slider;
