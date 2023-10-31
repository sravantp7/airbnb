import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { useUserContext } from '../context/UserContext'

const SERVER_URL = import.meta.env.VITE_SERVER_URL

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogging, setIsLogging] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false) // state used to track whether user is logged in or not

  const { setUser } = useUserContext()

  async function userLogin(e) {
    e.preventDefault()
    setIsLogging(true)
    try {
      const res = await axios.post(`${SERVER_URL}/api/login`, {
        email,
        password,
      })
      setIsLogging(false)
      if (res.data) {
        alert('Successfully Loggedin')
        // setting user context state by the logged in user details
        setUser(res.data.user)
        // emptying login form after login
        setEmail('')
        setPassword('')
        setLoggedIn(true)
      }
    } catch (err) {
      alert('Login Failed, Please check your email & password')
      setIsLogging(false)
    }
  }

  if (loggedIn) {
    // if successfully logged in then redirect to homepage
    return <Navigate to={'/'} />
  }

  return (
    <div className="mt-20">
      <h1 className="text-3xl text-center">Login</h1>
      <form className="w-full max-w-md mx-auto mt-6" onSubmit={userLogin}>
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
        <button
          disabled={isLogging}
          className={`primary ${isLogging ? `opacity-50` : `opacity-100`}`}
        >
          Login
        </button>
        <div className="mt-2 text-center">
          <span className="text-gray-500">Don't have an account yet? </span>
          <Link to={'/register'} className="text-primary underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Login
