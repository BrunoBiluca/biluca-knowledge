---
tags:
  - inteligência_artificial
---
> [!info] O que é?
> O Amazon SageMaker é um serviço totalmente gerenciado que permite criar, treinar e implantar modelos de ML em grande escala usando ferramentas como cadernos, depuradores, perfiladores, pipelines, MLOps e muito mais, tudo em um ambiente de desenvolvimento integrado (IDE).
> 
> [Página do produto](https://aws.amazon.com/pt/sagemaker/)

Principais funcionalidades

- Ambiente integrado para criação, treinamento, implantação de modelos de ML
- Interface visual SageMaker Canvas voltada a analista de negócios
- Acesso a notebooks pelo SageMaker Studio para cientistas de dados
- Implantação, depuração e gerenciamento de modelos em escala com o SageMaker MLOps para Engenheiros de ML
- **Amazon SageMaker Clarify:** serviço de avaliação de modelos base como detecção de possíveis vieses e toxicidade. Esse serviço explica como o modelo faz a predição e quais conjuntos de dados e modelos reflexem vieses.
- **Amazon SageMaker Data Wrangler:** serviço de transformação de dados que pode ser utilizado para importar, limpar, analisar os dados por meio de um interface gráfica e soluções low-code no-code para limpeza e preparação de dados.
- **Amazon SageMaker Model Monitor:** monitora a qualidade dos modelos em produção.
- **Amazon SageMaker Autopilot:** pode ser usado para fornecer informações explicáveis sobre como os modelos fazem previsões.
- **Amazon SageMaker Canvas:** recurso para desenvolvimento de aplicações de ML com pouco ou sem código.
- **Amazon SageMaker Model Cards:** cria registros e documentos detalhados sobre os modelos ML em um único local. Ele suporta a transparência e explicabilidade do modelo.
- **Amazon SageMaker Ground Truth:** usa avaliações humanas para criar bases de dados rotuladas.
- **Amazon SageMaker Model Registry:** registro de modelos ML.

Com o SageMaker Jump Start é possível ter acesso a vários modelos base open source apenas fazendo o host desses modelos e controle dos endpoints.

### Precificação
[Página de precificação](https://aws.amazon.com/pt/sagemaker/pricing/?nc=sn&loc=4)

Cada funcionalidade do SageMaker é cobrada de acordo com suas necessidades, principalmente a cobrança é feita pelas instâncias selecionadas para cada serviços, alguns serviços são cobrados de forma diferente.

### Concorrentes

- Google Vertex AI
- Amazon Bedrock (não é bem um concorrente, mais um serviços em um nível maior de abstração dentro da AWS)

Diferente dos seus concorrentes o SageMaker é um serviço de machine learning de propósito geral, enquanto os demais focam no desenvolvimento de IA generativas.