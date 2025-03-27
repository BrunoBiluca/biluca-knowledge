# DRP 01 - Catálogo de jogos

> [!important] Resumo
> O usuário deve poder catalogar seus jogos, quais as plataformas que ele possui o jogo, quais as principais características dos jogos e outras informações iniciais do jogo

Objetivos:

- Criar o catálogo de jogos
- Simplificar o processo de catálogo de jogos

Métricas para monitorar:

- Adição de jogos periódicos

# Contexto

Para controlar quais jogos estão sendo jogados é necessário também um catálogo de jogos.

### Hipóteses

- Assumindo que o processo de catálogo de jogos seja simples, essa biblioteca irá crescer constantemente pelos próprios usuários

### Restrições

- Armazenamento online restrito
	- Ainda a definir o local, mas provavelmente será um armazenamento com espaço restrito, então toda otimização de espaço é bem vinda.

### Dependências

- [[DRP 01 - Jogadores]] para a maioria dos requisitos é necessário um persona jogador.

### Dúvidas

- Nenhum

### Fora do escopo

- Integrar com API externa para auxiliar no processo de catálogo
- Garantir integridade do catálogo, como duplicatas. Vamos confiar nos usuários (por enquanto).

### Referências

- Vários outros catálogos de jogos

# Requisitos

### RF 02.01 - Cadastro de jogos

__Descrição__

Como jogador que poder cadastrar jogos para ficarem disponíveis no catálogo.

Informações de um jogo

- Nome
	- Identificador
	- Texto
- Gêneros
	- Lista de textos
	- Pelo menos um gênero deve ser declarado
- Lançamento
	- Número
- Desenvolvedora
	- Texto
	- Será criado um registro de desenvolvedora a partir do nome
- Capa
	- Imagem

__Impacto__

O cadastro de jogos no catálogo irá permitir todas as demais funcionalidades na plataforma.

__Critérios de aceite__

- Deve permitir a submissão de um cadastro de jogo
	- Quando todos os campos obrigatórios foram preenchidos e validados

- Quando o jogador submeter um cadastro de jogo
	- Caso o jogo não exista na base (comparação pelo nome)
		- Deve ser registrado na base
		- Deve ser retornada uma mensagem de confirmação de cadastro
	- Caso o jogo exista na base
		- Deve ser retornada uma mensagem de erro indicando que o jogo já existe


### RF 02.02 - Cadastro de DLCs e conteúdos extras

__Descrição__

__Impacto__

__Critérios de aceite__

- __CA 1__


### RF 02.03 - Visualização dos jogos

__Descrição__

Como visitante quero ver os jogos disponíveis no catálogo.

__Impacto__

Permitir aos visitantes verem o catálogo de jogos castrados pelos jogadores.

__Critérios de aceite__

- __CA 1__

### RF 02.04 - Edição de jogos

__Descrição__

__Impacto__

__Critérios de aceite__

- __CA 1__


# Especificação de arquitetura

### Descrição de estratégias e soluções técnicas


### Diagramas arquiteturais, modelagem, relacionamentos...


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