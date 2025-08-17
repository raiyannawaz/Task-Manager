import { Edit, Delete, MoreVert } from '@mui/icons-material'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { useContext, useState } from 'react'
import Context from '../ContextAPI/Context'

const Card = (props) => {

    let { setTaskId, setIsModal, setConfirm } = useContext(Context)

    let { title, created_at, category, priority, status, _id } = props.task

    let createdDate = new Date(created_at).toLocaleDateString()

    // let updatedDate = updated_at ? new Date(updated_at).toLocaleString() : ''

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleEdit = async () =>{
        setTaskId(_id)
        setIsModal(true)
        handleClose()
    }

    const handleDelete = async () =>{
        setTaskId(_id)
        setConfirm(true)
        handleClose()
    }

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
        <div className="bg-white shadow-lg rounded-lg mx-auto w-full">
            <div className="p-4">
                <div className="flex justify-between">
                    <h2 className="text-xl lg:text-2xl font-normal">{title}</h2>
                    <div className="d-flex space-x-3">
                        <IconButton sx={{ px: 0.75, py: 0.75 }}
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}>
                            <MoreVert/>
                        </IconButton>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}>
                                    <MenuItem onClick={handleEdit}>
                                    <Edit fontSize='small' color='primary' sx={{mr: 1}}/> Edit
                                    </MenuItem>
                                    <MenuItem onClick={handleDelete}>
                                    <Delete fontSize='small' color='error' sx={{mr: 1}}/> Delete
                                    </MenuItem>
                                </Menu>
                    </div>
                </div>

                <div className="flex justify-between py-1">
                    <p className='text-sm text-gray-500'>Created: <span className='text-gray-700'>{createdDate}</span></p>
                    <p className=' text-sm  text-gray-500'>Status: <span className='text-gray-700'>{status[0].toUpperCase()+status.slice(1)}</span></p>
                </div>
                <div className="flex justify-between py-1">
                    <p className='text-sm text-gray-500'>Category: <span className='text-gray-700'>{category[0].toUpperCase()+category.slice(1)}</span></p>
                    <p className=' text-sm  text-gray-500'>Priority: <span className='text-gray-700'>{priority[0].toUpperCase()+priority.slice(1)}</span></p>
                </div>
                {/* <div className="flex justify-between">
                    <p className='text-gray-400 py-2 text-sm lg:text-base'>Last Update</p>
                    <p className='text-sm lg:text-base'>{updatedDate}</p>
                </div> */}
                {/* {buttonText && (
                    <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                        {buttonText}
                    </button>
                )} */}
            </div>
        </div>
    )
}

export default Card