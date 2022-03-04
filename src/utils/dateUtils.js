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
