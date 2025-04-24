import { useState } from 'react'
import DropZone from './DropZone'

export default function CopilotHome({ user }) {
  const [description, setDescription] = useState('')

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4 bg-gray-950 text-white">
      <h1 className="text-3xl font-bold mb-4">
        {description ? description : 'Bon après-midi'}
      </h1>
      <p className="text-lg text-gray-400 mb-8">
        {description ? null : "En quoi puis-je vous aider aujourd’hui ?"}
      </p>
      <DropZone setDescription={setDescription} />
    </div>
  )
}
