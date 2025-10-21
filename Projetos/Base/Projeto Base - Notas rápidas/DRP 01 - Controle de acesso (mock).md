# DRP 01 - Controle de acesso (mock)

> [!important] Resumo
> Controle de acesso permite ao usuário registrado interagir com a a plataforma de Notas.
> Nada pode ser feito sem acesso.

Objetivos:

- Liberar funcionalidades para o usuários

# Contexto

O controle de acesso garante que o usuário está registrado na plataforma antes de interagir com ela.

### Hipóteses

- A partir da implementação de controle de acesso (mock) será possível trabalhar esse conjunto de habilidade para o uso em sistemas reais futuros
- Conjunto de habilidades trabalhadas
	- Fluxos de autenticação (rotas)
	- Tratamento de erros
	- Manipulação de formulários
	- Gerenciamento de estado global

### Restrições

- O controle de acesso será feito a partir de configurações pré-configuradas no próprio projeto.

### Fora do escopo

- Qualquer tipo de integração com serviços reais

# Usuários

- Usuário não registrado
- Usuário registrado não autenticado
- Usuário autenticado

# Requisitos

### RF 01.01 - Cadastro de usuário

__Descrição__
Eu como usuário não registrado quero poder me registrar para conseguir fazer o Login.

Informações obrigatórias:

- Nome
- Email
- Password

Informações adicionadas automaticamente:

- Criado em: quando o registro foi feito

Informações que definem um formulário inválido:
- Qualquer um dos campos obrigatórios vazio
- Formato de email inválido
- Senha com menos de 6 dígitos

#### Critérios de aceite

- **Cenário:** Sucesso
	- Dado que o usuário está na página de cadastro
	- Quando ele entra com um formulário válido
	- Então ele pode ser registrado
	- E é redirecionado a página de Login

- **Cenário:** Formulário inválido
	- Dado que o usuário apresentou informações inválidas no formulário
	- Quando ele submete o formulário
	- Então são apresentadas mensagem de erro para cada informação independentemente

- **Cenário alternativo:** Já existe usuário com esse username
	- Dado que o usuário apresentou um username
	- Quando ele já existe
	- Então deve ser apresenta uma mensagem indicando que o username já existe

### RF 01.02 - Login

__Descrição__
Eu como usuário registrado quero poder logar ao site para começar a interagir com o mesmo com meu email e senha.

#### Critérios de aceite

**Cenário:** Sucesso
- Dado que o usuário está na página de login
- Quando ele entra com seu email e senha
- Então ele é redirecionado para a página de entrada configurada

**Cenário:** Credenciais incorretas
- **Dado** que o usuário está registrado (a partir do email)
- **Quando** ele entra com a senha incorreta
- **Então** é exibida uma mensagem explicitando o problema

**Cenário:** Usuário não existe
- **Dado** que o usuário não existe (email não encontrado)
- **Quando** quando ele as credenciais
- **Então** é exibida uma mensagem explicitando o problema
- **E** é dada a opção de fazer o cadastro, utilizando dados já preenchidos

### RF 01.03 - Logout

__Descrição__
Como usuário autenticado quero poder deslogar da plataforma a qualquer momento

#### Critérios de aceite

**Cenário:** Deslogar de qualquer página
- **Dado** que estou em qualquer página da aplicação
- **Quando** escolho a opção de deslogar
- **Então** sou redirecionado para a página de login
- **E** é exibida a mensagem que fui deslogado
### RF 04 - Rota protegida com usuário não autenticado

__Descrição__
Como usuário não logado sou redirecionado para a tela de login

#### Critérios de aceite

**Cenário:** 
- **Dado** que o usuário não está autenticado
- **Quando** ele tenta acessar uma rota protegida (ex: `/dashboard`)
- **Então** ele é redirecionado para `/login` com uma mensagem ("Faça login primeiro")

# Especificação de arquitetura

## Requisitos não funcionais

### RNF 01 - Rotas da aplicação são protegidas

Usuário não autenticados não devem ter acesso a rotas internas da aplicação.

Rotas acessadas por qualquer usuário:

- Login
- Cadastro de usuário

Demais rotas são protegidas, o usuário deve então ser direcionado para a tela de login caso tente acessar qualquer outra rota.

#### Critérios de aceite

**Cenário:** 
- **Dado** que o usuário não está autenticado
- **Quando** ele tenta acessar uma rota protegida (ex: `/dashboard`)
- **Então** ele é redirecionado para `/login` com uma mensagem ("Faça login primeiro")
# Esboços ou protótipos de UX

> [!warning] Atualizar após a implementação, servirá de referência
