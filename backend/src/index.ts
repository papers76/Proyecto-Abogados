import express from 'express';
import dotenv from 'dotenv';
import routes from '../src/api/routes/index.js';
import connectDB from '../src/config/db.js';
import authRoutes from '../src/api/routes/auth.routes.js';
import caseRoutes from '../src/api/routes/case.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Conectar a MongoDB
connectDB();

// Usar rutas
app.use('/', routes);
app.use('/api/auth', authRoutes);
app.use('/api/add-cases', caseRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


