# Fundamentos do desenvolvimento de software sustentável

--- start-multi-column: ExampleRegion1  
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

> [!info] Objetivo
> Apresentar um conjunto básico de técnicas e métodos para o desenvolvimento de software, onde pela organização do trabalho num formato eficiente podem alcançar os resultados esperados.

O treinamento **Fundamentos de Desenvolvimento de software sustentável** tem como objetivo preparar desenvolvedores para a criação de projetos que tenham impacto real na sociedade, projetos que não sejam iniciados de qualquer forma para logo depois serem abandonados, mas sim projetos que pessoas reais se beneficiem.

Ao mesmo tempo que o esforço colocado pelos desenvolvedores seja eficiente para manter o projeto evoluindo por muitos anos.

--- end-column ---

> [!info] Principais referências
> - [O programador Pragmático: De Aprendiz a Mestre](https://www.amazon.com.br/Programador-Pragm%C3%A1tico-Aprendiz-Mestre-ebook/dp/B019HM0H90)
>Boas dicas pontuais e muito práticas para adoção no dia a dia do programador
>
>- [Modern Software Engineering: Doing What Works to Build Better Software](https://www.amazon.se/-/en/David-Farley/dp/0137314914)
>Bases do desenvolvimento de software que constrói um formato de trabalho que entrega valor com qualidade por meio da iteração e adições.
>
> - [Continuous Delivery](https://www.youtube.com/@ContinuousDelivery)
>Canal no YouTube do Dave Farley auto do Modern Software Engineering que abordar vários tópicos cruciais ao desenvolvimento com um viés voltado a entrega de valor e um modelo de trabalho organizado e sustentável

--- end-multi-column
#### Principais conceitos abordados

- Você tem seus **princípios** porque um projeto não teria também
- **Código limpo** e fácil de ser alterado
- **Documentação** para realmente entregar o que se espera
- **Arquitetura** para evitar que todos os problemas parecem pregos
- **Automação de testes** para acelerar o desenvolvimento
- **Comunicação** para criar um ambiente colaborativo
- **Automação de processos** para não perder tempo que tarefas chatas

Ao final do treinamento cada mentorado terá disponível:

- Projeto de software desenvolvido com práticas sólidas que pode ser utilizado para futuros projetos.
- Template de guia de estilo de código
- Template de documentação de produto
- Template para organização do código
- Apresentação técnica de cada mentorado

### Pré-requisitos

- Ter um conhecimento básico de programação
	- Estruturas de dados e alguns algoritmos

#### Testes de conhecimento

A fim de avaliar pré-requisitos do mentorado e garantir que ele esteja em conformidade com o treinamento.

Para os conhecimentos básicos de programação será utilizado o site [CodInGame](https://www.codingame.com/) com os seguintes desafios propostos:

- [Reverse Minesweeper](https://www.codingame.com/ide/puzzle/reverse-minesweeper)
- [Playing Card Odds](https://www.codingame.com/ide/puzzle/playing-card-odds)

Caso a pessoa candidata consiga resolver os dois problemas, ela está mais do que apta a fazer o treinamento.

#### Recursos necessários

Contas necessárias:

- Github


Software utilizados:

- VSCode ou similares
- Git CLI
- SourceTree ou similares


### Composição do grupo

O treinamento de fundamentos de desenvolvimento de software sustentável será dividido em algumas atividades, entre o mentor, monitor e mentorados.

- Mentor: Bruno Bernardes da Costa
- X mentorados
- (Opcional) 1 monitor para acompanhamento do desenvolvimento, como explicar alguns conceitos, resolver dúvidas em relação as tecnologias escolhidas

Da parte do Mentor:

- Aulas expositivas dos principais conceitos abordados
- Acompanhamento do desenvolvimento de atividades e do projeto
- Ajuda na confecção da apresentação de cada mentorado

Da parte do Monitor:

- Acompanhamento do desenvolvimento de atividades e do projeto
- Ajuda na confecção da apresentação de cada mentorado

Da parte do Mentorado:

- Desenvolvimento de atividades específicas em relação a cada conceito abordado
- Desenvolvimento de um projeto, feito em pares de mentorados
- Apresentações técnicas de cada mentorado

# Cronograma

![[Cronograma|Cronograma estimado do treinamento|%cheio]]

### Aulas

Nos primeiros meses do treinamento, serão apresentadas as aulas cada uma com um conteúdo importante do desenvolvimento de software.

Cada encontro será composto por:

- Até 30 minutos de avaliação das atividades propostas
- Até 1 hora de aula
- Até 30 minutos de dúvidas

#### Avaliações

Cada atividade do mentorado será avaliada pelo mentor a fim de ajudar os mentorados a terem noção de algumas deficiências e criar um plano de estudo para supera-las.

### Projeto

Após as aulas iremos colocar em prática e continuar refinando as técnicas e métodos para o desenvolvimento de software.

Formato dos projetos:

- Serão divididos os mentorados em pares
- Cada par irá definir um projeto
- Esse projeto será desenvolvido ao longo do tempo definido
- Serão marcados encontros para discutir os rumos do projeto
	- O mentor nesse caso pode atuar como um consultor, evidenciando falhas nos processos e sugerindo soluções.


Considerações importantes:

- Deve ser interessante juntar os mentorados por afinidade tanto na ideia do projeto quanto pelas tecnologias
- Serão definidos alguns projetos base caso os mentorados não tenham ideia do que fazer
	- Jogo de console
	- Sistema de calculadora
	- REST API para gerenciamento de uma loja
	- Página de formulário de contato
- Os projetos devem ser de curta duração com uma funcionalidade principal e algumas funcionalidades auxiliares

# Ementa

Cada conteúdo do treinamento foi pensando a fim de solucionar problemas comuns durante o desenvolvimento de software apresentando soluções que foram testadas ao longo de anos de experiência.

### Código limpo

- Básico da escrita de código para que outro humano consiga entender o que foi feito
	- Semântica de código
	- Refatoração de código
	- Nomenclatura de funções, métodos, classes...
	- Complexidade ciclomática
	- Controle de efeitos colaterais
	- Tratamento de exceções
	- Hierarquia de pastas
- Ferramentas de auxiliares na construção de código
- Saber identificar boas soluções criadas por IAs generativas


### Automação de testes

- Garantir a real entrega de valor do código
- Substituir testes manuais por testes automatizado diminui chance de falha humana
- Criação de rede de segurança para os desenvolvedores

### Princípios

- Como definir os princípios que irão guiar o projeto?
- Princípios e comunicação entre a equipe
- Como evitar o pedantismo na avaliação de código? 
	- Criação de um guia de código
	- Criação de guia do projeto

### Documentação

- Por que documentar?
- O que documentar?
- Tipos de documentação de produto eficientes
- Discussão de templates para essa documentação
- Documentação e comunicação entre a equipe

### Arquitetura

- Arquitetura não é sobre desenhar diagramas de classe e modelos entidade-relacionamento
- Qual tecnologia escolher para o meu projeto?
- Como demonstrar uma solução de software para uma criança de 10 anos de idade? 

### Automação de processos

- Pare de fazer tarefas chatas, uma automatização de processos misteriosa ou 2 reais?
- O que automatizar?
- Quando automatizar?
- Automações utilizando Github Actions