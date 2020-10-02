# Feature Toggles

O iSUS utiliza um modelo de desenvolvimento chamado **Trunk-based Development**. Uma das principais características desse modelo é que não precisamos criar branches para o desenvolvimento de cada nova funcionalidade no nosso projeto. Isso nos facilita a sempre termos o códigos de forma que possa estar preparado para a produção.

Todo o processo de Desenvolvimento é feita a partir da branch **Develop** e a cada build para a produção, a branch **Master** é alinha conforme o que está em produção.

Para poder gerenciar essas features alinhadas e a habilita / desabilita features, utilizamos as **Feature Toggles** (Ou Feature Flags).

## react-feature-toggles

Para gerenciar nossas Feature Toggles, usamos o [react-feature-togles](https://github.com/paralleldrive/react-feature-toggles). A Feature é adicionada da seguinte forma:

```React
  <Feature
    name="faq"
    inactiveComponent={NotFoundComponent}
    activeComponent={FAQComponent}
  />
```

A feature geralmente recebe um número, esse número é correspondente a uma issue do projeto. As Feature pode ser gerenciada através do arquivo `src/featureAtivas.js`. Essse arquivo contém uma lista com todas as features que estão ativas no momento. Para adicionar uma nova feature, basta adicionar uma nova Feature em `src/utils/features.js`.

`activeComponent` é a chamado do componente quando a feature estiver ativada. Ao ser removida a Feature em `src/featureAtivas.js`, ele deixará de aparecer e exibir o componente `inactiveComponent`, caso essa propriedade esteja sendo declarada com algum componente.

`inactiveComponent` é a chamada do componente quando a feature estiver inativa. É utilizado quando há uma troca de estilização ou refatoração de código.

Enquanto essa feature ainda não está finalizada, ela deve permanecer desativada no repositório remoto, podendo ser ativada novamente quando estiver tudo funcionando corretamente, o que significa que a feature está pronta para o ambiente de teste.

Removemos as feature toggles no final de cada sprint. Para isso, identificamos as features que não estão mais em homologação (já foram aprovadas e estão em produção), localizamos onte a feature está sendo emplementada e a tira da `<Feature/>`, utilizando apenas o `activeComponent`, e limpando repositório de código que não está mais sendo usado ou não é adequado. É feito um commit para cada feature toggle removida, utilizando a mesma convenção do projeto que está documentada no nosso [README](https://github.com/EscolaDeSaudePublica/isus-app#commits). Pode ser visto um exemplo desse processo [nesse commit](https://github.com/EscolaDeSaudePublica/isus-app/commit/0181a247882557fc5706dcf937e143d0bf6cf3a6).



