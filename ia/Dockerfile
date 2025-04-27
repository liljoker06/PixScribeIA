# Utiliser l'image officielle Python
FROM python:3.12

# Dossier de travail dans le conteneur
WORKDIR /app

# Copier requirements.txt et installer les dépendances
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copier tout le projet IA
COPY . .

# Exposer le port de FastAPI
EXPOSE 8000

# Lancer FastAPI via Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
