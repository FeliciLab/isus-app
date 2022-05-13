import moment from 'moment';

function Capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function formatarDataPorExtenso(date) {
  /* Antes de começar a renderizar as informações, mostrará a data do dia */
  // eslint-disable-next-line no-shadow
  let postData;
  if (date === '') {
    postData = new Date();
  } else {
    postData = date;
  }

  moment.locale('pt-br');

  return `${moment(postData).format('D')} de ${Capitalize(
    moment(postData).format('MMMM'),
  )} de ${moment(postData).format('YYYY')}`;
}

// Fromatar de acordo com diferença da data passada com a data atual
export function formatarWithCalendar(date) {
  const dateFormated = moment(date)
    .locale('pt-br')
    .calendar({
      sameDay: function(now) {
        return `[há] ${now.diff(this, 'hours')} [horas]`;
      },
      lastDay: 'ddd [às] HH:mm',
      lastWeek: 'ddd [às] HH:mm',
      sameElse: 'DD [de] MMM [às] HH:mm',
    });

  return dateFormated;
}
