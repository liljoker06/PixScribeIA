const { Historique, Requete, Image } = require('../models');

const createHistorique = async ({ userId, requeteId, imageId, action }) => {
  try {
    await Historique.create({
      userId,
      requeteId,
      imageId,
      action,
      timestamp: new Date()
    });
  } catch (error) {
    console.error("❌ Erreur lors de la création de l'historique :", error);
  }
};

const getFullHistorique = async (req, res) => {
  try {
    const historiques = await Historique.findAll({
      where: { userId: req.userId }, 
      include: [
        { 
          model: Requete,
          as: 'requete',
          attributes: ['description', 'status', 'createdAt', 'modelUsed']
        },
        {
          model: Image,
          as: 'image', 
          attributes: ['imagePath', 'type']
        }
      ],
      order: [['timestamp', 'DESC']] 
    });

    const formattedHistoriques = historiques.map(historique => {
      const item = historique.toJSON();
      return {
        id: item.id,
        userId: item.userId,
        action: item.action,
        timestamp: item.timestamp,
        requete: item.requete ? {
          id: item.requeteId,
          description: item.requete.description,
          status: item.requete.status,
          modelUsed: item.requete.modelUsed,
          createdAt: item.requete.createdAt
        } : null,
        image: item.image ? {
          id: item.imageId,
          path: item.image.imagePath,
          type: item.image.type
        } : null
      };
    });

    res.json(formattedHistoriques);
  } catch (error) {
    console.error("erreur lors de la récupération de l'historique :", error);
    res.status(500).json({ error: "Erreur serveur", details: error.message });
  }
};

const deleteHistorique = async (requeteId) => {
  try {
    console.log(`Suppression des historiques pour la requête ${requeteId}`);
    const result = await Historique.destroy({
      where: { requeteId }
    });
    console.log(`Nombre d'enregistrements supprimés ${result}`);
    return result;
  } catch (error) {
    console.error("Erreur lors de la suppression de l'historique :", error);
    throw error;
  }
};

const getOneHistorique = async (req, res) => {
  const { id } = req.params;
  console.log(`Tentative de récupération de l'historique avec ID: ${id}`);
  console.log(`UserID: ${req.userId}`);
  
  try {
    const historique = await Historique.findOne({
      where: { id, userId: req.userId },
      include: [
        { model: Requete, as: 'requete', attributes: ['description'] },
        { model: Image, as: 'image', attributes: ['imagePath'] }
      ]
    });

    if (!historique) {
      console.log(`Aucun historique trouvé avec ID: ${id} pour l'utilisateur: ${req.userId}`);
      return res.status(404).json({ message: "Historique non trouvé" });
    }

    console.log(`Historique trouvé:`, JSON.stringify(historique, null, 2));
    res.json({
      description: historique.requete?.description || '',
      imagePath: historique.image?.imagePath || ''
    });
  } catch (error) {
    console.error("Erreur lors de la récupération d'un historique :", error);
    res.status(500).json({ error: "Erreur serveur", details: error.message });
  }
};

module.exports = {
  createHistorique,
  getFullHistorique,
  deleteHistorique,
  getOneHistorique
};