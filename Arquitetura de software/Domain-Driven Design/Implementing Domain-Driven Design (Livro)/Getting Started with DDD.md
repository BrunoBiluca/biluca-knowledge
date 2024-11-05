---
tags:
  - arquitetura_software
---
Nesse primeiro capítulo o autor foca em apresentar as principais características da utilização do DDD. É feita uma discussão sobre quais projetos o DDD se encaixa bem e como vender essa abordagem para os superiores na empresa, já que inicialmente aplicar esses conceitos necessita de uma curva de aprendizado que pode impactar no desenvolvimento.

Também são apresentadas alternativas ao DDD para comparação, mostrando onde o DDD brilha nesses casos.

Por fim, são apresentadas as principais dificuldades de implementar o DDD e como seguir com seu aprendizado. Na tabela 1.1 são apresentados contextos para a utilização do DDD.

# Resumo
No início do capítulo é feito uma discussão sobre a leitura desse livro para diferentes audiências dependendo do seu papel de envolvimento no desenvolvimento de software, isso porque é um processo que envolve a todos da equipe.

### Por que utilizar o DDD?

- Une o campo do negócio com o desenvolvimento, de forma que aumenta a coesão do projeto e diminui atritos entre os times.
- O foco passa a ser o negócio gerando software mais próximo do que se espera
- Ensina mais sobre o negócio por experimentação e união do time
- Centraliza o conhecimento
- Desenvolve uma linguagem comum a todos no time, melhorando a comunicação
- O projeto é código, e o código é o projeto. Utilizando o processo de descoberta ágil é possível criar o melhor código para o negócio.
- DDD direciona soluções tanto para design estratégico como tático.

### Como DDD ajuda?

DDD é uma abordagem de desenvolvimento de software que foca em 3 aspectos:

- DDD trás especialistas no domínio e desenvolvedores juntos para o software refletir as reais necessidades do modelo.
- DDD trata as iniciativas estratégicas do negócio. Ajuda e definir melhores relações entre times e limites em contextos diferentes.
- DDD se encontra com as demandas técnicas do software por usar uma modelagem tática.


> [!tip] Utilize DDD para simplificar, não para complicar


### Modelo anêmico

Modelos anêmicos são estruturas que apenas apresentam armazenamento de dados e nenhum comportamento. Esse tipo de modelagem é muito utilizada e pode apresentar vários problemas quando olhamos o código de uma perspectiva do negócio, já que o modelo em si não representa na relacionado ao que os especialistas de domínio pensam.

Modelos anêmicos apresentam pelo menos 3 problemas?
- Pouca intenção é revelada na interface
- Esconde complexidade
- Um objeto de domínio passa a ser apenas uma armazenamento bobo de dados.


> [!tip] Design é o código e o código é o Design
> Lembre-se que quando praticamos o DDD os diagramas de quadro branco não são o design e sim o código, eles são apenas uma forma de ajudar a discutir os desafios do modelo.

### Linguagem onipresente (Ubiquitous Language)
É a linguagem compartilhada pela equipe.

Essa linguagem está tanto na discussão do dia a dia como também no código. A própria linguagem leva a um código mais claro e que realmente reflita o negócio.

A linguagem é onipresente não é universal, diferentes contextos devem utilizar linguagem diferentes.

> [!tip] Evolução do projeto
> Como a fala e o código são a instância final das expressões definidas pela linguagem onipresente, se prepara para abandonar os diagramas, glossários e outro tipo de documentação que dificulte ser atualizado enquanto o código e o a linguagem onipresente crescem rapidamente.


### O valor para o negócio do DDD

- A organização ganha um modelo útil para o seu domínio
- Apresenta um entendimento preciso e refinado sobre o negócio
- Especialistas de domínio contribuem para o desenvolvimento do software
- Melhor experiência do usuário
- Clarifica as fronteiras entre vários contextos dentro da mesma organização
- Arquitetura da organização é melhor organizada.
- Modelagem ágil, iterativa e contínua é empregada.
- Novas ferramentas, tanto estratégicas e táticas são empregas.

> [!tip] DDD é sobre cuidadosamente refinar o modelo mental dos especialistas de domínio para um modelo útil para o negócio


### Justificativa para modelagem de domínio

Utilizando uma modelagem tática podemos avançar sobre o entendimento do nosso domínio de forma consciente e consistente.

DDD padrões táticos:
- Agregações
- Serviços
- Objetos valor
- Eventos
- etc

Alguns guias práticos de porque utilizar DDD:
- Se o contexto desenvolvido é o domínio principal para o sucesso do negócio e ele precisa de muita experimentação e refatoração. Ele merece um comprometimento longo e de constante melhoria.
- Mesmo que não seja um domínio principal, se ele é inovador e complexo e será necessário para o futuro.
- Um domínio pode virar um domínio genérico ou domínio de suporte. Isso nos permite entender quais sistemas tem mais prioridade de desenvolvimento e o escopo do projeto.

> [!tip] DDD e jogos (minha opinião)
> O DDD é uma abordagem que na minha opinião casa muito bem com o desenvolvimento de jogos. Jogos são complexo e necessitam de muita iteração, durante esse processo ter domínio do escopo do projeto é algo muito difícil e pode ocasionar em furo de escopo constantes. O DDD se apresenta como uma abordagem com o foco no ágil e em processos iterativos que pode solucionar esses problemas inatos do desenvolvimento de jogos.

Usando métodos ágeis não elimina nenhum padrão ou prática essencial do DDD. Ele vão bem juntos. 

### DDD-Lite

DDD-Lite é um termo utilizado para descrever uma abordagem que pega partes dos padrões e práticas do DDD para aplicar. Esse técnica geralmente ignora o uso de Contextos limitados e de Mapeamento de contexto. Seu foco é muito mais técnico, com o desejo de resolver problemas técnicos. Esse tipo de abordagem pode ter seus benefícios, mas geralmente a falta de aplicação de conceitos mais profundos do DDD e a falta de uma modelagem estratégica não alcançam todos os benefícios do DDD original e podem até a levar a problemas no desenvolvimento do projeto (o exemplo da empresa fictícia no livro demonstra esses problemas).

# Referências
