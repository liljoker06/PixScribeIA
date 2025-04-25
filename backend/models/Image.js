// backend/models/Image.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Requete = require('./Requete');
const User = require('./User'); // Assurez-vous que le modèle User est bien importé

const Image = sequelize.define('Image', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // Référence au modèle User
      key: 'id'
    },
  },
  requeteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Requete, // Référence au modèle Requete
      key: 'id'
    },
  },
  imagePath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'original', // original / annotée / miniature
  },
}, {
  tableName: 'images',
  timestamps: true,
});

module.exports = Image;
