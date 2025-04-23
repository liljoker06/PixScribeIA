from fastapi import FastAPI
from routes.caption_route import router as caption_router

app = FastAPI(
    title="PixScribeIA - API IA",
    description="API pour générer des descriptions d’images avec CNN + BLIP",
    version="1.0.0"
)


app.include_router(caption_router, prefix="/api/caption")

@app.get("/")
async def root():
    return {"message": "PixScribeIA IA est en ligne 🚀"}
