function DropZone({ setDescription }) {
    const handleDrop = (e) => {
      e.preventDefault()
      const file = e.dataTransfer.files[0]
      if (!file) return
  
      const formData = new FormData()
      formData.append('image', file)
  
      fetch('http://localhost:8000/api/describe', {
        method: 'POST',
        body: formData
      })
        .then(res => res.json())
        .then(data => setDescription(data.description))
        .catch(() => setDescription('Erreur de génération.'))
    }
  
    return (
      <div
        className="w-full max-w-md p-6 border-2 border-dashed border-blue-500 rounded-lg text-gray-300 bg-[#1a1a1a]"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        Glissez une image ici pour générer une description
      </div>
    )
  }
  
  export default DropZone
  