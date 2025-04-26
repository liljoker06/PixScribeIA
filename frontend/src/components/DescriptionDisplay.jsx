function DescriptionDisplay({ description }) {
    return (
      <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow text-center max-w-xl mx-auto">
        <h3 className="text-white font-semibold text-lg mb-2">Description générée :</h3>
        <p className="text-gray-300 text-sm">{description}</p>
      </div>
    )
  }
  export default DescriptionDisplay
  
