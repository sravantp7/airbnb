import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className="mt-20">
      <h1 className="text-3xl font-bold text-center">Login</h1>
      <form className="w-full max-w-md mx-auto mt-6">
        <input type="email" placeholder="your@email.com" />
        <input type="password" placeholder="password" />
        <button className="primary">Login</button>
        <div className="mt-2 text-center">
          <span className="text-gray-500">Don't have an account yet? </span>
          <Link to={'/register'} className="text-primary">
            Register
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Login
