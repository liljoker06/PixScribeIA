from controllers.caption_controller import handle_image_upload
from model.blip_model import generate_caption
from PIL import Image
import io

def analyze_image_with_caption_and_description(file_bytes: bytes, filename: str) -> dict:
    try:
        # Appel du CNN via le contrôleur 
        cnn_result = handle_image_upload(file_bytes, filename)

        # Image convertie pour BLIP
        image = Image.open(io.BytesIO(file_bytes)).convert("RGB")
        description = generate_caption(image)

        #Fusion des deux résultats
        return {
            "message": "Analyse complète réussie",
            "filename": filename,
            "prédictions_top3": cnn_result.get("prédictions_top3", []),
            "description": description
        }

    except Exception as e:
        return {"message": "Erreur lors de l'analyse complète", "erreur": str(e)}
