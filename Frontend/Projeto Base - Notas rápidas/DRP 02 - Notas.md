# DRP 02 - Notas

> [!important] Resumo
> Notas são a funcionalidade principal da aplicação.
> Cada usuário tem o seu conjunto de notas que podem servir para lembrar de coisas, como notas de aulas, cursos...

Objetivos:

- Permitir aos usuários gerenciar as suas notas

# Contexto

Gerenciamento de notas.

### Hipóteses

- A partir da implementação de Notas serão trabalhados vários conceitos de Frontend
	- Formulários
	- Atualização de itens e diferentes exibições

### Restrições

- Todo as notas serão registradas apenas em Localstorage
- notas com imagens, será necessário verificar como fazer isso de forma local

### Dependências

- Nenhuma

### Dúvidas

- Nenhuma

### Fora do escopo

- Registro externo

### Referências

- [Google Keep](https://keep.google.com/)

# Usuários

- Usuário: usuário autenticado

# Requisitos

**Índice**

- [[#RF 01 - Nova nota]]
- [[#RF 02 - Exibição de todas as notas em Lista]]
- [[#RF 03 - Exibição de todas as notas em Grade]]
- [[#RF 04 - Seleção de nota]]
- [[#RF 05 - Edição de nota]]
- [[#RF 06 - Remoção de nota]]
- [[#RF 07 - Pesquisa por nota]]
- [[#RF 08 - Fixar nota]]
- [[#RF 08.01 - Desafixar nota]]
- [[#RF 09 - Ordenação de notas]]
- [[#RF 10 - Ordenação manual de Notas]]

### RF 01 - Nova nota

__Descrição__
Como usuário quero criar uma nova nota.

#### Critérios de aceite

**Cenário:** 
- **Dado** que o usuário está na página de notas
- **Quando** ele clica em "Nova Nota" e preenche título/conteúdo
- **Então** a nota é salva e aparece na listagem

**Cenários alternativos:**

- **Campo vazio**: Se o título estiver vazio, exibir erro ("Título obrigatório").
- **Limite de caracteres**: Se exceder (ex: 500 caracteres), truncar ou avisar.

### RF 02 - Exibição de todas as notas em Lista

__Descrição__
Como usuário quero ter a opção de ver todas as minhas notas exibidas em lista.

#### Critérios de aceite

**Cenário:** Exibição em lista
- **Dado** que o usuário está na página de notas
- **Quando** está selecionada a opção de exibição por lista
- **Então** todas as notas devem ser exibidas em lista, uma seguida da outra

### RF 03 - Exibição de todas as notas em Grade

__Descrição__
Como usuário quero ter a opção de ver todas as minhas notas exibidas em grade

#### Critérios de aceite

**Cenário:** Exibição em grade
- **Dado** que o usuário está na página de notas
- **Quando** está selecionada a opção de exibição por grade
- **Então** todas as notas devem ser exibidas em grade, com no máximo 3 colunas

### RF 04 - Seleção de nota

__Descrição__
Como usuário quero selecionar uma nota a fim de destacar a nota e conseguir visualizar todas as suas informações.

#### Critérios de aceite

**Cenário:** Seleção de uma nota
- **Dado** que estou na página de exibição de notas
- **Quando** seleciono uma nota
- **Então** ela é trazida em primeiro plano e todas as informações são exibidas em detalhes

**Cenário alternativo:** Seleção de nota removida
- **Dado** que estou logado
- **Quando** coloco o endereço url de uma nota que foi removida
- **Então** deve ser exibida uma mensagem de que a nota foi removida e não existe mais

### RF 05 - Edição de nota

__Descrição__
Como usuário quero poder atualizar o título e conteúdo de uma nota já cadastrada

#### Critérios de aceite

**Cenário:** Edição de nota
- **Dado** que o usuário seleciona uma nota existente
- **Quando** ele altera o texto e salva
- **Então** a nota é atualizada com a nova versão

**Cenários alternativos:**
- **Cancelar edição**: Se clicar em "Cancelar", descartar alterações.

### RF 06 - Remoção de nota

__Descrição__
Como usuário quero poder remover notas para que elas não sejam mais exibidas

#### Critérios de aceite

**Cenário:** Remoção de nota
- **Dado** que estou na tela de notas
- **Quando** seleciono uma nota
- **Então** aparece a opção de remover a nota
- **Quando** eu seleciono a opção remover
- **Então** a nota é removida da exibição

### RF 07 - Pesquisa por nota

__Descrição__
Como usuário quero poder buscar por notas a partir de palavras contidas no título ou no conteúdo.

#### Critérios de aceite

**Cenário:** Busca por palavras
- **Dado** que estou na página de Notas
- **Quando** escrevo uma palavra
- **Então** então apenas notas que tem essa palavra no seu título ou conteúdo são exibidas
- **E** essa palavra é destacada na exibição

**Cenário:** Palavra não existe
- **Dado** que estou na página de Notas
- **Quando** escrevo uma palavra que não existe em nenhuma nota (nem título, nem conteúdo)
- **Então** é exibida uma mensagem de que não foi encontrada nenhuma nota

### RF 08 - Fixar nota

__Descrição__
Como usuário quero ter a opção de fixar uma nota no topo da página de exibição.

#### Critérios de aceite

**Cenário:** Fixar uma nota
- **Dado** que estou na página de notas e seleciono uma nota
- **Quando** seleciono a opção de fixar uma nota
- **Então** ele é movida para o topo da exibição

### RF 08.01 - Desafixar nota

__Descrição__
Como usuário quero ter a opção de desafixar uma nota fixada no topo da página de exibição.

#### Critérios de aceite

**Cenário:** Desafixar uma nota
- **Dado** que estou na página de notas e existe uma nota fixada
- **Quando** seleciona uma opção de desafixar a nota
- **Então** ele é movida para a primeira posição (após as notas fixadas) na exibição de notas

### RF 09 - Ordenação de notas

__Descrição__
Como usuário quero ordenar automaticamente as notas pelos seus atributos ordenáveis.

#### Critérios de aceite

**Cenário:** Ordenação por título
- **Dado** que o usuário está na tela de notas
- **Quando** ele seleciona a opção de ordenação por título
- **Então** as notas são ordenadas de forma alfabética

**Cenário:** Ordenação por título decrescente
- **Dado** que o usuário está na tela de notas
- **E** a opção de ordenação por título foi selecionada
- **Quando** ele seleciona a opção de ordenação por título (novamente)
- **Então** as notas são ordenadas de forma alfabética decrescente

**Cenário:** Ordenação por data de criação
- **Dado** que o usuário está na tela de notas
- **Quando** ele seleciona a opção de ordenação por data de criação
- **Então** as notas são ordenadas da mais recente para a mais antiga

**Cenário:** Ordenação por data de criação decrescente
- **Dado** que o usuário está na tela de notas
- **E** a opção de ordenação por data de criação foi selecionada
- **Quando** ele seleciona a opção de ordenação por data de criação (novamente)
- **Então** as notas são ordenadas da mais antiga para a mais recente

### RF 10 - Ordenação manual de Notas

__Descrição__
Como usuário quero ordenar as notas de forma manual assim posso deixar as notas mais importantes mais destacadas.

#### Critérios de aceite

**Cenário:** Ordenação manual
- **Dado** que estou na tela de notas
- **Quando** seleciono uma nota
- **Então** posso arrastar a nota entre todas as demais exibidas
- **E** soltar ela onde quiser

**Cenário:** Exibição em lista
- **Dado** que estou na tela de notas 
- **E** selecionada a visualização em lista
- **Então** as notas são ordenadas de cima para baixo

**Cenário:** Exibição em grade
- **Dado** que estou na tela de notas 
- **E** selecionada a visualização em grade
- **Então** as notas são ordenadas de cima para baixo, da esquerda para a direita

# Especificação de arquitetura

## Modelagem

### Composição de uma nota

Uma nota é definida pelos seguintes campos:

```js
nota = {
	id: "1",
	title: "Reunião com cliente",
	content: "Discutir requisitos do projeto",
	color: "#FFEE93",
	isPinned: true,
	createdAt: "2024-01-20T10:00:00Z",
	updatedAt: "2024-01-20T10:30:00Z",
};
```

## Requisitos não funcionais

### RNF 01 - Carregamento de grande quantidade de Notas

Para grande quantidade de notas (+100) utilizar técnicas de carregamento de Lazy Loading, onde quando chega na base da página são carregadas mais notas.

# Esboços ou protótipos de UX

#### Alteração entre modos de exibição

Sempre que uma modo novo mode de exibição for escolhido, as notas devem ser organizadas na tela com uma animação mais natural possível.

As notas não devem desaparecer entre os modos de exibição.