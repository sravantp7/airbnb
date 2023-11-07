import { useEffect, useState } from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import { UserProvider } from './context/UserContext'

axios.defaults.withCredentials = true

const SERVER_URL = import.meta.env.VITE_SERVER_URL

function App() {
  const [user, setUser] = useState(null)

  // used to fetch user details when opening the app,
  // here when this request happens backend will look for cookie to get the details
  useEffect(() => {
    async function fetchUser() {
      if (!user) {
        const res = await axios.get(`${SERVER_URL}/api/profile`)
        setUser(res.data)
      }
    }
    fetchUser()
  }, [])

  return (
    <UserProvider value={{ user, setUser }}>
      <main className="py-4 px-8 flex flex-col min-h-screen">
        <Header />
        <Outlet />
      </main>
    </UserProvider>
  )
}

export default App
