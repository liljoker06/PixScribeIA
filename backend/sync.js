const sequelize = require('./config');
const User = require('./models/User');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion établie.');

    await sequelize.sync({ alter: true }); // ou { force: true } pour reset
    console.log('📦 Modèles synchronisés.');
  } catch (error) {
    console.error('❌ Erreur de connexion :', error);
  } finally {
    await sequelize.close();
  }
})();
