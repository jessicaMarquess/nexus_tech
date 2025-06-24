import { db } from '../database.js';
import { NewNotification, Notification } from '../interfaces/notification.interface';

const findAll = async (): Promise<Notification[]> => {
  return await db.selectFrom('notifications')
    .selectAll()
    .orderBy('created_at', 'desc')
    .execute();
};

const create = async (data: NewNotification): Promise<Notification> => {
  return await db.insertInto('notifications')
    .values(data)
    .returningAll()
    .executeTakeFirstOrThrow(); 
};

const remove = async (id: string): Promise<boolean> => {
  const result = await db.deleteFrom('notifications')
    .where('id', '=', id)
    .executeTakeFirst();

  return Number(result.numDeletedRows) > 0;
};

export default { findAll, create, remove };