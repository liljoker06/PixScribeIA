// backend/models/Historique.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const User = require('./User');
const Requete = require('./Requete');
const Image = require('./Image');

const Historique = sequelize.define('Historique', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    },
  },
  requeteId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Requete,
      key: 'id'
    },
  },
  imageId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Image,
      key: 'id'
    },
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'historiques',
  timestamps: false, // Tu peux définir `timestamps: false` si tu ne veux pas de `createdAt` et `updatedAt`
});

module.exports = Historique;
