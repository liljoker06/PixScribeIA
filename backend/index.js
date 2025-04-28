const express = require('express');
const app = express();
const cors = require('cors');
const uploadRoutes = require('./routes/upload'); 
const authRoutes = require('./routes/auth');
const historiqueRoutes = require('./routes/historiques');
const { sequelize } = require('./models');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
const path = require('path');
const fs = require('fs');

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/requete', uploadRoutes);
app.use('/api/historique', historiqueRoutes);
app.use('/api/upload', uploadRoutes); 

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));




// le fond est bon mais la structure à revoir /////// 
// proposition : mettre le code dans un controller exemple historiqueController.js 
// ensuite créer une route dans l'historique.js et l'importer dans le fichier index.js 
// 
app.get('/api/images/:imagePath', (req, res) => {
  console.log("Image path requested:", req.params.imagePath);
  const imagePath = path.join(__dirname, req.params.imagePath);
  console.log("Full image path:", imagePath);
  
  // Vérifier si le fichier existe
  if (!fs.existsSync(imagePath)) {
    console.error("File not found:", imagePath);
    return res.status(404).send("Image not found");
  }
  
  res.sendFile(imagePath);
});


(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion à la base de données établie.');
    
    // Synchronisation des modèles avec la base de données si il y'a un changement donc commenter la ligne suivante pour éviter de perdre les données
    await sequelize.sync({ alter: true });
    console.log('📦 Modèles synchronisés avec la base de données.');
  } catch (error) {
    console.error('❌ Erreur de connexion à la base de données:', error);
  }
})();

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Serveur backend lancé sur http://localhost:${PORT}`);
  console.log(`Documentation Swagger : http://localhost:${PORT}/api-docs`);
});
