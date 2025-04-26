import { useNavigate } from "react-router-dom";
import { Image, Menu, MoreHorizontal, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getHistorique, deleteHistorique } from "../api/historique";

export default function SideBar() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [historiques, setHistoriques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    const fetchHistorique = async () => {
      try {
        setLoading(true);
        const data = await getHistorique();
        setHistoriques(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'historique :",
          error.message
        );
      } finally {
        setLoading(false);
      }
    };
    fetchHistorique();
  }, []);

  const handleNewImage = () => {
    navigate("/");
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
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } bg-gray-800 min-h-screen fixed left-0 top-0 flex flex-col p-4 border-r border-gray-700 transition-all duration-300 ease-in-out z-40`}
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

              <div className="overflow-y-auto max-h-[calc(100vh-180px)]">
                {loading ? (
                  <p className="text-sm text-gray-400 p-2">Chargement...</p>
                ) : historiques.length === 0 ? (
                  <p className="text-sm text-gray-400 p-2">
                    Aucun historique disponible
                  </p>
                ) : (
                  <ul className="space-y-1">
                    {historiques.map((item, index) => (
                      <li
                        key={item.id || index}
                        className="text-sm text-gray-300 hover:bg-gray-700 p-2 rounded-md cursor-pointer flex items-center justify-between relative"
                      >
                        <div className="flex flex-col max-w-[80%] overflow-hidden">
                          <span className="truncate font-medium">
                            {item.requete?.description ||
                              `Action: ${item.action}`}
                          </span>
                          <span className="text-xs text-gray-400">
                            {formatDate(item.timestamp)}
                          </span>
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
                                setItemToDelete({ item, index });
                                setOpenMenuIndex(null);
                              }}
                              className="flex items-center gap-2 text-sm text-red-500 hover:text-red-400 hover:bg-gray-800 px-4 py-2 text-left transition-colors duration-200"
                            >
                              <Trash2 size={16} />
                              Supprimer
                            </button>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Modale de confirmation */}
      {itemToDelete && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-xl w-80 text-white">
            <h2 className="text-lg font-semibold mb-4">
              Supprimer cet élément ?
            </h2>
            <p className="text-gray-300 mb-4">
              {itemToDelete.item.requete?.description ||
                `Action: ${itemToDelete.item.action}`}
            </p>
            <div className="flex justify-between gap-3 mt-6">
              <button
                onClick={() => setItemToDelete(null)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-colors duration-200"
              >
                Annuler
              </button>
              <button
                onClick={() =>
                  handleDeleteHistorique(itemToDelete.item, itemToDelete.index)
                }
                className="flex-1 bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-md transition-colors duration-200"
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
