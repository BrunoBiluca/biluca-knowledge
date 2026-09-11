# Organização do projeto

Aqui quero apresentar uma organização de projetos geral para [[Frontend]]. O objetivo é deixar a navegação da aplicação da forma mais simples, isso só é possível se a organização das pastas e arquivos representarem bem a intenção do projeto.

## Princípios

### Agrupar por funcionalidade em vez de por tipo

A organização das pastas e arquivos devem representar o **conteúdo do projeto.**

```
src/
├─ movie-reel/
│ ├─ show-times/
│ │ ├─ film-calendar/
│ │ ├─ film-details/
│ ├─ reserve-tickets/
│ │ ├─ payment-info/
│ │ ├─ purchase-confirmation/
```

**Evitar pastas genéricas** como `components`, `directives` ou `services`, já que elas agrupam vários elementos que não tem nenhuma relação funcional entre si. Estas pasta podem existir dentro de elementos do projeto específicos, como por exemplo um formulário que pode ser desejável ser quebrado em múltiplos componentes que são utilizados apenas nesse relatório.

### Elementos genéricos globais

Aproveitar da pasta `common` para declarar elementos que perpassam toda a aplicação.

Aqui é um bom lugar para implementar o **Design System** seguido pela aplicação.

### Um conceito por arquivo

Cada arquivo deve representar um conceito dentro do projeto

## Pastas recomendadas

Principais pastas na raiz do projeto:

```
├─ ✨ app
├─ 🔐 auth
├─ 📦 common
|  ├─ 💻 lib
|  ├─ 📱 ui
├─ 💖 core
├─ 🔗 integrations
├─ 🛠️ testing
```

![[Organização do projeto - Diagrama|Diagrama de relações das pastas do projeto]]

Para esse tipo de organização é necessário utilizar [[Injeção de dependências]] como base para evitar acoplamento entre as camadas. A raiz do projeto é responsável por injetar as dependências necessárias.

### app

App é a pasta que implementa todas as funcionalidades do projeto, ou seja, ela define como as regras de negócio serão apresentadas para o usuário.
### auth

Auth implementa todo o sistema de autenticação e autorização do usuário.

### common

Common é a pasta genérica do projeto, nela está contido todo o código reutilizado nas funcionalidades da aplicação.

Podemos sub-dividir essa pasta em outras por caso de uso:

- `data` para algoritmos relacionados a processamento de dados
- `lib` algoritmos gerais e funções puras
- `ui` componentes genéricos como campos de formulários, cards, tabelas.

### core

Core é o núcleo do projeto é a **camada mais abstrata** que define as regras de negócio do projeto. Ter uma pasta específica para isso garante a centralidade dessas regras.

Essa é a pasta que define as interfaces, classes abstratas, modelagem dos dados, integração entre funcionalidades, validações, gerenciadores de estado.

### integrations

É nessa pasta que vamos implementar o código responsável por comunicar com serviços externos.

Geralmente cada elemento aqui implementa uma interface definida na pasta `core`

### testing

Nessa pasta definimos todas as nossas ferramentas de desenvolvimento. Coisas como depuradores, classes mocks, código de testes, [[Modo Standalone]] são definidos aqui.