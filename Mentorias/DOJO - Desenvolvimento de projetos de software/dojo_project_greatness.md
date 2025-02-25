# DOJO - Biluca project greatness

> [!info] Objetivo
> Apresentar práticas no desenvolvimento de projetos de software para alcançar o sucesso de entregar o resultado com a qualidade esperada ✨ e de forma sustentável ♻️.

Uma das maiores dificuldades no desenvolvimento de software é garantir a qualidade e a previsibilidade da entrega. É comum utilizarmos várias técnicas e métodos tentar estimar e garantir o desenvolvimento de software, porém elas causam aproximações básicas do que realmente o cliente espera como entrega de valor. 

Essas técnicas comuns devem ser mescladas em um processo iterativo e incremental de construção de software. Um processo que é iterativo e incremental tem uma maior chance de entregar o valor esperado, por ser mais flexível a mudanças e mais dinâmico nas entregas. A entrega passa de ser um valor consolidado e construído para algo mais fluido que pode ser alterado a qualquer novo entendimento do negócio.

Assim com esse DOJO, será discutido tópicos do processo de desenvolvimento de um projeto de software de forma a maximizar a qualidade da entrega e garantir que este processo seja simples e suave de ser mantido.

Ao final desse DOJO os participantes terão sido expostos a práticas consolidadas de desenvolvimento de projetos de software e terão capacidade de desenvolver seus próprios processos ou ajudar na melhoria de processos já existentes.

## Composição do grupo

- **Mentor:** Bruno Bernardes da Costa
- **3 mentorados**
  - Deverão ser escolhidos até 3 mentorados que já participaram do **DOJO - Biluca Master Class**

## Cronograma

```mermaid
gantt
    title Distribuição das aulas e tarefas ao longo do tempo
    dateFormat  DD-MM-YYYY
    axisFormat %d-%m
    todayMarker off

    section DOJO
    Aula 1         :milestone, m1, 25-11-2022
    Aula 2         :milestone, 1w
    Aula 3         :milestone, 1w
    Aula 4         :milestone, 1w
    Desenvolvimento               :dev1, after m1, 8w
    Apresentação                 :milestone, after dev1, 1w
```

## Estimativa de horas

As aulas serão ministradas nas 4 primeiras semanas.

O desenvolvimento do projeto será efetuado nas 8 semanas do DOJO.

A apresentação do processo de desenvolvimento será apresentada uma semana após o desenvolvimento do projeto.

| Tarefa          | Estimativa em horas |
| --------------- | ------------------- |
| Aulas           | 8h                  |
| Desenvolvimento | 32h                 |
| Apresentação    | 8h                  |
| Total           | 48h                 |

## Recursos necessários (Opcional)

Não serão necessários recursos adicionais para a execução do DOJO.

# Conteúdos

## Formato do DOJO

Serão apresentadas 4 aulas referentes aos conteúdos abordados.

Aulas

- Project management intro
- Project roles

Durante a execução de todo o período do DOJO será desenvolvido um projeto, onde cada mentorado será responsável pela implementação e design do projeto.

Cada **🏠 Dever de casa** irá abordar um tópico apresentado no desenvolvimento do projeto onde os mentorados irão então alternar entre si os papéis de responsabilidade dentro do projeto a fim de exercitar cada um dos tópicos apresentados.

### Projeto - Troll Form

> 🎉 Um formulário que trola o usuário para enviar os dados. 

Esse formulário será como um jogo onde o player deve ter que conseguir enviar o formulário depois de passar por todas as trollagens planejadas pelas formulário.

O formulário terá várias trolagens que o usuário tem que prevenir para conseguir enviar os dados.

Tópicos abordados:

- Novas trolagens não podem impactar em trolagens já existentes.
- O usuário depois de passar pelas trolagens conseguirá enviar os dados.

### Conceitos trabalhos

Durante o desenvolvimento do DOJO serão exercitados os conceitos da seguinte forma.

#### Desenvolvimento de software

Enquanto desenvolvimento de software, a criação de um formulário é um cenário simples que poderá ser explorado para garantir que as regras de negócio se sobressaiam no decorrer do projeto.

#### Desenvolvimento iterativo

Enquanto desenvolvimento iterativo a criação das trolagens deve ser o mais divertida e interessante para o usuário possível.

Essas trolagens deverão passar por um processo iterativo de criação, ou seja, começar com sistemas mais simples através de prototipação e agregar sistemas de forma e deixar o formulário mais divertido e interessante, ao mesmo tempo que não seja frustante de forma ao usuário não ter a vontade de continuar.

