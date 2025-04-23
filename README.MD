# 📸 PixScribeIA – Générateur de descriptions d'images par IA

**PixScribeIA** est une application intelligente qui génère automatiquement des descriptions d’images.  
Elle combine :
- 🧠 Un modèle CNN personnalisé pour la détection d’objets
- 🤖 Un modèle pré-entraîné (BLIP ou GPT-2) pour la génération de descriptions en langage naturel
- 💥 Un front React moderne (Vite.js)
- 🖐️ Un backend Node.js pour gérer les requêtes
- ⚙️ Une API FastAPI pour toute la logique IA (PyTorch)

---

## 📁 Structure du projet

```bash
PixScribeIA/
├── frontend/          # Frontend React (Vite.js)
├── backend/           # Backend Node.js (API intermédiaire)
├── ia/                # FastAPI + PyTorch + modèle IA (BLIP/GPT-2)
└── README.md
```

---

## 🧑‍💻 Technologies utilisées

| Côté | Techno | Description |
|------|--------|-------------|
| Frontend | React + Vite | Interface moderne, rapide |
| Backend | Node.js + Express | Route API entre React et FastAPI |
| IA | FastAPI | API REST Python |
| Modèle IA | PyTorch + BLIP ou GPT-2 | Génération de texte depuis image |
| Entraînement | CNN custom en PyTorch | Classification basique d’objets |

---

## 🚀 Installation

### 🔹 1. Cloner le repo

```bash
git clone https://github.com/ton-utilisateur/PixScribeIA.git
cd PixScribeIA
```

### 🔹 2. Installer les dépendances

#### Frontend (React + Vite)
```bash
cd frontend
npm install
```

#### Backend (Node.js)
```bash
cd ../backend
npm install
```

#### IA (FastAPI + PyTorch)
```bash
cd ../ia
pip install -r requirements.txt
```

---

## 🔄 Lancer l'application

### 💡 Démarrer les 3 parties en même temps (dans 3 terminaux séparés)

#### 1. Lancer le frontend
```bash
cd frontend
npm run dev
```

#### 2. Lancer le backend Node.js
```bash
cd backend
node index.js
```

#### 3. Lancer l’API FastAPI
```bash
cd ia
uvicorn main:app --reload
```

---

## 📊 Fonctionnement

1. L'utilisateur charge une image via le frontend
2. Le backend Node.js envoie l'image à l'API IA (FastAPI)
3. Le CNN custom prédit les objets simples
4. BLIP ou GPT-2 génère une description à partir de l'image + objets reconnus
5. Le frontend affiche la description

---

## 🎁 Fonctionnalités à venir

- ✅ Historique des générations
- ✅ Choix entre BLIP et GPT-2
- ✅ Support de l’upload par glisser-déposer
- ✅ Version mobile responsive

---

## 📊 Exemples d'utilisation

- Création automatique de textes ALT pour les images (accessibilité)
- Légendes pour albums photos
- Outil créatif pour réseaux sociaux
- Application éducative pour enfants ou malvoyants

---

## 🚀 Créé avec passion par l'équipe PixScribeIA 👩‍💻👨‍💻👦‍💻🧑‍💻

*Feel free to fork, star, and contribute!* 

---

## ✈️ Licence

MIT License