import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import LoginPage from './pages/LoginPage'
import ViewerPage from './pages/ViewerPage'
import HistoryPage from './pages/HistoryPage'
import SideBar from './components/SideBar'
import ProtectedRoute from './components/ProtectedRoute'

function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Détecter si l'appareil est mobile au chargement initial
  const isMobile = window.innerWidth < 640;
  
  // Sur mobile, fermer la sidebar par défaut
  useState(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, []);

  return (
    <div className="flex flex-col sm:flex-row">
      <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className={`flex-1 min-h-screen bg-gray-900 transition-all duration-300 ${isSidebarOpen ? 'sm:ml-64' : 'sm:ml-16'}`}>
        {children}
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Routes protégées avec Layout */}
        <Route 
          path="/historique/:id" 
          element={
            <ProtectedRoute>
              <Layout>
                <HistoryPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <ViewerPage />
              </Layout>
            </ProtectedRoute>
          }
        />         
        {/* Redirection pour les routes inconnues */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App