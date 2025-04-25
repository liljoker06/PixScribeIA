from controllers.caption_controller import handle_image_upload
from model.blip_model import generate_caption
from PIL import Image
import io
import os
from uuid import uuid4

def analyze_image_with_caption_and_description(file_bytes: bytes, filename: str) -> dict:
    try:
        #Analyse CNN
        cnn_result = handle_image_upload(file_bytes, filename)

        #Sauvegarde temporaire
        tmp_dir = "temp_uploads"
        os.makedirs(tmp_dir, exist_ok=True)
        tmp_filename = f"{uuid4().hex}_{filename}"
        tmp_path = os.path.join(tmp_dir, tmp_filename)
        with open(tmp_path, "wb") as f:
            f.write(file_bytes)

        # Génération description
        description = generate_caption(tmp_path)

        # Nettoyage optionnel (tu peux le garder pour debug si besoin)
        os.remove(tmp_path)

        return {
            "message": "Analyse complète réussie",
            "filename": filename,
            "prédictions_top3": cnn_result.get("prédictions_top3", []),
            "description": description
        }

    except Exception as e:
        return {"message": "Erreur lors de l'analyse complète", "erreur": str(e)}
