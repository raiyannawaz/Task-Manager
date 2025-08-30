import { useState } from 'react'
import Context from './Context'

export default function ContextState({ children }) {

  const [user, setUser] = useState(null)

  const [tasks, setTasks] = useState([])

  const [filteredTasks, setFilteredTasks] = useState([])

  const [isLoading, setIsLoading] = useState(false)

  const [isModal, setIsModal] = useState(false)

  const [alerts, setAlerts] = useState({ isShown: false, mode: '', message: '' })

  const [confirm, setConfirm] = useState(false)

  const [isFiltering, setIsFiltering] = useState(false)

  const [isDropdown, setIsDropdown] = useState(false)

  const showAlerts = ({ isShown, mode, message }) => {
    setAlerts({ isShown, mode, message })

    setTimeout(() => {
      setAlerts({ isShown: false, mode: '', message: '' })
    }, 5000)
  }
  const [taskId, setTaskId] = useState(null)

  const [searchFilter, setSearchFilter] = useState('')

  const [selectFilter, setSelectFilter] = useState({})

  const [pieChartLabel, setPieChartLabel] = useState('category')

  const [pieChartData, setPieChartData] = useState({})

  // Pie Chart Data 
  const handlePieChartData = (currTasks, label) => {
    let newPieChartData = {
      labels: [], data: []
    }

    for (let i = 0; i < currTasks.length; i++) {
      let currTask = currTasks[i]
      for (let key in currTask) {
        if (key === label) {
          if (!newPieChartData.labels.includes(currTask[key])) {
            newPieChartData = {
              ...newPieChartData,
              labels: [...newPieChartData.labels, currTask[key]],
              data: [...newPieChartData.data, 1]
            }
          }
          else {
            let index = newPieChartData.labels.indexOf(currTask[key])
            newPieChartData.data[index] = newPieChartData.data[index] + 1
          }
        }
      }
    }
    setPieChartData(newPieChartData)
  }
  // Pie Chart Data

  // Search Filter 
  const handleSearchFilter = (event) => {
    setSearchFilter(event.target.value)

    let value = event.target.value;

    if (value === '') {
      setFilteredTasks(tasks)
    }
    else {
      let filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(value.toLowerCase()))
      setFilteredTasks(filteredTasks)
    }
  }
  // Search Filter 

  // Get Tasks 
  const getTasks = async () => {
    setIsLoading(true)
    try {

      // API CALLING 
      let response = await fetch(`${process.env.REACT_APP_API_URL}/task/get-tasks`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: sessionStorage.getItem('token')
        }
      })
      // API CALLING 

      let jsData = await response.json()

      if (response.status === 200 && response.ok) {
        setIsLoading(false)
        setTasks(jsData)
        setFilteredTasks(jsData)
        handlePieChartData(jsData, pieChartLabel)
      }
      else {
        let { message } = jsData;
        setIsLoading(false)
        showAlerts({ isShown: true, color: 'red', message })
      }
    }
    catch (err) {
      setIsLoading(false)
      showAlerts({ isShown: true, color: 'red', message: 'Uncaught error' })
    }
  }
  // Get Tasks 

  // Get User 
  const getUser = async () => {
    setIsLoading(true)
    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/user/get-user`, {
        method: 'GET',
        headers: {
          Authorization: sessionStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      })

      let jsData = await response.json()

      if (response.ok && response.status === 200) {
        setUser({ name: jsData.name, email: jsData.email, image: jsData.imageUrl })
        showAlerts({ isShown: true, mode: 'success', message: 'User fetched' })
        setIsLoading(false)
      }
      else {
        showAlerts({ isShown: true, mode: 'danger', message: 'Uncaught error' })
        setIsLoading(false)
      }
    }
    catch (err) {
      setIsLoading(false)
      showAlerts({ isShown: true, color: 'red', message: 'Uncaught error' })
    }
  }
  // Get User 

  return (
    <Context.Provider value={{
      getTasks, isLoading, setIsLoading, alerts, showAlerts, isModal, setIsModal, user, setUser, getUser,
      taskId, setTaskId, tasks, setTasks, searchFilter, setSearchFilter, handleSearchFilter, filteredTasks,
      setFilteredTasks, confirm, setConfirm, selectFilter, isFiltering, setIsFiltering, setSelectFilter,
      pieChartLabel, setPieChartLabel, pieChartData, setPieChartData, handlePieChartData, isDropdown, setIsDropdown
    }}>
      {children}
    </Context.Provider>
  )
}
