// LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore'

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);
  const signup = useAuthStore((state) => state.signup);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isLogin && password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (!isLogin && username.trim() === '') {
      setError('Veuillez entrer un nom d\'utilisateur');
      return;
    }

    try {
      if (isLogin) {
        await login(email, password); 
      } else {
        const newUser = await signup(username, email, password); 
        console.log("Inscription réussie :", newUser);
        await login(email, password); 
      }
      navigate('/');
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      console.error(err);
    }
  };

  return (
    // Formulaire connexion / inscrption
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="bg-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-md space-y-6 border border-gray-800">
        <div className="flex flex-col items-center text-white">
          <h1 className="text-3xl font-semibold mb-2">PixScribeIA</h1>
          <p className="text-sm text-gray-400 text-center">
            Générez des descriptions d'images par l'intelligence artificielle.
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-600 text-red-400 text-sm p-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-white">
          {!isLogin && (
            <div>
              <label className="block mb-1 text-sm">Nom d'utilisateur</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 bg-gray-800 rounded border border-gray-700 focus:ring focus:ring-blue-500"
                placeholder="Entrez un nom d'utilisateur"
              />
            </div>
          )}

          <div>
            <label className="block mb-1 text-sm">Adresse email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-800 rounded border border-gray-700 focus:ring focus:ring-blue-500"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-800 rounded border border-gray-700 focus:ring focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block mb-1 text-sm">Confirmer mot de passe</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 bg-gray-800 rounded border border-gray-700 focus:ring focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition rounded font-semibold"
          >
            {isLogin ? 'Se connecter' : "Créer un compte"}
          </button>
        </form>

        <div className="text-sm text-center text-gray-400">
          {isLogin ? "Pas encore de compte ?" : "Déjà inscrit ?"}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-400 hover:underline ml-1"
          >
            {isLogin ? 'Créer un compte' : 'Se connecter'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
