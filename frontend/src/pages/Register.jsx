import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

function Register() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleRegister = async () => {

    try {

      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password
        }
      )

      alert("Registration successful")

      navigate("/")

    }

    catch (error) {

      alert(
        error.response?.data?.message ||
        "Registration failed"
      )

    }

  }

  return (

    <div>

      <h1>Register</h1>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

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

      <button onClick={handleRegister}>
        Register
      </button>

      <p>
        Already have an account?
        <Link to="/"> Login </Link>
      </p>

    </div>

  )

}

export default Register