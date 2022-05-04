import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { NotificationModel } from './models/NotificationModel';
import { schemas } from './schemas';

const adapter = new SQLiteAdapter({
  schema: schemas,
});

const database = new Database({
  adapter,
  modelClasses: [NotificationModel],
  // actionsEnabled: true, // em caso de @actions e database.action
});

export default database;
