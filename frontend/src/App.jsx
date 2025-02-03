import React from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Signup from './pages/Signup_Signin/Signup'
import Signin from './pages/Signup_Signin/Login'

const routes = (
  <Router>
    <Routes>
      <Route path='/' exact element={<Home />} />
      <Route path='/signup' exact element={<Signup />} />
      <Route path='/login' exact element={<Signin />} />
    </Routes>
  </Router>
)

const App = () => {
  return (
    <div>
      {routes}
    </div>
  )
}

export default App