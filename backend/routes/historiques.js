const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { getFullHistorique, getOneHistorique, deleteHistorique } = require('../controllers/historiqueController');

// Récupérer l'historique complet d'un utilisateur
router.get('/', authMiddleware, getFullHistorique);

router.get('/:id', authMiddleware, getOneHistorique);

router.delete('/:requeteId', authMiddleware, async (req, res) => {
    const { requeteId } = req.params;
    try {
      // Vérifier si la requête existe avant de la supprimer
      const requete = await Requete.findByPk(requeteId);
      if (!requete) {
        return res.status(404).json({ message: 'Requête non trouvée' });
      }
  
      await deleteHistorique(requeteId);
      res.status(200).json({ message: 'Requête supprimée de l\'historique' });
    } catch (error) {
      console.error("❌ Erreur lors de la suppression :", error);
      res.status(500).json({ message: 'Erreur lors de la suppression de l\'historique' });
    }
  });
  

module.exports = router;