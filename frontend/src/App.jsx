import { useState } from "react"

function App() {

  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])

  const addTask = () => {

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

  return (
    <div style={{ padding: "20px" }}>

      <h1>TaskFlow</h1>

      <p>Manage your daily tasks efficiently</p>

      <div style={{ marginBottom: "20px" }}>

        <input
          type="text"
          placeholder="Enter task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            marginRight: "10px"
          }}
        />

        <button
          onClick={addTask}
          style={{
            padding: "10px"
          }}
        >
          Add
        </button>

      </div>

      {
        tasks.map((item) => (
          <div
            key={item.id}
            style={{
              background: "#1e293b",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "10px"
            }}
          >
            <div>

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
                    : "none"
                }}
              >
                {item.title}
              </span>
              <button
                onClick={() => deleteTask(item.id)}
                style={{
                  marginLeft: "15px"
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      }

    </div>
  )
}

export default App