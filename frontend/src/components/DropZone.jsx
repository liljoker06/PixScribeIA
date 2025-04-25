import { useRef, useState } from 'react'
import { UploadCloud } from 'lucide-react'

function DropZone({ setImagePreview, setSelectedImage }) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)
  
  const handleFileSelect = (file) => {
    if (!file) return

    const imageUrl = URL.createObjectURL(file)
    setSelectedImage(file)
    setImagePreview(imageUrl)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      handleFileSelect(file)
    }
  }
  
  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }
  
  const handleDragLeave = () => {
    setIsDragging(false)
  }
  
  const handleClick = () => {
    fileInputRef.current.click()
  }
  
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  return (
    <div
      className={`w-full max-w-md p-6 border-2 border-dashed ${
        isDragging ? 'border-blue-300 bg-[#1e2a3b]' : 'border-blue-500 bg-[#1a1a1a]'
      } rounded-lg text-gray-300 cursor-pointer transition-colors flex flex-col items-center justify-center min-h-32`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <UploadCloud className="w-10 h-10 text-blue-500 mb-2" /> 
      <p className="text-center">
        Glissez une image ici ou <span className="text-blue-400">cliquez pour sélectionner</span>
      </p>
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  )
}

export default DropZone