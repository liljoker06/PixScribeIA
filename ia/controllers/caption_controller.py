from PIL import Image
import io 

def handle_image_upload(file_bytes: bytes, filename: str) -> str:
    try:
        image = Image.open(io.BytesIO(file_bytes))
        image.verify()  # Verify that the file is an image
        return{
            "message": "Image bien uploadée",
            "filename": filename,
        }
    except Exception as e:
        return {
            "message": "Erreur lors de l'upload de l'image",
            "error": str(e),
        }