import { Model } from '@nozbe/watermelondb';
import { date, field, readonly, writer } from '@nozbe/watermelondb/decorators';

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

  @writer async markAsRead() {
    await this.update(notification => {
      notification.readed = true;
    });
  }

  @writer async markAsViewed() {
    await this.update(notification => {
      notification.visualized = true;
    });
  }
}

export { NotificationModel };
