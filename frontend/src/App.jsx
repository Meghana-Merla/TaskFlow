import { useEffect, useState } from "react"
import axios from "axios"

function App() {

  const [tasks, setTasks] = useState([])

  useEffect(() => {

    fetchTasks()

  }, [])

  const fetchTasks = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/tasks"
      )

      setTasks(response.data)

    }

    catch (error) {

      console.log(error)

    }

  }

  return (

    <div>

      <h1>TaskFlow</h1>

      {
        tasks.map((task) => (

          <div key={task._id}>

            <p>{task.title}</p>

          </div>

        ))
      }

    </div>

  )

}

export default App