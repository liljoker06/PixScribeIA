from PIL import Image
import torch
from transformers import BlipProcessor, BlipForConditionalGeneration
from googletrans import Translator

# Charger modèle BLIP
processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

# Initialiser traducteur
translator = Translator()

def generate_caption(image_path: str) -> str:
    """Génère une description en français à partir d'une image"""

    try:
        image = Image.open(image_path).convert("RGB")
        inputs = processor(image, return_tensors="pt")

        with torch.no_grad():
            output = model.generate(**inputs)

        caption_en = processor.decode(output[0], skip_special_tokens=True)

        # Traduction anglaise → française
        traduction = translator.translate(caption_en, src='en', dest='fr').text

        return traduction

    except Exception as e:
        print(f"❌ Erreur lors de la génération de la légende : {e}")
        return None
