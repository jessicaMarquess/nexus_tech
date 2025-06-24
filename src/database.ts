import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import 'dotenv/config';

import { NotificationTable } from './interfaces/notification.interface';

interface Database {
  notifications: NotificationTable;
}

const dialect = new PostgresDialect({
  pool: new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  }),
});

export const db = new Kysely<Database>({
  dialect,
});