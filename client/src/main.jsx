import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import IndexPage from './components/IndexPage.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import AccountPage from './components/AccountPage.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<IndexPage />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="account/:subpage?" element={<AccountPage />} />
      <Route path="account/:subpage/:action" element={<AccountPage />} />
      <Route path="account/:subpage/myplaces/:id" element={<AccountPage />} />
      <Route path="about" element={<div>Login</div>} />
      <Route path="*" element={<div>Page Not Found</div>} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
