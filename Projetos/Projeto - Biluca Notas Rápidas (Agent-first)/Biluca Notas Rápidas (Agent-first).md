---
categoria: projeto
ano: 2026
última atualização: 2026-10-27
---
# Biluca Notas Rápidas (Agent-first)

Esse projeto serve para avaliar o paradigma de programação guiado a partir das especificações com o uso de agentes de IA.

> [!info] Links
> 
> - [Repositório]()
> - [Documentação (Obsidian)]()

> [!quote] Referências
>- [[Projeto Base - Notas rápidas]]

## Galeria


## Principais funcionalidades

- 

## Tecnologias

- [[Angular]]
- [[Spec-driven development]]
- [[Github Copilot]]
- [[Github Spec Kit]]

## Motivação

- Avaliar o formato de trabalho com spec driven development
- Avaliar a utilização de Agentes
	- Relação de custo
	- Relação de tempo de desenvolvimento

## Papéis

Nesse projeto eu desempenhei as seguintes funções:

- Idealizador
- Arquiteto
- Product Owner

## Considerações

Esse projeto utilizará o processo de desenvolvimento [[Spec-driven development]] e todo o código será gerado pelos agentes de IA.

A primeira especificação foi bem implementada, consegui deixar mais parecido com o que tinha em mente a partir de alterações na especificação.

Uma dificuldade que tive foi em criar uma interface visual consistente, até agora ele não consegue entender coisas específicas relacionadas a interface.

### Sobre o desenvolvimento

- Não consegui ter o layout desejado, fiz vários prompts e mudanças na especificação, porém o layout ficou como a IA quis me entregar. O layout precisa estar definido na especificação, pelo menos a disposição dos elementos na tela.

- Tempo do desenvolvimento foi rápido comparado com uma implementação tradicional. Todo o projeto deve ter sido feito em coisa de 6-8 horas considerando as várias pesquisas que tive que fazer para conseguir melhorar meus prompts e resultados.

- Utilizei o modo padrão do copilot para escolher o modelo, e a minha experiência é que dependendo do modelo mudava muito a qualidade de entrega e entendimento das especificações.

- Em relação aos tokens eu gastei quase toda minha cota grátis disponível. O que para esse projeto achei muito.

- Sobre as funcionalidades, essa foi a parte mais satisfatória, as funcionalidades foram implementadas de acordo com o especificado.

- Sobre o entendimento de tecnologia, eu senti que foi secundário. Eu especifiquei os elementos principais necessários para o projeto, o que ajudou, principalmente na primeira especificação, como banco de dados e bibliotecas utilizadas. Porém, não sei se caso as minhas escolhas de tecnologias fossem melhores ou piores isso teria um impacto considerável na entrega do resultado final. Como é um projeto simples fica difícil de avaliar. Talvez o próprio agente iria utilizar as bibliotecas que eu indiquei de antemão. Talvez as indicações serviram para otimizar o tempo de pesquisa e avaliação dos modelos.

## Soluções e aprendizados

### Prompts utilizados

#### Constituição

Projeto em Angular na versão mais recente. Para testes utilizar vitest.

Princípios que quero fixar:

- Utilização de sinais como padrão para variáveis dos componentes
- Criação de interfaces para os serviços
- Para serviços os componentes devem sermpre referenciar as interfaces, nunca as implementações
- Toda regra de negócio precisa de um teste unitário
- Nenhuma dependência nova deve entrar sem justificativa
- Para formulários utilizar Forms with signal
- Todo o código deve ser implementado em inglês
- Toda a documentação gerada deve ser em português
- A persistência dos dados deve ser feita utilizando IndexedDB do navegador
- Não será criada nenhuma integração externa
- O código dos componentes deve conter apenas código relacionado a interface com o usuário. Toda manipulação de dados deve ser feita em camadas de serviços.
- NgRx deve ser utilizado para gerenciar o estado da aplicação em memória
- Deve utilizar apenas ngrx/signals para esse projeto

#### Spec: gerenciamento de notas

Uma aplicação que permite ao usuário manter anotações de variados tipos.

