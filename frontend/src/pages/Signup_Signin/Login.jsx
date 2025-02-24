import React, { useContext, useState } from 'react';
import pic from '../../assets/login_bg.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const navigate = useNavigate();
  const { backendurl, setIsLoggedin, getUserdata } = useContext(AppContext);

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    // sending data to the backend
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(`${backendurl}/api/auth/login`, {
        email,
        password
      }, { withCredentials: true });

      if (res.status === 200) {
        setIsLoggedin(true);
        await getUserdata();
        navigate('/');
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err);
      const errorMessage = err.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
    }

  }

  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${pic})` }}
      >
        <div className="bg-transparent bg-opacity-10 backdrop-blur-lg shadow-lg rounded-xl p-8 max-w-sm w-full">
          {/* Title */}
          <h2 className="text-white text-2xl font-bold text-center">Welcome Back</h2>
          <p className="text-gray-200 text-center mb-6">Login to your account</p>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleLogin}>
            {/* Email Input */}
            <div>
              <label className="text-white block mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"

                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-transparent bg-opacity-20 text-white placeholder-gray-300 rounded-md ring-2 hover:ring-indigo-300 focus:outline-none"
              />
            </div>

            {/* Password Input with Eye Icon */}
            <div className="relative group">
              <label className="text-white block mb-1">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}

                placeholder="Enter your password"
                className="w-full px-4 py-2 bg-transparent bg-opacity-20 text-white placeholder-gray-300 rounded-md ring-2 group-hover:ring-indigo-300 focus:outline-none pr-10"
              />
              {/* Eye Icon Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Login Button */}
            <button className="w-full bg-indigo-700 text-white py-2 rounded-md hover:bg-indigo-500 transition">
              Login
            </button>
          </form>

          {/* Links */}
          <div className="text-center mt-4">
            <a href="#" className="text-white hover:underline">Forgot Password?</a>
            <p className="text-gray-200 mt-2">
              Don't have an account? <Link to="/Signup" className="text-indigo-100 hover:underline hover:text-blue-700">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
