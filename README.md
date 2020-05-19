# App iSUS
### v2.3.0

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

# Design
### Design de Interfaces:
Para consultar o Projeto da Interface, acessar: https://www.figma.com/file/FLKurtBDSBYAiYcS5xAPYC/mockup?node-id=0%3A1

### Design Job Pipeline:
Para consultar o Controle das Atividades, acessar: https://airtable.com/shrIaMWhqdW48mz5t

### Design Backlog:
Para consultar o Controle do Backlog do Time de Design, acessar: https://airtable.com/shr5uuRvxUWgMYpQG

# Erros comuns iOS:

### xcrun: error: SDK "iphoneos" cannot be located
https://www.ryadel.com/en/xcode-sdk-iphoneos-cannot-be-located-mac-osx-error-fix/

### Error: EMFILE: too many open files, watch at FSEvent.FSWatcher._handle.onchange (internal/fs/watchers.js:129:28)
https://stackoverflow.com/questions/58675179/error-emfile-too-many-open-files-react-native-cli
