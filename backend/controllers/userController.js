// controllers/userController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET || 'super_secret_key';

//Inscription
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });

    res.status(201).json({
      message: '✅ Utilisateur créé',
      user: { id: user.id, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '❌ Erreur lors de la création du compte.' });
  }
};

//Connexion
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: '❌ Utilisateur non trouvé' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: '❌ Mot de passe incorrect' });

    const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: '1h' });

    res.json({ message: '✅ Connecté', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '❌ Erreur lors de la connexion.' });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
