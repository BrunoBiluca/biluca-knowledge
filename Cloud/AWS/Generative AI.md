Para conceitos gerais de [[IA generativa]].

![[AWS componentes para desenvolvimento de generative AI.png|Principais componentes da AWS relacionados a aplicações que utilizam generative AI|500]]

# Generative AI

- **Amazon SageMaker JumpStart**: serviço com soluções prontas para aplicação de IA generativa
- [[Amazon Bedrock]]: disponibiliza modelos base (FM) da Amazon de das principais startups de IA por meio de uma API.
- **Amazon Q**: serviços de perguntas e respostas gerais
- **Amazon Q Developer**: serviço de recomendação de código
# Serviços AI/ML

São serviços que oferecem soluções prontas para uso.

- **Amazon Comprehend**: analisa e descobre informações e as relações em textos não estruturados
- **Amazon Translate**: tradução
- **Amazon Textract**: extração de texto a partir de documentos digitalizados
- **Amazon Lex**: serviço para criação de interfaces de conversação por texto ou voz.
- **Amazon Polly**: transforma texto em voz.
- **Amazon Transcribe**: transforma fala em texto.
- **Amazon Rekognition**: análise de imagens e vídeos.
- **Amazon Kendra**: serviço de pesquisa.
- **Amazon Personalize**: serviço de criação de recomendações para usuários.
- **Amazon DeepRacer**: serviço de treinamento para novos desenvolvedores de ML

# Frameworks ML
- [[Amazon SageMaker]]


# Casos de uso

Varejo

- Resumo de avaliações de produtos
- Otimizações da definição de preços: aumento de lucro
- Otimização do layout da loja

Saúde

- AWS HealthScribe: observações clínicas automáticas a partir de conversas
- Personalizar o medicamento: planos de tratamento a partir da composição genética do paciente
- Melhorar os exames a partir de reconstrução ou geração de imagens médicas como radiografias, ressonâncias entre outras

# Desenvolvimento de uma aplicação de IA generativa

Ciclo de vida ds aplicações de IA generativa

- Defina um caso de uso
- Selecione um modelo de base
- Melhore o desempenho
- Avalie os resultados
- Implante a aplicação

É importante observar que o ciclo de vida da aplicação de IA generativa é um processo iterativo, devemos levar em consideração as métricas de desempenho, avaliações dos usuários e qualquer outro tipo de dado que possa ser coletado para melhorar o modelo.

## Defina um caso de uso

Uma forma de fazer a definição é utilizar a abordagem de caso de uso comercial.

> [!info]- Caso de uso comercial
> É uma narrativa estruturada qeu descreve como um sistema ou processo deve se comportar a partir da perspectiva de um ator ou stakeholder.
> 
> É composto geralmente das seguintes partes
> - Nome do caso de uso
> - Breve descrição
> - Atores
> - Condições prévias
> - Fluxo básico (principal cenário de sucesso)
> - Fluxos alternativos (extensões)
> - Pós-condições
> - Regras de negócios
> - Requisitos não funcionais
> - Pressuposições
> - Observações ou informações adicionais

## Selecione um modelo de base

Principais considerações

- Custo: questões de licenciamento
- Modalidade: formato que o modelo foi treinado a replicar, como texto, áudio, vídeos ou multimodal
- Latência
- Suporte a vários idiomas
- Tamanho do modelo
- Complexidade do modelo
- Personalização
- Comprimento de entrada/saída: modelos podem ter limitações em relação a isso
- Considerações sobre responsabilidade ([[IA generativa#Principais desafios]])
- Implantação e integração

Os principais modelos no mercado podem ser encontrados no [[Amazon Bedrock#Modelos disponíveis]]



## Melhore o desempenho

Após a seleção do modelo base é preciso concentrar em melhorar o desempenho do modelo para o caso de uso definido. Isso pode ser feito a partir de algumas técnicas como:

- [[Design de comandos (Engenharia de prompts)]]
- [[RAG (Retrieval Augmented Generation)]]
- Ajuste fino
- Agentes de automação

O [[Amazon Bedrock]] é um serviço que pode ser utilizado para reunir fontes de dados de vários domínios e melhorar o desempenho do modelo escolhido.
## Avalie os resultados



## Implante a aplicação