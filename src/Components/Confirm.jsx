import { useContext } from "react"
import Context from "../ContextAPI/Context"

const Confirm = () => {

    const { confirm, setIsLoading, setConfirm, setTaskId, showAlerts, taskId, tasks, setTasks, setFilteredTasks} = useContext(Context)

    const handleCancel = () => {
        setConfirm(false)
        setTaskId(null)
    }

    const handleConfirm = async () => {
        setIsLoading(true)
        try {

            // API CALLING 
            let response = await fetch(`${process.env.REACT_APP_API_URL}/task/delete-task/${taskId}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type' : 'application/json',
                    Authorization: sessionStorage.getItem('token')
                }
            })
            // API CALLING 

            let { message } = await response.json();
            
            if (response.status === 200 && response.ok) {
                setIsLoading(false)

                let newTasks = await tasks.filter(task=>task._id !== taskId)
                setTasks(newTasks)
                setFilteredTasks(newTasks)

                showAlerts({ isShown: true, mode: 'success', message })
                setConfirm(false)
                setTaskId('')
            }
            else {
                setIsLoading(false)
                setTaskId(null)
                showAlerts({ isShown: true, mode: 'danger', message })
            }
        }
        catch (err) {
            setIsLoading(false)
            setTaskId(null)
            showAlerts({ isShown: true, mode: 'danger', message: 'Uncaught error' })
        }
    }

    return (
        confirm && <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-lg font-semibold text-gray-800">{"Are you sure?"}</h2>
                <div className="flex justify-end gap-3 mt-4">
                    <button
                        className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-indigo-500 active:bg-indigo-700 text-white rounded-md hover:bg-indigo-700 transition"
                        onClick={handleConfirm}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Confirm