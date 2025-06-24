import { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely';

export interface NotificationTable {
  id: Generated<string>; 
  user: string;
  message: string;
  created_at: ColumnType<Date, string | undefined, never>; 
}


export type Notification = Selectable<NotificationTable>; 
export type NewNotification = Insertable<NotificationTable>; 
export type NotificationUpdate = Updateable<NotificationTable>; 