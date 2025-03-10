import React from 'react';
import Navbar2 from '../../components/Navbar/Navbar2';
import Slider from '../../components/Navbar/Slider';

const Dashboard = () => {
  return (
    <div className='bg-gradient-to-tr from-[#6a11cb] via-sky-500 to-[#f44d7a] min-h-screen'>
      {/* Navbar */}
      <Navbar2 />

      <div className='flex flex-nowrap md:flex-row'>
        {/* Left Sidebar */}
        <div className="w-64 shrink-0 md:w-56">
          <Slider />
        </div>

        {/* Right-side content */}
        <div className='flex-grow p-6 ml-4'>
          Dashboard
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
