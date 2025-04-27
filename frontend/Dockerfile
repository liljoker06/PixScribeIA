# Utiliser l'image officielle Node
FROM node:20

# Dossier de travail dans le conteneur
WORKDIR /app

# Copier package.json et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier tout le projet dans le conteneur
COPY . .

# Lancer Vite en mode développement
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
