import { Link } from 'react-router-dom'

function Register() {
  return (
    <div className="mt-20">
      <h1 className="text-3xl text-center">Register</h1>
      <form className="mt-2 max-w-md mx-auto">
        <input type="text" placeholder="John Doe" />
        <input type="email" placeholder="your@email.com" />
        <input type="password" placeholder="password" />
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
