---
tags:
  - arquitetura_software
---
Nesse capítulo o autor decidiu inverter a ordem do livro de Evans para abordar Domínios, subdomínios e contextos limitados (coisa que só é abordada na segunda parte do livro de Evans). Esses conceitos fazem parte da modelagem estratégica que é o que garante os benefícios do DDD para o negócio a longo prazo.

O foco passa a ser o contexto amplo da utilizado do DDD, onde o mapeamento desses contextos pode trazer informações valiosas para o entendimento do negócio.

Para a discussão sobre o uso dos conceitos é trazido novamente o exemplo SaaSOvation, para mostrar como a falta de uma definição mais profunda dos contextos leva a problemas de comunicação e de entendimento do projeto (o caso do contexto de colaborador e de permissões). 

Nesse capítulo tem um discussão longa de como pensar cada tipo de contexto do exemplo SaaSOvation, junto com as principais armadilhas que o time do exemplo caíram e como resolvê-las.

# Resumo

Domínio pode se referir tanto ao domínio de atuação da organização, como também a apenas um domínio principal ou de suporte. 

Criar um modelo de domínio é uma forma de focar em uma área específica de todo o domínio de negócio de uma organização.

Como vários modelos lógicos precisam evoluir para facilitar a adição de novas funcionalidades, cada uma das preocupações conflitantes pode impedir o progresso ada outra. Isso ocorre sempre que os limites de cada contexto do sistema não estão claramente separados. O desenvolvimento de um contexto limitado garante que esses problemas de comunicação entre modelos lógicos não se criem.

### Domínio principal (Core domain)

O domínio principal é parte do domínio do negócio da organização e é de importância primária para o seu sucesso.

As vezes um contexto limitado é criado ou adquirido para suportar o negócio. Se ele modela algo que não é essencial para o negócio, não é um principal, este é um domínio de suporte. O negócio cria um domínio de suporte quando ele é de alguma forma especializado.

De outra forma, se o contexto não captura na especial para o negócio, mas mesmo assim é necessário para a solução geral do negócio, este é um domínio genérico.

Sendo de suporte ou genérico um domínio não é sem importância. Esses subdomínios existem para garantir o sucesso do negócio, mas não tem a necessidade de sobressair nessas áreas.

> [!tip] Domínio principal e excelência
> O domínio principal precisa de sobressair, ele requer todo o foco do time para que uma excelente implementação seja desenvolvida, já que ele produz vantagens para o negócio.

> [!tip] Modularização e contextos
> Mesmo que modularização é uma parte essencial das ferramentas de modelagem do DDD, ela por si só não resolve problemas de desalinhamento linguísticos entre o domínio.

### Domínio e subdomínios do mundo real

Domínios tem dois espaços de atuação, espaço do problema e espaço da solução. O espaço do problema nos habilita a pensar de forma estratégica a um desafio do negócio, enquanto o espaço da solução nos permite focar em como implementar o software para resolver o problema do desafio do negócio.

Uma meta desejável da solução é alinhar o modelos de domínio as áreas do objetivo do negócio, junto ao espaço do problema com o espaço de solução.

Se nós não entendermos a visão e metas do domínio principal e das áreas que são necessárias para o suportar, não seremos capazes de pensar estrategicamente e tirar vantagem além de poder cair em armadilhas associativas.

### Contextos limitados (Bounded Contexts)

Um contexto limitado é o limite explícito que um domínio existe. O modelo do domínio é expresso utilizando a linguagem onipresente pelo modelo de software. O limite o criado porque cada conceito do projeto dentro do modelo, com suas propriedades e operações, tem um significado especial.

> [!warning] Armadilha do contexto limitado
> Alguns projetos caem na armadilha de tentar criar um modelo que inclui tudo na organização, pois dessa forma todos os conceitos seriam entendidos por todos. Essa abordagem de modelagem é uma armadilha.
> 
> Isso é uma armadilha, pois primeiro é impossível de estabelecer um acordo entre todos os stakeholders da organização, mesmo que pequena, e segundo é possível ter conflitos entre termos e conceitos. Esse conflitos são bons indicativos que o mesmo termo está sendo utilizado para conceitos diferentes e então deveria ser dado um nome diferente ou eles estão em contextos diferentes.

> [!tip] Contexto é primordial no DDD 


Um Contexto limitado não apenas abrange o modelo de domínio. Geralmente pode marcar um sistema, uma aplicação ou um serviço do negócio (componentes complexos).

Quando temos interfaces de usuário que renderiza o modelo e guiam a execução do seu comportamento, esses também estão dentro do Contexto limitado.

O contexto limitado primeiramente encapsula a linguagem onipresente e seu modelo de domínio, mas também inclui o que existem para prover interação com e suportar o domínio.

O Contexto limitado deve ser tão grande quando necessário para expressar em sua completude a linguagem onipresente.

Conceitos estranhos ao domínio principal devem ser removidos. Se o conceito não é da linguagem onipresente do contexto, e ele não deve ser introduzido no seu modelo para começo de conversa. Esses conceitos estranhos provavelmente fazem parte de um domínio de suporte ou genérico, ou mesmo modelo nenhum.

A cada momento nós temos uma chance de refinar o modelo do domínio em algum nível. Durante cada iteração desafiamos nossas suposições sobre o modelo e nos forçamos a adicionar ou remover conceitos.

> [!tip] DDD e contextos
> Utilizando os princípios do DDD nós damos uma séria consideração ao que pertence ou não a um modelo. A cada momento desafiamos o modelo e adicionamos, removemos ou alteramos conceitos para garantir que o **Projeto é o código e o código é o projeto**.

> [!warning] Armadilhas da criação de Contextos limitados
> - Deixar que a arquitetura influencie o modelo em vez da Linguagem onipresente
> - Dividir Contextos limitados para distribuir tarefas para os desenvolvedores (módulos são melhores nesse caso)



# Referências
