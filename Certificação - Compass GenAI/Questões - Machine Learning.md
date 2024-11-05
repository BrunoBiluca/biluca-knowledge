## Machine Learning
#### What is a Machine Learning model?

É uma representação matemática de um processo ou sistema, desenvolvida com base em algoritmos de aprendizado de máquina e dados de treinamento. Ele é usado para fazer previsões ou tomar decisões sem ser explicitamente programado para fazê-lo.

#### What are language models?

São um tipo específico de modelo de machine learning que é treinado para entender e gerar texto em linguagem natural. Eles são projetados para aprender a estrutura e as características da linguagem humana a partir de grandes quantidades de dados textuais.

Podem ser construídos utilizando diferentes arquiteturas de redes neurais:
- Redes neurais recorrentes (RNNs)
- Redes neurais convolucionais (CNNs)
- Redes neurais transformadores (Transformers)

#### What are Large Language Models?

São modelos treinados em grandes quantidades de dados textuais e têm milhões ou até bilhões de parâmetros, o que lhes permite capturar nuances mais sutis da linguagem natural.

São construídos utilizando arquiteturas avançadas de redes neurais, como as redes neurais transformadoras.

Exemplos de modelos que utilizam esse paradigma são:
- GPT (Generative Pre-trained Transformer) da OpenAI
- BERT (Bidirectional Encoder Representations from Transformers) do Google
- T5 (Text-to-Text Transfer Transformer) do Google

#### What is a Decision Tree in Machine Learning?

Uma árvore de decisão é um modelo de machine learning que é utilizado tanto para tarefas de classificação quanto para tarefas de regressão. O objetivo é criar divisões que melhor separam as diferentes classes ou categorias no conjunto de dados.

Nessa representação cada nó interno representa um atributo (ou característica), cada ramo representa uma decisão com base nesse atributo, e cada folha representa o resultado ou a decisão final.

#### What criterion is used to split in a Decision Tree?

- Ganho de informação
- Índice de Gini
- Entropia
#### In the context of LLMs, what is transfer learning?

Transfer learning, ou aprendizado por transferência, é uma técnica usada em modelos de linguagem como LLMs (Large Language Models) para aproveitar o **conhecimento prévio adquirido em uma tarefa específica e aplicá-lo em uma tarefa relacionada**. 

#### In which area are Large Language Models often used?

- Processamento de linguagem natural: tradução, sumarização, geração e análise de texto
- Geração de conteúdo
- Assistência virtual e chatbot
- Análise de dados e mineração de texto
- Pesquisa e recuperação de informações
#### What is the RAG model?

O modelo RAG (Retrieval Augmented Generation) é uma estrutura que combina diferentes componentes para realizar tarefas de pesquisa e geração de respostas em modelos de linguagem.
#### What does RAG mean in English?

Retrieval Augmented Generation
#### What is Retrieval Augmented Generation abbreviated as?

RAG
#### What is algorithmic bias in language models, and why is it concerning?

O enviesamento em modelos de linguagem refere-se à tendência de esses modelos reproduzirem ou amplificarem preconceitos, estereótipos e desigualdades existentes na linguagem humana e nos dados de treinamento dos quais foram alimentados. 

Esse enviesamento pode ocorrer de várias maneiras:

1. **Viés de Dados**: Os modelos de linguagem aprendem com os dados com os quais são treinados, e se esses dados contiverem preconceitos ou estereótipos, o modelo pode reproduzi-los em suas saídas. Por exemplo, se os dados de treinamento contiverem um viés de gênero em relação a certas ocupações, o modelo pode gerar saídas que refletem e perpetuam esse viés.
    
2. **Viés de Treinamento**: O processo de treinamento do modelo pode introduzir ou amplificar certos tipos de viés. Por exemplo, se o conjunto de dados de treinamento for coletado de fontes que refletem apenas uma perspectiva cultural ou social específica, o modelo pode ser viesado em relação a essa perspectiva.
    
