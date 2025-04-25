from PIL import Image
import io
import torch
import torchvision.transforms as transforms
from model.cnn_model import MonCNN
from train.train_cnn import entrainer
import torch_directml
import json
import os
import re
import subprocess

# Device DirectML pour GPU AMD
device = torch_directml.device()

# Chargement des classes en français
def load_cifar100_labels(path="utils/json/cifar100_labels_fr.json"):
    if not os.path.exists(path):
        print("⚠️ Labels manquants, génération via labels.py...")
        subprocess.run(["python", "utils/labels.py"], check=True)
        print("✅ Labels générés.")

    with open(path, encoding="utf-8") as f:
        return json.load(f)

CIFAR100_CLASSES = load_cifar100_labels()

# 📁 Chemins des modèles
best_model_path = "model/best_model/best_model.pt"
epoch_model_dir = "model/epoch"
os.makedirs(epoch_model_dir, exist_ok=True)

# Fonction pour trouver le dernier modèle dans /epoch
def get_latest_epoch_model():
    models = [f for f in os.listdir(epoch_model_dir) if f.startswith("cnn_epoch_") and f.endswith(".pt")]
    if not models:
        return None
    models.sort(key=lambda x: int(re.findall(r'\d+', x)[-1]), reverse=True)
    return os.path.join(epoch_model_dir, models[0])

#Initialisation du modèle
model = MonCNN(num_classes=100).to(device)

# Chargement du modèle (priorité au best_model)
if os.path.exists(best_model_path):
    print(f"✅ Chargement du meilleur modèle : {best_model_path}")
    model.load_state_dict(torch.load(best_model_path, map_location=device))
else:
    latest_model_path = get_latest_epoch_model()
    if latest_model_path:
        print(f"📂 Chargement du dernier modèle trouvé : {latest_model_path}")
        model.load_state_dict(torch.load(latest_model_path, map_location=device))
    else:
        print("🚨 Aucun modèle trouvé, entraînement initial lancé...")
        entrainer()
        latest_model_path = get_latest_epoch_model()
        print(f"🆕 Nouveau modèle entraîné : {latest_model_path}")
        model.load_state_dict(torch.load(latest_model_path, map_location=device))

model.eval()


# Transformations identiques à l'entraînement
transform = transforms.Compose([
    transforms.Resize((32, 32)),
    transforms.ToTensor(),
    transforms.Normalize((0.5071, 0.4867, 0.4408), (0.2675, 0.2565, 0.2761)) 
])

# Fonction principale appelée depuis la route FastAPI
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
                classe = CIFAR100_CLASSES[top3_indices[0][i]]
                confiance = round(top3_probs[0][i].item() * 100, 2)
                top3.append({"classe": classe, "confiance": f"{confiance}%"})

        return {
            "message": "Image bien analysée",
            "filename": filename,
            "prédictions_top3": top3
        }

    except Exception as e:
        return {
            "message": "Erreur lors de l'analyse de l'image",
            "erreur": str(e)
        }
