const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Définir où sauvegarder l'image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = req.userId;
    const requeteId = req.params.requeteId;

    if (!userId || !requeteId) {
      return cb(new Error('❌ userId ou requeteId manquant pour définir le chemin'), null);
    }

    const dir = path.join(__dirname, '..', 'uploads', 'images', String(userId), String(requeteId));

    // Créer le dossier si il n'existe pas
    fs.mkdirSync(dir, { recursive: true });

    cb(null, dir); // Dossier destination
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const filename = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}${ext}`;
    cb(null, filename);
  }
});

// Configuration multer
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Max 10 Mo
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb(new Error('❌ Veuillez télécharger une image valide (JPEG, PNG, GIF)'), false);
  }
});

module.exports = upload;
