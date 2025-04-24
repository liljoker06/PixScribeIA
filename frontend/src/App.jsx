import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import ViewerPage from './pages/ViewerPage'
import HistoryPage from './pages/HistoryPage'
import SideBar from './components/SideBar'
import ProtectedRoute from './components/ProtectedRoute'



function Layout({ children }) {
  return (
    <div className="flex">
      <SideBar />
      <main className="ml-64 w-full min-h-screen">{children}</main>
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
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <ViewerPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <Layout>
                <HistoryPage />
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