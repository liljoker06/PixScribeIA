import os
import torch
import torch.nn as nn
import torch.optim as optim
from model.cnn_model import MonCNN
from train.data_loader import charger_cifar10
import torch_directml  

# Utiliser le GPU AMD via DirectML
device = torch_directml.device()

# Hyperparamètres
batch_size = 64
learning_rate = 0.001
nb_epochs = 1000

# Chargement des données
train_loader, test_loader = charger_cifar10(batch_size=batch_size)

# Création du modèle
model = MonCNN().to(device)

# Fonction de perte et optimiseur
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=learning_rate)

# Création du dossier "model" si besoin
os.makedirs("model/epoch", exist_ok=True)


# Reprise de l'entraînement si modèle existant
dernier_modele = None
dernier_epoch = 0

# Recherche du dernier fichier .pt
for fichier in sorted(os.listdir("model/epoch")):
    if fichier.startswith("cnn_epoch_") and fichier.endswith(".pt"):
        epoch = int(fichier.split("_")[-1].split(".")[0])
        if epoch > dernier_epoch:
            dernier_epoch = epoch
            dernier_modele = fichier

# Si on a trouvé un modèle existant
if dernier_modele:
    path = os.path.join("model/epoch", dernier_modele)
    print(f"🔁 Chargement du modèle existant : {dernier_modele}")
    model.load_state_dict(torch.load(path, map_location=device))

# Fonction d'entraînement pour une époque
def train_one_epoch(epoch):
    model.train()
    perte_totale = 0.0

    for batch_idx, (images, labels) in enumerate(train_loader):
        images, labels = images.to(device), labels.to(device)

        optimizer.zero_grad()
        sorties = model(images)
        perte = criterion(sorties, labels)
        perte.backward()
        optimizer.step()

        perte_totale += perte.item()

    moyenne = perte_totale / len(train_loader)
    print(f"✅ Époque {epoch+1} - Perte moyenne : {moyenne:.4f}")

# Boucle principale d'entraînement
def entrainer():
    print("📊 Démarrage de l'entraînement...\n")

    for epoch in range(dernier_epoch, nb_epochs):
        train_one_epoch(epoch)
        torch.save(model.state_dict(), f"model/epoch/cnn_epoch_{epoch+1}.pt")

    print("\n🏁 Entraînement terminé et modèles sauvegardés.")

# # Exécution directe
# if __name__ == "__main__":
#     entrainer()
