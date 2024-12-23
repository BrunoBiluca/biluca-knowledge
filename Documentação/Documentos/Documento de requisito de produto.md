# Documento de requisito de produto

--- start-multi-column: ExampleRegion1  
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

Um **documento de requisito de produto (DRP)** provê informações sobre funcionalidades e comportamentos do sistema da perspectiva do usuário final. É responsabilidade de uma **analista de negócio ou product owner** criar essa documentação, mantendo cooperação com os demais envolvidos no projeto para sanar dúvidas, como por exemplo, o cliente em relação a interface de usuário ou o arquiteto de solução como detalhes técnicos de baixo nível.

A [[Documentação do sistema]] deve ser composta de vários DRPs, já que um documento deve se restringir a um requisito do produto.

--- end-column ---

> [!info] Atores
>- Analista de negócio ou product owner são os principais responsáveis em produzir essa documentação
>
>- Desenvolvedores consomem a documentação a fim de garantir consistência do projeto

--- end-multi-column

O documento de requisitos é o ponto de partida onde os desenvolvedores recebem suas tarefas, os QAs entendem como fazer seus casos de testes e os escritores técnicos começam a criar os manuais de usuário. Ele ajuda a garantir que o time tenham uma referência dos objetivos do projeto e que lembrem das funcionalidades enquanto as desenvolvam.

Principais elementos:

- **Objetivos:** aspectos mais relevantes com o desenvolvimento do objetivo.
- **Contexto:** informações que levaram definir o requisito como algo relevante.
- **Hipóteses:** O que a equipe espera com o desenvolvimento do requisito?
	- Exemplos: Assumindo que .... pode influenciar em .....
- **Restrições:** São limitações ou restrições que molde o que é possível dentro do projeto. Restrições podem ser técnicas, legais, financeiras ou relacionada a recursos.
- **Dependências:** O que é necessário estar definido antes desse requisitos ser posto em desenvolvimento? Geralmente são fatores externos que podem impactar no desenvolvimento.
- **Tarefas ou Histórias de usuários:** levantamento de tarefas, histórias e elementos mais concretos para o desenvolvimento do requisito
	- Requisitos funcionais e não funcionais
- **Critérios de aceite:**  condições que indicam que o requisito está concluído ([[Critérios de aceite]]).
- **Interação do usuário e design:** guias gerais de comportamento do sistema perante interação com usuário, desenhos de pouco fidelidade que demonstrem a usabilidade do requisito
- **Questões:** dúvidas levantadas pela equipe durante o levantamento do requisito e suas justificativas. É uma seção interessante para consolidar algumas decisões tomadas no requisito.
- **Fora do escopo:** lista de coisas que não estão planejadas para esse requisito. É uma forma também de definir o escopo, as vezes falar o que não fazer reforça os principais objetivos do requisito.


> [!quote]- (Artigo) - [Product requirements Document: PRD Templates and Examples](https://www.altexsoft.com/blog/product-requirements-document/)
> Visão geral sobre a documentação de requisitos, com templates e exemplos de uso.


# Requisitos funcionais

- Definem o que o produto faz
- Entrega como resultado final as funcionalidades do sistema
- Tem o foco nas necessidades do usuário
- Exemplos:
	- Usuário deve poder fazer Pix

Requisitos funcionais bem escritos podem prover vários benefícios como:

- Viram um guia para os desenvolvedores
- Criam um visão clara do produto final para todos os envolvidos no projeto
- Permite levantar estimativas de tempo e orçamento
- Ajuda a encontrar furos e áreas de melhorias do produto

Existem várias formas de buscar requisitos funcionais, entre elas podemos:

- Conversar com usuários e clientes de nossos sistemas
- Pesquisar o mercado
- Revisar o sistema atual a fim de coletar furos e pontos de melhoria, como uma modernização na interface, por exemplo.

Quando estiver levantando seus requisitos funcionais tente focar nos seguintes aspectos:

- Levante o máximo de detalhes possíveis, como cenários de uso, critérios de aceitação. Isso irá ajudar a definir melhor o escopo do requisito.
- Revisar os documentos quando novas ideias aparecerem ou serem modificadas.

# Requisitos não-funcionais

- Definem como o produto funciona
- Entrega como resultado final propriedades do sistema
- Tem o foco nas expectativas do usuário
- Exemplos:
	- Uma transferência Pix não pode demorar mais de 1 segundo