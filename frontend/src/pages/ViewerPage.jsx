import CopilotHome from '../components/CopilotHome'

function ViewerPage() {

  return (
    <div className="p-6 flex flex-col items-center justify-center text-black bg-gray-900 min-h-screen">
      <CopilotHome user={null} />
    </div>
  )
}

export default ViewerPage