import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { LogOut, Image, Menu, MoreHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";

export default function SideBar() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [deleteSearch, setDeleteSearch] = useState(null);

  const recherchesParDate = [
    "Chien qui court dans l'eau",
    "Portrait artistique noir et blanc",
    "Forêt tropicale au lever du soleil",
    "Ciel étoilé avec aurore boréale",
    "Montagne enneigée au coucher du soleil",
    "Paysage urbain nocturne",
    "Chat roux jouant avec une pelote",
    "Plage paradisiaque aux eaux turquoise",
    "Architecture moderne minimaliste",
  ];

  const [recentSearches, setRecentSearches] = useState(recherchesParDate);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleNewImage = () => {
    navigate("/");
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };


  return (
    <aside
      className={`${
        isSidebarOpen ? "w-64" : "w-16"
      } bg-gray-800 min-h-screen fixed left-0 top-0 flex flex-col p-4 border-r border-gray-700 transition-all duration-300 ease-in-out`}
    >
      <div className="mb-6 flex justify-between items-center">
        {isSidebarOpen && (
          <h1 className="text-xl font-bold text-white">PixScribeIA</h1>
        )}

        {/* retraction sidebar */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`text-white hover:bg-gray-700 p-1 rounded ${
            isSidebarOpen ? "" : "mx-auto"
          }`}
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Nouvelle image */}
      <button
        onClick={handleNewImage}
        className={`flex items-center ${
          isSidebarOpen ? "space-x-2" : "justify-center"
        } w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mb-6 transition`}
      >
        <Image size={18} />
        {isSidebarOpen && <span>Nouvelle image</span>}
      </button>

      {isSidebarOpen && (
        <div className="flex flex-col overflow-hidden flex-grow">
          <div className="mb-4 flex-grow">
            <h2 className="text-xs uppercase font-semibold text-gray-400 mb-2 px-1">
              Historique récent
            </h2>

            <div className="overflow-y-auto max-h-250">
              <ul className="space-y-1">
                {recentSearches.map((item, index) => (
                  <li
                    key={index}
                    className="text-sm text-gray-300 hover:bg-gray-700 p-2 rounded-md cursor-pointer flex items-center justify-between relative"
                  >
                    <div className="flex items-center max-w-full overflow-hidden">
                      <span className="truncate">{item}</span>
                    </div>

                    {/* Trois petits points (kebab menu) */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuIndex(
                          openMenuIndex === index ? null : index
                        );
                      }}
                      className="text-gray-400 hover:text-gray-300"
                    >
                      <MoreHorizontal size={16} />
                    </button>

                    {/* Menu contextuel */}
                    {openMenuIndex === index && (
                      <div className="absolute right-0 top-10 bg-gray-900 border border-gray-700 rounded-md shadow-md z-50 flex flex-col min-w-[120px]">
                        <button
                          onClick={() => {
                            setDeleteSearch(index)
                            setOpenMenuIndex(null); 
                          }}
                          className="flex items-center gap-2 text-sm text-red-500 hover:text-red-400 hover:bg-gray-800 px-4 py-2 text-left transition-colors duration-200"
                        >
                          <Trash2 size={16} />
                          Supprimer
                        </button>
                      </div>
                    )}
                    {/* Modal de confirmation de suppression */}
                    {deleteSearch !== null && (
                      <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50">
                        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-xl w-80 text-white">
                          <h2 className="text-lg font-semibold mb-4">
                            Supprimer cette recherche ?
                          </h2>
                          <p className="text-gray-300 mb-4">
                            "{recentSearches[deleteSearch]}"
                          </p>
                          <div className="flex justify-between gap-3 mt-6">
                            <button
                              onClick={() => setDeleteSearch(null)}
                              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-colors duration-200"
                            >
                              Annuler
                            </button>
                            <button
                              onClick={() => {
                                const updatedSearches = recentSearches.filter(
                                  (_, i) => i !== deleteSearch
                                );
                                setRecentSearches(updatedSearches);
                                setDeleteSearch(null);
                              }}
                              className="flex-1 bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-md transition-colors duration-200"
                            >
                              Supprimer
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Déconnexion */}
      <div className="mt-auto pt-4">
        <hr className="border-gray-700 mb-4" />
        <button
          onClick={() => setShowLogoutModal(true)}
          className="flex items-center text-red-500 hover:text-red-400 hover:bg-gray-700 p-2 rounded-md w-full"
        >
          <LogOut size={16} />
          {isSidebarOpen && <span>Déconnexion</span>}
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
    </aside>
  );
}
