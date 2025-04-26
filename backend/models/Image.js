const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Image', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    requeteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imagePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'original',
    },
  }, {
    tableName: 'images',
    timestamps: true,
  });
};
