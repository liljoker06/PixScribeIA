import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// upload image
export const uploadImage = async (requeteId, imageFile) => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("requeteId", requeteId);

    const response = await axios.post(`${API_URL}/requete/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Erreur Axios :", error.response.data);
      throw new Error(error.response.data.message || "Erreur lors de l'upload de l'image");
    }
    throw new Error("Erreur lors de l'upload de l'image");
  }
};

