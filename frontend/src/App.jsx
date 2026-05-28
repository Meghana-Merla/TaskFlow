import { useEffect, useState } from "react"
import axios from "axios"

import {
  FaTrash,
  FaEdit,
  FaRocket,
  FaMoon,
  FaSun
}
from "react-icons/fa"

function App(){

  const [tasks,setTasks] = useState([])
  const [title,setTitle] = useState("")
  const [filter,setFilter] = useState("all")
  const [darkMode,setDarkMode] = useState(true)
  const [editId,setEditId] = useState(null)

  const fetchTasks = async () => {

    const response = await axios.get(
      "http://localhost:5000/api/tasks"
    )

    setTasks(response.data)

  }

  useEffect(() => {

    fetchTasks()

  },[])

  const createTask = async () => {

    if(!title.trim()) return

    if(editId){

      await axios.put(
        `http://localhost:5000/api/tasks/${editId}`,
        {
          title
        }
      )

      setEditId(null)

    }

    else{

      await axios.post(
        "http://localhost:5000/api/tasks",
        {
          title
        }
      )

    }

    setTitle("")

    fetchTasks()

  }

  const deleteTask = async(id) => {

    await axios.delete(
      `http://localhost:5000/api/tasks/${id}`
    )

    fetchTasks()

  }

  const toggleTask = async(task) => {

    await axios.put(
      `http://localhost:5000/api/tasks/${task._id}`,
      {
        completed: !task.completed
      }
    )

    fetchTasks()

  }
  const editTask = (task) => {

    setTitle(task.title)

    setEditId(task._id)

  }
  const filteredTasks = tasks.filter((task) => {

    if(filter === "completed"){
      return task.completed
    }

    if(filter === "pending"){
      return !task.completed
    }

    return true

  })

  return(

    <div className={darkMode ? "app dark" : "app light"}>

      <div className="container">

        <div className="topbar">

          <button
            className="theme-btn"
            onClick={() => setDarkMode(!darkMode)}
          >

            {
              darkMode
              ?
              <>
                <FaSun />
                Light
              </>
              :
              <>
                <FaMoon />
                Dark
              </>
            }

          </button>

        </div>

        <div className="title-row">

          <h1 className="heading">
            Task<span>Flow</span>
          </h1>

          <FaRocket className="title-rocket" />

        </div>

        <p className="sub">
          Organize your tasks. Stay productive.
        </p>

        <div className="input-box">

          <input
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
          />

          <button onClick={createTask}>

            {
              editId
              ?
              "Update Task"
              :
              "Add Task"
            }

          </button>

        </div>

        <div className="filters">

          <button
            className={filter === "all" ? "active-filter" : ""}
            onClick={()=>setFilter("all")}
          >
            All
          </button>

          <button
            className={filter === "completed" ? "active-filter" : ""}
            onClick={()=>setFilter("completed")}
          >
            Completed
          </button>

          <button
            className={filter === "pending" ? "active-filter" : ""}
            onClick={()=>setFilter("pending")}
          >
            Pending
          </button>

        </div>

        {
          filteredTasks.length === 0 ? (

            <div className="empty-state">

              <FaRocket className="empty-icon" />

              <p>No tasks yet</p>

            </div>

          ) : (

            filteredTasks.map((task)=>(

              <div className="task" key={task._id}>

                <div className="left">

                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={()=>toggleTask(task)}
                  />

                  <p
                    className={
                      task.completed
                      ?
                      "task-title completed"
                      :
                      "task-title"
                    }
                  >
                    {task.title}
                  </p>

                </div>

                <div className="actions">

                  <button
                    className="edit-btn"
                    onClick={()=>editTask(task)}
                  >
                    <FaEdit />
                  </button>

                  <button
                    className="delete-btn"
                    onClick={()=>deleteTask(task._id)}
                  >
                    <FaTrash />
                  </button>

                </div>

              </div>

            ))

          )
        }

        <div className="footer">
          🚀 Stay focused, keep growing 💜
        </div>

      </div>

    </div>

  )

}

export default App