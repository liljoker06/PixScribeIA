// backend/models/Requete.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const User = require('./User'); // Assurez-vous que le modèle User est bien importé

const Requete = sequelize.define('Requete', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // Référence au modèle User
      key: 'id'
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true, // Pour être rempli par l'IA plus tard
  },
  modelUsed: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'BLIP', // ou 'GPT-2', selon le choix
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'en attente', // en attente / terminé / erreur
  },
}, {
  tableName: 'requetes',
  timestamps: true,
});

module.exports = Requete;
