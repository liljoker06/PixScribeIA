const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Requete', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true, 
    },
    modelUsed: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'BLIP', 
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'en attente', 
    },
  }, {
    tableName: 'requetes',
    timestamps: true,
  });
};
