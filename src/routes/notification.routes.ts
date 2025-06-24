import { Router } from 'express';
import notificationController from '../controllers/notification.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();


router.use(authMiddleware);

router.get('/', notificationController.listAll);
router.post('/', notificationController.create);
router.delete('/:id', notificationController.remove);


export default router;