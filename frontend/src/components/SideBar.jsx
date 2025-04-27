import { useNavigate } from "react-router-dom";
import { Image, Menu, MoreHorizontal, Trash2, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { getHistorique, deleteHistorique, getHistoriqueDetails } from "../api/historique";

export default function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [historiques, setHistoriques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemToDelete, setItemToDelete] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const fetchHistorique = async () => {
      try {
        setLoading(true);
        const data = await getHistorique();
        setHistoriques(data);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'historique :", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHistorique();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuIndex(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNewImage = () => {
    navigate("/");
    if (window.innerWidth < 640) setIsOpen(false);
  };

  const handleHistoriqueClick = async (id) => {
    try {
      console.log("Récupération des détails pour l'historique:", id);
      console.log("Type de l'ID:", typeof id); // Debug the ID type

      const data = await getHistoriqueDetails(id);
      console.log("Données récupérées:", data); // Debug the response

      navigate(`/historique/${id}`, { state: { historique: data } });
      if (window.innerWidth < 640) setIsOpen(false);
    } catch (error) {
      console.error("Erreur lors du chargement des détails :", error.message);
    }
  };

  const handleDeleteHistorique = async (item, index) => {
    try {
      await deleteHistorique(item.id);
      setHistoriques(historiques.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    } finally {
      setItemToDelete(null);
      setOpenMenuIndex(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      {/* Overlay mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 bg-gray-800 flex flex-col p-4 border-r border-gray-700 transition-transform duration-300
        ${isOpen ? "translate-x-0 w-64" : "-translate-x-full sm:translate-x-0 sm:w-16"}`}
      >
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          {isOpen && <h1 className="text-xl font-bold text-white">PixScribeIA</h1>}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`text-white hover:bg-gray-700 p-1 rounded ${isOpen ? "" : "mx-auto"}`}
          >
            {isOpen ? <X size={20} className="sm:hidden" /> : null}
            <Menu size={20} className={isOpen ? "hidden sm:block" : ""} />
          </button>
        </div>

        {/* Nouveau bouton */}
        <button
          onClick={handleNewImage}
          className={`flex items-center ${isOpen ? "space-x-2" : "justify-center"} w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mb-6`}
        >
          <Image size={18} />
          {isOpen && <span>Nouvelle image</span>}
        </button>

        {/* Historique */}
        {isOpen && (
          <div className="flex flex-col flex-grow overflow-hidden">
            <h2 className="text-xs uppercase font-semibold text-gray-400 mb-2 px-1">Historique récent</h2>
            <div className="overflow-y-auto max-h-[calc(100vh-180px)]">
              {loading ? (
                <p className="text-sm text-gray-400 p-2">Chargement...</p>
              ) : historiques.length === 0 ? (
                <p className="text-sm text-gray-400 p-2">Aucun historique disponible</p>
              ) : (
                <ul className="space-y-1">
                  {historiques.map((item, index) => (
                    <li
                      key={item.id || index}
                      className="text-sm text-gray-300 hover:bg-gray-700 p-2 rounded-md cursor-pointer flex items-center justify-between relative"
                      onClick={() => handleHistoriqueClick(item.id)}
                    >
                      <div className="flex flex-col max-w-[80%] overflow-hidden">
                        <span className="truncate font-medium">
                          {item.requete?.description || `Action: ${item.action}`}
                        </span>
                        <span className="text-xs text-gray-400">{formatDate(item.timestamp)}</span>
                      </div>

                      {/* Menu contextuel */}
                      <div ref={menuRef}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuIndex(openMenuIndex === index ? null : index);
                          }}
                          className="text-gray-400 hover:text-gray-300"
                        >
                          <MoreHorizontal size={16} />
                        </button>

                        {openMenuIndex === index && (
                          <div className="absolute right-0 top-10 bg-gray-900 border border-gray-700 rounded-md shadow-md z-50 flex flex-col min-w-[120px]">
                            <button
                              onClick={() => {
                                setItemToDelete({ item, index });
                                setOpenMenuIndex(null);
                              }}
                              className="flex items-center gap-2 text-sm text-red-500 hover:text-red-400 hover:bg-gray-800 px-4 py-2"
                            >
                              <Trash2 size={16} />
                              Supprimer
                            </button>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </aside>

      {/* Modale de confirmation */}
      {itemToDelete && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-xl w-80 text-white">
            <h2 className="text-lg font-semibold mb-4">Supprimer cet élément ?</h2>
            <p className="text-gray-300 mb-4">
              {itemToDelete.item.requete?.description || `Action: ${itemToDelete.item.action}`}
            </p>
            <div className="flex justify-between gap-3 mt-6">
              <button
                onClick={() => setItemToDelete(null)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
              >
                Annuler
              </button>
              <button
                onClick={() => handleDeleteHistorique(itemToDelete.item, itemToDelete.index)}
                className="flex-1 bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-md"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
