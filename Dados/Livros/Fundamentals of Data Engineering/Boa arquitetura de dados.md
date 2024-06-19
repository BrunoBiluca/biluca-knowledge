---
tags:
  - arquitetura_software
---
Resumo da arquitetura proposta no livro [[_Fundamentals of Data Engineering#Chapter 3 Designing Good Data Architecture]].

A arquitetura proposta pelos autores é um aglomerado do entendimento deles sobre outros princípios de uma boa arquitetura, como o AWS Well-Architected Framework, Google Cloud’s Five Principles for Cloud-Native Architecture

> [!info] Definição de uma "boa" arquitetura
> Arquitetura de dados é o projeto de sistemas para o suporte a evolução dos dados de acordo com as necessidades da empresa, conseguido a partir da flexibilidade e de decisões reversíveis alcançado por um processo cuidadosamente avaliado de ganhos e perdas.

Adotar a cultura de tomar decisões reversíveis ajuda a reduzir o risco de apegar a decisões.

Arquitetos devem identificar problemas no estado atual dos projetos (baixa qualidade de dados, limites de escalabilidade, perdas de dinheiro), definir estados futuros desejados (melhoria ágil da qualidade dos dados, soluções escaláveis em cloud, melhoria de processos do negócio) e realizar iniciativas em passos pequenos e concretos.

Distinção entre tipos de arquitetura:
- Arquitetura operacional abrange os requisitos funcionais necessários do que precisa de acontecer para pessoas, processos e tecnologia.
- Arquitetura técnica delimita como os dados serão ingeridos, armazenados, transformados e servidos ao longo do ciclo de vida de engenharia de dados.

# Princípios
### Escolher sabiamente componentes comuns

A ideia aqui é utilizar componentes comuns entre toda a organização e que as pessoas consiga acessar de acordo com seus casos de uso

### Planejar para a falha

Levar em consideração cenários catastróficos e conseguir se adaptar a eles.

- Disponibilidade dos serviços
- Confiabilidade das respostas e dos dados
- Tempo de recuperação quando algum serviço fica indisponível
- Ponto de recuperação

### Arquitetar para escalabilidade

- Escala para cima
- Escala para baixa

Uma forma de arquitetar para utilizar melhor os recursos necessários.

### Arquitetura é liderança

Arquitetos são responsáveis pode decisões e descrições técnicas e também de disseminar essas decisões para a equipe através de liderança e treinamento.

> [!quote] De acordo com Martin Fowler um tipo ideal de arquiteto de software
>  In many ways, the most important activity of Architectus Oryzus is to mentor the development team, to raise their level so they can take on more complex issues. Improving the development team’s ability gives an architect much greater leverage than being the sole decision-maker and thus running the risk of being an architectural bottleneck.

### Sempre estar arquitetando

O trabalho do arquiteto é ter um profundo conhecimento sobre a arquitetura base (estado atual), desenvolver uma arquitetura alvo, e mapear em um plano de ações a fim de priorizar uma sequência de mudanças para conseguir o objetivo.

### Construir sistemas fracamente acoplados

- Sistemas quebrados em pequenos componentes
- Esses sistemas disponibilizam uma interface de comunicação para que outros sistemas possam consulta-los.
- Mudanças internas em um sistema não causam mudanças em outras partes
- Cada componente é atualizado separadamente de acordo com suas necessidades

### Tomar decisões reversíveis

Esteja preparado para mudanças. As mudanças devem ser fáceis de fazer.

### Priorizar segurança

Segurança deve ser levada em consideração desde o início do processo.

### Abraçar FinOps

FinOps é uma disciplina de gerenciamento de gastos financeiros quando utilizando serviços em cloud.

Engenheiros precisam aprender a pensar em relação aos custos para o negócios da operação.