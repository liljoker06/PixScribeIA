// routes/upload.js
const express = require('express');
const router = express.Router();
const upload = require('../utils/upload');
const authMiddleware = require('../middleware/auth');
const { uploadImageToRequete } = require('../controllers/requetesController');

// Route POST pour uploader une image liée à une requête
router.post('/upload', authMiddleware, upload.single('image'), uploadImageToRequete);

module.exports = router;
