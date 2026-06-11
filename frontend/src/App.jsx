import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import {
  FaTrash,
  FaEdit,
  FaRocket,
  FaMoon,
  FaSun
}
from "react-icons/fa"

const API_URL = import.meta.env.VITE_API_URL

function App(){

  const [tasks,setTasks] = useState([])
  const [title,setTitle] = useState("")
  const [filter,setFilter] = useState("all")
  const navigate = useNavigate()
  const [editId,setEditId] = useState(null)
  const token = localStorage.getItem("token")

  const handleLogout = () => {

    localStorage.removeItem("token")

    navigate("/")

  }

  const fetchTasks = async () => {

    const response = await axios.get(
      `${API_URL}/api/tasks`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
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
        `${API_URL}/api/tasks/${editId}`,
        {
          title
        },
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      )

      setEditId(null)

    }

    else{

      await axios.post(
        `${API_URL}/api/tasks`,
        {
          title
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

    }

    setTitle("")

    fetchTasks()

  }

  const deleteTask = async(id) => {

    await axios.delete(
      `${API_URL}/api/tasks/${id}`,
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    )

    fetchTasks()

  }

  const toggleTask = async(task) => {

    await axios.put(
      `${API_URL}/api/tasks/${task._id}`,
      {
        completed: !task.completed
      },
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
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

    <div className="app dark">

      <div className="container">

        <div className="topbar">

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
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