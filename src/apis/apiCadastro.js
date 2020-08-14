import request from '../services/request';

export default function getMunicipiosCeara() {
  return request.get('/estados/6/municipios');
}
