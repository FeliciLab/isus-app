import { Model } from '@nozbe/watermelondb';
import { readonly, date, field } from '@nozbe/watermelondb/decorators';

class NotificationModel extends Model {
  static table = 'notifications';

  @field('title')
  title;

  @field('description')
  description;

  @field('cover')
  cover;

  @field('readed')
  readed;

  @field('visualized')
  visualized;

  @readonly
  @date('created_at')
  createdAt;

  @readonly
  @date('updated_at')
  updatedAt;
}

export { NotificationModel };
