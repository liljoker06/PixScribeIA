import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// inscription
export const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      username,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Erreur d'inscription");
    }
    throw new Error("Erreur lors de l'enregistrement");
  }
};

// connexion
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });

    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Erreur Axios :", error.response.data);
      throw new Error(error.response.data.message || "Erreur de connexion");
    }
    throw new Error("Erreur lors de la connexion");
  }
};

// verif si un utilisateur est authentifié
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};
