# Modern Software Engineering

--- start-multi-column: ExampleRegion1  
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

Modern Software Engineering foi escrito pelo autor Dave Farley.

Nesse livro Dave trás uma perspectiva mais científica do desenvolvimento de software, apontando que o modelo convencional apresenta muitos problemas que podem ser superados a partir de uma análise sistemática da engenharia.

--- end-column ---

> [!info] Principais referências
> - Autores: Dave Farley
>- 

--- end-multi-column
O livro é dividido em 4 partes

- Parte 1: O que é Engenharia de Software?
- Parte 2: Otimizando para o aprendizado
- Parte 3: Otimizando para gerenciar complexidade
- Parte 4: Ferramentas para auxiliar na engenharia em software

# Premissa

## Parte 1: O que é Engenharia de Software

> [!quote] Engenharia de software é a aplicação de uma abordagem empírica e científica para encontrar soluções eficientes e econômicas a problemas práticos em software.

Na primeira parte do livro Dave tenta definir o que ele que dizer em relação a abordagem de Engenharia que ele propõe. Ele utiliza vários exemplos de problemas que a abordagem manual (hand-craft) trás para o desenvolvimento de software.

Os engenheiros de software ele define como **especialistas em aprendizado e em gerenciar complexidade.**

Em relação as competências do aprendizado são necessárias a utilização de 5 técnicas:

- Iteração
- Feedback
- Avanço Incremental
- Experimentação
- Empiricismo

Em relação as competências de gerenciamento de complexidade utilizamos o seguinte:

- Modularidade
- Coesão
- Separação de responsabilidades
- Abstração
- Baixo acoplamento

Quando aplicadas essas técnicas de aprendizado e gerenciamento de complexidade temos resultados profundos que produzem software de maior qualidade, mais rápido onde as pessoas que os desenvolve se sintam mais satisfeitas, menos estressadas.

Um ponto de atenção em relação a essas medidas é que elas podem ser facilmente transformadas em decisões arbitrárias e anti-democráticas, isso é exatamente o contrário do que queremos no ambiente de trabalho.

> [!info] Engenharia de Software é um problema de design não de produção
> Dave dá luz ao fato de que engenharia de software não é um problema de produção, o custo de produzir (construir) é irrisório, assim o problema real que a engenharia quer resolver e é o problema de projeto.
> 
> Assim, não queremos que nosso software tente simular a realidade, nosso software é a própria realidade do nosso sistema, nós podemos verificar o comportamento dele com baixo custo, e podemos mudar esse comportamento a hora que quisermos. Dessa forma, o que nos importa de verdade é resolver problemas da forma mais eficiente (pelas técnicas de aprendizado e complexidade).

Um aspecto do desenvolvimento de software voltado a técnicas de engenharia é a **precisão e escalabilidade**. Por meio de testes automatizados podemos ter um capacidade alta de precisão do comportamento do software. Em times focados em engenharia eles usam medidas acuradas em vez de esperar que algo catastrófico aconteça.

#### Ilusão do progresso

Uma questão que Dave trás no texto é sobre o avanço do desenvolvimento. Ele não é baseado em linhas de códigos ou máquinas que estão executando o software. Isso seria uma ilusão de progresso.

Assim, pensar no que estamos projetando e se realmente isso terá o impacto desejado é o **real progresso do projeto**. E para isso é necessário fazermos as perguntas certas, confrontando nossas verdades de forma cética em relação as ideias do projeto, podendo assim julgar de um lugar ideias que o são boas e ideias que não.

Isso tudo está amplamente relacionada a ideia de aprendizado e gerenciamento de complexidade.

Nesse sentido é bem comum ver times com agendas muito apertadas tendo problemas com a qualidade e manutenção de seus sistemas, onde não conseguem identificar ideias que realmente causem impacto nos seus usuários, e eles **falham em separar tempo para eles mesmos aprenderem sobre seu domínio, a tecnologia, e por conseguinte perdem oportunidades** para criar algo ótimo em produção.

#### A importância da medição

