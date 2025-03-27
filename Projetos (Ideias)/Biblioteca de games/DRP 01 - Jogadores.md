# DRP - 01

> [!important] Resumo
> Jogadores são o principal usuário da biblioteca de games, eles são responsáveis pela maioria das informações da plataforma e utilizam dessas informações.

Objetivos:

- Liberar funcionalidades para os jogadores

Métricas para monitorar:

- Acessos periódicos a plataforma

# Contexto

Para alterar qualquer informação dentro do ambiente da biblioteca de games é necessário estar registrado como um jogador.

### Hipóteses

- Permitir que jogadores sejam registrados eles irão submeter informações diversas a plataforma.

### Restrições

- Sistema de autenticação gratuito

### Dependências

- Nenhuma

### Dúvidas

- Nenhuma

### Fora do escopo

- Integrações a vários outros sistemas

### Referências

- Qualquer website

# Requisitos

### RF 01.01 - Registro

__Descrição__

Como visitante quero poder me registrar para ter acesso as funcionalidades de jogadores.

Informações necessárias para o registro:

- Nome
	- Texto
- Email
	- Identificador
	- Texto
- Senha
	- Texto
	- Deve ser criptografado

__Impacto__

Permite ao visitante se autenticar como jogador e ter acesso a várias outras funcionalidades do portal.

__Critérios de aceite__

- Quando o visitante submete informações válidas
	- Se ele não existe na base
		- Deve ser criado
		- Deve ser redirecionado para a página personalizada
	- Se ele já existe na base
		- Deve ser autenticado

### RF 01.02 - Esqueceu a senha?

__Descrição__

__Impacto__

__Critérios de aceite__

- __CA 1__

### RF 01.03 - Autenticação

__Descrição__

Como visitante que já tem uma conta registrada quero poder fazer o login para acessar as funcionalidades de jogador.

__Impacto__

Permite ao visitante se autenticar como jogador e ter acesso a várias outras funcionalidades do portal.

__Critérios de aceite__

- Quando o visitante submete suas informações de autenticação
	- Se ele está registrado
		- Deve retornar exibir a informação que ele foi logado com sucesso
		- Ele deve ser redirecionado para sua página principal
	- Se ele não estiver registrado
		- Deve redirecionar o visitante para conseguir fazer o registro

### RF 01.04 Página inicial do Jogador

__Descrição__

Como jogador quero ter uma visão personalizada para acessar meus jogos

__Impacto__

A partir do momento que o jogador está logado, ele deve partir da sua página personalizada.

__Critérios de aceite__

- Quando o jogador acessa a sua página principal deve ser exibido o nome dele

# Especificação de arquitetura

Para a autenticação um forma gratuita de implementação é utilizar a plataforma da [supabase](https://supabase.com/auth).

Essa plataforma já disponibiliza vários provedores de autenticação sendo uma boa pedida para poucos usuários.

[Documentação](https://supabase.com/docs/guides/auth)

## Requisitos técnicos


## Requisitos não funcionais


# Qualidade

- __Definição de Pronto__
- __Planos de testes__

# Esboços ou protótipos de UX

- Tela: nome da tela
- Imagem da tela
- Explicação de cada elemento da tela
- Explicação dos comportamentos da tela