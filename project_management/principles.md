# Princípios do desenvolvimento de software

# Abordagem incremental e iterativa no desenvolvimento de software

## Desenvolvimento incremental

O desenvolvimento de softare é um processo de criação baseada em aprendizado. Quanto mais aprendemos sobre o negócio que estamos querendo resolver mais insumos temos para criar soluções mais acertivas.

A criação do software de forma incremental rejeta a necessidade de levantar no primeiro momento todas as funcionalidades e recursos que estarão disponíveis no produto final, ou seja, cada funcionalidade é criada de forma incremental, do mais simples para o mais complexo, do mais básico para o mais robusto, sempre mirando em solucionar o problema atual e não projetando futuras arquiteturas de funcionalidades que ainda não fazem parte do processo.

Nessa abordagem precisamos garantir que cada parte desenvolvida cumpra o seu papel da melhor maneira possível e está na qualidade que será apresentada no produto final.

## Desenvolvimento iterativo

A medida que aprendemos mais sobre o negócio que estamos querendo resolver temos mais flexibilidade e autonomia para desenvolver soluções.

Esse processo de criação de soluções deve ser iterativo, ou seja, revisitado a fim de melhorar a nossa solução final a todo momento. Novas informações podem levar a um novo entendimento do negócio e uma maneira mais eficiente de resolver o problema.

## Separação de resposabilidades

## Modularização

## Coesão

# Papéis no desenvolvimento de software

Um dos fatores que complicam o desenvolvimento de software é a falta de clareza nas atribuições de cada colaborador ao projeto. 

> 💡 Ter clareza no papel de cada integrante no projeto facilita a comunicação e acelera o processo de desenvolvimento.

A clareza na definição dos papéis dentro de um projeto resolve vários dos problemas comuns que acontecem no desenvolvimento de software, como:

- Configuração do time não é bem definida
- Todos os colaboradores fazem de tudo no projeto
- Falta de clareza quando necessário reportar um problema específico
- Falta de responsabilizada na execução do projeto (o famoso isso é fulano que faz)

Com isso a solução envolve:

- Criar um documento com as definições dos papéis dentro da equipe.
  - Esse documento deve definir todos os papéis dentro do time, desde o programador e design na ponta até a maior hierarquia (cuidado com hierarquias, elas são gargalos no desenvolvimento e devem ser evitadas) dentro do time.
  - Deve apresentar exemplos de atribuições para cada papel dentro da equipe
- Criar cultura da importancia dessas definições.
- Esse documento deve ser mantido e atualizado a cada alteração na equipe e no projeto.

> ⚠️ O **Manager** é responsável pela criação e manutenção da documentação de definições de papéis.

Ter esse documento de propicia as seguintes vantagens:

- Visibilidade dos integrantes do time
- Visibilidade dos canais de comunicação
- Onboarding de novos membros facilitado

# Objetos de um projeto de software

# Rituais de desenvolvimento do projeto

## Refinamento de produto

## Refinamento técnico

Participantes: até 4 desenvolvedores, opcional: PO
Duração: mínimo de 1 hora
Frequencia: a definir com o time

Os participantes discutem brevemente sobre cada requisito de produto no backlog priorizado pelo PO. O PO pode participar caso o entendimento dos requisitos não estejam claros, sem onerar muito o fluxo do refinamento, ou seja, se um requisito de produto não está claro o suficiente o refinamento técnico não é o momento para fazer esse refinamento.

Uma possível solução deve ser levantada para cada requisito de produto. Essa solução não deve ser complexa nem precisa para a conclusão da implementação do requisito, ela é apenas uma solução que seguirá como guia para o desenvolvimento e pode ser totalmente descartada no momento de desenvolvimento.

Após a discussão esse requisito é estimado da seguinte maneira:

Cada integrante escolhe uma **estimativa entre Pequeno, Médio e Grande**. Se todos concordam a reunião segue para o próximo requisito. Caso discordem temos mais uma rodada de discussão ou o requisito é congelado e deve voltar para o PO a fim de refinar a solução proposta em entrega de valores menores.

## Reunião de revisão do projeto (retrospectiva)

Participantes: todos do time
Duração: mínimo de 1 hora
Frequência: definida com o time a fim de avaliar o processo de desenvolvimento (sugestão 2 semanas)

A reunião de revisão do projeto tem como objetivo avaliar o processo de desenvolvimento do projeto como um todo. Ao fim dessa reunião deve ser gerado um plano de ações que serão implementadas em paralelo ao desenvolvimento do projeto.

Nessa reunião devem ser discutidas questões tangentes ao desenvolvimento como:

- Práticas que funcionaram durante o desenvolvimento
- Práticas que não funcionaram
- Práticas que deveria ser implantadas

# Referências

- [What is a product Owner?](https://www.simplilearn.com/what-is-a-product-owner-article)