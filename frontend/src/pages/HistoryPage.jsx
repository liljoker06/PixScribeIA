import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getHistoriqueDetails } from "../api/historique";

export default function HistoryPage() {
  const { id } = useParams();
  const location = useLocation();
  const [historique, setHistorique] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (location.state?.historique) {
          console.log("données reçu :", location.state.historique);
          setHistorique(location.state.historique);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.error("Erreur lors de la récupération des détails:", err);
        setError("Impossible de charger les détails de l'historique");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, location.state]);
  
  if (loading) return (
    <div className="flex-1 min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-blue-400 text-xl font-medium">Chargement...</div>
    </div>
  );
  
  if (error) return (
    <div className="flex-1 min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-red-500 text-xl font-medium">{error}</div>
    </div>
  );
  
  if (!historique) return (
    <div className="flex-1 min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-gray-400 text-xl font-medium">Aucune donnée trouvée</div>
    </div>
  );

  const baseUrl = import.meta.env.VITE_API_URL.replace('/api', ''); 
  const imageUrl = `${baseUrl}${historique.imagePath}`; 

  return (
    <div className="flex-1 min-h-screen bg-gray-900 transition-all duration-300 sm:ml-64 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-100 border-b border-gray-700 pb-4">
          Détails de l'historique
        </h1>

        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {/* En-tête avec description */}
          {historique.description && (
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-xl font-semibold mb-3 text-gray-200">Description</h2>
              <p className="text-gray-300 leading-relaxed">
                {historique.description}
              </p>
            </div>
          )}

          {/* Section image */}
          {historique.imagePath && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-3 text-gray-200">Image</h2>
            
              <div className="rounded-lg overflow-hidden border border-gray-700 bg-gray-900 flex justify-center">
                <img
                  src={imageUrl}
                  alt={`Image historique ${id}`}
                  className="h-150 object-contain" 
                  onError={(e) => {
                    console.error("Erreur de chargement d'image:", e);
                    e.target.onerror = null;
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23262626'/%3E%3Ctext x='50%25' y='50%25' font-size='20' text-anchor='middle' alignment-baseline='middle' font-family='Arial, sans-serif' fill='%23999999'%3EImage non disponible%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}