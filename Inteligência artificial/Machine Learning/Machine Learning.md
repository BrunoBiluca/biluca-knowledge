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

# Fluxo de trabalho em Machine Learning

Assim que definimos a tarefa de previsão seguimos os seguintes passos para desenvolver o trabalho

- Ingest
- Analyze
- Transform
- Train
- Model
- Evaluate
- Deploy
- Predict

## Dados de treinamento

O processo de aprendizado de máquina começa com a coleta e o processamento de dados de treinamento. Esse é sem dúvida o estágio mais crítico do fluxo de trabalho de ML, pois o modelo irá se comportar de acordo com a qualidade dos dados de treinamento utilizados.

Para fazer o treinamento podemos utilizar dois tipos de dados:

- rotulados: conjuntos de dados categorizados que representam algum tipo de saída do modelo. Por exemplo: uma imagem com o rótulo de cachorro.
- não-rotulados: conjunto de dados que não tem nenhum tipo de saída relacionada. Por exemplo: coleção de imagens ou anotações.

A disposição desses dados também influencia no processo de treinamento:

- Dados estruturados: dados organizados e formatados em algum forma predefinida, por exemplo: arquivos tabulares ou séries temporais
- Dados não-estruturados: não apresentação uma estrutura ou formato predefinida, por exemplo: imagens, áudios, vídeos e texto não formatado. Para dados não-estruturados é necessário um tipo de aplicação mais complexa de algoritmo chamado [[Aprendizado profundo (Deep Learning)]].
## Algoritmo de ML

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

## Modelo

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


