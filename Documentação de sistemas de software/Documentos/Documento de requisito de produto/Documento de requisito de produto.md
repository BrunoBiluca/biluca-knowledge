# Documento de requisito de produto

Um **documento de requisito de produto (DRP)** provê informações sobre funcionalidades e comportamentos do sistema da perspectiva do usuário final. É responsabilidade de uma **analista de negócio ou product owner** criar essa documentação, mantendo cooperação com os demais envolvidos no projeto para sanar dúvidas, como por exemplo, o cliente em relação a interface de usuário ou o arquiteto de solução como detalhes técnicos de baixo nível.

O documento de requisitos é o ponto de partida onde os desenvolvedores recebem suas tarefas, os QAs entendem como fazer seus casos de testes e os escritores técnicos começam a criar os manuais de usuário. Ele ajuda a garantir que o time tenham uma referência dos objetivos do projeto e que lembrem das funcionalidades enquanto as desenvolvam.

A [[Documentação do sistema]] deve ser composta de vários DRPs, já que um documento deve se restringir a um requisito do produto.

> [!info] Atores
>- Analista de negócio ou product owner são os principais responsáveis em produzir essa documentação
>
>- Desenvolvedores consomem a documentação a fim de garantir consistência do projeto

> [!quote]- (Artigo) - [Product requirements Document: PRD Templates and Examples](https://www.altexsoft.com/blog/product-requirements-document/)
> Visão geral sobre a documentação de requisitos, com templates e exemplos de uso.

Principais elementos:

- **Objetivos:** aspectos mais relevantes com o desenvolvimento do objetivo.
- **Contexto:** informações que levaram definir o requisito como algo relevante.
- **Tarefas ou Histórias de usuários:** levantamento de tarefas, histórias e elementos mais concretos para o desenvolvimento do requisito
	- [[Requisitos funcionais]]
	- [[Requisitos não-funcionais]]
- **Critérios de aceite:**  condições que indicam que o requisito está concluído ([[Critérios de aceite]]).

Elementos opcionais:

- **Identificador:** número de identificação do requisito, pode ser utilizado para facilitar a comunicação entre a equipe.
- **Hipóteses:** O que a equipe espera com o desenvolvimento do requisito?
	- Exemplos: Assumindo que .... pode influenciar em .....
- **Restrições:** São limitações ou restrições que molde o que é possível dentro do projeto. Restrições podem ser técnicas, legais, financeiras ou relacionada a recursos.
- **Dependências:** O que é necessário estar definido antes desse requisitos ser posto em desenvolvimento? Geralmente são fatores externos que podem impactar no desenvolvimento.
- **Interação do usuário e design:** guias gerais de comportamento do sistema perante interação com usuário, desenhos de pouco fidelidade que demonstrem a usabilidade do requisito
- **Questões:** dúvidas levantadas pela equipe durante o levantamento do requisito e suas justificativas. É uma seção interessante para consolidar algumas decisões tomadas no requisito.
- **Fora do escopo:** lista de coisas que não estão planejadas para esse requisito. É uma forma também de definir o escopo, as vezes falar o que não fazer reforça os principais objetivos do requisito.
- **Referências:** como a concorrencia ou outros produtos implementam o mesmo requisito


# Exemplo

Nessa seção estamos tentando por meio de exemplos definir bons e maus Requisitos de Produto para conseguir **diferenciar o que é um requisito de produto do que é um requisito funcional.**

- Requisito de produto: Gerenciamento de dados de despesas e receitas
	- RF: como usuário quero adicionar uma nova entrada de despesas ou receita para registrar perpetuamente
	- RF: como usuário quero remover entradas já registradas
	- RF: como usuário quero editar o nome de uma entrada registrada para fazer pequenas correções ou definir um nome mais descritivo
	- ...