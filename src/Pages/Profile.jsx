import { Box, IconButton } from '@mui/material'
import NoImage from '../Assets/No Image.png'
import ImageIcon from '@mui/icons-material/Image'
import EditIcon from '@mui/icons-material/Edit'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import Context from '../ContextAPI/Context'


export default function Profile() {

    let navigate = useNavigate()

    let { user, setUser, setIsLoading, showAlerts } = useContext(Context)

    const [profileDetails, setProfileDetails] = useState({
        name: '', email: '', image: ''
    })

    const [errorMessage, setErrorMessage] = useState("")
    const [isSuccess, setIsSuccess] = useState(true)

    const nameRegex = /^[A-Za-z_\s]{3,30}$/
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    const [isEdit, setIsEdit] = useState(false)

    const ref = useRef(null)

    const handleChange = (event) => {
        let { name, value, files } = event.target;
        const newValue = files ? files[0] : value

        setProfileDetails({
            ...profileDetails, [name]: newValue
        })

        if (name === "name") {
            if (!newValue) {
                setErrorMessage("Name is required")
                setIsSuccess(false)
            } else if (newValue.length < 3) {
                setErrorMessage("Name requires 3 characters")
                setIsSuccess(false)
            } else if (newValue.length > 30) {
                setErrorMessage("Name is too large")
                setIsSuccess(false)
            } else if (!nameRegex.test(newValue)) {
                setErrorMessage("Name can only contain letters and spaces")
                setIsSuccess(false)
            } else {
                setErrorMessage("")
                setIsSuccess(true)
            }
        }

        if (name === "email") {
            if (!newValue) {
                setErrorMessage("Email is required")
                setIsSuccess(false)
            } else if (!emailRegex.test(newValue)) {
                setErrorMessage("Invalid email")
                setIsSuccess(false)
            } else {
                setErrorMessage("")
                setIsSuccess(true)
            }
        }

        if (name === "image") {
            if (newValue) {
                const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"]
                if (!validTypes.includes(newValue.type)) {
                    setErrorMessage("Unsupported file type")
                    setIsSuccess(false)
                } else if (newValue.size > 2 * 1024 * 1024) {
                    setErrorMessage("File too large (max 2MB)")
                    setIsSuccess(false)
                } else {
                    setErrorMessage("")
                    setIsSuccess(true)
                }
            }
        }
    }

    const handleIsEdit = () => {
        setIsEdit(true)
    }

    const handleToRedirect = () => {
        navigate('/dashboard')
    }

    const handleUploadImage = () => {
        ref.current.click()
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        let formData = new FormData()

        formData.append('name', profileDetails.name)
        formData.append('email', profileDetails.email)

        if(typeof(profileDetails.image)!=='string'){
            formData.append('file', profileDetails.image)
        }

        setIsLoading(true)

        let response = await fetch(`${process.env.REACT_APP_API_URL}/user/update-user`, {
            method: 'PUT',
            headers: {
                Authorization: sessionStorage.getItem('token')
            },
            body: formData
        })

        let jsData = await response.json()

        if (response.ok && response.status === 200) {
            showAlerts({ isShown: true, mode: 'success', message: jsData.message })
            setUser(profileDetails)
            navigate('/dashboard')
            setIsLoading(false)
        }
        else {
            showAlerts({ isShown: true, mode: 'danger', message: jsData.message })
            setIsLoading(false)
        }

    }

    useEffect(()=>{
        if(user){
            setProfileDetails(user)
        }
    }, [user])

    return (
        <Box component={'form'} onSubmit={handleSubmit}
            className='mt-14 card shadow-lg mx-auto bg-white rounded-3xl relative w-10/12 lg:w-1/3 p-5 lg:pt-7 lg:px-7 lg:pb-3'
        >
            {/* Title  */}
            <div className="title flex items-center justify-between">
                <h1 className="text-2xl lg:text-3xl text-indigo-600">Profile</h1>
                {!isEdit ? <button type='button' onClick={handleIsEdit} className='space-x-2 text-[1.3rem] text-indigo-600 flex items-center'>
                    <span>
                        Edit
                    </span>
                    <EditIcon className='mb-1.5' fontSize='medium' />
                </button> : errorMessage ? <p className='text-red-600'>{errorMessage}</p> : isSuccess ? '' : ''}
            </div>
            {/* Title  */}
            {/* Form Inputs */}
            <div className="form-group w-fit rounded-[50%] mx-auto mb-7 text-center relative">
                <img src={typeof(profileDetails.image) === 'string' ? profileDetails.image : typeof(profileDetails.image) === 'object' ? URL.createObjectURL(profileDetails.image) : NoImage} className='h-32 w-32 rounded-[50%] mx-auto' alt="" />
                {
                    isEdit &&
                    <IconButton onClick={handleUploadImage} sx={{ ":hover": { bgcolor: 'black' }, mx: 'auto', position: 'absolute', right: '0.5rem', bottom: '-0.5rem', bgcolor: 'gray', color: 'white' }}><ImageIcon fontSize='medium' /></IconButton>
                }
            </div>
            <div className="form-group w-full mx-auto mb-4">
                <input type="text" name='name' value={profileDetails.name} disabled={!isEdit} onChange={handleChange}
                    className={`flex items-center ${isEdit ? 'shadow-md' : ''} py-2 px-3 lg:px-4 w-full text-sm lg:text-base rounded-full outline-none border-indigo-300 border`} placeholder='Name' />
            </div>
            <div className="form-group w-full mx-auto mb-4">
                <input type="text" name='email' value={profileDetails.email} disabled={!isEdit} onChange={handleChange}
                    className={`flex items-center ${isEdit ? 'shadow-md' : ''} py-2 px-3 lg:px-4 w-full text-sm lg:text-base rounded-full outline-none border-indigo-300 border`} placeholder='Email' />
            </div>
            <input
                type="file"
                name="image"
                accept="image/*" onChange={handleChange} ref={ref}
                className="hidden items-center shadow-md py-2 px-3 lg:px-4 w-full text-sm lg:text-base rounded-full outline-none border-indigo-300 border"
            />
            {isEdit && <div className="flex justify-end space-x-3">
                <button onClick={handleToRedirect} type='button' className={`py-2 px-6 mb-4 bg-white hover:bg-indigo-400 hover:text-white text-indigo-400 border-[1px] border-indigo-400 rounded-3xl  text-sm lg:text-base transition-all`}>Cancel</button>
                <button disabled={!isSuccess} type='submit' className={`py-2 px-6 mb-4 bg-indigo-400 hover:bg-indigo-600 active:bg-indigo-800 text-white rounded-3xl  text-sm lg:text-base transition-all`}>Submit</button>
            </div>}
            {/* Form Inputs */}
            {/* Form  */}
        </Box>
    )
}
