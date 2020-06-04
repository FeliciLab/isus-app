# App iSUS
### v3.0.2
Esse é o repositório do aplicativo iSUS.

<img src="https://user-images.githubusercontent.com/89998/83240358-a763d180-a16f-11ea-9e2f-226f7f197a91.png">

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
### Deploy da Aplicação (Android):
  Para deploy da app para as lojas, solicitar acesso a keystore e as key-informations.
## Erros comuns iOS:

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

# Quem Faz?

O projeto é uma iniciativa da Escola de Saúde Pública do Ceará (ESP), com apoio da Fundação Cearense de Apoio ao Desenvolvimento Científico e Tecnológico (Funcap), por meio do projeto "SMART Health", desenvolvido em parceria com o Grupo de Engenharia de Software Adaptativo e Distribuído (GESAD) da Universidade Estadual do Ceará (UECE).

O criação do aplicativo é uma das ações da Força Tarefa Digital de Combate ao Coronavírus, que estão sendo realizadas de forma aberta para promover a inovação e viabilizar a colaboração em rede.
