# DRP 04 - Categorização de Notas

> [!important] Resumo
> Categorizar notas permitem aos usuários organizar melhor a exibição.


Objetivos:

- Categorizar notas para melhorar a exibição, permitindo organização por contexto.

# Contexto

### Hipóteses

- A partir da implementação de categorias conceitos mais complexos de agrupamento podem ser explorados
- A implementação de categorias irá permitir a prática de conceitos mais avançados de gerenciamento de estado.
	- Isso porque é uma estrutura que envolve várias notas simultaneamente.

### Restrições

- Todas as informações são armazenadas apenas localmente

### Dependências

- [[DRP 02 - Notas]]
	- Irá servir como base para as categorias

### Fora do escopo

- Armazenamento externo

### Referências

- Tags do Notion

# Usuários

- Usuário: usuário autenticado

# Requisitos

### RF 01 - Atribuição de categoria a Nota

__Descrição__
Como usuário quero ter a opção de categorizar uma nota com uma tag específica a fim de aplicar mais uma forma de informação para categorizar a nota.

#### Critérios de aceite

**Cenário:** Atribuição de categoria da Nota
- **Dado** que estou no formulário de criação/edição de Nota
- **Quando** quando entro com uma categoria
- **Então** essa nota é cadastrada com a categoria definida

**Cenário:** Atribuição de categoria existente na Nota
- **Dado** que estou no formulário de criação/edição de Nota
- **Enquanto** adiciono caracteres na entrada
- **São** exibidas as categorias com o mesmo conjunto de caracteres
- **E** tenho a possibilidade de escolher uma das categorias exibidas

### RF 02 - Agrupamento por categoria

__Descrição__
Como usuário quero aplicar uma nova exibição das notas pelas categorias a fim de facilitar o agrupamento de notas relacionadas

#### Critérios de aceite

**Cenário:** Agrupamento por categoria
- **Dado** que estou na página de notas
- **Quando** seleciono a opção de agrupar por notas
- **Então** a exibição é alterada para o agrupamento seguindo o tipo de exibição selecionado

**Cenário:** Desagrupamento por categoria
- **Dado** que estou na página de notas
- E já está selecionada a opção de agrupamento
- **Quando** seleciono a opção de agrupar por notas
- **Então** a exibição é alterada para o formato livre

### RF 03 - Exibição das categoria

__Descrição__
Como usuário quero visualizar todas as categorias cadastradas para poder fazer o controle.

#### Critérios de aceite

**Cenário:** Exibição de categorias
- **Dado** que estou na página de Notas
- **Então** vejo todas as categorias atribuídas a notas e quantas notas estão associadas

### RF 04 - Remoção de categoria

__Descrição__
Como usuário quero remover uma categoria cadastrada a fim de eliminar categorias que não utilizo mais e simplificar o meu gerenciamento de notas.

#### Critérios de aceite

**Cenário:** Remoção de categoria
- **Dado** que estou na página de notas
- **Quando** seleciono uma categoria para ser removida
- **Então** todas as notas são atualizadas para notas sem categorias selecionadas


### RF 05 - Filtro

__Descrição__
Como usuário quero poder selecionar uma única categoria a fim de visualizar apenas notas dessa categoria.

#### Critérios de aceite

**Cenário:** Filtro por categoria
- **Dado** que estou a página de notas
- **Quando** seleciono uma categoria para filtrar
- **Então** então apenas notas associadas a essa categoria são exibidas
- **E** a categoria selecionada é destacada

**Cenário:** Remoção de filtro de uma categoria selecionada
- **Dado** que estou na página de notas
- **E** já existem categorias como filtro
- **Quando** seleciona a opção de limpar o filtro referente apenas a essa categoria
- **Se** existem mais categorias selecionadas
	- **Então** então apenas as notas dessa categoria não são mais exibidas
- **Se não** existem mais categorias selecionadas
	- **Então** todas as notas são exibida

**Cenário:** Remoção dos filtros
- **Dado** que estou a página de notas
- **E** já existe uma categoria selecionada como filtro
- **Quando** seleciono a opção de limpar os filtros
- **Então** então todas as notas são exibidas

# Especificação de arquitetura

## Modelagem

### Composição de uma categoria

Um categoria tem os seguintes campos:

```js
categoria = {
	nome: "categoria A",
	criada_em: date
}
```

Relação com uma Nota:

```js
nota = {
	...nota,
	categoria = categoria | undefined
};
```

## Requisitos não funcionais

### RNF 01 - Atualização da exibição

A atribuição ou remoção de categorias devem refletir automaticamente na exibição das notas.

# Qualidade



# Esboços ou protótipos de UX

#### Exemplo de formulário para adição de categorias

![[Exemplo de adição de categorias a uma nota.png|Exemplo de adição de categorias a uma nota]]