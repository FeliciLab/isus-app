// Funções utilizadas para tratar e enviar informações de categoria e unidades de serviço
// no cadastro e na atualização de informações de usuário.
import { analyticsData } from './analytics';

export function analyticsCategoria(cat, codigo, operacao) {
  if (cat) {
    analyticsData(
      `cadastro_cp_${JSON.parse(cat).id}_${codigo}`,
      `${operacao}`,
      'Perfil'
    );
  }
}
export function analyticsUnidadeServico(serv, codigo, operacao) {
  serv.forEach((i) => {
    analyticsData(
      `cadastro_us_${i.id}_${codigo}`,
      `${operacao}`,
      'Perfil'
    );
  });
}
