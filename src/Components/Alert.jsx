import { useContext } from "react"
import Context from "../ContextAPI/Context"
import { Cancel, Check, PriorityHigh } from '@mui/icons-material'

const Alert = () => {

    let { alerts } = useContext(Context)

    let { isShown, mode, message } = alerts

    const alertColors = {
        success: 'bg-green-500',
        danger: 'bg-red-500',
        warning: 'bg-yellow-500'
    }

    const alertIcons = {
        success: <Check/>,
        danger: <Cancel/>,
        warning: <PriorityHigh/>
    }
    
    return isShown && <div className={`fixed top-10 right-9 lg:right-16 text-md ${alertColors[mode]} text-white px-5 py-3 text-md rounded shadow z-[3000]`}>
        {alertIcons[mode]} {message}
    </div>
}

export default Alert