import CopilotHome from '../components/CopilotHome'
import Deconnexion from '../components/Deconnexion'

function ViewerPage() {
  return (
    <div className="p-6 flex flex-col items-center justify-center text-black bg-gray-900 min-h-screen relative">
      {/* Positionne Deconnexion en haut à droite */}
      <Deconnexion className="absolute top-6 right-6" />
      
      {/* CopilotHome centré */}
      <CopilotHome user={null} />
    </div>
  )
}

export default ViewerPage
