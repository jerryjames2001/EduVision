import React, { useState } from 'react'
import ProfileInfo from '../cards/ProfileInfo'
import { Link, useNavigate } from 'react-router-dom'
import SearchBar from '../searchbar/SearchBar';

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate;

  const onLogout = () => {
    navigate('/login')
  };

  const handleSearch = () => {};
  const onClearSearch = () => {
    setSearchQuery('')
  };

  return (
    <div className='bg-transparent flex items-center justify-between px-4 py-2 drop-shadow-lg'>
      <h2 className='text-xl font-medium text-blue-600 py-2'><Link to="/">EduVision</Link></h2>

      <SearchBar
        value={searchQuery}
        onChange={({target}) => {
          setSearchQuery(target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
         />


      <ProfileInfo onLogout={onLogout} />
    </div>
  )
}
