const path = require('path');
const { sendImageForDescription } = require('../services/fastapi');
const { Image, Requete, Historique } = require('../models');
const { createHistorique } = require('./historiqueController');

const uploadImageToRequete = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: '❌ Aucun fichier téléchargé.' });
      }
  
      const requeteId = req.params.requeteId;
      const userId = req.userId;
  
      const requete = await Requete.findOne({ where: { id: requeteId, userId } });
      if (!requete) {
        return res.status(404).json({ message: '❌ Requête introuvable.' });
      }
  
      const imagePath = req.file.path;
  
      const result = await sendImageForDescription(imagePath, req.file.filename);
      const { description } = result;
      requete.description = description;
      requete.status = 'analsée';
      await requete.save();
  
      const image = await Image.create({
        requeteId,
        userId,
        imagePath: `/uploads/images/${userId}/${requeteId}/${req.file.filename}`,
        type: 'original',
      });

      await createHistorique({
        userId,
        requeteId,
        imageId: image.id,
        action: 'upload_image'
      });
  
      res.status(200).json({
        message: '✅ Image envoyée et description générée.',
        image,
        description,
      });
    } catch (error) {
      console.error("❌ Erreur uploadImageToRequete :", error);
      res.status(500).json({ message: "Erreur lors du traitement de l'image" });
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



const deleteRequete = async (req, res) => {
  const { requeteId } = req.params;
  const userId = req.userId;

  try {
    const requete = await Requete.findOne({ where: { id: requeteId, userId } });
    if (!requete) {
      return res.status(404).json({ message: '❌ Requête non trouvée.' });
    }

    const images = await Image.findAll({ where: { requeteId } });

    for (const img of images) {
      const absoluteImagePath = path.join(__dirname, '..', 'public', img.imagePath);
      fs.unlink(absoluteImagePath, (err) => {
        if (err) {
          console.error(`❗ Impossible de supprimer le fichier ${img.imagePath}:`, err.message);
        } else {
          console.log(`✅ Fichier supprimé : ${img.imagePath}`);
        }
      });
    }

    await Historique.destroy({ where: { requeteId } });

    await Image.destroy({ where: { requeteId } });

    await Requete.destroy({ where: { id: requeteId } });

    res.status(200).json({ message: '✅ Requête, images et historiques supprimés avec succès.' });
  } catch (error) {
    console.error('❌ Erreur lors de la suppression de la requête :', error);
    res.status(500).json({ message: 'Erreur serveur', details: error.message });
  }
};


module.exports = {
    uploadImageToRequete,
    createRequete,
    deleteRequete,
};
