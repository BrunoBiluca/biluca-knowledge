# Projeto - Agenda da Breja - React

> [!info] Links
> - [Repositório](https://github.com/BrunoBiluca/biluca-agenda-breja-react)
> - [[Projeto Base - Agenda da Breja]]

Agenda da Breja é um projeto para exercitar algumas tecnologias relacionadas ao desenvolvimento de aplicações web utilizadas por usuários gerais.

Tecnologias utilizadas

- [[React]] para o desenvolvimento da camada de interação com os usuários
	- [[Vite]] para gerenciamento de pacotes
	- [[React/Vitest|Vitest]] como biblioteca de testes automatizados

- [[Supabase]] como um serviço de backend para armazenamento de informações da aplicação e autenticação de usuários

- [[Vercel]]

## Considerações sobre as tecnologias

### React

### Vite

### Vitest

### Supabase

### Vercel


## Considerações sobre o Projeto

Os objetivos levantados no projeto base foram atendidos?


### Investigações futuras

- Injeção de dependências em React
	- Buscar uma forma de fazer uma injeção de dependência completa, com um container de instâncias, passagem de parâmetros nos construtores, ou um [[Injeção de dependências]]
	- Ou entender porque não é utilizado e qual outro padrão a seguir para gerenciar estado.
	- Visto que Angular, Flutter e frameworks backend já estão todos utilizanod DI como prática



## Principais aprendizados

### Utilização de modo Standalone (Positivo)

Modo standalone é uma alternativa para o desenvolvimento. Esse modo visa ter uma representação da interação do usuário de forma mais significativa sem a necessidade de nenhum outro serviço operante.

Nesse modo implementamos versões simuladas das interações do usuário, como por exemplo, no caso do login foram implementados emails de login predefinidos, lista de cervejarias já definidas.

Acredito ser um ótimo modo para testar o fluxo da aplicação, até porque temos mais controle como desenvolvedores de como queremos que esse fluxo seja. Além disso, podemos demonstrar funcionalidades mais complexas para outros participantes do projeto.

### Injeção de dependências a partir do Contexto (Limitação)

Como descrito em [[Hooks]] o contexto é utilizado para definir estado levantado em consideração a árvore de componentes, ou seja, classes puras de javascript não tem acesso aos contextos. Assim, não temos um serviço de injeção de dependências completo, precisando utilizar referências globais para classes puras.

