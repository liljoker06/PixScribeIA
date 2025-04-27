import axios from "axios";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export const getHistorique = async () => {
    try {
      const response = await axios.get(`${API_URL}/historique`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Erreur Axios :", error.response.data);
        throw new Error(
          error.response.data.message ||
            "Erreur lors de la récupération de l'historique"
        );
      }
      console.error("Erreur inconnue lors de la récupération de l'historique :", error);
      throw new Error("Erreur lors de la récupération de l'historique");
    }
  };
  

export const deleteHistorique = async (requeteId) => {
  console.log(`Tentative de suppression de la requête ${requeteId}`);
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token d'authentification manquant");
    }
    
    console.log(`Envoi de la requête DELETE à ${API_URL}/historique/${requeteId}`);
    const response = await axios.delete(`${API_URL}/historique/${requeteId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    console.log("Réponse de suppression:", response);
    return response.data;
  } catch (error) {
    console.error("Erreur complète:", error);
    if (error.response) {
      console.error("Détails de l'erreur:", {
        status: error.response.status,
        data: error.response.data
      });
      throw new Error(
        error.response.data.message ||
          `Erreur lors de la suppression (${error.response.status})`
      );
    }
    throw new Error("Erreur lors de la suppression de l'historique: " + (error.message || "Erreur inconnue"));
  }
};

export const getHistoriqueDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/historique/${id}`, { 
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    // console.log("Réponse API", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur complète:", error);
    if (error.response) {
      console.error("Réponse d'erreur:", error.response.status, error.response.data);
    }
    throw new Error("Erreur lors de la récupération des détails");
  }
};
