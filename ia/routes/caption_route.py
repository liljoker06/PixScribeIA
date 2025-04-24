from fastapi import APIRouter, File, UploadFile

from controllers.caption_controller import handle_image_upload

router = APIRouter()



# Router pour la génération de captions d'images
@router.post("/upload_image")
async def upload_image(file: UploadFile = File(...)):

    file_bytes = await file.read()
    filename = file.filename
    result = handle_image_upload(file_bytes, filename)
    
    return result

