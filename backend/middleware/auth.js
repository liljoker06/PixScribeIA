require('dotenv').config(); // Charge les variables d'environnement
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: '❌ Token manquant ou mal formé.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next(); // passe au middleware suivant
  } catch (error) {
    console.error('Erreur lors de la vérification du token:', error.message);
    return res.status(403).json({ message: '❌ Token invalide.' });
  }
};
