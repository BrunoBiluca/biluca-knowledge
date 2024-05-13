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

### Aspectos necessários para uma resposta precisa e útil de uma LLM

O processo de geração de respostas precisas e úteis precisa ser bem sucedido em vários aspectos da pergunta como:

- Compreensão da pergunta
- Recuperação de informações relevantes
- Compreensão do contexto
- Raciocínio e inferência
- Geração de resposta
- Avaliação da Qualidade da Resposta

## Parâmetros

> [!info] Definição de parâmetros em modelos de linguagem
> Os parâmetros são os elementos ajustáveis que definem o comportamento do modelo. Eles consistem nos pesos das conexões entre as unidades neuronais em redes neurais profundas.
> 
> A capacidade de fazer previsões ou geração de texto vem da quantidade de parâmetros dentro de um modelo.

# Transfer Learning (aprendizado por transferência)

> [!info] Definição
> Transfer learning, ou aprendizado por transferência, é uma técnica usada em modelos de linguagem como LLMs (Large Language Models) para aproveitar o **conhecimento prévio adquirido em uma tarefa específica e aplicá-lo em uma tarefa relacionada**. 

Em vez de treinar um modelo do zero para cada nova tarefa, o modelo pré-treinado é ajustado ou fine-tuned com dados específicos da nova tarefa. Isso geralmente resulta em uma redução significativa no tempo e nos recursos necessários para treinar um modelo eficaz para a nova tarefa. 

Um exemplo comum de transfer learning em modelos de linguagem é o uso de um modelo pré-treinado, como o GPT (Generative Pre-trained Transformer), para realizar uma tarefa específica, como classificação de texto ou geração de resumos.

Por exemplo, suponha que você tenha um conjunto de dados com avaliações de filmes e queira construir um classificador para prever se uma avaliação é positiva ou negativa. Em vez de treinar um modelo do zero, você pode utilizar um modelo de linguagem pré-treinado, como o GPT, e ajustá-lo para a tarefa de classificação de sentimentos.

Nesse caso, você alimentaria o modelo pré-treinado com os dados de avaliações de filmes, junto com suas respectivas etiquetas de sentimento (positivo ou negativo), e ajustaria os pesos do modelo para que ele aprendesse a associar características dos textos às classes de sentimentos. ==O modelo pré-treinado já teria aprendido padrões linguísticos gerais durante o pré-treinamento==, o que facilitaria o aprendizado da tarefa específica de classificação de sentimentos.

# Modelo Transformer

O modelo Transformer tem um componente chave definido pela atenção de múltiplas cabeças (multi-head attention) que permite ao modelo juntar informações em diferentes posições da entrada requisitada (input) prestando atenção tanto a dependências locais quanto globais. Isso permite capturar representações mais complexas e dependências na sequência de entrada (input) de forma mais efetiva.

### Vetores de embedding

> [!info] Definição
> Vetores de embedding são representações dos pesos das palavras que quantifica o quão bem o modelo está performance em um determinada tarefa, como prever a próxima palavra em uma sequência de texto.

Abordagens comuns para aprender os vetores de embedding de palavras:

1. **Embeddings de palavras pré-treinados**: Utilizar embeddings de palavras pré-treinados, como Word2Vec, GloVe ou FastText, que foram treinados em grandes quantidades de texto não rotulado. 
    
2. **Aprendizado durante o treinamento**: Inicializar os embeddings de palavras com valores aleatórios e ajustá-los junto com os outros parâmetros do modelo durante o treinamento, usando retropropagação e algoritmos de otimização, como o gradiente descendente estocástico.
    
3. **Aprendizado contextual**: Usar modelos de linguagem pré-treinados, como BERT, GPT e XLNet, que são treinados para capturar o contexto e a semântica das palavras em uma sequência de texto. Esses modelos produzem embeddings de palavras contextuais que levam em consideração o contexto em que uma palavra ocorre.

### Exemplo de autoatenção

Exemplo da capacidade de autoatenção em modelos Transformer:

> [!quote] Considere a frase
> "O gato estava dormindo no sofá enquanto o cachorro brincava lá fora."

Quando o modelo processa essa frase usando o mecanismo de autoatenção, ele é capaz de capturar as relações entre palavras em toda a frase. Por exemplo:

- Para a palavra "dormindo", o modelo pode atribuir alta atenção às palavras "gato" e "sofá", pois elas estão intimamente relacionadas ao ato de dormir.
- Para a palavra "brincava", o modelo pode atribuir alta atenção às palavras "cachorro" e "lá fora", pois elas estão relacionadas à atividade de brincar.
- Além disso, o modelo também pode capturar relações entre palavras em diferentes partes da frase. Por exemplo, ele pode relacionar "gato" e "cachorro" como sendo animais, mesmo estando separados por outras palavras.