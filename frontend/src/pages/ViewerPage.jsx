import { useState } from 'react'
import Loader from '../components/Loader'
import DescriptionDisplay from '../components/DescriptionDisplay'

function ViewerPage() {
  const [image, setImage] = useState(null)
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const handleUpload = (e) => setImage(e.target.files[0])

  const handleGenerate = () => {
    if (!image) return alert("Veuillez choisir une image")
    setLoading(true)
    setTimeout(() => {
      setDescription("Un chien qui court dans un parc 🌳 (description simulée)")
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="p-6 flex flex-col items-center justify-center text-black bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Téléversez une image</h1>

      <input type="file" accept="image/*" onChange={handleUpload} className="mb-4 text-white" />

      {image && <img src={URL.createObjectURL(image)} alt="preview" className="mb-4 rounded w-64" />}

      <button onClick={handleGenerate} className="bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded">
        {loading ? 'Génération en cours...' : 'Générer la description'}
      </button>

      {loading && <Loader />}
      {!loading && description && <DescriptionDisplay description={description} />}
    </div>
  )
}

export default ViewerPage