import { tableSchema } from '@nozbe/watermelondb';

const notificationSchema = tableSchema({
  name: 'notifications',
  columns: [
    {
      name: 'title', // título da notificação
      type: 'string',
    },
    {
      name: 'description', // descrição
      type: 'string',
    },
    {
      name: 'cover', // imagem
      type: 'string',
      isOptional: true,
    },
    {
      name: 'readed', // booleano para saber se a notificação foi lida ou não.
      type: 'boolean',
    },
    {
      name: 'visualized', // booleano para saber se a notificação foi visualizada ou não
      type: 'boolean',
    },
    { name: 'created_at', type: 'number' },
    { name: 'updated_at', type: 'number' },
  ],
});

export { notificationSchema };
