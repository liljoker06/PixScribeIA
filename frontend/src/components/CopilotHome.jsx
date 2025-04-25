import { useState } from 'react'
import DropZone from './DropZone'
import getGreeting from '../utils/hour'
import { X, ArrowRight } from 'lucide-react'
import { uploadImage, createRequete } from '../api/img'

export default function CopilotHome() {
  const [description, setDescription] = useState('')
  const [imagePreview, setImagePreview] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  const handleSubmit = async () => {
    if (!selectedImage) return;
    setIsProcessing(true);
  
    try {
      const { requeteId } = await createRequete();
  
      if (!requeteId) throw new Error("Aucun ID de requête reçu");
  
      console.log("Requete créée avec l'ID :", requeteId);
  
      const result = await uploadImage(requeteId, selectedImage);
  
      console.log("Résultat upload :", result);
  
      setDescription(result.description || "Image bien envoyée");
  
    } catch (error) {
      console.error("Erreur handleSubmit :", error.message);
      setDescription("Erreur lors de l'envoi de l'image");
    } finally {
      setIsProcessing(false);
    }
  };
  
  
  
  

  const handleRemoveImage = () => {
    setImagePreview(null)
    setSelectedImage(null)
    setDescription('')
    setIsProcessing(false)
  }

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4 w-full max-w-2xl">
      {/* quand l'image est chargé */}
      {imagePreview ? (
        <div className="w-full">
          <div className="mb-6 flex justify-center relative">
            <img 
              src={imagePreview} 
              alt="Image analysée" 
              className="max-h-64 object-contain rounded-lg shadow-lg"
            />
            <button 
              className="absolute top-2 right-2 bg-red-500 rounded-full p-1 hover:bg-red-600 transition-colors"
              onClick={handleRemoveImage}
            >
              <X className="w-4 h-4 text-white" /> 
            </button>
          </div>
          
          {/* si y'a aucuen description et que ça charge pas */}
          {!isProcessing && !description && (
            <div className="my-6 flex justify-center">
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center text-white font-semibold"
              >
                <ArrowRight className="w-5 h-5 mr-2" /> 
                Générer la description
              </button>
            </div>
          )}
          
          {/* chargement */}
          {isProcessing && (
            <div className="my-6 flex flex-col items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
              <p className="text-gray-700 mt-2">Analyse de l'image en cours...</p>
            </div>
          )}
          
          {/* quand la description est générée */}
          {!isProcessing && description && (
            <div className="my-6">
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">Description générée</h2>
              <p className="text-lg text-gray-700">{description}</p>
              <button
                onClick={handleRemoveImage}
                className="mt-4 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-white font-semibold"
              >
                Analyser une autre image
              </button>
            </div>
          )}
        </div>
      ) : (
        // quand l'image n'est pas chargé
        <>
          <h1 className="text-3xl font-bold mb-4 text-gray-800">{getGreeting()}</h1>
          <p className="text-lg text-gray-500 mb-8">En quoi puis-je vous aider aujourd'hui ?</p>
          <DropZone 
            setImagePreview={setImagePreview} 
            setSelectedImage={setSelectedImage}
          />
        </>
      )}
    </div>
  )
}