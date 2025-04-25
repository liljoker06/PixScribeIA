import { useState } from 'react'
import Loader from '../components/Loader'
import DescriptionDisplay from '../components/DescriptionDisplay'
import CopilotHome from '../components/CopilotHome'

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
      <CopilotHome user={null} />
    </div>
  )
}

export default ViewerPage