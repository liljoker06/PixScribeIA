const { Image, Requete } = require('../models');

const uploadImageToRequete = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: '❌ Aucun fichier téléchargé.' });
      }
  
      const requeteId = req.params.requeteId;
      const userId = req.userId;
  
      if (!userId) {
        return res.status(400).json({ message: 'Identifiant utilisateur manquant.' });
      }
  
      const requete = await Requete.findOne({ where: { id: requeteId, userId } });
  
      if (!requete) {
        return res.status(404).json({ message: 'Requête introuvable.' });
      }
  
      const image = await Image.create({
        requeteId: requete.id,
        userId: userId,
        imagePath: `/uploads/images/${userId}/${requeteId}/${req.file.filename}`,
        type: 'original',
      });
  
      res.status(200).json({
        message: 'Image téléchargée et associée à la requête.',
        image: image,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur.' });
    }
};
  


const createRequete = async (req, res) => {
    try {
      const userId = req.userId; 
      if (!userId) return res.status(401).json({ message: "Non autorisé" });
  
      const requete = await Requete.create({ userId });
      res.status(201).json({ requeteId: requete.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur serveur" });
    }
};


module.exports = {
    uploadImageToRequete,
    createRequete,
};
