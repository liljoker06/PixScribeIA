// routes/upload.js
const express = require('express');
const router = express.Router();
const upload = require('../utils/upload');
const authMiddleware = require('../middleware/auth');
const { uploadImageToRequete, createRequete } = require('../controllers/requetesController');
const {deleteRequete, deleteAllUserImages } = require('../controllers/requetesController');

// Créer une requête
router.post('/', authMiddleware, createRequete);

// Uploader une image avec requeteId dans l'URL
router.post('/upload/:requeteId', authMiddleware, upload.single('image'), uploadImageToRequete);


// Supprimer une requête et ses images
router.delete('/:requeteId', authMiddleware, deleteRequete);

router.delete('/images/user', authMiddleware, deleteAllUserImages);

module.exports = router;
