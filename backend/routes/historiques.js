const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { getFullHistorique, getOneHistorique} = require('../controllers/historiqueController');

// Récupérer l'historique complet d'un utilisateur
router.get('/', authMiddleware, getFullHistorique);

router.get('/:id', authMiddleware, getOneHistorique);
  

module.exports = router;