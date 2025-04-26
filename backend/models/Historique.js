const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Historique', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    requeteId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    imageId: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    timestamps: false,
  });
};
