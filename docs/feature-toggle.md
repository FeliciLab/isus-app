# Feature Toggles

O iSUS utiliza um modelo de desenvolvimento chamado **Trunk-based Development**. Uma das principais características desse modelo é que não precisamos criar branches para o desenvolvimento de cada nova funcionalidade no nosso projeto. Isso nos facilita a sempre termos o códigos de forma que possa estar preparado para a produção.

Todo o processo de Desenvolvimento é feita a partir da branch **Develop** e a cada build para a produção, a branch **Master** é alinha conforme o que está em produção.

Para poder gerenciar essas features alinhadas e a habilita / desabilita features, utilizamos as **Feature Toggles** (Ou Feature Flags).

## react-feature-toggles

Para gerenciar nossas Feature Toggles, usamos o (react-feature-togles)[https://github.com/paralleldrive/react-feature-toggles]. A Feature é adicionada da seguinte forma:

```React
  <Feature
    name="faq"
    inactiveComponent={NotFoundComponent}
    activeComponent={FAQComponent}
  />
```

O nome de uma feature é geralmente recebe um número, esse número é correspondente a uma issue do projeto. As Feature pode ser gerenciada através do arquivo `src/featureAtivas.js`. Essse arquivo contém uma lista com todas as features que estão ativas no momento. Para adicionar uma nova feature, basta adicionar uma nova Feature em `src/utils/features.js`.

