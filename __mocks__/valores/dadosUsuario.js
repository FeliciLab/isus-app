export default {
  id: 93,
  id_keycloak: 'fbf4212e-5b6c-4abc-852e-7c2e31274d87',
  name: 'Rui moreno',
  email: 'ruiguemo@gmail.com',
  cpf: '57171434001',
  telefone: '85999999999',
  created_at: '2021-04-08T13:04:55.000000Z',
  updated_at: '2021-06-09T17:36:30.000000Z',
  municipio: {
    id: 1347,
    estado_id: 6,
    nome: 'Fortaleza'
  },
  estado: {
    id: 6,
    nome: 'Ceará',
    uf: 'CE'
  },
  profissional: {
    categoria_profissional: {
      id: 3,
      nome: 'Enfermagem',
      ordem: 3
    },
    tipos_contratacoes: [],
    titulacoes_academica: [],
    unidades_servicos: [
      {
        id: 18,
        pai: 3,
        nome: 'Acolhimento psicossocial',
        created_at: null,
        updated_at: null
      },
      {
        id: 19,
        pai: 3,
        nome: 'Alimentação e assistência nutricional e dietética',
        created_at: null,
        updated_at: null
      }
    ],
    especialidades: [
      {
        id: 60,
        categoriaprofissional_id: 3,
        nome: 'Assistência de enfermagem em anestesiologia'
      },
      {
        id: 111,
        categoriaprofissional_id: 3,
        nome: 'Bioética'
      }
    ]
  }
};
