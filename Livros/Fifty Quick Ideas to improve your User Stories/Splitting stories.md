#user_stories

Nesse capítulo é discutido principalmente algumas técnica para melhorar o refinamento de uma Histórias e sua definição.

Esse tipo de técnica é muito importante para dar visibilidade e melhorar a priorização do trabalho dentro de um projeto. Refinar uma História significa extrair a melhor definição de valor que ela entrega para um grupo específico de usuários ou stakeholders que esse projeto está impactando.

## Start with the outputs
Uma das principais dificuldades para dividir entregáveis é definir pequenas peças que entregam valor independentemente em Histórias de usuário.

Uma das técnicas propostas quando esse tipo de situação acontece é começar a pensar nas Histórias pelo resultado gerado. Assim podemos quebrar cada um desses resultados esperados em partes menos e separar em pequenas Histórias.

Além disso pensando nos resultados gerados podemos excluir muitas dos inputs no sistemas por parte do usuário, geralmente essas são as partes que mais consomem tempo de desenvolvimento.

Essa estratégia é especialmente bem sucedida quando existe dentre os entregáveis algum valor crítico. Esse valor crítico pode ser adquirido mesmo que nem todos os inputs do sistemas estejam prontos, entregando assim muito valor ao usuário final.


## Forget the walking skeleton - put it on crutches

Um Walking Skeleton é uma pequena implementação do sistema que performa uma funcionalidade final. Não precisa necessariamente de utilizar a arquitetura final, porém deve integrar componentes principais. Assim a arquitetura e a funcionalidade podem evoluir em paralelo.

A ideia é entregar a interface de usuário primeiro com o mínimo de arquitetura. Com uma interface que funcione igual a versão final evita que os usuários tenham qualquer tipo de surpresa desnecessária e assim a arquitetura do sistema pode ser evoluída sem que eles percebam qualquer alteração.

## Narrow down the customer segment

> Não entregue a todos 2% do que eles querem, em vez disso entregue 2% dos usuários tudo que eles querem

Selecionar o segmento de usuários que cada história irá impactar leva a entregar mais valor mais rápido. Além disso é possível confirmar hipóteses que serão utilizadas para outros grupos maiores de usuários e refinar melhor essas histórias.

Uma forma de realizar isso é definir múltiplas dimensões de usuários e encontrar um conjunto de histórias que satisfaça um pequeno grupo. Assim, esse grupo será totalmente coberto o que nos traz bastante informação de como deve seguir para Histórias para grupos maiores.

## Split by examples of usefulness

Uma outra forma de quebrar histórias é quebrar a complexidade técnica até ter Histórias que os valores podem ser entregues de forma iterativa. Esse tipo de técnica é muito bem sucedida quando já existe um sistema legado que deve ser substituído e os usuários já o estão utilizando.

Em vez de construir as funcionalidades de uma forma que todos os usuários possam usar tudo que já está implementado no sistema legado, podemos escolher um sub grupo de usuários e entregar parte do valor de cada História para esse grupo. Essas funcionalidades podem então ser evoluídas até que todo o conjunto de Histórias sejam entregues.

Uma das formas de alcançar isso é definir alguns exemplos que não envolvem nenhum risco de implementação, e começar a construção por eles. Assim os usuários podem optar entre a forma antiga ou a forma nova de executar essa funcionalidade.

## Split by capacity

Definir entregas pela sua capacity (capacidade) é uma boa forma de entregar valor como versões mais simples do produto final. Versões mais simples precisam de componentes mais simples para serem entregues. Dessa forma é possível já entregar valor ao mesmo tempo que evoluímos o produto.

Quebrando a capacidade das histórias podemos chegar em soluções mais simples que impactem um grupo menos de usuário, porém isso nos permite entregar valor mais rápido para esse grupo de usuários.

## Start with dummy, then move to dynamic

> O valor real entregue por um software está em seus outputs e não nos seus inputs.

Quebrar histórias de forma a trabalhar com hard-code primeiro, habilita o desenvolvimento a avançar sem a necessidade resolver problemas arquiteturais.

Qualquer informação ou configuração que seja necessária para entregar um valor, primeiramente ela deve ser pensada com uma informação dummy (hard-coded). Depois que essa informação é necessária em um segundo local, então deve ser pensada em toda a sua complexidade e questões de arquitetura devem ser devidamente resolvidas.

> [!tip] Breve pensamento sobre Over-Engeeniering
> Qualquer tipo de movimento arquitetural prematuro pode levar a implementações desnecessárias e desperdício de tempo de desenvolvimento.
> Ao mesmo tempo nenhum movimento arquitetural feito, pode levar a uma sucessão de erros e atrasos no desenvolvimento do projeto.
> 
> Então, a regra é um pouco droga um pouco alface.


## Simplify outputs

Para sistemas complexos simplificar os outputs gerados pode uma História pode reduzir muito o risco e tempo de desenvolvimento.

Uma forma de alcançar isso é quebrar uma História que entrega um determinado output e vários formatos, cada formato ganha então uma História específica. Outra forma é ignorar passos de segurança, criptografia, e outros garantidores que estão no meio do caminho e entregar algo que não tenha nenhum tipo de risco para o negócio.

Também é possível simplificar a coleta de dados que não são importantes para o negócio, e lidar com eles de forma transiente. Quando esses dados foram de alguma for relevantes uma nova História e criada para entregar a persistência desses dados.

## Split learning from earning

#planejamento_de_projetos/incidental_work 

Separe Histórias de aprendizado de histórias de entrega.

> Histórias de aprendizado ajudam os stakeholders a planejar melhor, enquanto Histórias de entrega ajudam a entregar valor para os usuários finais.

Histórias de aprendizado são muito importantes para refinar algum tipo de conhecimento do produto durante o desenvolvimento. Porém esse tipo de Histórias são complexadas de determinar Critérios de aceite e podem ter descrições vagas e imprecisas levando a dúvidas e surpresas.

Uma forma de lidar com esse tipo de Histórias é definir junto aos stakeholder critérios de aceite de forma a aceitar ou rejeitar o trabalho e então definir um orçamento de tempo para desenvolver esse tipo de aprendizado. O orçamento para esse tipo de História depende da quantidade e importância da informação coletada.

Definir um prazo transforma uma História de aprendizado em algo vaga e incontrolável para algum factual.

## Extract basic utility

Extrair utilidade significa dar ao usuário final uma interface mínima e mais utilidade para esse mínimo de utilizada desenvolvida. Esse tipo de método deve ser utilizado como um dos últimos recursos para quebrar uma História, já que pode gerar expectativas equivocadas em relação ao produto.

Essa técnica deve ser principalmente utilizada quando o negócio por trás da interface ainda não está totalmente claro e então ele pode ser simplificado para entregar algum tipo de utilidade para o usuário enquanto as questões de negócio são refinadas.

## When all else fails, slice the hamburguer

A História em forma de Hamburguer é uma técnica de facilitação que ajuda times a pensar orientados a pequenos valores quando eles estão travados pensando em aspectos técnicos e casos de uso de tudo ou nada.

Essa técnica quebra esses aspectos técnicos em pequenas listas e então opções para cada uma dessas listas são levantadas. Essa divisão ajuda o time a quebrar a complexidade técnica de cada histórias e seus usuários impactados. Depois disso são levantadas as opções que entregam valor para um grupo pequeno de usuários. Essa solução pode futuramente ser generalizada para todos os usuários.