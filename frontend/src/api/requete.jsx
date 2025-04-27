import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const deleteRequete = async (requeteId) => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.delete(`${API_URL}/requete/${requeteId}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
        withCredentials: true, 
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la suppression de la requête:", error.response?.data || error.message);
      throw error;
    }
};


export const deleteletAllUserRequete = async () => {
    try {
        const token = localStorage.getItem('token'); 
        const response = await axios.delete(`${API_URL}/requete/images/user`, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
            withCredentials: true, 
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la suppression de toutes les images de l'utilisateur:", error.response?.data || error.message);
        throw error;
    }
}