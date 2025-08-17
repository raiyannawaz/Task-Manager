import { useContext, useEffect } from 'react'
import Context from '../ContextAPI/Context'
import { FilterAlt } from '@mui/icons-material'
import Card from '../Components/Card'
import TaskAction from '../Components/TaskAction'
import PieChart from '../Components/PieChart'

export default function Dashboard() {

  // States 
  let { tasks, filteredTasks, setSearchFilter, isFiltering, setIsFiltering, setFilteredTasks,
    setIsModal, getTasks, selectFilter, setSelectFilter, pieChartLabel, setPieChartLabel,
    pieChartData, handlePieChartData } = useContext(Context)
  // States 

  // Handle Add
  const handleAdd = async () => {
    setIsModal(true)
  }
  // Handle Add

  const handleResetFilter = () => {
    setFilteredTasks(tasks)
    setSearchFilter('')
    setSelectFilter({})
    setIsFiltering(!isFiltering)
    handlePieChartData(tasks, pieChartLabel)
  }

  const handleSelectFiltering = (event) => {

    let { name, value } = event.target
    const newObj = { ...selectFilter, [name]: value };

    let newTasks = tasks.filter(task => {
      for (let key in newObj) {
        if (task[key] !== newObj[key]) {
          return false
        }
      }
      return true
    })

    setSelectFilter({ ...selectFilter, [name]: value })
    setFilteredTasks(newTasks)
    handlePieChartData(newTasks, pieChartLabel)

  }

  const handlePieChartLabel = (event) => {
    let { value } = event.target
    setPieChartLabel(value)
    handlePieChartData(filteredTasks, value)
  }

  // Use Effect 
  let token = sessionStorage.getItem('token')
  useEffect(() => {
    getTasks()
  }, [token])
  // Use Effect

  return (
    // DASHBOARD
    <div className='dashboard-container flex h-full w-10/12 lg:w-11/12 mx-auto space-x-5'>
      {/* CONTENT AREA */}
      <div className="content w-full lg:w-3/4">
        {/* Top Header */}
        <div className="flex flex-col space-y-3 lg:space-y-0 lg:flex-row justify-between items-center pt-7 pb-5">
          <h1 className='text-2xl lg:text-3xl text-indigo-700'>Dashboard</h1>
          {/* Filter */}
          {isFiltering ? <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-3 w-full lg:w-auto">
            {/* Category */}
            <select onChange={handleSelectFiltering} name='category' className='w-full py-3 px-6 shadow-md cursor-pointer bg-white hover:bg-indigo-400 hover:text-white text-indigo-400 border-[1px] border-indigo-400 rounded-3xl  text-sm lg:text-base transition-all'>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="others">Others</option>
            </select>
            {/* Category */}
            {/* Priority */}
            <select onChange={handleSelectFiltering} name='priority' className='w-full py-3 px-6 shadow-md cursor-pointer bg-white hover:bg-indigo-400 hover:text-white text-indigo-400 border-[1px] border-indigo-400 rounded-3xl  text-sm lg:text-base transition-all'>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            {/* Priority */}
            {/* Status */}
            <select onChange={handleSelectFiltering} name='status' className='w-full py-3 px-6 shadow-md cursor-pointer bg-white hover:bg-indigo-400 hover:text-white text-indigo-400 border-[1px] border-indigo-400 rounded-3xl  text-sm lg:text-base transition-all'>
              <option value="pending">Pending</option>
              <option value="in-progress">In-progress</option>
              <option value="completed">Completed</option>
            </select>
            {/* Status */}
          </div> : ''}
          {/* Filter */}
          <div className="flex items-center justify-end w-full lg:w-auto space-x-3">
            <button onClick={handleResetFilter} className='py-2 lg:py-3 px-2 lg:px-3 shadow-md bg-indigo-600 active:bg-indigo-800 rounded-3xl text-white text-sm lg:text-base transition-all'>
              <FilterAlt />
            </button>
            <button onClick={handleAdd} className='py-2 lg:py-3 px-5 lg:px-7 shadow-md bg-indigo-600 active:bg-indigo-800 rounded-3xl text-white text-sm lg:text-base transition-all'>Add Task</button>
          </div>
        </div>
        {/* Top Header */}
        {/* Task Action */}
        <TaskAction />
        {/* Pie Chart */}
        <div className="block lg:hidden pie-chart w-full text-center mb-1">
          <select value={pieChartLabel} onChange={handlePieChartLabel} className='w-auto my-2 mx-auto py-3 px-6 shadow-md cursor-pointer bg-white hover:bg-indigo-400 hover:text-white text-indigo-400 border-[1px] border-indigo-400 rounded-3xl  text-sm lg:text-base transition-all'>
            <option value="category">Category</option>
            <option value="status">Status</option>
            <option value="priority">Priority</option>
          </select>
          <PieChart pieChartLabel={pieChartLabel} pieChartData={pieChartData} />
        </div>
        {/* Pie Chart */}
        {/* Task Action */}
        {/* Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full mx-auto pb-7">
          {filteredTasks.length > 0 ? filteredTasks.map(task => {
            return <Card task={task} key={task._id} />
          }) : <h2 className='text-xl lg:text-2xl'>No Tasks Found</h2>}
          {/* Tasks */}
        </div>
      </div>
      {/* Pie Chart */}
      <div className="hidden lg:block pie-chart w-1/4 text-center">
        <select value={pieChartLabel} onChange={handlePieChartLabel} className='w-auto mt-7 mb-4 mx-auto py-3 px-6 shadow-md cursor-pointer bg-white hover:bg-indigo-400 hover:text-white text-indigo-400 border-[1px] border-indigo-400 rounded-3xl  text-sm lg:text-base transition-all'>
          <option value="category">Category</option>
          <option value="status">Status</option>
          <option value="priority">Priority</option>
        </select>
        <PieChart pieChartLabel={pieChartLabel} pieChartData={pieChartData} />
      </div>
      {/* Pie Chart */}
      {/* CONTENT AREA */}
    </div>
    // DASHBOARD
  )
}
