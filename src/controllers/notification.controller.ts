import { Request, Response, NextFunction } from 'express';
import NotificationModel from '../models/notification.model.js';
import { NewNotification } from '../interfaces/notification.interface.js';


const listAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const notifications = await NotificationModel.findAll();
    res.status(200).json(notifications);
  } catch (error) {
    next(error); 
  }
};

const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { user, message } = req.body as NewNotification;

    if (!user || !message) {
      const error: any = new Error("Os campos 'user' e 'message' são obrigatórios.");
      error.status = 400;
      throw error;
    }

    const newNotification = await NotificationModel.create({ user, message });
    res.status(201).json(newNotification);
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const success = await NotificationModel.remove(id);

    if (!success) {
      const error: any = new Error('Notificação não encontrada.');
      error.status = 404;
      throw error;
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export default { listAll, create, remove };