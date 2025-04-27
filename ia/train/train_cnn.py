import os
import torch
import torch.nn as nn
import torch.optim as optim
from model.cnn_model import MonCNN
from train.data_loader import charger_cifar100
# import torch_directml
import matplotlib.pyplot as plt
import csv

# Utiliser le GPU AMD via DirectML
# device = torch_directml.device()

try:
    import torch_directml
    dml = torch_directml.device()
    device = dml
except (ImportError, OSError):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Hyperparamètres
batch_size = 64
# learning_rate = 0.001
learning_rate = 0.0001  # Réduit le taux d'apprentissage pour un meilleur ajustement
nb_epochs = 1000

# Chargement des données
train_loader, test_loader = charger_cifar100(batch_size=batch_size)

# Création du modèle
model = MonCNN(num_classes=100).to(device)

# Fonction de perte et optimiseur
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=learning_rate)

# Création des dossiers nécessaires
os.makedirs("model/epoch", exist_ok=True)
os.makedirs("model/best_model", exist_ok=True)
os.makedirs("logs", exist_ok=True)

# Reprise de l'entraînement si modèle existant
best_model_path = "model/best_model/best_model.pt"

if os.path.exists(best_model_path):
    print(f"\U0001F501 Chargement du meilleur modèle existant.")
    model.load_state_dict(torch.load(best_model_path, map_location=device))
else:
    dernier_modele = None
    dernier_epoch = 0

    for fichier in sorted(os.listdir("model/epoch")):
        if fichier.startswith("cnn_epoch_") and fichier.endswith(".pt"):
            epoch = int(fichier.split("_")[-1].split(".")[0])
            if epoch > dernier_epoch:
                dernier_epoch = epoch
                dernier_modele = fichier

    if dernier_modele:
        path = os.path.join("model/epoch", dernier_modele)
        print(f"\U0001F501 Chargement du dernier modèle trouvé : {dernier_modele}")
        model.load_state_dict(torch.load(path, map_location=device))

# Fonction d'évaluation
def evaluate(model, test_loader, device):
    model.eval()
    correct = 0
    total = 0

    with torch.no_grad():
        for images, labels in test_loader:
            images, labels = images.to(device), labels.to(device)
            outputs = model(images)
            _, predicted = torch.max(outputs, 1)
            total += labels.size(0)
            correct += (predicted == labels).sum().item()

    accuracy = 100 * correct / total
    print(f"\U0001F3AF Précision test : {accuracy:.2f}%")
    return accuracy

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
    train_losses.append(moyenne)

# Boucle principale d'entraînement
def entrainer():
    print("\U0001F4CA Démarrage de l'entraînement...\n")

    global best_accuracy
    best_accuracy = 0.0

    for epoch in range(nb_epochs):
        train_one_epoch(epoch)
        acc = evaluate(model, test_loader, device)
        test_accuracies.append(acc)

        # Sauvegarde automatique du meilleur modèle
        if acc > best_accuracy:
            best_accuracy = acc
            if os.path.exists(best_model_path):
                os.remove(best_model_path)
            torch.save(model.state_dict(), best_model_path)
            print(f"\U0001F4BE Meilleur modèle sauvegardé avec {acc:.2f}% de précision.")

        # Sauvegarde classique
        torch.save(model.state_dict(), f"model/epoch/cnn_epoch_{epoch+1}.pt")

        # Sauvegarde des courbes tous les 20 entraînements
        if (epoch + 1) % 20 == 0:
            # Sauvegarde du graphe dans un fichier (sans l'afficher)
            plt.figure(figsize=(10, 6))
            plt.subplot(2, 1, 1)
            plt.plot(train_losses, label="Perte (train)", color="blue")
            plt.title("Courbe de perte")
            plt.xlabel("Époques")
            plt.ylabel("Loss")
            plt.legend()
            plt.grid(True)

            plt.subplot(2, 1, 2)
            plt.plot(test_accuracies, label="Accuracy (test)", color="green")
            plt.title("Courbe d'accuracy")
            plt.xlabel("Époques")
            plt.ylabel("Accuracy (%)")
            plt.legend()
            plt.grid(True)

            plt.tight_layout()
            plt.savefig("logs/training_plot.png")

            # Enregistrement des courbes dans un fichier CSV
            with open("logs/training_stats.csv", "w", newline="", encoding="utf-8") as csvfile:
                writer = csv.writer(csvfile)
                writer.writerow(["Époque", "Perte", "Accuracy"])
                for i, (loss, acc) in enumerate(zip(train_losses, test_accuracies), start=1):
                    writer.writerow([i, loss, acc])

    print("\n\U0001F3C1 Entraînement terminé et modèles sauvegardés.")

# Courbes
test_accuracies = []
train_losses = []
