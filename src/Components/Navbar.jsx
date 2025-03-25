import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import { IconButton, useMediaQuery } from '@mui/material'
import { Menu } from '@mui/icons-material'
import Context from '../ContextAPI/Context'

export default function Navbar() {

  let isMobile = useMediaQuery('(max-width: 450px)')

  let location = useLocation()
  let navigate = useNavigate()

  let { setTasks, searchFilter, handleSearchFilter } = useContext(Context)

  const [ isToggleShown, setIsToggleShown ] = useState(false)

  const handleLogOut = () =>{
    sessionStorage.clear()
    setTasks([])
    navigate('/log-in')
  }

  const handleToggle = () =>{
    setIsToggleShown(!isToggleShown)
  }

  return (
    // NAVBAR
    <nav className="bg-indigo-500 navbar flex flex-col lg:flex-row items-center w-full lg:h-[4.75rem]">
      {/* LEFT NAV */}
      <div className="left-nav flex justify-between lg:justify-center items-center w-full lg:w-1/5 h-16 px-3">
        <h1 className='text-2xl lg:text-3xl text-indigo-50'>Task Manager</h1>
        { isMobile && <IconButton sx={{color: 'white'}} onClick={handleToggle}>
          <Menu fontSize='large'/>
        </IconButton> }
      </div>
      {/* LEFT NAV */}
      <div className={`${isMobile && !isToggleShown ? 'hidden' : !isMobile && isToggleShown ? '' : ''} search w-full lg:w-3/5 flex h-full justify-center lg:justify-start items-center`}>
        {
          location.pathname === '/dashboard' &&
          <input type="text" value={searchFilter} onChange={handleSearchFilter} className='flex items-center py-2 lg:py-0 shadow-md px-3 lg:px-4 w-2/3 lg:w-1/3 h-2/4 text-sm lg:text-base outline-none border-indigo-300 border rounded-full' placeholder='Search'/>
        }
      </div>
      {/* RIGHT NAV */}
      <div className="right-nav w-full lg:w-1/5">
        {location.pathname === '/dashboard' ?
          <ul className={`flex justify-center space-x-3 lg:space-x-5 py-4 lg:py-0 ${isMobile && !isToggleShown ? 'hidden' : !isMobile && isToggleShown ? '' : ''} `}>
            <li onClick={handleLogOut}>
              <NavLink className={` text-indigo-50 text-xl lg:text-indigo-300 lg:hover:text-indigo-50`}>Logout</NavLink>
            </li>
          </ul> :
          <ul className={`flex flex-col lg:flex-row justify-evenly space-x-3 lg:space-x-5 pr-2 lg:pr-0 ${isToggleShown ? 'h-24' : 'h-0'} lg:h-auto`}>

            <li>
              <NavLink to={'/log-in'} className={`ps-6 lg:ps-0 text-indigo-50 text-xl ${location.pathname === '/log-in' ? 'lg:text-indigo-50' : 'lg:text-indigo-300 hover:lg:text-indigo-50'}`}>Log In</NavLink>
            </li>

            <li>
              <NavLink to={'/sign-up'} className={`ps-3 lg:ps-0 text-indigo-50 text-xl ${location.pathname === '/sign-up' ? 'lg:text-indigo-50' : 'lg:text-indigo-300 hover:lg:text-indigo-50'}`}>Sign Up</NavLink>
            </li>

          </ul>}

      </div>
      {/* RIGHT NAV */}
    </nav>
    // NAVBAR
  )
}
