import CopilotHome from '../components/CopilotHome'
import Deconnexion from '../components/Deconnexion'

function ViewerPage() {
  return (
    <div className="flex-1 min-h-screen p-4 sm:p-6 bg-gray-900">
      {/* Positionne Deconnexion en haut à droite */}
      <div className="flex justify-end mb-4">
        <Deconnexion />
      </div>
      
      {/* CopilotHome centré */}
      <CopilotHome user={null} />
    </div>
  )
}

export default ViewerPage