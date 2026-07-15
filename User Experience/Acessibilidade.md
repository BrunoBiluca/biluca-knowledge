# Acessibilidade

Os princípios para acessibilidade são abordagens que ajudem a **antecipar, incluir e responder as necessidades dos indivíduos**.

Experiências universais dificilmente irão dar respostas as necessidades de todos. Introduzir funcionalidades personalizadas por melhorar a adaptação individual. Por exemplo, permitir a configuração de um controle num jogo de luta permite que cada pessoa encontre a forma que mais se identifica ao jogar.

> [!important] Acessibilidade para web
> [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/) define uma série de guias para padronização da acessibilidade para conteúdos disponíveis na Web.

### Tecnologia assitiva

Tecnologia assistiva ajuda a aumentar, manter, ou melhorar as capacidades funcionais de indivíduos com deficiência.

Formas de tecnologias assistivas:

- teclado
- leitores de tela
- switch input

### Marcação de acessibilidade

A marcação de acessibilidade (ou _markup_) baseia-se no uso correto do **HTML semântico** e de atributos **ARIA** (Accessible Rich Internet Applications). Isso permite que leitores de tela e tecnologias assistivas compreendam a estrutura, o estado e a função dos elementos na sua página.

Usar os elementos nativos da plataforma aproveita o conhecimento do usuário para conseguir uma navegação mais consistente. Usar elementos não-padronizados exige testes extras para atender as necessidades de acessibilidade.

### Cor e contraste

Cor e contraste ajudam os usuários a interpretar o conteúdo da aplicação e interagir com os elementos certos.

As relações de contraste representam o quão diferente uma cor é de outra cor, comumente escrita como 1:1 ou 21:1. Quanto maior a diferença é entre os dois números na proporção, maior a diferença de luminância relativa entre as cores.

O W3C recomenda os seguintes contrastes para texto corporal e texto de imagem:

| Text type                                                    | Color contrast ratio                  |
| ------------------------------------------------------------ | ------------------------------------- |
| Large text (at 14 pt bold/18 pt regular and up) and graphics | At least 3:1 against the background   |
| Small text                                                   | At least 4.5:1 against the background |

Alguns **elementos não textuais**, como contêineres de botão, devem atender a uma relação de contraste de 3:1 entre a cor do contêiner e a cor do fundo.

