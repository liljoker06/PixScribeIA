import { Link, useLocation } from 'react-router-dom'

function NavBar() {
  const { pathname } = useLocation()

  return (
    <nav className="w-full bg-gray-900 shadow-lg px-6 py-4 text-white flex justify-between items-center">
      <div className="text-xl font-bold">PixScribeIA</div>
      <div className="space-x-4 text-sm">
        <Link to="/" className={pathname === '/' ? 'text-blue-400 font-semibold' : 'hover:underline'}>Accueil</Link>
        <Link to="/history" className={pathname === '/history' ? 'text-blue-400 font-semibold' : 'hover:underline'}>Historique</Link>
        <Link to="/login" className={pathname === '/login' ? 'text-blue-400 font-semibold' : 'hover:underline'}>Connexion</Link>
      </div>
    </nav>
  )
}

export default NavBar