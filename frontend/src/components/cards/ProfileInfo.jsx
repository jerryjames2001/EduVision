import React, { useContext } from 'react'
import { getInitials } from '../../utils/helper'
import { AppContext } from '../../context/AppContext';

const ProfileInfo = ({onLogout}) => {
    const { userData } = useContext(AppContext);
    return (
        <div className='flex items-center gap-3'>
            <div className='w-12 h-12 flex items-center justify-center rounded text-slate-950 font-medium bg-slate-100 '>
            {getInitials(userData?.fullname || "Anonymous")}
                </div>

            <div>
                <button className='text-sm text-black underline ' onClick={onLogout}>Logout</button>
            </div>
        </div>
    )
}

export default ProfileInfo