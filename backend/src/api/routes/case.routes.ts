import express from 'express';
import Case from '../../models/case.model.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js'; 

const router = express.Router();

// Crear un nuevo caso
router.post('/', authenticateJWT, async (req, res) => {
  const { date, category, status, description } = req.body;
  try {
    const newCase = new Case({
      userId: (req as any).user.userId,
      date,
      category,
      status,
      description,
      history: [{ date, status, description }],
    });
    await newCase.save();
    res.status(201).json(newCase);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el caso' });
  }
});

// Listar todos los juicios de un usuario
router.get('/', authenticateJWT, async (req, res) => {
  try {
    const cases = await Case.find({ userId: (req as any).user.userId });
    res.status(200).json(cases);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los juicios' });
  }
});

// Actualizar un juicio
router.put('/:id', authenticateJWT, async (req, res) => {
  const { id } = req.params;
  const { date, status, description } = req.body;
  try {
    const updatedCase = await Case.findByIdAndUpdate(
      id,
      {
        $set: { date, status, description },
        $push: { history: { date, status, description } },
      },
      { new: true }
    );
    res.status(200).json(updatedCase);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el juicio' });
  }
});

// Eliminar un juicio
router.delete('/:id', authenticateJWT, async (req, res) => {
  const { id } = req.params;
  try {
    await Case.findByIdAndDelete(id);
    res.status(200).json({ message: 'Juicio eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el juicio' });
  }
});

export default router;
