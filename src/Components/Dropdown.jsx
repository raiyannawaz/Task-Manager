import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Typography } from '@mui/material';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import { useContext } from 'react';
import Context from '../ContextAPI/Context';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Dropdown() {

    let { setUser, isDropdown, setIsDropdown, setTasks, showAlerts, setIsLoading } = useContext(Context)

    let navigate = useNavigate()

    const handleSignOut = async () => {
        setIsDropdown(false)

        try {

            // API CALLING
            let response = await fetch(`${process.env.REACT_APP_API_URL}/auth/sign-out`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: sessionStorage.getItem('token')
                }
            })
            // API CALLING

            let { message } = await response.json()

            if (response.status === 200 && response.ok) {
                setIsLoading(false)
                sessionStorage.clear()
                setTasks([])
                setUser(null)
                showAlerts({ isShown: true, mode: 'danger', message })
                navigate('/sign-in')
            }
            else {
                setIsLoading(false)
                showAlerts({ isShown: true, mode: 'danger', message })
            }
        }
        catch (err) {
            setIsLoading(false)
            showAlerts({ isShown: true, mode: 'danger', message: 'Uncaught error' })
        }

    }

    return (
        isDropdown && <div className="fixed right-10 z-50">
            <Paper className='w-auto lg:w-[320px]' sx={{ maxWidth: '100%', boxShadow: 4 }}>
                <MenuList sx={{p: 0}}>
                    <NavLink to={'/profile'} onClick={()=>{setIsDropdown(false)}}>
                    <MenuItem sx={{py: 1.5}}>
                        <ListItemIcon>
                            <AccountCircle fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Profile</ListItemText>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            <ArrowForwardIos />
                        </Typography>
                    </MenuItem>
                    </NavLink>
                    <Divider />
                    <MenuItem onClick={handleSignOut} sx={{p: 1.5, color: 'red'}}>
                        <ListItemIcon>
                            <Logout fontSize="small" color='error'/>
                        </ListItemIcon>
                        <ListItemText>Log Out</ListItemText>
                    </MenuItem>
                </MenuList>
            </Paper>
        </div>
    );
}
