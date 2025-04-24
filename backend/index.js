const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/auth');

const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true, 
};
app.use(cors(corsOptions));
app.use(express.json());
app.use('/auth', authRoutes);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Serveur backend lancé sur http://localhost:${PORT}`);
});
