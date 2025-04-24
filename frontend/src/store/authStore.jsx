import { create } from "zustand";
import { persist } from "zustand/middleware";
import { login as apiLogin, register as apiSignup } from "../api/auth";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      checkAuth: () => {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");

        if (token && userData) {
          set({
            user: JSON.parse(userData),
            isAuthenticated: true,
          });
        }
      },

      login: async (email, password) => {
        try {
          const data = await apiLogin(email, password);
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));

          set({
            user: data.user,
            isAuthenticated: true,
          });

          console.log("✅ Connexion réussie :", data.user);
        } catch (error) {
          console.error("❌ Erreur de connexion :", error);
          throw new Error(error?.message || "Erreur de connexion");
        }
      },

      signup: async (username, email, password) => {
        try {
          const data = await apiSignup(username, email, password);
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));

          set({
            user: data.user,
            isAuthenticated: true,
          });

          console.log("✅ Inscription réussie :", data.user);
        } catch (error) {
          console.error("❌ Erreur d'inscription :", error);
          throw new Error(error?.message || "Erreur lors de l'inscription");
        }
      },

      logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        set({ user: null, isAuthenticated: false });

        console.log("🚪 Déconnexion réussie");
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
