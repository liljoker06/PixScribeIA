
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ViewerPage from './pages/ViewerPage'
import HistoryPage from './pages/HistoryPage'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import { useState } from 'react'


import { useAuthStore } from "./store/authStore"; 


function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <BrowserRouter>
      <div className="bg-gray-950 min-h-screen text-white">
        <NavBar />
        <Routes>
          <Route path="/" element={<ViewerPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
