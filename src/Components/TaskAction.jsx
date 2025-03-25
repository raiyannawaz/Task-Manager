import React, { useContext, useEffect, useState } from 'react'
import Context from '../ContextAPI/Context'
import * as Yup from 'yup';
import { Modal, Box } from '@mui/material';
import { fetchData, postData, putData } from '../Utils/BaseUrl';

const TaskAction = () => {

    // States 
    const { setIsLoading, showAlerts, isModal, setIsModal,
         taskId, setTaskId, confirm, getTasks } = useContext(Context)

    const [taskDetails, setTaskDetails] = useState({
        title: '', description: '', category: 'work', priority: 'low', status: 'pending'
    })

    const [errorMessage, setErrorMessage] = useState({})
    // States 

    // Task Validation 
    const taskSchema = {
        title: Yup.string().required('Title is required').min(3, 'Title requires minimum 3 characters'),
        description: Yup.string().required('Description is required').max(100, 'Description cannot exeed more than 100 characters'),
        category: Yup.string().required('Categiry is required').oneOf(['work', 'personal', 'others']),
        priority: Yup.string().required('Priority').oneOf(['low', 'medium', 'high'])
    }

    const addTaskSchema = Yup.object().shape({
        ...taskSchema
    })

    const updateTaskSchema = Yup.object().shape({
        ...taskSchema,
        status: Yup.string().required('Status is required').oneOf(['pending', 'in-progress', 'completed'])
    })
    // Task Validation 

    // Styles
    const boxStyle = {
        bgcolor: 'white',
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        outline: 'none'
    }
    // Styles

    // Handle Change And Validation
    const handleChange = async (event) => {
        let { name, value } = event.target;
        setTaskDetails({ ...taskDetails, [name]: value })
    }
    // Handle Change And Validation

    // Handle Close Modal 
    const handleClose = () => {
        setTaskDetails({
            title: '', description: '', category: 'work', priority: 'low', status: 'pending'
        })
        setIsModal(false)
        setTaskId(null)
    }
    // Handle Close Modal 

    // Handle Empty Fields
    const isFieldsEmpty = () => {
        return !taskDetails.title || !taskDetails.description ||
            !taskDetails.category || !taskDetails.priority || taskId && !taskDetails.status
    }
    // Handle Empty Fields

    // Handle Submit
    const handleSubmit = async (event) => {
        setIsLoading(true)
        event.preventDefault()

        if (!taskId) {
            try {
                let response = await postData('/task/create-task', taskDetails)
                let { message } = response.data

                if (response.status === 200) {
                    showAlerts({ isShown: true, mode: 'success', message })
                    setTaskDetails({ title: '', description: '', category: 'work', priority: 'low' })
                    setIsModal(false)
                    setIsLoading(false)
                    getTasks()
                }
                else {
                    showAlerts({ isShown: true, mode: 'danger', message })
                    setIsLoading(false)
                }
            }
            catch (err) {
                showAlerts({ isShown: true, mode: 'danger', message: 'Uncaught error' })
                setIsLoading(false)
            }
        }
        else {
            try {
                let response = await putData(`/task/update-task/${taskId}`, taskDetails)
                let { message } = response.data

                if (response.status === 200) {
                    setTaskDetails({ title: '', description: '', category: 'work', priority: 'low', status: 'pending' })
                    showAlerts({ isShown: true, mode: 'success', message })
                    setIsLoading(false)
                    setIsModal(false)
                    setTaskId(null)
                    getTasks()
                }
                else {
                    showAlerts({ isShown: true, mode: 'danger', message })
                    setIsLoading(false)
                    setTaskId(null)
                }
            }
            catch (err) {
                showAlerts({ isShown: true, mode: 'danger', message: 'Uncaught error' })
                setIsLoading(false)
                setTaskId(null)
            }
        }
    }
    // Handle Submit 

    const getTask = async () => {
        setIsLoading(true)

        try {
            let response = await fetchData(`/task/get-task/${taskId}`)

            if (response.status === 200) {
                let { title, description, category, priority, status } = response.data
                setTaskDetails({ title, description, category, priority, status })
                setIsLoading(false)
            }
            else {
                let { message } = response.data
                showAlerts({ isShown: false, mode: 'danger', message })
                setIsLoading(false)
            }

        }
        catch (err) {
            showAlerts({ isShown: false, mode: 'danger', message: 'Uncaught error' })
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (taskId && !confirm) {
            getTask()
        }
    }, [taskId])

    return (
        // MODAL 
        <Modal open={isModal}>
            {/* Form */}
            <Box component={'form'}
                className='card shadow-lg bg-white rounded-3xl relative w-10/12 lg:w-2/5 p-5 lg:pt-7 lg:px-7 lg:pb-3'
                sx={boxStyle} onSubmit={handleSubmit}>
                {/* Title  */}
                <div className="title flex items-start justify-between">
                    <h1 className="text-2xl lg:text-3xl text-indigo-700 pb-5">{!taskId ? 'Add Task' : 'Update Task'}</h1>
                    <p className='text-red-600 pr-2 text-right'>{errorMessage.title || errorMessage.description || errorMessage.category || errorMessage.priority || errorMessage.status}</p>
                </div>
                {/* Title  */}
                {/* Form Inputs */}
                <div className="form-group w-full mx-auto mb-4">
                    <input type="text" name='title' value={taskDetails.title} onChange={handleChange}
                        className='flex items-center shadow-md py-2 px-3 lg:px-4 w-full text-sm lg:text-base rounded-full outline-none border-indigo-300 border' placeholder='Title' />
                </div>
                <div className="form-group w-full mx-auto mb-4">
                    <textarea type="text" rows={7} name='description' value={taskDetails.description} onChange={handleChange}
                        className='flex items-center shadow-md py-2 px-3 lg:px-4 w-full text-sm lg:text-base rounded-3xl outline-none border-indigo-300 border' placeholder='Description' />
                </div>
                <div className="form-group flex w-full space-x-5 mx-auto mb-6">
                    <div className="w-1/3">
                        <label className='ml-2'>Category:</label>
                        <select name='category' value={taskDetails.category} onChange={handleChange}
                            className='mt-2 flex items-center shadow-md py-2 px-3 lg:px-4 w-full text-sm lg:text-base rounded-3xl outline-none border-indigo-300 border'>
                            <option value="work">Work</option>
                            <option value="personal">Personal</option>
                            <option value="others">Others</option>
                        </select>
                    </div>
                    <div className='w-1/3'>
                        <label className='ml-2'>Priority:</label>
                        <select name='priority' value={taskDetails.priority} onChange={handleChange}
                            className='mt-2 flex items-center shadow-md py-2 px-3 lg:px-4 w-full text-sm lg:text-base rounded-3xl outline-none border-indigo-300 border'>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    {taskId && <div className="w-1/3">
                        <label className='ml-2'>Status:</label>
                        <select name='status' disabled={!taskId} value={taskDetails.status} onChange={handleChange}
                            className='mt-2 flex items-center shadow-md py-2 px-3 lg:px-4 w-full text-sm lg:text-base rounded-3xl outline-none border-indigo-300 border'>
                            <option value="pending">Pending</option>
                            <option value="in-progress">In-progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>}
                </div>
                <div className="flex justify-end space-x-3">
                    <button type='button' onClick={handleClose} className={`py-2 px-6 mb-4 bg-white hover:bg-indigo-400 hover:text-white text-indigo-400 border-[1px] border-indigo-400 rounded-3xl  text-sm lg:text-base transition-all`}>Cancel</button>
                    <button type='submit' disabled={isFieldsEmpty()} className={`py-2 px-6 mb-4 bg-indigo-${isFieldsEmpty() ? '400' : '600'} active:bg-indigo-800 text-white rounded-3xl  text-sm lg:text-base transition-all`}>Submit</button>
                </div>
                {/* Form Inputs */}
                {/* Form  */}
            </Box>
        </Modal>
        // </Modal>
    )
}

export default TaskAction