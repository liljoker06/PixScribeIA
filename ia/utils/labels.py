from torchvision.datasets import CIFAR100
import os
import json

# Traduction FR simple
fr_translation = {
    "apple": "pomme", "aquarium_fish": "poisson d'aquarium", "baby": "bébé", "bear": "ours", "beaver": "castor",
    "bed": "lit", "bee": "abeille", "beetle": "scarabée", "bicycle": "vélo", "bottle": "bouteille",
    "bowl": "bol", "boy": "garçon", "bridge": "pont", "bus": "bus", "butterfly": "papillon",
    "camel": "chameau", "can": "canette", "castle": "château", "caterpillar": "chenille", "cattle": "vache",
    "chair": "chaise", "chimpanzee": "chimpanzé", "clock": "horloge", "cloud": "nuage", "cockroach": "cafard",
    "couch": "canapé", "crab": "crabe", "crocodile": "crocodile", "cup": "tasse", "dinosaur": "dinosaure",
    "dolphin": "dauphin", "elephant": "éléphant", "flatfish": "poisson plat", "forest": "forêt", "fox": "renard",
    "girl": "fille", "hamster": "hamster", "house": "maison", "kangaroo": "kangourou", "keyboard": "clavier",
    "lamp": "lampe", "lawn_mower": "tondeuse", "leopard": "léopard", "lion": "lion", "lizard": "lézard",
    "lobster": "homard", "man": "homme", "maple_tree": "érable", "motorcycle": "moto", "mountain": "montagne",
    "mouse": "souris", "mushroom": "champignon", "oak_tree": "chêne", "orange": "orange", "orchid": "orchidée",
    "otter": "loutre", "palm_tree": "palmier", "pear": "poire", "pickup_truck": "pickup", "pine_tree": "pin",
    "plain": "plaine", "plate": "assiette", "poppy": "coquelicot", "porcupine": "porc-épic", "possum": "opossum",
    "rabbit": "lapin", "raccoon": "raton laveur", "ray": "raie", "road": "route", "rocket": "fusée",
    "rose": "rose", "sea": "mer", "seal": "phoque", "shark": "requin", "shrew": "musaraigne",
    "skunk": "mouffette", "skyscraper": "gratte-ciel", "snail": "escargot", "snake": "serpent", "spider": "araignée",
    "squirrel": "écureuil", "streetcar": "tramway", "sunflower": "tournesol", "sweet_pepper": "poivron",
    "table": "table", "tank": "char", "telephone": "téléphone", "television": "télévision", "tiger": "tigre",
    "tractor": "tracteur", "train": "train", "trout": "truite", "tulip": "tulipe", "turtle": "tortue",
    "wardrobe": "armoire", "whale": "baleine", "willow_tree": "saule", "wolf": "loup", "woman": "femme",
    "worm": "ver", "zebra": "zèbre"
}

# Récupérer la liste officielle des classes CIFAR-100
dataset = CIFAR100(root="data", train=True, download=True)
english_classes = dataset.classes

# Traduire en français dans l'ordre
final_labels = [fr_translation.get(cls, cls) for cls in english_classes]

# Sauvegarde dans le bon dossier
os.makedirs("utils/json", exist_ok=True)
with open("utils/json/cifar100_labels_fr.json", "w", encoding="utf-8") as f:
    json.dump(final_labels, f, indent=2, ensure_ascii=False)

final_labels[:10]  # aperçu pour validation
