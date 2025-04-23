from PIL import Image
import io
import torch
import torchvision.transforms as transforms
from model.cnn_model import MonCNN
from utils.labels import CIFAR10_CLASSES
import torch_directml

# 🔁 Device DirectML pour GPU AMD
device = torch_directml.device()

# 🧠 Chargement du modèle
model = MonCNN().to(device)
model.load_state_dict(torch.load("model/epoch/cnn_epoch_10.pt", map_location=device))
model.eval()

# 🎨 Même transformation que pendant l'entraînement
transform = transforms.Compose([
    transforms.Resize((32, 32)),
    transforms.ToTensor(),
    transforms.Normalize((0.5,), (0.5,))
])

# 📤 Fonction principale appelée depuis la route FastAPI
def handle_image_upload(file_bytes: bytes, filename: str) -> dict:
    try:
        image = Image.open(io.BytesIO(file_bytes)).convert("RGB")
        input_tensor = transform(image).unsqueeze(0).to(device)

        with torch.no_grad():
            output = model(input_tensor)
            probs = torch.softmax(output, dim=1)
            top3_probs, top3_indices = torch.topk(probs, 3)

            top3 = []
            for i in range(3):
                classe = CIFAR10_CLASSES[top3_indices[0][i]]
                confiance = round(top3_probs[0][i].item() * 100, 2)
                top3.append({"classe": classe, "confiance": f"{confiance}%"})

        return {
            "message": "Image bien analysée ✅",
            "filename": filename,
            "prédictions_top3": top3
        }

    except Exception as e:
        return {
            "message": "Erreur lors de l'analyse de l'image ❌",
            "erreur": str(e)
        }
