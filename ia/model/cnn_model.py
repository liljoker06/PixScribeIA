import torch.nn as nn
import torch.nn.functional as F



class MonCNN(nn.Module):
    def __init__(self):
        super(MonCNN, self).__init__()
        # Couche 1 : convolution (entrée = 3 canaux, sortie = 32)
        self.conv1 = nn.Conv2d(in_channels=3, out_channels=32, kernel_size=3, padding=1)
        # Couche 2 : convolution (32 -> 64)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)
        # Couche de max pooling
        self.pool = nn.MaxPool2d(2, 2)
        # Couche fully connected (64 * 8 * 8 → 128)
        self.fc1 = nn.Linear(64 * 8 * 8, 128)
        # Dernière couche fully connected (128 → 10 classes)
        self.fc2 = nn.Linear(128, 10)

    def forward(self, x):
        # Bloc conv 1 + ReLU + Pool
        x = self.pool(F.relu(self.conv1(x)))
        # Bloc conv 2 + ReLU + Pool
        x = self.pool(F.relu(self.conv2(x)))
        # Aplatir (flatten)
        x = x.view(-1, 64 * 8 * 8)
        # FC1 + ReLU
        x = F.relu(self.fc1(x))
        # FC2 (logits)
        x = self.fc2(x)
        return x