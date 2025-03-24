import React from 'react'

import { Routes, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/home/Home'
import Signup from './pages/Signup_Signin/Signup'
import Signin from './pages/Signup_Signin/Login'
import Dashboard from './pages/dashboard/Dashboard'
import TextExtract from './pages/dashboard/TextExtractor/TextExtract'
import MyNotes from './pages/dashboard/MyNotes/MyNotes'
import Community from './pages/dashboard/Community/Community';

const App = () => {
  return (
    <div>
      <ToastContainer />
          <Routes>

            <Route path='/' exact element={<Home />} />
            <Route path='/signup' exact element={<Signup />} />
            <Route path='/login' exact element={<Signin />} />
            <Route path='/dashboard' exact element={<Dashboard />} />
            <Route path='/textextract' exact element={<TextExtract />} />
            <Route path='/mynotes' exact element={<MyNotes />} />
            <Route path='/community' exact element={<Community />} />

          </Routes>
        
    </div>
  )
}

export default App