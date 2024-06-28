// auth.middleware.ts

import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extraer el token del encabezado

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!); // Verificar y decodificar el token
    (req as any).user = decoded; // Asignar el usuario decodificado al objeto req para uso posterior
    next(); // Llamar al siguiente middleware o controlador
  } catch (err) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

