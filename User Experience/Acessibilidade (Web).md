# Acessibilidade (Web)

Os princípios para acessibilidade são abordagens que ajudem a **antecipar, incluir e responder as necessidades dos indivíduos**.

Experiências universais dificilmente irão dar respostas as necessidades de todos. Introduzir funcionalidades personalizadas por melhorar a adaptação individual. Por exemplo, permitir a configuração de um controle num jogo de luta permite que cada pessoa encontre a forma que mais se identifica ao jogar.

> [!important] Acessibilidade para web
> [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/) define uma série de guias para padronização da acessibilidade para conteúdos disponíveis na Web.

## Tecnologia assistiva

Tecnologia assistiva ajuda a aumentar, manter, ou melhorar as capacidades funcionais de indivíduos com deficiência.

Formas de tecnologias assistivas:

- teclado
- leitores de tela
- switch input

## Marcação de acessibilidade

A marcação de acessibilidade (ou _markup_) baseia-se no uso correto do **HTML semântico** e de atributos [[ARIA roles]] (Accessible Rich Internet Applications). Isso permite que leitores de tela e tecnologias assistivas compreendam a estrutura, o estado e a função dos elementos na sua página.

Usar os elementos nativos da plataforma aproveita o conhecimento do usuário para conseguir uma navegação mais consistente. Usar elementos não-padronizados exige testes extras para atender as necessidades de acessibilidade.

## Cor e contraste

Cor e contraste ajudam os usuários a interpretar o conteúdo da aplicação e interagir com os elementos certos.

As relações de contraste representam o quão diferente uma cor é de outra cor, comumente escrita como 1:1 ou 21:1. Quanto maior a diferença é entre os dois números na proporção, maior a diferença de luminância relativa entre as cores.

O W3C recomenda os seguintes contrastes para texto corporal e texto de imagem:

| Text type                                                    | Color contrast ratio                  |
| ------------------------------------------------------------ | ------------------------------------- |
| Large text (at 14 pt bold/18 pt regular and up) and graphics | At least 3:1 against the background   |
| Small text                                                   | At least 4.5:1 against the background |

Alguns **elementos não textuais**, como contêineres de botão, devem atender a uma relação de contraste de 3:1 entre a cor do contêiner e a cor do fundo.

## Navegação

A navegação pode ter fluxos de tarefas claros com etapas mínimas, controles fáceis de localizar e rotulagem clara. O controle de foco, ou a capacidade de controlar o teclado e o foco de leitura, pode ser implementado para tarefas frequentemente usadas.

Para transmitir o nível relativo de importância de um item:

- Coloque ações importantes na parte superior ou inferior da tela (alcançável com atalhos)
- Coloque itens relacionados de uma hierarquia semelhante um ao lado do outro

### Hierarquia visual

A hierarquia visual da aplicação deve determinar o fluxo que o usuário irá ler as informações na tela. Isso deve ser levado em consideração durante o desenvolvimento, já que o código da página criado é o que irá permitir que leitores de tela façam algum sentido.

Ao **classificar e rotular seções de uma página** ([[ARIA roles]]), as informações estruturais que são transmitidas visualmente através do design do layout também podem ser representadas em código.

![[mapeamento de área em uma página.png|Mapeamento de área em uma página]]

### Hierarquia de cabeçalhos

Adicionar uma **hierarquia clara de cabeçalhos** também ajuda o usuário a navegar e tomar ações.

- Identify headings based on content hierarchy, rather than visual styling
- Headings should not skip a level, for example, don't go from H2 to H4 without using an H3 
- Map content on your pages to headings (H1–H6) in sequential order based on the hierarchy of your content
- A single H1 for the page title is recommended

## Tamanhos

Definir guias para o tamanho dos elementos de uma aplicação ajuda os usuários que não conseguem enxergar bem a tela ou que apresentam alguma dificuldade para apertar pequenos alvos.

### Tamanhos para elementos de toque ou ponteiro (mouse click)

Os alvos de toque são as partes da tela que respondem à entrada do usuário, estendendo-se além dos limites visuais de um elemento. Por exemplo, um ícone pode parecer ser 24 x 24dp, mas o preenchimento ao seu redor compreende o alvo de toque completo de 48 x 48dp.

Para a maioria das plataformas, considere fazer alvos de toque pelo menos 48 x 48dp e 44 x 44dp para alvos de ponteiro.

Manter a consistência entre todos os elementos de toque ou ponteiro evita erros do usuário.

### Espaçamento

Na maioria dos casos, alvos separados por 8dp de espaço ou mais promovem densidade e usabilidade de informações equilibradas.

## Fluxo

As pessoas devem ser capazes de navegar e interagir com o seu aplicativo **sem o uso de um mouse tradicional ou tela sensível ao toque**. Para suportar a navegação por teclado, leitor de tela ou outra tecnologia assistiva, os objetivos devem ser alcançáveis usando guia, seta e outras teclas de navegação comuns.

Simplifique seus fluxos por: 

- Estrategicamente ordenando paradas de foco (uso do Tab)
- Reduzir a complexidade geral da página

> [!tip] Foco
> Focus refere-se a qual controle é atualmente o alvo ativo das interações do usuário, como cliques do mouse ou toques de teclado.

Determinando o fluxo da aplicação:

1. Agrupe casos de uso por funcionalidade ou produto.

2. Defina um foco inicial e nível de foco para os componentes

3. Defina qualquer travessia atípica entre as páginas e componentes
	- **Tab e Tab + Shift** são utilizados para navegação entre componentes
	- **Arrow keys** são utilizados dentro do componente
	- **Enter** ativa uma função, como apertar um link ou botão, ou enviar um formulário
	- Os atalhos de teclado devem usar uma combinação de duas ou mais teclas por padrão.

4. Eduque seu usuário
	- Inclua um tutorial, lista ou página de centro de ajuda de todos os atalhos de teclado personalizados em seu produto. Por exemplo, Cmd+Z (Ctrl+Z) para desfazer a exclusão de um evento no Google Calendar.