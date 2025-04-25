// const express = require('express');
// const upload = require('../utils/upload');  // Assure-toi d'importer correctement multer
// const authMiddleware = require('../middleware/auth');  // Ton middleware d'authentification
// const { Image, Requete } = require('../models');
// const router = express.Router();

// Route pour l'upload d'image
// router.post('/upload', authMiddleware, upload.single('image'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: '❌ Aucun fichier téléchargé.' });
//     }

//     const { requeteId } = req.body;  // ID de la requête
//     const userId = req.userId; // Récupère userId du middleware d'authentification

//     // Log des valeurs reçues
//     console.log('requeteId:', requeteId);
//     console.log('userId:', userId);

//     if (!userId) {
//       return res.status(400).json({ message: '❌ Identifiant utilisateur manquant.' });
//     }

//     // Cherche la requête dans la base de données
//     const requete = await Requete.findOne({ where: { id: requeteId, userId } });

//     if (!requete) {
//       console.log('Aucune requête trouvée avec l\'ID', requeteId, 'et userId', userId);
//       return res.status(404).json({ message: '❌ Requête introuvable.' });
//     }

//     console.log('Requête trouvée:', requete);

//     // Sauvegarder l'image dans la base de données
//     const image = await Image.create({
//       requeteId: requete.id,
//       userId: userId,  // On passe explicitement userId ici
//       imagePath: `/uploads/images/${userId}/${requeteId}/${req.file.filename}`,
//       type: 'original',  // Tu peux spécifier le type d'image ici
//     });

//     res.status(200).json({
//       message: '✅ Image téléchargée et associée à la requête.',
//       image: image,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: '❌ Erreur serveur.' });
//   }
// });

// router.post('/upload', authMiddleware, upload.single('image'), async (req, res) => {
//     try {
//       // Log de debug
//       console.log('==== DEBUG UPLOAD ====');
//       console.log('req.body:', req.body);
//       console.log('req.file:', req.file);
//       console.log('req.userId:', req.userId);
//       console.log('======================');
  
//       const requeteId = parseInt(req.body.requeteId);
//       const userId = req.userId;
  
//       if (!req.file) {
//         return res.status(400).json({ message: '❌ Aucun fichier téléchargé.' });
//       }
  
//       if (!requeteId || !userId) {
//         return res.status(400).json({ message: '❌ Paramètres manquants (requeteId ou userId).' });
//       }
  
//       // Vérifie que la requête existe pour cet utilisateur
//       const requete = await Requete.findOne({ where: { id: requeteId, userId } });
  
//       if (!requete) {
//         return res.status(404).json({ message: '❌ Requête introuvable.' });
//       }
  
//       // Sauvegarde de l'image
//       const imagePath = `/uploads/images/${userId}/${requeteId}/${req.file.filename}`;
//       const image = await Image.create({
//         userId,
//         requeteId,
//         imagePath,
//         type: 'original',
//       });
  
//       res.status(200).json({
//         message: '✅ Image téléchargée et associée à la requête.',
//         image,
//       });
//     } catch (err) {
//       console.error('Erreur lors de l\'upload :', err);
//       res.status(500).json({ message: '❌ Erreur serveur.' });
//     }
//   });
  

// router.post('/upload', authMiddleware, (req, res, next) => {
//     const { requeteId } = req.body; // Récupérer requeteId du body
//     if (!requeteId) {
//       return res.status(400).json({ message: '❌ Requête ID manquante' });
//     }
//     req.requeteId = requeteId; // Ajouter requeteId au req pour qu'il soit accessible dans multer
//     next(); // Passer à multer
//   }, upload.single('image'), async (req, res) => {
//     try {
//       if (!req.file) {
//         return res.status(400).json({ message: '❌ Aucun fichier téléchargé.' });
//       }
  
//       const { requeteId } = req.body;  // ID de la requête
//       const userId = req.userId; // Récupère userId du middleware d'authentification
  