Existem métricas que podem ser irrelevantes como é o caso de velocidade ou até ser prejudiciais como linhas de código ou cobertura de testes. Essas duas métricas não medem nenhum tipo de produtividade.

Existem duas métricas que tem uma grande correlação de times de alta performance que são: **estabilidade (stability) e vazão (throghput).**

Estabilidade diz respeita a duas coisas:

- **Taxa de falha de uma mudança:** a taxa cuja uma mudança no sistema pode criar um defeito em um ponto particular do processo.
- **Tempo de recuperação de falha:** Quanto tempo é necessário para recuperar de uma falha em um ponto particular do processo.

Vazão:

- **Tempo de condução (Lead time):** tempo de uma ideia virar software em produção
- **Frequência:** com qual frequência mudanças são publicadas em produção.

Essas métricas são **oportunidades do time aprender**. Quanto maior a vazão mais chance a equipe tem de aprender sobre seu domínio, já que mais mudanças estão sendo utilizadas pelos seus usuários.

> [!quote] A rota para a velocidade é desenvolver software de alta qualidade, e a rota para software de alta qualidade é velocidade de resposta (feedback), e a rota para ambos é uma ótima engenharia.


## Parte 2: Otimizando para o aprendizado 

Na segunda parte do livro Dave desenvolve melhor os elementos que ele entender como principais na capacidade de aprendizado durante o processo de desenvolvimento de software.

### Trabalhando iterativamente

Iteração é definida coo "um procedimento cuja repetição de uma sequência de operações produz resultados sucessivamente próximos ao resultado desejado".

Uma das principais vantagens de trabalhar iterativamente é **estreitar o foco das mudanças** o que leva a pensar em menores pacotes de trabalhos que devem ser melhor modulados e com uma separação de responsabilidades maior.

Uma ideia comum ao ágil é: "Progresso é difícil de medir, mas podemos medir funcionalidades já finalizadas, então que trabalhemos em pequenas funções para que possamos ver quando elas estiverem finalizadas". Esse pensamento nos permite entender melhor o que estamos tentando construir com o software já construído, em vez de apenas ficarmos idealizando o que queremos construir.

Nem sempre o melhor valor entregue está de acordo com o levantamento inicial e isso deve ser **sempre questionado antes** do cliente descobrir que algo é prioritário que não foi mapeado.

Aumentar o ritmo de mudanças nos permite aprender mais, como:

- Esse design está funcionando?
- Nossos usuários estão gostando da funcionalidade?
- O sistema é rápido o suficiente?
- Nós eliminamos todos os bugs?
- Este é um bom código para se trabalhar?

Todas essas perguntas só podem ser respondidas depois que o produto foi entregue, qualquer coisa antes é apenas especulação.

![[Ciclo de iteração em Continuous Delivery.png]]

> [!tip] Adaptação como resultado da otimização para o aprendizado
> Requer um pulo intelectual difícil reconhecer que o paradigma que você está operando é fundamentalmente o errado. Isso ainda é mais verdade quando o mundo todo diz que o paradigma que você opera está correto.
> 
> O mundo não funciona da forma que idealizamos do processo e sim de como o processo se materializa. Nós não somos bons em montar planos precisos, entender as necessidades dos usuários, ou executar o plano sem desvios.
> 
> Por isso, trabalhar em pequenos passos com um custo de cada passo pequenos, nos permite entender quais ideias são boas e quais são ruins, de forma que não é um gasto de energia grande demais mudar qualquer coisa na nossa forma organizativa.

Uma abordagem iterativa para planejamento e execução nos permite ter sempre o quadro mais atualizado da situação que estamos, em vez de algumas versões preditivas, teóricas e sempre imprecisas da situação.

Uma forma de trabalhar iterativamente é utilizadar das práticas de Continuous Integration (CI) e Test-driven development (TDD).

> [!warning] Dúvida?
> Quando definir que uma mudança já pode ser commitada?
> Mesmo que a funcionalidade que ela faça parte não está completa, ainda assim tem que ser commitada, como isso funciona? Só vamos deixando trabalho incabado pelo caminho?


