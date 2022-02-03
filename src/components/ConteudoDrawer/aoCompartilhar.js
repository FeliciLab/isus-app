import { Share } from 'react-native';

const aoCompartilhar = async () => {
  const messagLink =
    'Conhece o app iSUS? Um produto digital do governo do Ceará de apoio a profissionais de saúde, com informações, serviços e oportunidades na palma da mão! Saiba mais: https://coronavirus.ceara.gov.br/isus/';
  try {
    await Share.share({
      message: messagLink,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export default aoCompartilhar;
