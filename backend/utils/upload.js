const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Définir où sauvegarder l'image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Utiliser req.userId et req.requeteId pour définir le chemin d'accès
    const dir = `./uploads/images/${req.userId}/${req.body.requeteId}`;
    
    // Créer le dossier si il n'existe pas
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);  // Destination
  },
  filename: (req, file, cb) => {
    // Générer un nom de fichier unique avec extension
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}${ext}`;
    cb(null, filename);  // Nom du fichier
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },  // Limiter la taille du fichier à 10Mo
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimeType && extname) {
      return cb(null, true); 
    }
    cb('❌ Veuillez télécharger une image valide (JPEG, PNG, GIF)', false);
  }
});

module.exports = upload;
