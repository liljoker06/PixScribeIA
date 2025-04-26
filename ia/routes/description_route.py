from fastapi import APIRouter, File, UploadFile
from controllers.description_controller import analyze_image_with_caption_and_description

router = APIRouter()

@router.post("/")
async def upload_image(file: UploadFile = File(...)):
    content = await file.read()
    return analyze_image_with_caption_and_description(content, file.filename)

