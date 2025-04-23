from fastapi import FastAPI
from routes.caption_route import router as caption_router
from train.train_cnn import entrainer
from contextlib import asynccontextmanager
import threading

# ✅ Nouveau système de gestion du cycle de vie
@asynccontextmanager
async def lifespan(app: FastAPI):
    print("🔁 Lancement automatique de l'entraînement...")
    threading.Thread(target=entrainer, daemon=True).start()
    yield 
 # Le serveur FastAPI démarre après cette ligne

# 🚀 Application FastAPI avec gestion du cycle de vie personnalisée
app = FastAPI(
    title="PixScribeIA - API IA",
    description="API pour générer des descriptions d’images avec CNN + BLIP",
    version="1.0.0",
    lifespan=lifespan  # ⬅️ ici on passe le gestionnaire
)

# 📦 Inclusion des routes
app.include_router(caption_router, prefix="/api/caption")

@app.get("/")
async def root():
    return {"message": "PixScribeIA IA est en ligne 🚀"}
