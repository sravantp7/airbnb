import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const SERVER_URL = import.meta.env.VITE_SERVER_URL

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function registerUser(e) {
    e.preventDefault()

    try {
      if (!(name && email && password)) {
        alert('Please provide details to register')
        return
      }
      const res = await axios.post(`${SERVER_URL}/api/register`, {
        name,
        email,
        password,
      })

      if (res.data.email) {
        alert('Registration Successful')
      }
    } catch (err) {
      if (err.response.data.error) {
        alert('Registration Failed, Email has already registered')
      } else {
        alert('Something went wrong, Please try again later')
      }
    }
  }

  return (
    <div className="mt-20">
      <h1 className="text-3xl text-center">Register</h1>
      <form className="mt-2 max-w-md mx-auto" onSubmit={registerUser}>
        <input
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="primary">Register</button>
        <div className="mt-2 text-center">
          <span className="text-gray-500">Already a member? </span>
          <Link to={'/login'} className="text-primary underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Register
