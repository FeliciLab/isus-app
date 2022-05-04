import { appSchema } from '@nozbe/watermelondb';
import { notificationSchema } from './notificationSchema';

const schemas = appSchema({
  version: 1,
  tables: [notificationSchema],
});

export { schemas };
