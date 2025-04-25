const { Historique } = require('../models');

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

module.exports = {
  createHistorique,
};
