function HistoryPage() {
    const mockHistory = [
      { id: 1, text: "Un chat sur un canapé 🛋️" },
      { id: 2, text: "Un coucher de soleil en montagne 🌄" },
      { id: 3, text: "Un groupe d'amis en pique-nique 🧺" }
    ]
  
    return (
      <div className="p-6 text-white">
        <h1 className="text-2xl font-bold mb-4">Historique des descriptions</h1>
        <ul className="space-y-3">
          {mockHistory.map((entry) => (
            <li key={entry.id} className="bg-gray-800 p-4 rounded shadow">
              {entry.text}
            </li>
          ))}
        </ul>
      </div>
    )
  }
  
  export default HistoryPage
  