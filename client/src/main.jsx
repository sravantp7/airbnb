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
import Place from './components/Place.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<IndexPage />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="account/:subpage?" element={<AccountPage />} />
      <Route path="account/:subpage/:action" element={<AccountPage />} />
      <Route path="account/:subpage/:action/:id" element={<AccountPage />} />
      {/* This route is used to render places when clicking on it */}
      <Route path="/place/:id" element={<Place />} />
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