Cada usuário tem o seu conjunto de notas que podem servir para lembrar de coisas, como notas de aulas, cursos e outros tipos.

Comportamento esperado:

- O usuário pode criar, editar e remover notas
- O usuário pode adicionar imagens as notas
- O usuário pode abrir uma nota para verificar suas informações de forma detalhada
- Como usuário quero ter a opção de ver todas as minhas notas exibidas em lista e também em grade. Ordenação padrão é pela data de atualização, quanto mais recentemente editada uma nota foi mais no topo ela aparece.
- Como usuário quero poder buscar por notas a partir de palavras contidas no título ou no conteúdo.
- Como usuário quero ter a opção de fixar/desfixar uma nota no topo da página de exibição.
- Como usuário quero ordenar as notas de forma manual assim posso deixar as notas mais importantes mais destacadas.

Modelagem das notas:

**Campos obrigatórios:** título

**Campos opcionais:** conteúdo em texto, cor de fundo

**Campos preenchidos automaticamente:**
- id: cria quando a nota é criada
- criado em: quando a nota foi criada
- atualizado em: mesmo valor do criado em
- user_id: id do usuário autenticado

Requisitos não funcionais:

- Para grande quantidade de notas (+100) utilizar técnicas de carregamento de Lazy Loading, onde quando chega na base da página são carregadas mais notas.
- A lista ou grade de notas deve apresentar apenas as informações de título, conteúdo de texto e imagens, quando o usuário passa com o mouse por cima, ai então que as ações de edição, remoção e etecetera são exibidas.

#### Definição do plano

Deve utilizar Angular 22.
Testes com Vitest.

Decisões que quero registradas com justificativa:

- Utilização do Angular CDK já que apresenta vários recursos disponíveis como é o caso do Drag n Drop que vamos utilizar para ordenar manualmente as notas
- Utilização do NgRx/signals para gerenciamento de estado da aplicação
- Para a persistência de dados será utilizado o IndexedDB do próprio navegador, como base o Google Chrome, já que a aplicação será utilizada localmente apenas
- Serviços devem ser utilizados para acessar os dados
- Todos os serviços devem ter uma interface para que possamos adicionar integrações futuros, como por exemplo, um banco de dados externo.
- Componentes implementam apenas a interação direta com o usuário

#### Melhoria visual 1

Alterar a especificação atual para definir restrições em relação a UI.

Para a UI irei utilizar como base o Angular Material Design v3.

A página principal é composta por:

- Uma barra de navegação superior com os seguintes elementos da esquerda para a direita:
    
    - no canto esquerdo um toggle de visualização em grade e em lista, um botão de ícone que define o formato de ordenação
    - uma caixa de pesquisa no centro
- Logo abaixo da barra de navegação vem o formulário de criação da nota
    
- Abaixo bem a exibição das notas já criadas, elas são separadas em duas seções:
    
    - Notas fixadas
    - Notas livres
- Cada nota é exibida como um card com a cor de fundo selecionada, caso não exista nenhuma cor de fundo, deve ser transparente
    
    - As imagens da nota devem ser exibidas acima do título da nota. Nenhum padding deve ser exibido para as imagens.
    - Estado de Hover: deve sombrear levemente e apenas nesse momento são exibidos as ações de controle da nota, como editar, mover e remover
        - O drag n drop deve ser feito quando o usuário clica e arrasta o mouse em qualquer local da nota, não em um botão exclusivo
        - Todos os comandos devem ser alterados para utilizarem um ícone que demonstre a sua inteção, por exemplo, editar deve ser o ícone de lapis.

Detalhe da nota deve ser exibido como uma modal.

#### Nova spec: Temas

Adicione a possibilidade de utilizar temas (escuro, claro, definido pelo sistema) ao projeto. 

Casos de uso:
O usuário irá selecionar o tema em um botão ícone (localizado no lado direito da barra de navegação superiora) que irá abrir um drop down menu com as opções possível.

Fora do escopo: temas de terceiros. 

Requisitos: Todas as funcionalidades devem ser mantida, o tema selecionado deve garantir que as notas continuam sendo visíveis.

Futuras possibilidades: adicionar outros temas ao projeto. 