---
tags:
  - arquitetura_software
---
> [!info] Value Objects
> Tipos de valores que medem, quantificam ou descrevem coisas podem ser modelados como Value Objects em vez de Entidades.

Value Objects são mais fáceis de testar, criar, usar, otimizar e manter.

Características para decidir se um conceito é um Valor:
- Ele quantifica ou descreve uma coisa do domínio
- Ele pode ser mantido como imutável
- O conceito totalizado é composto por atributos relacionados que devem ser tratados como uma unidade integral
- É completamente substituível
- Pode ser comparável com outros valores (princípio da equiparação)
- Ele é suprido sem qualquer tipo de Side-Effect (Alterações no seu estado)

### Como identificar um Valor (Value Object)

Para manter sua perspectiva sobre o modelo de domínio, você pode se fazer estas perguntas:
1. O conceito que estou modelando é uma coisa no domínio que mede, quantifica ou descreve uma coisa como uma de suas propriedades?
2. Se modelado corretamente para descrever um elemento do domínio, esse conceito de modelo deve possuir todas ou a maioria das características de valor descritas anteriormente?
3. Estou considerando o uso de uma Entidade no modelo somente porque o modelo de dados subjacente deve armazenar o objeto de modelo de domínio como uma entidade?
4. Estou usando uma Entidade porque o modelo de domínio requer identidade exclusiva, me preocupo com instâncias individuais e preciso gerenciar uma continuidade de mudança ao longo do ciclo de vida do objeto?
Se suas respostas forem "Descreve, Sim, Sim e Não", você deverá usar um Valor (Value Object).

## Conceito totalizado (Conceptual Whole)

Um Value Object pode possuir apenas um, uns poucos ou um número de atributos individuais, cada qual é relacionado aos outros. Cada atributo contribui uma importante parte do todo para coletivamente os atributos descreverem o conceito totalizado.

Exemplo disso é o Valor {5000 dólares} que apresenta dois atributos: o atributo 5000 e o atributo dólares. Separados cada um desses atributos descrevem alguma coisa ou nada em especial. Juntos esses atributos são um conceito totalizado que descreve valores monetários.

> [!tip] Value Objects e Contextos delimitado e Linguagem onipresente
> Tanto o nome das propriedades quando o nome do Valor devem ser determinados apenas depois de estabelecerr o Contexto limitado e a Linguagem onipresente.

O construtor de uma classe Valor apresenta uma efetividade no conceito como um todo. Junto com a imutabilidade, os construtores da classe precisam garantir que o Valor Totalizado (Value Whole) seja criado em uma operação.

> [!tip] Escopo dos Value Objects
> Quando possível, o limite da dependência de um Valor deve ser contido nele mesmo ou nos tipos dos seus atributos.
> Fazer um Valor depender de uma entidade que não é imutável pode causar Side-Effects indesejados.

## Valores padrão (Standard Types)

> [!info] Definição de Standard Types
> São descrição de objetos que indicam os tipos das coisas. Os Standard Types distinguem Valores ou Entidades de outros tipos da mesma coisa.

Um exemplo de Standard Types é: em um domínio financeiro existe a possibilidade de ter um tipo de Moeda (Valor) para restringir um Valor Monetário a um montante dentro de uma moeda mundial específica. Nesse caso, o Standard Types forneceria um Valor para cada uma das moedas do mundo: AUD, CAD, CNY, EUR, GBP, JPY, USD e assim por diante. Usar um Standard Types aqui ajuda a evitar moedas falsas.

Dependendo do nível de padronização, esses valores podem ser mantidos apenas no nível de aplicação, ou escalarem para bases de dados corporativas compartilhadas ou até nacionais ou internacionais.

Os Standard Types geralmente não devem ser mantidos dentro do Contexto delimitado que os consome. Os Standard Types amplamente utilizados normalmente devem ser mantidos em um contexto separado, com atualizações cuidadosamente planejadas para os consumidores.

Pode ser útil introduzir um Serviço ou Fábrica para criar instâncias estaticamente conforme necessário. Nesse caso, seu Serviço ou Fábrica forneceria instancias imutáveis criadas estaticamente para cada Standard Type.

> [!tip] Melhor exemplo de código
> Aqui está uma maneira de pensar sobre esse estilo de teste: Se estivéssemos escrevendo um manual do usuário para o modelo, forneceríamos esses testes como os exemplos de código mais apropriados para como os clientes devem usar esse objeto de domínio específico.

> [!tip] Testando imutabilidade
> Uma forma de garantir a imutabilidade de um objeto é criar uma cópia do objeto no início do teste e comparar no final para ver se o objeto ainda continua igual (princípio da equiparação) após as operações.


## Implementando Value Objects

Somente o(s) construtor(es) primário(s) usa(m) autodelegação para definir propriedades/atributos. Nenhum outro método pode autodelegar-se nos métodos setter. Como todos os métodos setter em um valor (value object) são sempre escopo privado, não há oportunidade para atributos serem expostos à mutação pelos consumidores. Esses são dois fatores importantes na manutenção da imutabilidade dos Valores.

O segundo construtor é usado para copiar um valor existente para criar um novo, ou o que é chamado de construtor de cópia.

Um método de Acessor — getter ou setter — não precisa ser limitado à definição de um campo de instância. Ele também pode executar asserções (Guards) importantes [Evans], um elemento chave para o desenvolvimento de software bem-sucedido em geral e modelos DDD especificamente.

## Persistindo Valores (Value Objects)

> [!tip] O modelo de dados deve ser subordinado
> Projete seu modelo de dados por causa de seu modelo de domínio, não seu modelo de domínio por causa de seu modelo de dados.
> DDD não se trata de estruturar dados de forma normalizada. Trata-se de modelar a Linguagem Ubíqua em um Contexto Delimitado consistente.

- ORM e Valores singulares
- ORM e múltiplos valores serializados em uma única coluna
- ORM e muitos valores apoiados por uma entidade de banco de dados
- ORM e muitos valores apoiados por uma tabela de junção
- Objetos ORM e Enum-as-State