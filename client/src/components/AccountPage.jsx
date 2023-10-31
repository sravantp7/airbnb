import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useUserContext } from '../context/UserContext'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

const SERVER_URL = import.meta.env.VITE_SERVER_URL

function AccountPage() {
  const [redirect, setRedirect] = useState(null)
  const { user, setUser } = useUserContext()
  let { subpage } = useParams()

  if (subpage == undefined) {
    subpage = 'profile'
  }

  // adding a small delay here because fetching user profile will take some milliseconds
  // and we don't want to Naviage to login page all the time.
  setTimeout(() => {
    if (!user) {
      return <Navigate to={'/login'} />
    }
  }, 1000)

  // function used to add style to active route
  function linkClasses(type = null) {
    let classes = 'py-2 px-6'

    if (type == subpage) {
      classes += ' bg-primary text-white rounded-full'
    }
    return classes
  }

  // This function will make an api call and the server will reset the cookie for logging out
  async function logout() {
    await axios.post(`${SERVER_URL}/api/logout`, {})
    setUser(null)
    setRedirect('/')
  }

  if (redirect == '/') {
    return <Navigate to={'/'} />
  }

  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-2">
        <Link to={'/account'} className={linkClasses('profile')}>
          My Profile
        </Link>
        <Link to={'/account/bookings'} className={linkClasses('bookings')}>
          My Bookings
        </Link>
        <Link
          to={'/account/accommodations'}
          className={linkClasses('accommodations')}
        >
          My Accommodations
        </Link>
      </nav>
      {user && user.name && subpage === 'profile' && (
        <div className="text-center max-w-lg mt-8 mx-auto">
          <div>
            Logged in as <span className="font-bold">{user.name} </span>(
            {user.email})
          </div>
          <button
            onClick={logout}
            className="bg-primary max-w-sm rounded-full px-6 py-2 text-white mt-4"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default AccountPage
