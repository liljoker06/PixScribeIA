# Utiliser l'image officielle Node
FROM node:20

# Dossier de travail dans le conteneur
WORKDIR /app

# Copier package.json et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier tout le backend
COPY . .

# Exposer le port du serveur Express
EXPOSE 5000

# Démarrer le serveur
CMD ["npm", "start"]
