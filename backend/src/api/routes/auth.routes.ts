// routes/auth.routes.ts
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Usuario, { IUsuario } from '../../models/user.model.js';

const router = Router();

// Registro
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await Usuario.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuario ya existe' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Usuario({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Usuario.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Credenciales incorrectas' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales incorrectas' });
    }
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token, username: user.username });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

export default router;

