// backend/models/index.js
const User = require('./User');
const Requete = require('./Requete');
const Image = require('./Image');
const Historique = require('./Historique');

// Relations
User.hasMany(Requete, { foreignKey: 'userId', as: 'requetes' });
Requete.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Requete.hasMany(Image, { foreignKey: 'requeteId', as: 'images' });
Image.belongsTo(Requete, { foreignKey: 'requeteId', as: 'requete' });

User.hasMany(Historique, { foreignKey: 'userId', as: 'historiques' });
Historique.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Requete.hasMany(Historique, { foreignKey: 'requeteId', as: 'historiques' });
Historique.belongsTo(Requete, { foreignKey: 'requeteId', as: 'requete' });

Image.hasMany(Historique, { foreignKey: 'imageId', as: 'historiques' });
Historique.belongsTo(Image, { foreignKey: 'imageId', as: 'image' });

module.exports = {
  User,
  Requete,
  Image,
  Historique,
};
