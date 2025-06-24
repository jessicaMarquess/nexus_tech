import express from 'express';
import notificationRoutes from './routes/notification.routes.js';
import errorMiddleware from './middlewares/error.middleware.js';

const app = express();
app.use(express.json());
app.use('/notifications', notificationRoutes);
app.use(errorMiddleware);

export default app;