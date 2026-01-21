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

# Resumo

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

### Capítulo 4: Trabalhando iterativamente

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

### Capítulo 5: Feedback

Feedback not permite estabelecer uma fonte de evidência para nossas decisões

> [!info] Feedback pode ser definido como:
> A transmissão de informações corretivas ou avaliativas sobre uma ação, evento ou processo à fonte, controlador original

Uma abordagem TDD nos permite criar vários níveis possibilidades de obtenção de feedbacks sobre o comportamento do software.

Feedback pode ser aplicado em todos os aspectos de software, obter feedback sobre arquitetura, design de código, design do produto e outros elementos, permite tomar decisões que continuamente melhorem o projeto.

Exemplo de obtenção de feedback por elementos do software:

- Arquitetura
	- A publicação do software pode definir a forma que o software deve ser disponibilizado, como microsserviço ou monolito por exemplo
- Design de código
	- Obter informações sobre o estado do código permite identificar problemas em relação a modularidade, separação de responsabilidades, coesão, abstrações, acoplamentos
- Design de produto
	- Adicionar telemetria na utilização do produto de software nos permite entender quais funcionalidades usuários utilizam mais ou menos, possibilitando direcionar esforços de acordo com os objetivos do projeto.

> [!warning] Decisão guiada a dados pode ser uma péssima ideia também
> Dados podem apenas reforçar uma suposição, é importante entender se as métricas que estão sendo utilizadas são válidas para o contexto utilizado.
> Utilizar as métricas sem pensamento crítico podem apenas piorar a situação.

Dave recomenda a utilização das métricas DORA, principalmente Estabilidade e Vazão (Throughput) para avaliação do desenvolvimento de software.

#### Feedback no contexto de controle de versão

Existem duas maneiras mais difundidas de controle de versão no desenvolvimento de software:

- Continuous integration
	- Avaliação de cada mudança do sistema junto com todas as outras o mais frequente possível
- Feature branching
	- Branches permite que alterações sejam isoladas até estarem prontas para serem mescladas com a branch principal

Dave aqui trás um exemplo puxando sardinha para o lado do Continuous integration, que eu também acho mais eficiente. Mas o principal ponto é que uma abordagem de CI permite ter muito mais feedback sobre o comportamento do sistema que o modelo FB.


### Capítulo 6: Incrementalismo


### Capítulo 7: Empiricismo


### Capítulo 8: Sendo experimental

Podemos utilizar os nossos suposições onde são apropriadas, mas é importante projetar experimentos para testar essas suposições e melhorar.

> [!quote] Richard Feynman
> Ciência é acreditar na ignorância dos experts.
> 
> Não tenha respeito por qualquer tipo de autoridade; esqueça quem está falando e em vez disso olhe para a premissa iniciada, qual a conclusão proposta, e se pergunte, 'Isto é razoável?'

Ser experimenta pode ser definido por principalmente quatro características:

- **Feedback** - entender como os resultados serão providos de forma a claramente demonstrar o ponto que estamos pensando.
- **Hipótese** - precisamos ter uma ideia em mente a priori do que estamos tentando avaliar.
- **Medição** - temos que ter uma clara ideia de como iremos avaliar as suposições que estamos testando
- **Controle de variáveis** - precisamos eliminar o máximo de variáveis para entender os sinais que nosso experimento estão sendo coletados.

> [!quote] Richard Feynman
> Se a sua suposição discorda do experimento, então ela está errada!

Aceitar que suas suposições podem estar erradas é o centro do pensamento experimental e uma forma de garantir que estamos fazendo engenharia e não apenas adivinhação. Precisamos aceitar os dados que coletamos e ser críticos a seu respeito.

> [!warning] Cobertura de código
> Cobertura de código é algo amplamente utilizado, porém essa métrica esconde uma armadilha. 
> 
> É possível implementar testes que não tem verificações se o código funciona e isso leva ao aumento da cobertura de código.
> 
> Ou seja, essa é uma métrica que pode ser mais prejudicial do que benéfica, já que apresenta uma falsa confiança na base de código.

Ser experimental também faz parte da disciplina do aprendizado, mudar as métricas, variáveis e hipóteses é algo que deve ser incentivado durante o processo. Esse processo nos ajuda a entender se "estamos construindo as coisas certas" (aqui pensando em valor) já que temos controle que "estamos construindo as coisas de forma correta".

> [!tip] Continuous Delivery
> Trabalhar com software que esteja sempre em um estado pronto para publicação, nos permite maximizar o feedback e nos encoraja a trabalhar em pequenos passos de forma experimental.

Trabalhar de forma experimental, por meio de um uso efetivo de técnicas de automação de testes, de entrega contínua, infraestrutura como código, faz os nossos experimentos mais confiáveis e reprodutíveis. Mais do que isso, faz o nosso software ser mais determinístico, o que aumenta a sua qualidade.

#### Testes como ferramenta para experimentação

Utilizar a abordagem de TDD (Test Driven Development) nos permite utilizar os testes como uma ferramenta para experimentação.

Os testes são como uma hipótese que será avaliada, assim a implementação proposta pode ser considerada um experimento para provar se o design proposta é positivo ou negativo.

Isso vale para todos os níveis de abstração do software como testes de aceitação centrados no usuário (BDD - Behavior-driven development).

Software desenvolvidos utilizando essas técnicas tem uma redução significativa de bugs em relação a software desenvolvidos de maneira convencional. (Fontes: https://bit.ly/2LFixzS, https://bit.ly/2LDh3q3, https://bit.ly/3MurTgF)

#### Escopo de um experimento

Experimentos pode ser de várias formas, um tipo comum de experimento pode ser definido nos seguintes passos:

1. Pense sobre e caracterize o problema - "Eu decidi o comportamento que quero que meu sistema tenha".
	- Aqui podemos criar um caso de teste para esse comportamento
2. Forme uma hipótese - "Eu espero que meu teste falhe"
3. Faça uma previsão - "Eu espero que quando o meu teste falhe ele retorne essa mensagem"
4. Execute o experimento - "Eu executei o teste"