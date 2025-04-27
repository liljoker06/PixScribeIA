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
  
      
      window.dispatchEvent(new Event('historiqueUpdated'));
  
    } catch (error) {
      console.error("Erreur handleSubmit :", error.message);
      setDescription("Erreur lors de l'envoi de l'image");
    } finally {
      setIsProcessing(false);
    }
  };
  

  const welcomeMessages = [
    "Glissez-moi une image et je vous dirai ce que j'en pense 📷✨",
    "Je suis prêt à analyser vos images, envoyez-moi du visuel 🔍",
    "Une image vaut mille mots… et moi, je peux les écrire 🧠",
    "Chargez une image et laissez-moi vous la décrire avec précision 🤖",
    "Déposez une photo, je vous génère sa description en un éclair ⚡",
    "Je suis PixScribeIA, votre copilote visuel. Allons-y ! 🧭"
  ];

  const randomMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];

  const handleRemoveImage = () => {
    setImagePreview(null)
    setSelectedImage(null)
    setDescription('')
    setIsProcessing(false)
  }

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] text-center px-3 sm:px-4 w-full">
      {/* Container avec arrière-plan coloré */}
      <div className="w-full max-w-xl sm:max-w-2xl bg-grey-500 bg-opacity-50 rounded-lg py-6 px-3 sm:px-4">
        {/* quand l'image est chargée */}
        {imagePreview ? (
          <div className="w-full">
            <div className="mb-4 sm:mb-6 flex justify-center relative">
              <img
                src={imagePreview}
                alt="Image analysée"
                className="max-h-48 sm:max-h-64 object-contain rounded-lg shadow-lg"
              />
              <button
                className="absolute top-2 right-2 bg-red-500 rounded-full p-1 hover:bg-red-600 transition-colors"
                onClick={handleRemoveImage}
                aria-label="Supprimer l'image"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* si y'a aucune description et que ça charge pas */}
            {!isProcessing && !description && (
              <div className="my-4 sm:my-6 flex justify-center">
                <button
                  onClick={handleSubmit}
                  className="px-4 sm:px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center text-white font-semibold"
                >
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Générer la description
                </button>
              </div>
            )}

            {/* chargement */}
            {isProcessing && (
              <div className="my-4 sm:my-6 flex flex-col items-center">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <p className="text-sm sm:text-base text-gray-700 mt-2">Analyse de l'image en cours...</p>
              </div>
            )}

            {/* quand la description est générée */}
            {!isProcessing && description && (
              <div className="my-4 sm:my-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-800">Description générée</h2>
                <p className="text-base sm:text-lg text-gray-700">{description}</p>
                <button
                  onClick={handleRemoveImage}
                  className="mt-4 px-3 sm:px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-white font-medium sm:font-semibold text-sm sm:text-base"
                >
                  Analyser une autre image
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4 text-white">{getGreeting()}</h1>
            <p className="text-base sm:text-lg text-white mb-6 sm:mb-8 px-2">{randomMessage}</p>

            {/* DropZone centré */}
            <div className="flex justify-center w-full">
              <DropZone
                setImagePreview={setImagePreview}
                setSelectedImage={setSelectedImage}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}