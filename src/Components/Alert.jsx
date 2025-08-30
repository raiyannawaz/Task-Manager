import { useContext } from "react"
import Context from "../ContextAPI/Context"
import { Cancel, Check, PriorityHigh } from '@mui/icons-material'

const Alert = () => {

    let { alerts } = useContext(Context)

    let { isShown, mode, message } = alerts

    const alertColors = {
        success: 'text-green-500',
        danger: 'text-red-500',
        warning: 'text-yellow-500'
    }

    const alertIcons = {
        success: <Check/>,
        danger: <Cancel/>,
        warning: <PriorityHigh/>
    }
    
    return isShown && <div className={`fixed shadow-md top-12 right-9 lg:right-16 text-md ${alertColors[mode]} bg-white px-5 py-3 text-md rounded shadow z-[3000]`}>
        {alertIcons[mode]} {message}
    </div>
}

export default Alert