Essa iteração deverá ser constante durante o desenvolvimento, sempre revisitando quais trolagens devem seguir no jogo e quais trolagens foram criadas que não fazem mais sentido ou não são tão divertidas assim.

#### Desenvolvimento incremental

Enquanto desenvolvimento incremental a criação do formulário deve crescer e agregar complexidade a medida que o processo evolui.

O tamanho do formulário, quais os tipos de trolagens e interações com o usuário devem seguir um ritmo incremental de desenvolvimento e assim evitar que definir grandes passos.

O deploy do projeto deve ser feito de forma contínua, cada nova funcionalidade implementada já deve estar disponível para usuários testers poderem acessar.

#### Separação de responsabilidades

Enquanto separação de responsabilidades o sistema criado deve restringir funcionalidades a cada um de seus responsáveis.

Cada sistema deve ser auto-contido e implementado de forma a resolver seus próprios problemas.

#### Modularização

Enquanto modularização os sistemas desenvolvidos durante a criação do projeto devem ser implementados de forma a serem combinados e reutilizados pelos demais módulos do projeto.

Cada módulo deve ser auto-contido e garantir sua funcionalidade além de ser configurável. Com a possibilidade de configuração de cada módulo aumenta a flexibilidade de testes com outras trolagens para determinar quais trolagens são mais divertidas e interessantes para serem publicadas na versão final.

> [!tip] Sem um processo de modularização eficiente o projeto fica preso ao que está implementado e a forma que foi implementado, dificultando a adição de novas ideias e tecnologias ao projeto.

## Design do projeto

Tópicos abordados:

- Abordagem evolutiva para desenvolvimento de software
- Papéis do time de desenvolvimento
- Levantamento de requisitos e MVP
- Organização do projeto (sistema de gestão)
- Métricas e acompanhamento do projeto
- Arquitetura de um projeto e prototipação

### 🏠 Dever de casa



### Avaliação

Legenda:
- <span style="color:blue">C</span>: completo
- <span style="color:brown">P</span>: parcial
- <span style="color:red">X</span>: não entregue

| Quesito                              | Estado |
| ------------------------------------ | ------ |
| Implementação da automação           |        |
| Documentação                         |        |
| Apresentação de impacto da automação |        |

## Abordagem evolutiva para desenvolvimento de software

Tópicos abordados:

- Evolução incremental
- TDD - Test Driven Development 
- Managing complexity
- Priorização de features e adiamento de feature que não são necessárias
- Essencial complexity vs Accidental complexity

### 🏠 Dever de casa

<Descrição do trabalho>

### Avaliação

<Descrição da forma de avaliação>

## Automação do Pipeline de desenvolvimento

Tudo que pode ser automatizado no desenvolvimento de software o deve ser feito.

A automação é uma das ferramentas mais importantes no desenvolvimento e quando bem empregada pode economizar bastante tempo de desenvolvimento, essa economia pode então ser empregada onde realmente importa no projeto.

Tópicos abordados:

- Automação de guidelines de desenvolvimento
  - Guidelines de desenvolvimento são importantes para garantir a consistência do código
- Automação da execução dos testes
- Automação do deploy
- Automação do processo de controle de qualidade

### 🏠 Dever de casa

Cada mentorado será responsável por implementar e garantir a documentação de uma possível automação no processo de desenvolvimento.

O mentorado deve apresentar:
- A automação implementada
- O impacto dessa automação no desenvolvimento
- Documentação pertinente

### Avaliação

Legenda:
- <span style="color:blue">C</span>: completo
- <span style="color:brown">P</span>: parcial
- <span style="color:red">X</span>: não entregue

| Quesito                              | Estado |
| ------------------------------------ | ------ |
| Implementação da automação           |        |
| Documentação                         |        |
| Apresentação de impacto da automação |        |

## Qualidade de entrega

Tópicos abordados:
- Definição de qualidade de entrega
- Critérios de aceitação
- Automação dos testes

### 🏠 Dever de casa

<Descrição do trabalho>

### Avaliação

<Descrição da forma de avaliação>

## Apresentações

Após o processo de desenvolvimento do DOJO o mentorado já terá conhecimento suficiente de uma forma eficiente de desenvolvimento de software.

Assim cada mentorado deve propor uma **melhoria no processo de desenvolvimento**.

- Contexto do processo
- Contexto do processo que está querendo melhorar
- Justificativa da melhoria
- Prós e cons
- Impacto no desenvolvimento
- Possibilidades futuras com o emprego da prática apresentada

# Quiz de aderência de treinamento

<Perguntas que serão levantadas nos relatórios>

<Para cada pergunta, qual informação pode ser extraída>