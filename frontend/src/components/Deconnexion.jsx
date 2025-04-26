import React from "react"
import { LogOut } from "lucide-react"
import { useAuthStore } from "../store/authStore"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Deconnexion() {
  const logout = useAuthStore((state) => state.logout);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate(); 

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login"); 
  };

  return (
    <div>
      {/* Bouton de déconnexion */}
      <div className="absolute top-6 right-6">
        <button
          onClick={() => setShowLogoutModal(true)}
          className="flex items-center text-red-500 hover:text-red-400 hover:bg-gray-700 p-2 rounded-md"
        >
          <LogOut size={16} />
          <span className="ml-2">Déconnexion</span>
        </button>
      </div>

      {/* Modal de confirmation de déconnexion */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-md w-80 text-white">
            <h2 className="text-lg font-semibold mb-4">
              Êtes-vous sûr de vouloir vous déconnecter ?
            </h2>
            <div className="flex justify-between">
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
              >
                Oui, déconnecter
              </button>
              <button
                onClick={cancelLogout}
                className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
