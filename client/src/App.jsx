import Header from './components/Header'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <main className="p-4 flex flex-col min-h-screen">
      <Header />
      <Outlet />
    </main>
  )
}

export default App
