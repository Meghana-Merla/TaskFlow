import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { FaRocket } from "react-icons/fa"
import "../auth.css"

const API_URL = import.meta.env.VITE_API_URL

function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleLogin = async () => {

    try {

      const response = await axios.post(
        `${API_URL}/api/auth/login`,
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

    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-logo">

          <h1>
            Task<span>Flow</span>
          </h1>

          <FaRocket />

        </div>

        <p className="auth-subtitle">
          Welcome back! Login to continue.
        </p>

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

        <button
          className="auth-btn"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="auth-link">

          Don't have an account?

          <Link to="/register">
            {" "}Register
          </Link>

        </p>

      </div>

    </div>

  )

}

export default Login