3. **Viés de Avaliação e Feedback**: Os modelos de linguagem podem ser influenciados pelos dados de feedback que recebem durante o treinamento ou pela forma como são avaliados. Se os dados de feedback forem tendenciosos ou se as métricas de avaliação favorecerem certos tipos de saídas em detrimento de outros, o modelo pode ser direcionado a gerar saídas enviesadas.

#### What is the common metric for evaluating classification models?

1. Acurácia (Accuracy)
2. Precisão (Precision)
3. Revocação (Recall ou Sensibilidade)
4. F1-Score    
5. Especificidade (Specificity)
6. ROC-AUC
7. Matriz de Confusão

#### What is the difference between Machine Learning and Deep Learning?

Enquanto nos modelos tradicionais de aprendizado de máquina exigem a extração manual de características relevantes aos dados, um modelo de aprendizado profundo aprende automaticamente extraindo essas características diretamente dos dados brutos.

Esse processo de aprendizado profundo pode resultar em um melhor resultado para tarefas complexas de reconhecimento de padrões, como classificação de imagens.
#### What is the difference between supervised and unsupervised learning?

No Aprendizado supervisionado o modelo é treinado em um conjunto de entradas e saídas, este então faz o mapeamento de uma determinada entrada para uma saída específica.

No Aprendizado não supervisionado o modelo é treinado com um conjunto de dados sem nenhum tipo de rótulo, ele então tenta encontrar padrões como associações ou agrupamentos para identificar os dados.

#### What is the function of Machine Learning algorithms?

A função dos algoritmos de Machine Learning é criar modelos para predição, tomada de decisões ou realização de tarefas específicas por meio do aprendizado de padrões, associações ou agrupamentos dos dados sem que o modelo seja explicitamente programado para isso.

#### What is the purpose of the "Random Cut-Forest" model?

O modelo Random Cut Forest (RCF) é uma técnica utilizada para identificar padrões anômalos ou comportamentos incomuns em conjuntos de dados, sem a necessidade de exemplos rotulados de anomalias.

#### What is the Turing test, and what is the relevance to language models?

O teste de Turing é um teste proposto por Alan Turing em 1950 para avaliar a inteligência de uma máquina. A ideia principal do teste é determinar se uma máquina pode exibir comportamento inteligente indistinguível de um ser humano.

A relevância do teste de Turing para modelos de linguagem, como os LLMs (Large Language Models), reside no fato de que esses modelos são frequentemente avaliados com base em sua capacidade de gerar textos que se assemelham ao texto humano.

Assim, o teste de Turing serve como uma medida de referência para avaliar o progresso e a qualidade dos modelos de linguagem em termos de sua capacidade de compreender e gerar linguagem natural de forma convincente e humana.

#### What is Tokenization in language models?

Processo de dividir um texto em unidades menores chamadas de Tokens.

O objetivo da tokenização é preparar o texto para análise por parte do modelo de linguagem, transformando-o em uma sequência de tokens que podem ser mais facilmente processados ​​e compreendidos pelo modelo.

#### What does the self-attention mechanism in transformer architecture allow the model to do?

O mecanismo de autoatenção na arquitetura Transformer permite que o modelo capture relações de dependência entre palavras em um texto de forma mais eficaz, por meio de capturas de relações de longo alcance entre palavras.

Essa capacidade permite ao modelo criar respostas mais ricas e contextualizadas que os modelos mais tradicionais.

Exemplo da capacidade de autoatenção:

Considere a frase: "O gato estava dormindo no sofá enquanto o cachorro brincava lá fora."

Quando o modelo processa essa frase usando o mecanismo de autoatenção, ele é capaz de capturar as relações entre palavras em toda a frase. Por exemplo:

- Para a palavra "dormindo", o modelo pode atribuir alta atenção às palavras "gato" e "sofá", pois elas estão intimamente relacionadas ao ato de dormir.
- Para a palavra "brincava", o modelo pode atribuir alta atenção às palavras "cachorro" e "lá fora", pois elas estão relacionadas à atividade de brincar.
- Além disso, o modelo também pode capturar relações entre palavras em diferentes partes da frase. Por exemplo, ele pode relacionar "gato" e "cachorro" como sendo animais, mesmo estando separados por outras palavras.