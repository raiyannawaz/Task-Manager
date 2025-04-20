import React, { useState } from 'react'
import Context from './Context'

export default function ContextState({children}) {

  const [tasks, setTasks] = useState([])

  const [filteredTasks, setFilteredTasks] = useState([])

  const [ isLoading, setIsLoading ] = useState(false)

  const [ isModal, setIsModal ] = useState(false)
  
  const [ alerts, setAlerts ] = useState({isShown: false, mode: '', message: ''})

  const [ confirm, setConfirm ] = useState(false)

  const [ isFiltering, setIsFiltering ] = useState(false)
  
  const showAlerts = ({isShown, mode, message}) =>{
    setAlerts({isShown, mode, message})
    
    setTimeout(()=>{
      setAlerts({isShown: false, mode: '', message: ''})
    }, 5000)
  }
  const [ taskId, setTaskId ] = useState(null)

  const [ searchFilter, setSearchFilter ] = useState('')

  const [ selectFilter, setSelectFilter ] = useState({})

  const handleSearchFilter = (event) =>{
    setSearchFilter(event.target.value)

    let value = event.target.value;
    
    if(value === ''){
      setFilteredTasks(tasks)
    }
    else{
      let filteredTasks = tasks.filter(task=>task.title.toLowerCase().includes(value.toLowerCase()))
      setFilteredTasks(filteredTasks)
    }
  }

   // Get Tasks 
    const getTasks = async () => {
      setIsLoading(true)
      try {

        // API CALLING 
        let response = await fetch(`${process.env.REACT_APP_API_URL}/task/get-tasks`,{
          method: 'GET',
          headers: {
            'Content-Type' : 'application/json',
            Authorization: sessionStorage.getItem('token')
          }
        })
        // API CALLING 

        let jsData = await response.json()
  
        if (response.status === 200 && response.ok) {
          setIsLoading(false)
          setTasks(jsData)
          setFilteredTasks(jsData)
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

  return (
    <Context.Provider value={{getTasks, isLoading, setIsLoading, alerts, showAlerts,
          isModal, setIsModal, taskId, setTaskId, tasks, setTasks, searchFilter, setSearchFilter, 
          handleSearchFilter, filteredTasks, setFilteredTasks, confirm, setConfirm, selectFilter, 
          isFiltering, setIsFiltering, setSelectFilter}}>
        {children}
    </Context.Provider>
  )
}
