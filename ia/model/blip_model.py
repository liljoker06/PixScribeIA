from PIL import Image
import torch
from transformers import BlipProcessor, BlipForConditionalGeneration




# processor et model de BLIP

processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")


def generate_caption(image_path: str) -> str:
    """ génére un description d'une image """

    try:
        image = Image.open(image_path).convert("RGB")
        inputs = processor(image, return_tensors="pt")

        with torch.no_grad():
            output = model.generate(**inputs)

        caption = processor.decode(output[0], skip_special_tokens=True)
        return caption
    except Exception as e:
        print(f"Erreur lors de la génération de la légende : {e}")
        return None
    


