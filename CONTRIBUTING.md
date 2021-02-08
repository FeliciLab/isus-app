# Guia de contribuição

Que bom que você resolveu contribuir conosco. Obrigado! A proposta do iSUS é
ambiciosa e precisamos de toda ajuda possível para alcançar nossos objetivos.
Neste guia vamos explicar como funcionam os nossos processos internos e como
podemos trabalhar juntos da melhor forma possível.

## Como contribuir

Existem diversas formas de contribuir com o projeto:

- [Reportando bugs](#reportando-bugs)
- [Indicando melhorias](#indicando-melhorias)
- [Pedindo recursos](#pedindo-recursos)
- [Discutindo as issues](#discutindo-as-issues)
- [Fazendo pull requests](#fazendo-pull-requests)
- [Outras formas de contribuir](#outras-formas-de-contribuir)

### Reportando bugs

Se encontrou um bug no iSUS você pode reportá-lo usando a ferramenta de
[issues do GitHub](https://github.com/EscolaDeSaudePublica/isus-app/issues). Porém antes
de enviar seu bug é importante fazer as seguintes verificações:

1. Atualize seu repositório local no branch `develop` mais recente. Talvez seu
   bug já tenha sido corrigido na versão mais recente;
2. Verifique se o bug já foi reportado por outra pessoa fazendo uma busca pelas
   issues.

Se o bug realmente não foi resolvido ou acolhido então está na hora de
[criar uma nova issue](https://github.com/EscolaDeSaudePublica/isus-app/issues/new?assignees=&labels=bug&template=reportar-bug.md&title=%3CTela+de+login+n%C3%A3o+aparece+ao+clicar+em+%27J%C3%A1+possuo+Id+Sa%C3%BAde%27%3E+...). No
título da issue tente resumir da melhor forma o problema evitando títulos
genéricos como *"Falha no sistema"* ou *"Problemas na instalação"*. No corpo da
issue, tente seguir o seguinte formato:

```
## **Descrição**
Descreva o seu problema ou sua necessidade.

## **Observações**
Tente especificar a versão, aparelho, sistema operacional e se possível insira imagens ou vídeos do problema relatado.

```

Exemplo:

```
## **Descrição**
Descreva o seu problema ou sua necessidade.

## **Observações**
Tente especificar a versão, aparelho, sistema operacional e se possível insira imagens ou vídeos do problema relatado.

```

Se possível inclua imagens ou vídeos à descrição do bug para facilitar o
processo de reprodução. Use um software como
[LICEcap](https://www.cockos.com/licecap/) para criar um gif animado de sua
tela. Informe também detalhes sobre o seu ambiente: plataforma de execução,
sistema operacional, navegador e versão, etc. Você também deve adicionar o
label **bug** à issue.

#### Nota sobre falhas de segurança

Se você encontrou alguma falha de segurança **não use as issues para reportar o
bug**. Escreva o seu report diretamente para o endereço de e-mail
`nit@esp.ce.gov.br`. Ele será analisado, validado e corrigido de
acordo com as necessidades. Pedimos que **não torne a falha pública** para
segurança de todos que utilizam a plataforma em seu estado atual.

### Indicando melhorias

Outra ótima forma de contribuir é indicando melhorias ao código do iSUS e em
como ele está estruturado. Se você tem qualquer ideia de como podemos melhorar
alguma abordagem na solução de problemas, refatoração de código, melhoria em
algum recurso ou qualquer outra coisa relacionada, siga estes passos:

1. Verifique se a ideia já não está pressente em nossas
   [issues do GitHub](https://github.com/EscolaDeSaudePublica/isus-app/issues);
2. Defenda a sua ideia e explique de forma convincente porque ela deve ser
   acolhida. Eis algumas questões a considerar:
   1. Você realmente esta propondo uma ideia só ou um conjunto de ideias?
   2. Qual é o problema que sua ideia resolve?
   3. Por que sua sugestão é melhor do que o que já existe no código?
   4. Realmente vale a pena demandar tempo para implementar sua ideia dentro de
      nossas prioridades?

Tendo passado pelo crivo de todos estes questionamentos basta
[criar uma nova issue](https://github.com/EscolaDeSaudePublica/isus-app/issues/new)
descrevendo as melhorias e usando o label **melhorias**.

### Discutindo as issues

Antes de partirmos para o código em si é muito importante discutirmos com a
comunidade como cada issue será abordada. Toda e qualquer questão deve ser
colocada em discussão para que qualquer pessoa que deseje solucionar aquele
problema tenha o máximo de informações para executar uma solução.

Idealmente todas as issues devem ter um plano de ação claro antes que qualquer
código seja escrito. Sabemos que muitas vezes isto não é possível, sendo
necessário explorar e analisar melhor o que foi indicado. Nestes casos, publique
todas as suas descobertas nas discussões indicando caminhos e recebendo o
feedback da comunidade a respeito do que está sendo proposto.

Issues que estão em processo de discussão devem receber o label **discussão**
indicando que aquela issue precisa dos inputs e feedbacks dos membros da
comunidade. Nós te encorajamos a participar o máximo possível mas fique atento
ao nosso [código de conduta](./CODE_OF_CONDUCT.md) antes de realizar qualquer
interação com os outros membros da comunidade.

### Fazendo pull requests

Depois de ter um plano de ação relativamente claro você deve estar pronto para
contribuir com código. Para isso faça um fork do iSUS e trabalhe em cima de
um branch diferente da main implementando suas soluções. Para saber mais sobre
pull requests e como eles funcionam, veja
[este link](https://help.github.com/articles/about-pull-requests/).

Antes de abrir seu PR (pull request) certique-se que:

- O código realmente resolve um problema real (de preferência baseado em alguma
  issue levantada);
- Seu PR resolve uma issue apenas. Se você quiser fazer mais de uma coisa,
  divida em vários PRs;
- Seu código é funcional (ou algo próximo disso). Providencie testes se
  possível;
- Seu código adere às convenções do [Javascript](https://google.github.io/styleguide/jsguide.html)
- Seus commits devem seguir o padrão de commits convecionado pelo time, você ver mais sobre o padrão de commit [neste guia](https://github.com/EscolaDeSaudePublica/isus-app/wiki/Padr%C3%B5es-de-Desenvolvimento#commits).
- Se for inevitável criar vários commits intermediários, por favor execute um
  [squash](https://git-scm.com/book/pt-br/v1/Ferramentas-do-Git-Reescrevendo-o-Hist%C3%B3rico#Achatando-um-Commit)
  antes de abrir seu PR;


Caso seu PR não atenda a uma destas demandas ele poderá ser fechado. Isto inclui
PRs que tentam resolver problemas reais mas que contém código cheio de erros ou
soluções incompletas. Para que a nossa lista de PRs não fique poluída,
dificultando o trabalho de outros membros da comunidade que podem ajudar
revisando as mudanças, pedimos que PRs sejam abertos quando sua solução estiver
a mais completa possível. Por isso é imprescindível usar a discussão nas issues
para a criação de soluções mais assertivas.

#### Sobre mudanças cosméticas

PRs que realizam apenas mudanças cosméticas como remoção de espaços em branco,
ajustes de indentação, etc., não serão aceitos. Nós valorizamos um código bem
escrito e queremos padronizar nossas práticas, mas PRs que não entregarem
nenhuma melhoria na estabilidade, funcionalidade, testabilidade do projeto ou
compatibilidade com os padrões sendo adotados serão fechados.

### Outras formas de contribuir

Se você não trabalha com código mas quer ajudar o iSUS, existe muitas outras
formas de contribuir:

- Ajude com a documentação e/ou wiki do projeto (mais informações em breve);
- Fale sobre o iSUS nas suas redes sociais, blogs, etc. Espalhe a palavra;
- Organize eventos e dê palestras sobre o iSUS;
- Crie material promocional como apresentações, screencasts, mídia para
  compartilhamento em redes sociais, etc;
- Viu alguma discussão que te interessa e onde você pode acrescentar mesmo sem
  conhecimento técnico? Não se acanhe e participe também nas issues do GitHub.

Pensou em alguma outra forma de contribuir? Compartilha com a gente! Escreva
para `nit@esp.ce.gov.br` e conte sua história.

# Créditos

Este documento foi escrito com o auxílio de outros documentos similares
utilizados em outras comunidades. Destacamos:
- [i-Educar](https://github.com/portabilis/i/blob/2.5/contributing.md)
- [Metabase](https://github.com/metabase/metabase/blob/master/docs/contributing.md)
- [Ghost](https://docs.ghost.org/v1/docs/contributing)
- [Ember.js](https://github.com/emberjs/ember.js/blob/master/CONTRIBUTING.md)
- [Ruby on Rails](https://github.com/rails/rails/blob/master/CONTRIBUTING.md)
... dentre outros!
