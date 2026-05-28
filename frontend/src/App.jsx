import { useState, useEffect } from "react"

function App() {

  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState(() => {

    const savedTasks =
      localStorage.getItem("tasks")

    return savedTasks
      ? JSON.parse(savedTasks)
      : []

  })
  const [filter, setFilter] = useState("all")

  const addTask = () => {

    if(task.trim() === ""){
      alert("Please enter a task")
      return
    }

    const newTask = {
      id: Date.now(),
      title: task,
      completed: false
    }

    setTasks([...tasks, newTask])

    setTask("")
  }
  const toggleTask = (id) => {

    const updatedTasks = tasks.map((item) => {

      if(item.id === id){
        return {
          ...item,
          completed: !item.completed
        }
      }

      return item
    })

    setTasks(updatedTasks)
  }

  const deleteTask = (id) => {

    const filteredTasks =
      tasks.filter((item) => item.id !== id)

    setTasks(filteredTasks)
  }

  const filteredTasks = tasks.filter((item) => {

    if(filter === "completed"){
      return item.completed
    }

    if(filter === "pending"){
      return !item.completed
    }

    return true
  })
  const filterButtonStyle = (type) => ({
    padding: "10px 15px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    backgroundColor:
      filter === type ? "#3b82f6" : "#475569",
    color: "white"
  })

  useEffect(() => {

    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    )

  }, [tasks])

  

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "#1e293b",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 0 20px rgba(0,0,0,0.3)"
        }}
      >

        <h1
          style={{
            textAlign: "center",
            fontSize: "42px",
            marginBottom: "10px"
          }}
        >
          TaskFlow
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
            marginBottom: "30px"
          }}
        >
          Manage your daily tasks efficiently
        </p>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px"
          }}
        >

          <input
            type="text"
            placeholder="Enter task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            style={{
              flex: 1,
              padding: "12px",
              border: "none",
              borderRadius: "10px",
              outline: "none",
              fontSize: "15px"
            }}
          />

          <button
            onClick={addTask}
            style={{
              padding: "12px 18px",
              border: "none",
              borderRadius: "10px",
              backgroundColor: "#3b82f6",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Add
          </button>

        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "25px"
          }}
        >

          <button
            onClick={() => setFilter("all")}
            style={filterButtonStyle("all")}
          >
            All
          </button>

          <button
            onClick={() => setFilter("completed")}
            style={filterButtonStyle("completed")}
          >
            Completed
          </button>

          <button
            onClick={() => setFilter("pending")}
            style={filterButtonStyle("pending")}
          >
            Pending
          </button>

        </div>

        {
          filteredTasks.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: "#334155",
                padding: "15px",
                borderRadius: "12px",
                marginBottom: "12px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >

              <div
                style={{
                  display: "flex",
                  alignItems: "center"
                }}
              >

                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleTask(item.id)}
                />

                <span
                  style={{
                    marginLeft: "10px",
                    textDecoration: item.completed
                      ? "line-through"
                      : "none",
                    color: item.completed
                      ? "#94a3b8"
                      : "white"
                  }}
                >
                  {item.title}
                </span>

              </div>

              <button
                onClick={() => deleteTask(item.id)}
                style={{
                  backgroundColor: "#ef4444",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  color: "white",
                  cursor: "pointer"
                }}
              >
                Delete
              </button>

            </div>
          ))
        }

      </div>
    </div>
  )
}

export default App