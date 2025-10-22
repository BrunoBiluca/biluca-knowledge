# Projeto Base - Agenda da Breja

Título: Agenda da Breja

O usuário irá poder marcar suas próximas visitas as cervejarias cadastradas.

API de cervejarias:
[https://api.openbrewerydb.org/v1/breweries/](https://api.openbrewerydb.org/v1/breweries/)

## Conceitos abordados

### Frontend

Mesmo que o processo seja bem simples ele aborda os seguintes conceitos focados no Frontend:

- Renderização de listas
	- Manipulação individual
	- Manipulação grupal

- Responsividade
	- Atender requisitos para telas pequenas e grandes

- Navegação
	- Gerenciar acesso de acordo com papéis do usuário
	- Mudança de contexto de acordo com as informações (ex: lista de coisas e a própria coisa)
	- Navegação direta para alguma entidade do projeto

- Manipulação de dados
	- Formulário simples
	- Atualização de informações na tela de forma reativa

- Integração com serviços externos
	- Fazer requisições HTTP

- Gerenciamento de estado
	- Local (nível de componente)
	- Global (nível de aplicação)

### Banco de dados

- Armazenamento de informações

- Relacionamento de dados

### Serviço de autenticação

- Autenticação do usuário
- Registro de usuários
- Persistência de sessão do usuário
- Logout de usuário

### Hospedagem

- Configuração da aplicação a partir de variáveis de ambiente para conexão ao banco de dados

- Disponibilidade de serviço.

- Conteinerização

### Gerais de projeto

Conceitos mais gerais do desenvolvimento de software:

- Modularizarão
- Separação de responsabilidades
- Coesão
- Capacidade de refatoração
- Testabilidade

## Requisitos

### 01 - Listagem das cervejarias

__Descrição__
Serão exibidos todos as cervejarias disponíveis na API de cervejarias

- Indicador de carregamento em formato de esqueleto

- Carregar mais
	- Serão exibidas 10 cervejarias por vez
	- `GET https://api.openbrewerydb.org/v1/breweries?page=15&per_page=3`

- Cartões para cada cervejaria

__Impacto__

- Integração com serviços externos
- Renderização de cards, imagens e outros componentes
- Gerenciamento de estado local

### 02 - Detalhes da cervejaria

__Descrição__
Quando uma cervejaria é clicada é aberta uma modal de detalhes da cervejaria para exibir todas as suas informações.

Esse modal é exibido em primeiro plano.

__Impacto__

- Navegação
- Renderização

### 03 - Agendamento de visita

__Descrição__
Na tela de cervejaria o usuário pode selecionar para marcar uma visita.

Campos necessários
- Cervejaria
- Data da visita
	- Validações
		- Apenas datas posteriores são válidas

Campos opcionais
- Pessoas
	- Pessoas cadastradas em outras visitas aparecem como opções para novas visitas
	- [[#Preenchimento da galera]]
- Observações

__Impacto__

- Validação de formulários
- Navegação

### 04 - Visitas agendadas

__Descrição__
Carregar todas as visitas agendadas pelo usuário ordenadas da mais recente até a a mais distante.

__Impacto__

- Renderização de lista
- Carregamento de informações

### 05 - Sem visitas agendadas

__Descrição__
Exibir quando usuário não tem nenhuma visita agendada.

__Impacto__

- Renderização condicional

### 06 - Remoção de visitas

__Descrição__
Usuário pode remover visitas da tela inicial e deve atualizar a lista automaticamente

__Impacto__

- Renderização de componentes reativa

### 07 - Registro do usuário

__Descrição__
Usuário pode querer se registrar para utilizar a plataforma.

__Impacto__

- Roteamento de páginas
- Guarda de páginas (usuário está ou não logado)

### 08 - Login do usuário

__Descrição__
Usuário que já tem registro no site pode querer voltar a plataforma.

__Impacto__

- Roteamento de páginas
- Guarda de páginas (usuário está ou não logado)

### 09 - Logout

__Descrição__
Usuário deve ter a possibilidade de sair da plataforma a qualquer momento.

__Impacto__

- Roteamento de páginas
- Guarda de páginas (usuário está ou não logado)


## Requisitos não funcionais

### Isolar serviços de consultas externas

Todas as consultas externas devem ser isoladas em seus respectivos serviços.

Apenas um lugar deve implementar uma requisição.

Simular um delay de carregamento para testar indicador de carregamento.

### Exibição de imagens das cervejarias

Utilizar algum site aberto de imagens para exibir aleatórias na lista de exibição de imagens.

### Gerenciamento de dados de visitas

As visitas serão cadastradas em um banco de dados.

Modelo da visita:

```json
{
	"id": uuid,
	"cervejaria": id da cervejaria,
	"data_visita": date,
	"observações": texto grande,
	"galera": list[string] 
}
```

Galera:

```
{
	"user": uuid,
	"pessoa": string
}
```

### Preenchimento da galera

A galera é preenchida automaticamente por pessoas previamente convidadas em vistas a cervejarias.

São buscadas todas as pessoas relacionadas ao usuário que está cadastrando a visita.

### Página protegidas

As páginas internas da aplicação devem ser protegidas e apenas acessadas por usuários logados.

### Testes automatizados

A aplicação deve ser desenvolvida aplicando o conceito de TDD.

### Publicação

Essa aplicação deve estar disponível publicamente.