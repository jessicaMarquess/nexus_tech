import { Request, Response, NextFunction } from 'express';

interface HttpError extends Error {
  status?: number;
}

const errorMiddleware = (err: HttpError, req: Request, res: Response, next: NextFunction): void => {
  console.error(err.stack);

  const statusCode = err.status || 500;
  const message = err.message || 'Ocorreu um erro interno no servidor.';

  res.status(statusCode).json({
    error: message,
  });
};

export default errorMiddleware;