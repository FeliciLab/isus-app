// Funções utilizadas para tratar e enviar informações de categoria e unidades de serviço
// no cadastro e na atualização de informações de usuário.
import { analyticsData } from './analytics';

export function analitycsCategoria(cat, codigo) {
  if (cat) {
    analyticsData(
      'cadastro_cp_'.concat(JSON.parse(cat).id).concat('_').concat(codigo),
      'Atualização Cadastro',
      'Perfil'
    );
  }
}
export function analitycsUnidadeServico(serv, codigo) {
  serv.forEach((i) => {
    analyticsData(
      'cadastro_us_'.concat(i.id).concat('_').concat(codigo),
      'Atualização Cadastro',
      'Perfil'
    );
  });
}
