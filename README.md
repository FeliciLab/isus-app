# App iSUS
### v3.3.3
Esse é o repositório do aplicativo iSUS.

<img src="https://user-images.githubusercontent.com/89998/83240358-a763d180-a16f-11ea-9e2f-226f7f197a91.png">

- [App iSUS](#app-isus)
    - [v3.3.2](#v332)
  - [O que é?](#o-que-é)
  - [Tech Stack](#tech-stack)
  - [Start do Projeto.](#start-do-projeto)
    - [Usando Android](#usando-android)
    - [Usando o iOS](#usando-o-ios)
    - [Deploy da Aplicação (Android)](#deploy-da-aplicação-android)
  - [Erros comuns iOS](#erros-comuns-ios)
      - [xcrun: error: SDK "iphoneos" cannot be located](#xcrun-error-sdk-iphoneos-cannot-be-located)
      - [Error: EMFILE: too many open files, watch at FSEvent.FSWatcher._handle.onchange (internal/fs/watchers.js:129:28)](#error-emfile-too-many-open-files-watch-at-fseventfswatcher_handleonchange-internalfswatchersjs12928)
- [UX Design](#ux-design)
    - [Design de Interfaces:](#design-de-interfaces)
    - [Design Job Pipeline:](#design-job-pipeline)
    - [Design Backlog:](#design-backlog)
- [Padrões de Desenvolvimento](#padrões-de-desenvolvimento)
  - [Linguagem ubíqua](#linguagem-ubíqua)
  - [Git Flow](#git-flow)
    - [Instalação](#instalação)
  - [Branches](#branches)
  - [Commits](#commits)
      - [GitMoji :stuck_out_tongue_winking_eye:](#gitmoji-stuck_out_tongue_winking_eye)
      - [O que esse commit faz?](#o-que-esse-commit-faz)
  - [Estilização dos componentes](#estilização-dos-componentes)
  - [Atualização de versão do Manejo Clínico](#atualização-de-versão-do-manejo-clínico)
    - [Como atualizar](#como-atualizar)
- [Quem Faz?](#quem-faz)



**Veja também:**
- nossa [Tech Stack](https://github.com/EscolaDeSaudePublica/isus-app#tech-stack)
- nosso [Kanban](https://github.com/orgs/EscolaDeSaudePublica/projects/20)
- nosso [Grupo no Telegram](https://t.me/grupoanticorona)

## O que é?

O iSUS é um produto digital criado para ser um cinto de utilidades e apoiar os profissionais do Sistema Único de Saúde (SUS) no combate ao Covid-19, diante de desafios de urgência, emergência e proteção à vida.

Desenvolvido em meio à pandemia do novo coronavírus, responde à demanda de relacionamento entre usuários, trabalhadores e gestores do SUS.

O objetivo é entregar informações, serviços e oportunidades, de forma automatizada, personalizada e segura, na palma da mão dos profissionais, otimizando seu tempo e apoiando a tomada de decisões baseadas em dados e evidências científicas.

## Tech Stack
* React Native
* Node 12
* yarn >= 1.21.1

O projeto foi homologado para as seguintes versões:

* Android - Usando o Android Studio
* iOS - Usando o XCode.

## Start do Projeto.

* Após baixar o projeto, certifique se você está na branch develop, em seguida instale as dependências usando:
```bash
 yarn install
```

* Crie o arquivo `.env` como cópia do `.env.example` e insira o valor das variáveis de ambiente caso precise utilizar alguma delas.
```bash
 cp .env.example .env
```

### Usando Android
* Com o Android Studio e o Java SDK previamente instalados, digite o seguinte comando:
```bash
yarn android

```
### Usando o iOS
* Com o XCode baixado no sistema e o cocoapods, entre na pasta do iOS no projeto e instale as dependências do Cocoapods:
```bash
  pod install
```

```bash
  yarn ios
```
### Deploy da Aplicação (Android)
  Para deploy da app para as lojas, solicitar acesso a keystore e as key-informations.


## Erros comuns iOS

#### xcrun: error: SDK "iphoneos" cannot be located
https://www.ryadel.com/en/xcode-sdk-iphoneos-cannot-be-located-mac-osx-error-fix/

#### Error: EMFILE: too many open files, watch at FSEvent.FSWatcher._handle.onchange (internal/fs/watchers.js:129:28)
https://stackoverflow.com/questions/58675179/error-emfile-too-many-open-files-react-native-cli


# UX Design
### Design de Interfaces:
Projeto da Interface: https://www.figma.com/file/FLKurtBDSBYAiYcS5xAPYC/mockup?node-id=0%3A1

### Design Job Pipeline:
Controle das Atividades: https://airtable.com/shrIaMWhqdW48mz5t

### Design Backlog:
Controle do Backlog do Time de Design: https://airtable.com/shr5uuRvxUWgMYpQG


# Padrões de Desenvolvimento

## Linguagem ubíqua
Pela conveniente e constante proximidade com o negócio decidimos utilizar o português em todo código novo da iSUS, em nossos commits e no nome de nossas branches, no código, isso se da em métodos, classes e nomes de arquivos.

## Git Flow

Adotamos o git flow como conjuntos de extensões para o git.
O Git Flow permite operações de alto nível para repositórios, usando o modelo de branches de Vincent Driessen.

Você pode aprender o fluxo de uso comum do git flow [aqui](https://danielkummer.github.io/git-flow-cheatsheet/index.pt_BR.html)

### Instalação

Linux:
  ```bash
  $ apt-get install git-flow
  ```
Mac OS:
* Homebrew
   ```bash
    $ brew install git-flow-avh
   ```
* Macports
  ```bash
    $ port install git-flow-avh
   ```
Windows:
  ```bash
  $ wget -q -O - --no-check-certificate https://raw.github.com/petervanderdoes/gitflow-avh/develop/contrib/gitflow-installer.sh install stable | bash
  ```

## Branches
Utilizamos _kebab-case_ para a formatação do nome das branches, esse nome é composto pelo número da estória seguido pelo seu titulo, se o número da estória fosse 42, seria como no exemplo abaixo.

    feature/#42-titulo-da-estoria

## Commits
#### GitMoji :stuck_out_tongue_winking_eye:


Usamos o GitMoji nos commits para categorizar mais intuitivamente em que tipo de atividade o commit atuou.

![gitmoji-cli](11eb9e40-ae47-11e6-90db-a1ad8a87b495.gif)
> O cliente interativo do [gitmoji](https://github.com/carloscuesta/gitmoji) sendo usado para fazer a mensagem do commit.

para instalar o gitmoji você só precisa ter o npm instalado e rodar o comando:

```bash
npm i -g gitmoji-cli
```

#### O que esse commit faz?
É está pergunta que fazemos para escrever a mensagem do commit, assim conseguimos padronizar o commit, sempre começando com uma flexão verbal.

Um exemplo desse exercício mental seria:
  ```
  - o que esse commit faz?
  - (esse commit) Altera o icone da Home no menu inferior.
  ```

Também colocamos o número da estória no ínicio do título do commit.

um exemplo desse nosso padrão de commit é:

    #42 :art: Agrupa os estilos do componente card-informativo.

## Estilização dos componentes
Estamos trabalhando com stylesheet, agrupado por componentes, mas temos o plano de utilizar o [styled-components](https://styled-components.com/).

## Atualização de versão do Manejo Clínico

Na pasta `src/pages/ClinicalManagement/json` existe um arquivo chamado `versao_manejo.json` que mantém as informações da versão atual:

``` javascript
  {
    "versao": 2.4,
    "lida": false,
    "modificacoes": [
      "estagio1",
      "estagio4"
    ]
  }
```

Ele possui os seguintes atributos:

- `versao`: número da versão atual do Manejo
- `lida`: informa se o conteúdo da versão já foi lido (esse valor muda de `true` para `false` ao clicar no banner de Manejo da Home)
- `modificacoes`: informa em que estágios do Manejo houveram modificações nessa versão

### Como atualizar

Atualmente a atualização é feita de forma manual. No diretório `src/pages/ClinicalManagement/json` você terá acesso aos conteúdos de texto de todos os estágios.

Antes de iniciar a atualização, procure pela propriedade `"iconeAtualizacao": " 🔴"` em todos os JSONs dos estágios e apague somente o ícone (`🔴`) pois ele é referente à atualização da versão passada.

Altere o conteúdo conforme a exigência seguindo, de preferência, a estrutura de JSON já estabelecida.

Se for necessário, também pode mudar a estrutura do JSON para conseguir adicionar a alteração. Mas lembre-se de atualizar também o renderizador de conteúdo do estágio alterado (no diretório `src/pages/ClinicalManagement/estagios`) para que seja renderizado de acordo.

Após ter feito as atualizações, adicione a propriedade `"iconeAtualizacao": " 🔴"` no JSON do estágio de forma que o ícone apareça ao final do parágrafo atualizado (você vai precisar fazer isso aparecer no renderizador também).

Tendo tudo isso feito, basta somente atualizar o número da `versao` nesse JSON, colocar a propriedade `lida` como `false` (caso já não esteja) e inserir em `modificacoes` quais estágios tiveram mudanças seguindo o formato `"estagio<numero_do_estagio>"`.

Realize o commit com todas as alterações no código referentes a essa atualização.

# Quem Faz?

O projeto é uma iniciativa da Escola de Saúde Pública do Ceará (ESP), com apoio da Fundação Cearense de Apoio ao Desenvolvimento Científico e Tecnológico (Funcap), por meio do projeto "SMART Health", desenvolvido em parceria com o Grupo de Engenharia de Software Adaptativo e Distribuído (GESAD) da Universidade Estadual do Ceará (UECE).

O criação do aplicativo é uma das ações da Força Tarefa Digital de Combate ao Coronavírus, que estão sendo realizadas de forma aberta para promover a inovação e viabilizar a colaboração em rede.
