# DRP - 01

> [!important] Resumo
> Jogadores são o principal usuário da biblioteca de games. 
> 
> Os jogadores querem principalmente rastrear o progresso em seus jogos favoritos e a plataforma deve ajudar os jogadores a conseguir fazer isso. Eles são responsáveis pela maioria das informações da plataforma como cadastro de novos jogos, registro de atividades nos jogos, e etc.

**Objetivos**

- Liberar funcionalidades para os jogadores

**Métricas para monitorar**

- Acessos periódicos a plataforma
- Número de registros de atividade em jogos
- Número de cadastro de novos jogos na plataforma
- Número de alteração em informações de jogos na plataforma

# Contexto

Para alterar qualquer informação dentro do ambiente da biblioteca de games é necessário estar registrado como um jogador.

### Hipóteses

- Jogadores irão submeter informações sobre novos jogos
- Jogadores irão ajustar informações sobre os jogos já contidos na plataforma em caso de erro
- Jogadores irão rastrear o progresso de seus jogos

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
		- Deve informar ao usuário que ele já foi cadastrado
		- Deve redirecionar o usuário a página de autenticação

### RF 01.02 - Esqueceu a senha?

TODO: A definir

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