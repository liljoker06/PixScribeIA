<p align="center">
  <img src="./assets/logo_pixscribe.png" alt="PixScribeIA Logo" width="200"/>
</p>
# 📸 PixScribeIA – Générateur de descriptions d'images par IA

**PixScribeIA** est une application intelligente qui génère automatiquement des descriptions d’images.  
Elle combine :
- 🦰 Un modèle CNN personnalisé pour la détection d’objets
- 🤖 Un modèle pré-entraîné (BLIP) pour la génération de descriptions en langage naturel
- ⚡ Un frontend React moderne (Vite.js)
- 🔥 Un backend Node.js Express pour gérer les requêtes
- 🚀 Une API FastAPI en Python pour toute la logique IA

---

## 📁 Structure du projet

```bash
PixScribeIA/
├── backend/           # Backend Node.js (serveur API Express)
├── frontend/          # Frontend React (Vite.js)
├── ia/                # API FastAPI + PyTorch (logique IA)
├── docker-compose.yml # Docker multi-services
├── .env               # Variables d'environnement centralisées
└— README.md
```

---

## 🧑‍💻 Stack Technique

| Côté | Technologies | Détails |
|:----:|:-------------|:-------|
| Frontend | React + Vite | UI rapide et moderne |
| Backend | Node.js + Express | API intermédiaire |
| IA | FastAPI (Python) | API REST pour IA |
| Modèle IA | PyTorch + CNN + BLIP  | Modèle pour prédiction + génération |
| Base de données | MySQL 8 + phpMyAdmin | Stockage utilisateurs, historiques |

---

## 📦 Déploiement avec Docker

> **Pré-requis** : Docker et Docker Compose installés sur votre machine.

### 🔥 Lancer toute l'application avec une seule commande :

```bash
docker-compose up --build
```

Cela démarre :
- Frontend sur [http://localhost:5173](http://localhost:5173)
- Backend API Node.js sur [http://localhost:5000](http://localhost:5000)
- IA API FastAPI sur [http://localhost:8000](http://localhost:8000)
- Base de données MySQL + PhpMyAdmin sur [http://localhost:8080](http://localhost:8080)

---

## 🛠️ Variables d'environnement (.env)

Le projet utilise un **fichier `.env` unique** à la racine :  

```env
# FRONTEND
VITE_API_URL=http://backend:5000/api

# BACKEND
DB_NAME=cours-mia
DB_USER=root
DB_PASSWORD=root
DB_HOST=db
DB_PORT=3306
JWT_SECRET=super_secret_key
FASTAPI_URL=http://ia:8000/api

# MYSQL
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=cours-mia
```

---

## 📊 Fonctionnement

1. 📸 L'utilisateur charge une image via l'interface React
2. 🚀 Le backend Node.js reçoit l'image et appelle l'API FastAPI
3. 🦰 Le CNN détecte les objets principaux
4. ✍️ Le modèle BLIP génère une description en langage naturel
5. 🎨 La description est renvoyée au frontend et affichée.

---

## ✨ Cas d'utilisation

- 📈 Génération automatique de textes ALT pour l'accessibilité
- 📷 Légendes automatiques pour albums photo
- 💬 Création de contenus créatifs pour les réseaux sociaux
- 👨‍🎓 Projet éducatif pour enfants et malvoyants

---

## 🚀 Créé avec passion par l'équipe PixScribeIA 👩‍💻👨‍💻👦‍💻👨‍💻

*Feel free to fork, star, and contribute!*

---

## ✈️ Licence

MIT License

