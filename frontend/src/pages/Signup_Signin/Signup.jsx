import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import pic from '../../assets/login_bg.jpg';
import { Eye, EyeOff } from 'lucide-react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const { backendurl, setIsLoggedin, getUserdata } = useContext(AppContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [grade, setGrade] = useState('');


  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !password || !fullname) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
// sending data to the backend
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(`${backendurl}/api/auth/register`, {
        email,
        password,
        fullname,
        grade
      },{ withCredentials: true });

      if (res.status === 200) {
        setIsLoggedin(true);
        await getUserdata();
        navigate('/');
      }
    } catch (err) {
          console.error("Register error:", err.response?.data || err);
          const errorMessage = err.response?.data?.message || "Register failed. Please try again.";
          toast.error(errorMessage);
    }
  }

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${pic})` }}>
        <div className="bg-transparent bg-opacity-10 backdrop-blur-lg shadow-lg rounded-xl p-8 max-w-sm w-full">
          {/* Title */}
          <h2 className="text-white text-2xl font-bold text-center">Create an Account</h2>
          <p className="text-gray-200 text-center mb-6">Sign up to get started</p>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSignup}>
            {/* Name Input */}
            <div>
              <label className="text-white block mb-1">Full Name</label>
              <input
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-2 bg-transparent bg-opacity-20 text-white placeholder-white rounded-md ring-2 ring-gray-500 hover:ring-indigo-300 focus:outline-none"
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="text-white block mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-transparent bg-opacity-20 text-white placeholder-white rounded-md ring-2 ring-gray-500 hover:ring-indigo-300 focus:outline-none"
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <label className="text-white block mb-1">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 bg-transparent bg-opacity-20 text-white placeholder-white rounded-md ring-2 ring-gray-500 group-hover:ring-indigo-300 focus:outline-none pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>


            {/*grade Input */}
            <div>
              <label className="text-white block mb-1">Grade</label>
              <input
                type="text"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                placeholder="Enter your grade"
                className="w-full px-4 py-2 bg-transparent bg-opacity-20 text-white placeholder-white rounded-md ring-2 ring-gray-500 hover:ring-indigo-300 focus:outline-none"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Signup Button */}
            <button className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition">
              Sign Up
            </button>
          </form>

          {/* Links */}
          <div className="text-center mt-4">
            <p className="text-gray-200">
              Already have an account? <Link to="/login" className="text-indigo-100 hover:underline hover:text-blue-700">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup