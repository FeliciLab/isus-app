import { formatarWithCalendar } from '~/utils/dateUtils';
import moment from 'moment';

const now = moment();

describe('Testes em formatação de datas', () => {
  test('Agora', () => {
    expect(formatarWithCalendar(now)).toBe('há 0 horas');
  });

  test('Uma hora atrás', () => {
    const oneHourAgo = now.subtract(1, 'hours');

    expect(formatarWithCalendar(oneHourAgo)).toBe('há 1 horas');
  });
});