//       if (!userId) {
//         return res.status(400).json({ message: '❌ Identifiant utilisateur manquant.' });
//       }
  
//       // Cherche la requête dans la base de données
//       const requete = await Requete.findOne({ where: { id: requeteId, userId } });
  
//       if (!requete) {
//         return res.status(404).json({ message: '❌ Requête introuvable.' });
//       }
  
//       // Sauvegarder l'image dans la base de données
//       const image = await Image.create({
//         requeteId: requete.id,
//         userId: userId,  // On passe explicitement userId ici
//         imagePath: `/uploads/images/${userId}/${requeteId}/${req.file.filename}`,
//         type: 'original',  // Tu peux spécifier le type d'image ici
//       });
  
//       res.status(200).json({
//         message: '✅ Image téléchargée et associée à la requête.',
//         image: image,
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: '❌ Erreur serveur.' });
//     }
//   });
// router.post('/upload', authMiddleware, upload.single('image'), async (req, res) => {
//     try {
//       // Vérifie si le fichier est bien présent dans req.file
//       if (!req.file) {
//         return res.status(400).json({ message: '❌ Aucun fichier téléchargé.' });
//       }
  
//       const { requeteId } = req.body;  // ID de la requête (récupéré dans req.body)
//       const userId = req.userId;  // Récupère userId du middleware d'authentification
  
//       // Log pour vérifier les valeurs de requeteId et userId
//       console.log('requeteId:', requeteId);
//       console.log('userId:', userId);
  
//       if (!userId) {
//         return res.status(400).json({ message: '❌ Identifiant utilisateur manquant.' });
//       }
  
//       // Cherche la requête dans la base de données
//       const requete = await Requete.findOne({ where: { id: requeteId, userId } });
  
//       if (!requete) {
//         return res.status(404).json({ message: '❌ Requête introuvable.' });
//       }
  
//       // Sauvegarder l'image dans la base de données
//       const image = await Image.create({
//         requeteId: requete.id,
//         userId: userId,  // On passe explicitement userId ici
//         imagePath: `/uploads/images/${userId}/${requeteId}/${req.file.filename}`,
//         type: 'original',  // Tu peux spécifier le type d'image ici
//       });
  
//       res.status(200).json({
//         message: '✅ Image téléchargée et associée à la requête.',
//         image: image,
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: '❌ Erreur serveur.' });
//     }
//   });

// module.exports = router;
const express = require('express');
const upload = require('../utils/upload');  // Assure-toi d'importer correctement multer
const authMiddleware = require('../middleware/auth');  // Ton middleware d'authentification
const { Image, Requete } = require('../models');
const router = express.Router();

// Route pour l'upload d'image
router.post('/upload', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    // Vérifier si req.file existe
    if (!req.file) {
      return res.status(400).json({ message: '❌ Aucun fichier téléchargé.' });
    }

    // Assure-toi que req.body contient requeteId
    const { requeteId } = req.body;
    const userId = req.userId;  // Récupère userId du middleware d'authentification

    // Log pour vérifier les valeurs
    

    // Vérifier si userId est présent
    if (!userId) {
      return res.status(400).json({ message: '❌ Identifiant utilisateur manquant.' });
    }

    // Cherche la requête dans la base de données
    const requete = await Requete.findOne({ where: { id: requeteId, userId } });

    // Vérifie si la requête existe pour cet utilisateur
    if (!requete) {
      return res.status(404).json({ message: '❌ Requête introuvable.' });
    }

    // Sauvegarde l'image dans la base de données
    const image = await Image.create({
      requeteId: requete.id,
      userId: userId,  // Passe explicitement userId ici
      imagePath: `/uploads/images/${userId}/${requeteId}/${req.file.filename}`,
      type: 'original',  // Tu peux spécifier le type d'image ici
    });

    // Envoie une réponse JSON avec l'image téléchargée
    res.status(200).json({
      message: '✅ Image téléchargée et associée à la requête.',
      image: image,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '❌ Erreur serveur.' });
  }
});

module.exports = router;
