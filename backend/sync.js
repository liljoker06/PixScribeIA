const sequelize = require('./config'); // Assurez-vous que sequelize est correctement configuré
const { User, Requete, Image, Historique } = require('./models');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion à la base de données établie.');
    
    // Synchronisation des modèles
    await sequelize.sync({ alter: true }); // Utilise { force: true } pour réinitialiser la DB (attention !)
    console.log('📦 Modèles synchronisés avec la base de données.');
  } catch (error) {
    console.error('❌ Erreur de connexion à la base de données:', error);
  }
})();
