---
tags:
  - machine_learning
---
# Machine Learning

Casos de uso da aplicação de Machine Learning

- [[Classificação]]

Os algoritmos são principalmente recomendados para casos onde:

- Codificar as regras é um desafio: são muitas variáveis e um conjunto de regras fixo seria ineficiente como solução.
- Escalar o projeto é difícil: extrair informações de um conjunto limitado de documentos é possível aplicando heurísticas, para milhões de documentos seria ineficiente e muito oneroso.

# Dados de treinamento

O processo de aprendizado de máquina começa com a coleta e o processamento de dados de treinamento. Esse é sem dúvida o estágio mais crítico do fluxo de trabalho de ML, pois o modelo irá se comportar de acordo com a qualidade dos dados de treinamento utilizados.

Para fazer o treinamento podemos utilizar dois tipos de dados:

- rotulados: conjuntos de dados categorizados que representam algum tipo de saída do modelo. Por exemplo: uma imagem com o rótulo de cachorro.
- não-rotulados: conjunto de dados que não tem nenhum tipo de saída relacionada. Por exemplo: coleção de imagens ou anotações.

A disposição desses dados também influencia no processo de treinamento:

- Dados estruturados: dados organizados e formatados em algum forma predefinida, por exemplo: arquivos tabulares ou séries temporais
- Dados não-estruturados: não apresentação uma estrutura ou formato predefinida, por exemplo: imagens, áudios, vídeos e texto não formatado. Para dados não-estruturados é necessário um tipo de aplicação mais complexa de algoritmo chamado [[Aprendizado profundo (Deep Learning)]].
# Algoritmos de ML

Com os dados de treinamento escolhemos os algoritmos que iremos aplicar ao problema que queremos resolver.

Existem vários tipos de algoritmos de acordo com o domínio do problema que queremos resolver. Basicamente eles são divididos em 3 tipos de algoritmos:

- **supervisionados** são treinados com pares de entrada-saída, onde o algoritmo aprende a mapear entradas para saídas
	- [[Regressão]]
	- [[Árvore de decisão]]

- **não supervisionados** são treinados em dados sem rótulos e buscam encontrar padrões e estruturas nos dados, como agrupamentos ou associações
	- Agrupamento em clusters, exemplo k-means clustering
	- Redução da dimensionalidade usada para reduzir o número de atributos ou dimensões em um conjunto de dados, preservando as informações ou padrões mais importantes.

- **semi-supervisionados** são uma combinação de ambos, usando dados rotulados e não rotulados durante o treinamento

- **aprendizado por reforço** é outro tipo de algoritmo que foca em melhorar o modelo continuamente extraindo informações pertinentes de repetições anteriores. É amplamente útil quando a recompensa de um resultado desejado é conhecida, mas o caminho para alcançá-la não é. Por exemplo, no simulador do AWS DeepRacer, o agente é o carro virtual, e o ambiente é uma pista de corrida virtual. As ações são aceleração e direção do carro. O objetivo é completar a pista o mais rápido possível e sem se desviar dela.
	- redes neurais
	- máquinas de vetores de suporte (SVM)

# Modelo

> [!info] Definição
> Um modelo de machine learning é uma representação matemática de um processo ou sistema, desenvolvida com base em algoritmos de aprendizado de máquina e dados de treinamento. Ele é usado para fazer previsões ou tomar decisões sem ser explicitamente programado para fazê-lo.

 Em essência, um modelo de machine learning aprende padrões nos dados durante o treinamento e usa esses padrões para fazer previsões ou tomar decisões sobre novos dados.

Podemos fazer predições de duas formas:

- Inferências em lotes: quando pegamos uma grande quantidade de dados para analisar de uma única vez.
- Inferências em tempo real: quando tomamos decisões em resposta a novas informações a medida que elas chegam.

### Modelos multimodais

> [!info] Definição
> São modelos capazes de processar informações de várias modalidades, incluindo imagens, textos e vídeos.
> 
> Por exemplo, é possível enviar para o modelo a foto de um prato de cookies e pedir que ele mostre uma receita disso.


### Desafios

#### Precisão

Um dos principais problemas em aplicações com IA generativa é a precisão do modelo. O **objetivo** é obter um modelo treinado com o menor viés e a menor compensação de variância para um conjunto de dados.
 
Em relação a precisão do modelo podemos ter problemas relacionados ao **viés dos dados** utilizados para o treinamento do modelo, resultando em um modelo muito básico que não possui recursos para uma atuação mais ampla. Também podemos ter problema relacionado a **variância (sensibilidade)** do modelo, que resulta em modelos que apresentam flutuações nos índices de precisão, principalmente quando o modelo é bom para os dados de treinamento e ruim para os dados de avaliação (problema do sobreajuste). 


![[Exemplos de compensação entre viés e variância.png|Exemplos de compensação entre viés e variância, perceba o modelo que queremos construir é o balanceado|500]]

Existem alguma técnicas para superar os erros entre viés e variância:

- Validação cruzada (teste e validação): principalmente utilizada para detectar sobreajustes, avaliar modelos por meio de um subconjunto dos dados de entrada e avalia no subconjunto complementar dos dados
- Aumentas os dados
- Regularização: método para penalizar valores extremos e ajudar a evitar modelos lineares
- Modelos mais simples: modelos mais simples ajudam no sobreajuste, modelos simples demais podem estar subajustados
- Redução de dimensão (análise de componentes principais)
- Interrupção do treinamento: encerrar o treinamento mais cedo para que o modelo não memorize os dados.

Um boa analogia para entender o viés e a variância é um alvo.

![[Exemplo entre viés e variância com  um alvo.png|Aqui um exemplo da relação entre viés e variância de um modelo ML|500]]

# Fluxo de trabalho em Machine Learning

Assim que definimos a tarefa de previsão seguimos os seguintes passos para desenvolver o trabalho

- Identificação e definição dos problemas
- Processamento de dados (coleta dos dados, transformações e análises)
- Desenvolvimento do modelo (treinamento, ajustes e avaliação)
- Implantação do modelo (publicação e utilização)
- Monitoramento
- Retreinamento do modelo

> [!tip] Qualidade do modelo
> Usando testes A/B ou a técnica de implantações canárias, os desenvolvedores podem experimentar duas ou mais variantes de um modelo e ajudar a atingir as metas de negócios.