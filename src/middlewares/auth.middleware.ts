import { Request, Response, NextFunction } from 'express';

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const apiKey = req.headers['authorization'];
  const expectedApiKey = process.env.API_KEY;

  if (!apiKey || apiKey !== expectedApiKey) {
    res.status(401).json({ error: 'Chave de API inválida ou não fornecida.' });
    return;
  }

  next();
};

export default authMiddleware;