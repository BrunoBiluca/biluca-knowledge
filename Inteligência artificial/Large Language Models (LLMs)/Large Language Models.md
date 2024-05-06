---
tags:
  - inteligência_artificial
---
# Large Language Model

São modelos treinados em grandes quantidades de dados textuais e têm milhões ou até bilhões de parâmetros, o que lhes permite capturar nuances mais sutis da linguagem natural.

São construídos utilizando arquiteturas avançadas de redes neurais, como as redes neurais transformadoras.

Exemplos de modelos que utilizam esse paradigma são:
- GPT (Generative Pre-trained Transformer) da OpenAI
- BERT (Bidirectional Encoder Representations from Transformers) do Google
- T5 (Text-to-Text Transfer Transformer) do Google

Formas de melhoria de respostas gerados por LLMs:
- [[RAG (Retrieval Augmented Generation)]]

# Transfer Learning (aprendizado por transferência)

> [!info] Definição
> Transfer learning, ou aprendizado por transferência, é uma técnica usada em modelos de linguagem como LLMs (Large Language Models) para aproveitar o **conhecimento prévio adquirido em uma tarefa específica e aplicá-lo em uma tarefa relacionada**. 

Em vez de treinar um modelo do zero para cada nova tarefa, o modelo pré-treinado é ajustado ou fine-tuned com dados específicos da nova tarefa. Isso geralmente resulta em uma redução significativa no tempo e nos recursos necessários para treinar um modelo eficaz para a nova tarefa. 

Um exemplo comum de transfer learning em modelos de linguagem é o uso de um modelo pré-treinado, como o GPT (Generative Pre-trained Transformer), para realizar uma tarefa específica, como classificação de texto ou geração de resumos.

Por exemplo, suponha que você tenha um conjunto de dados com avaliações de filmes e queira construir um classificador para prever se uma avaliação é positiva ou negativa. Em vez de treinar um modelo do zero, você pode utilizar um modelo de linguagem pré-treinado, como o GPT, e ajustá-lo para a tarefa de classificação de sentimentos.

Nesse caso, você alimentaria o modelo pré-treinado com os dados de avaliações de filmes, junto com suas respectivas etiquetas de sentimento (positivo ou negativo), e ajustaria os pesos do modelo para que ele aprendesse a associar características dos textos às classes de sentimentos. ==O modelo pré-treinado já teria aprendido padrões linguísticos gerais durante o pré-treinamento==, o que facilitaria o aprendizado da tarefa específica de classificação de sentimentos.

