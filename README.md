# App iSUS

Esse é o repositório do aplicativo iSUS.

<img src="https://user-images.githubusercontent.com/89998/83240358-a763d180-a16f-11ea-9e2f-226f7f197a91.png">

- [App iSUS](#app-isus)
  - [O que é?](#o-que-é)
  - [Start do Projeto.](#start-do-projeto)
    - [Usando Android](#usando-android)
    - [Usando o iOS](#usando-o-ios)

## O que é?

O iSUS é um produto digital criado para ser um cinto de utilidades e apoiar os profissionais do Sistema Único de Saúde (SUS) no combate ao Covid-19, diante de desafios de urgência, emergência e proteção à vida.

Desenvolvido em meio à pandemia do novo coronavírus, responde à demanda de relacionamento entre usuários, trabalhadores e gestores do SUS.

O objetivo é entregar informações, serviços e oportunidades, de forma automatizada, personalizada e segura, na palma da mão dos profissionais, otimizando seu tempo e apoiando a tomada de decisões baseadas em dados e evidências científicas.

Para mais informações, acesse [a nossa wiki](https://github.com/EscolaDeSaudePublica/isus-app/wiki). Acesse também o [nosso Board](https://github.com/orgs/EscolaDeSaudePublica/projects/20)

## 🚀 Start do Projeto

- Após baixar o projeto, certifique se você está na branch develop, em seguida instale as dependências usando:

```bash
 yarn install
```

- Crie o arquivo `.env` como cópia do `.env.example` e insira o valor das variáveis de ambiente necessárias (peça-as a alguém do time).

```bash
 cp .env.example .env
```

- Crie o arquivo `.env.dev` como cópia do `.env.dev.example` e insira o valor das variáveis de ambiente necessárias (peça-as a alguém do time).

```bash
 cp .env.dev.example .env.dev
```

### 🤖 Usando Android

- Com o Android Studio e o Java SDK previamente instalados, digite o seguinte comando:

```bash
yarn android

```

### 🍎 Usando o iOS

- Com o XCode baixado no sistema e o cocoapods, entre na pasta do iOS no projeto e instale as dependências do Cocoapods:

```bash
  pod install
```

```bash
  yarn ios
```
