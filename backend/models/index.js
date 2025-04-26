const sequelize = require('../config/database');

// Chargement des modèles
const User = require('./User')(sequelize);
const Requete = require('./Requete')(sequelize);
const Image = require('./Image')(sequelize);
const Historique = require('./Historique')(sequelize);

// Définition des relations

// User -> Requete
User.hasMany(Requete, { foreignKey: 'userId', as: 'requetes' });
Requete.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Requete -> Image
Requete.hasMany(Image, { foreignKey: 'requeteId', as: 'images' });
Image.belongsTo(Requete, { foreignKey: 'requeteId', as: 'requete' });

// User -> Historique
User.hasMany(Historique, { foreignKey: 'userId', as: 'historiques' });
Historique.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Requete -> Historique
Requete.hasMany(Historique, { foreignKey: 'requeteId', as: 'historiques' });
Historique.belongsTo(Requete, { foreignKey: 'requeteId', as: 'requete' });

// Image -> Historique
Image.hasMany(Historique, { foreignKey: 'imageId', as: 'historiques' });
Historique.belongsTo(Image, { foreignKey: 'imageId', as: 'image' });

// Export
module.exports = {
  sequelize,
  User,
  Requete,
  Image,
  Historique,
};
