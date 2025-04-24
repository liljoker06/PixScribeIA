
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function RegisterPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.password !== form.confirm) return setError("Les mots de passe ne correspondent pas")
    console.log('Inscription simulée ✅', form)
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-xl shadow-xl max-w-md w-full space-y-5 border border-gray-700">
        <h2 className="text-white text-2xl font-semibold text-center">Créer un compte</h2>

        {error && <div className="bg-red-600/10 text-red-400 border border-red-600 p-2 rounded text-sm">{error}</div>}

        <input name="username" type="text" required placeholder="Nom d'utilisateur" onChange={handleChange} className="input" />
        <input name="email" type="email" required placeholder="Email" onChange={handleChange} className="input" />
        <input name="password" type="password" required placeholder="Mot de passe" onChange={handleChange} className="input" />
        <input name="confirm" type="password" required placeholder="Confirmer le mot de passe" onChange={handleChange} className="input" />

        <button className="w-full py-3 bg-blue-600 rounded hover:bg-blue-700 transition font-semibold">S'inscrire</button>
      </form>
    </div>
  )
}

export default RegisterPage
