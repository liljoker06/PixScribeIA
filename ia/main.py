from fastapi import FastAPI
from routes.caption_route import router as caption_router
from routes.description_route import router as description_router
from train.train_cnn import entrainer
from contextlib import asynccontextmanager
import threading
import os
import subprocess

# Nouveau système de gestion du cycle de vie
@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Vérification du fichier de labels CIFAR-100...")

    labels_path = "utils/json/cifar100_labels_fr.json"
    if not os.path.exists(labels_path):
        print("Labels JSON manquant ! Génération avec utils/labels.py...")
        subprocess.run(["python", "utils/labels.py"], check=True)
        print("✅ Fichier de labels généré avec succès.")

    print("Lancement automatique de l'entraînement...")
    threading.Thread(target=entrainer, daemon=True).start()
    yield
    # Le serveur FastAPI démarre après cette ligne


app = FastAPI(
    title="PixScribeIA - API IA",
    description="API pour générer des descriptions d’images avec CNN + BLIP",
    version="1.0.0",
    lifespan=lifespan
)

# les routes
app.include_router(caption_router, prefix="/api/caption")
app.include_router(description_router, prefix="/api/description")

@app.get("/")
async def root():
    return {"message": "PixScribeIA IA est en ligne 🚀"}
