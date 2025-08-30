import { useContext, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { Box, IconButton, useMediaQuery } from '@mui/material'
import { AccountCircle, Menu } from '@mui/icons-material'
import Context from '../ContextAPI/Context'

export default function Navbar() {

  let isMobile = useMediaQuery('(max-width: 450px)')

  let location = useLocation()

  let { user, getUser, getTasks, isDropdown, setIsDropdown, searchFilter, handleSearchFilter } = useContext(Context)

  const [isToggleShown, setIsToggleShown] = useState(false)

  const handleDropdown = () => {
    setIsDropdown(!isDropdown)
  }


  const handleToggle = () => {
    setIsToggleShown(!isToggleShown)
  }

    // Use Effect 
  let token = sessionStorage.getItem('token')
  useEffect(() => {
    if(token){
      getTasks()
      getUser()
    }
  }, [token])
  // Use Effect

  return (
    // NAVBAR
    <nav className="bg-indigo-500 navbar flex flex-col lg:flex-row items-center w-full lg:h-[4.75rem]">
      {/* LEFT NAV */}
      <div className="left-nav flex justify-between lg:justify-center items-center w-full lg:w-1/5 h-16 lg:h-full px-3">
        <h1 className='text-2xl lg:text-3xl text-indigo-50'>Task Manager</h1>
        {isMobile && <IconButton sx={{ color: 'white' }} onClick={handleToggle}>
          <Menu fontSize='large' />
        </IconButton>}
      </div>
      {/* RIGHT NAV */}
      <div className="right-nav h-full w-full lg:w-4/5">
        {location.pathname === '/dashboard' || location.pathname === '/profile' ?
          <div className={`h-full w-full pb-3 lg:pb-0 space-x-3 flex justify-end items-center pr-4 lg:pr-10 ${isMobile && !isToggleShown ? 'hidden' : 'block'}`}>
            {location.pathname === '/dashboard' ? <input type="text" value={searchFilter} onChange={handleSearchFilter} className={`flex items-center py-2.5 lg:py-0 shadow-md px-3 lg:px-4 w-2/3 lg:w-1/4 h-2/4 text-sm lg:text-base outline-none border-indigo-300 border rounded-full`} placeholder='Search' /> : ''}
            {user && user.image ? <Box component={'img'} className='hover:shadow-lg' onClick={handleDropdown} sx={{ cursor: 'pointer', height: '40px', width: '40px', borderRadius: '50%', border: '2px solid white' }} 
            src={typeof(user.image)==='string' ? user.image : typeof(user.image)==='object'?URL.createObjectURL(user.image) : ''} />
              : <IconButton sx={{ p: 0 }} onClick={handleDropdown}>
                <AccountCircle sx={{ fontSize: '3rem', color: 'white', cursor: 'pointer' }} />
              </IconButton>
            }
          </div> :
          <ul className={`flex h-full w-full justify-center lg:justify-end items-center pt-3 pb-5 lg:pt-0 lg:pb-0 lg:pr-10 space-x-10 ${isMobile && !isToggleShown ? 'hidden' : 'block'}`}>
            <li>
              <NavLink to={'/sign-in'} className={`text-indigo-50 text-xl ${location.pathname === '/sign-in' ? 'lg:text-indigo-50' : 'lg:text-indigo-300 hover:lg:text-indigo-50'}`}>Sign In</NavLink>
            </li>
            <li>
              <NavLink to={'/sign-up'} className={`text-indigo-50 text-xl ${location.pathname === '/sign-up' ? 'lg:text-indigo-50' : 'lg:text-indigo-300 hover:lg:text-indigo-50'}`}>Sign Up</NavLink>
            </li>
          </ul>}

      </div>
      {/* RIGHT NAV */}
    </nav>
    // NAVBAR
  )
}
