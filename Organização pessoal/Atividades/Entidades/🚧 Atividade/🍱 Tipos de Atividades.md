# 🍱 Tipos de uma [[🚧 Atividade]]

Como definido as execuções são atividades, dessa forma podemos ter vários tipos de atividades desempenhadas para alcançar os [[Organização pessoal/Atividades/Entidades/🌟 Valores]]. Cada tipo de execução pode ter conteúdos, critérios de aceite e tipos de refinamento diferentes.

É importante definir os tipos de execuções de forma a facilitar a criação do escopo. Uma execução de desenvolvimento tem como critérios de aceite implementações, enquanto uma execução de descoberta tem como resultado final a resposta de uma pergunta ou o levantamento de alguma questão.

Tipos

- **Tarefa**
- **Desenvolvimento**
- **Descoberta**
- **Estudo**

### Tarefa

**Tarefa** é o tipo mais simples de execução. Quando definimos uma tarefa a própria consequência de realizar a execução já é o objetivo final.

Uma tarefa precisa de pouco refinamento e deve ser destinada a execuções curtas e diretas.

#### Exemplos

- Controle de contas
	- A própria execução dessa tarefa já é o resultado esperado, que nesse caso é levantar os gastos e receitas do mês
- Controle de investimentos
	- A própria execução dessa tarefa já indica o resultado esperado, que nesse caso é fazer o controle dos investimentos

### Desenvolvimento

**Desenvolvimento** é um tipo de execução que foca na implementação de software de qualquer natureza. 

O refinamento de uma execução de desenvolvimento deve focar em definir o que será implementado utilizando vários casos de uso se necessário.

### Estudo

**Estudo** é um tipo de execução que foca no estudo de algum tema específico.

O refinamento desse tipo de execução deve focar em buscar um conjunto de conteúdos que deem conta de definir em relação aos critérios de aceite o tema.

### Descoberta

**Descoberta** é um tipo de execução que tem como objetivo verificar alguma questão que não se tem o conhecimento completo.

Execuções de descoberta não definem critérios de aceite como a entrega de algo concreto, os critérios de aceite nesses casos são mais relacionados a um relatório ou análise em relação ao tema. Também devem existir critérios de aceite como condições de parada na descoberta, já que um tópico levantado para descobrir pode desdobrar em muitos outros.

Bons critérios de aceite de Execuções de Descoberta são perguntas. Alguns exemplos são:
- Como seria o formato do escopo durante a criação de um Épico? (Documentação)

O refinamento de execuções de Descoberta foca em definir bem o objetivo proposto e os tipos de informações que precisamos levantar ao final. Um escopo fechado para esse tipo é muito importante para não executarmos indefinidamente a descoberta.

Execuções de descoberta podem ser utilizadas principalmente para mitigar o risco de executar outras atividades, como por exemplo:

- garantir o fechamento do escopo de outras execuções ou épicos
- garantir que o impacto seja realmente o que estamos pensando
- evitar perder tempo com execuções aparentemente fácies onde uma busca no google é possível verificar uma dificuldade de executá-las

#### Exemplos

- Levantamento de possibilidades para a v2 do Biluca Finanças
	- Essa execução de descoberta foca em entender que tipo de elementos são interessantes para uma segunda versão do Biluca Finanças. 
	- Posso chegar no final dessa execução e perceber que não temos nada interessante para uma segunda versão.
	- Além de fechar um escopo também nos evita perder tempo com execuções duvidosas ou não claras.

- Levantamento inicial da arquitetura do Biluca Finanças
	- Durante essa execução o foco era garantir uma arquitetura funcional e as tecnologias necessárias para a criação da aplicação Biluca Finanças
	- Como resultado foi entregue um documento com direcionamentos para a criação das demais execuções do projeto

- Assistências por IA no VSCode
	- Essa execução visava levantar uma possível ferramenta de IA generativa para auxiliar no desenvolvimento de código pelo VSCode
	- Após a avaliação de alguns tipos foi decidido a utilização de uma ferramenta específica