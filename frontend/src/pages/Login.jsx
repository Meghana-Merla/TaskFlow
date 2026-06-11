import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleLogin = async () => {

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password
        }
      )

      localStorage.setItem(
        "token",
        response.data.token
      )

      alert("Login successful")

      navigate("/tasks")

    }

    catch (error) {

      alert(
        error.response?.data?.message ||
        "Login failed"
      )

    }

  }

  return (

    <div>

      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>
        Login
      </button>

      <p>
        Don't have an account?
        <Link to="/register">
          {" "}Register
        </Link>
      </p>

    </div>

  )

}

export default Login