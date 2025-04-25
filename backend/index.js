const express = require('express');
const app = express();
const cors = require('cors');
const uploadRoutes = require('./routes/upload'); 
const authRoutes = require('./routes/auth');


const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true, 
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/api', uploadRoutes);


const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Serveur backend lancé sur http://localhost:${PORT}`);
});
