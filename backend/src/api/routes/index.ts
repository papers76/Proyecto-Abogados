import { Router } from 'express';

const router = Router();

// Rutas básicas
router.get('/', (req, res) => {
  res.send('Hello, world!');
});

export default router;
