# Vertex AI

> [!info] Info
> A Vertex AI é uma plataforma de desenvolvimento de IA unificada e totalmente gerenciada para criar e usar a IA generativa.
> 
> [Página inicial do produto](https://cloud.google.com/vertex-ai?_gl=1*u5gaud*_up*MQ..&gclid=CjwKCAjwp8OpBhAFEiwAG7NaElBEz4y3U-Y-DtXP6jJnk--f2M35IuE0l_8HKt5cks-jpbo43hQ29BoCp0YQAvD_BwE&gclsrc=aw.ds&hl=pt_br#how-it-works)
> Empresa: Google

### Principais recursos

- Integração com o Gemini: acesso aos modelos do Gemini do Google.
- AI Platform aberta e integrada: integra notebooks e workbench com o BigQuery oferecendo uma plataforma unificada de desenvolvimento.
- O [Model Garden](https://cloud.google.com/vertex-ai/docs/start/explore-models?hl=pt-br) permite descobrir, testar, personalizar e implantar a Vertex AI, além de selecionar modelos e recursos de código aberto (OSS).
- MLOps para IA preditiva e generativa
	- Permite treinamento supervisionado, semi-supervisionado ou não-supervisionado
	- Opções de treinamento: AutoML e Customizada
- Agent Builder: consegue montar experiências de IA generativa sem código.

Utilização por SDK
- SDK está disponível em Python
- Bibliotecas clientes estão disponíveis em Python, Java e Node
- Também é possível utilizar o Vertex AI por meio de uma API Rest

### Tecnologias relacionadas

- AutoML
- Vertex AI Vizier
- Big Query ML
### Precificação

- Uso das ferramentas de IA generativa por consulta
- Modelos de AutoML são cobrados por hora de uso
- Pipelines da Vertex AI são cobradas por execução
- Notebooks da Vertex AI são cobrados de acordo com os recursos consumidos de outros produtos Compute Engine e Cloud Storage
- Para treinamento de modelos personalizados são cobrados de acordo com os recursos computacionais utilizados

### Concorrentes

1. Amazon SageMaker: Oferece uma ampla gama de ferramentas para construir, treinar e implantar modelos de aprendizado de máquina na AWS.
2. Microsoft Azure Machine Learning: Uma plataforma de IA e aprendizado de máquina na nuvem que permite aos desenvolvedores construir, treinar e implantar modelos de ML usando ferramentas familiares.
3. IBM Watson Studio: Uma plataforma completa de IA que oferece ferramentas para construir, treinar e implantar modelos de ML, além de fornecer recursos avançados de análise de dados.
4. Databricks: Uma plataforma de análise de dados e IA que facilita a colaboração entre cientistas de dados e engenheiros de ML usando Apache Spark.
5. NVIDIA AI Enterprise: Uma plataforma de IA que oferece soluções de ponta a ponta, desde hardware até software, para treinar e implantar modelos de IA em escala.
6. H2O.ai: Uma plataforma de IA aberta que oferece ferramentas para construir, treinar e implantar modelos de ML em grandes conjuntos de dados.

# Vertex AI UI

![[Vertex AI UI 2022.png]]

- Dashboard
- Datasets
- Features
- Labelling tasks
- Pipelines
- Traning
- Experiments
- Models
- Endpoints
- Batch predictions
- Metadata

# Componentes

1. **Vertex AI Workbench (Bancada de Trabalho do Vertex AI):** Uma interface integrada que permite aos cientistas de dados e desenvolvedores colaborarem no desenvolvimento de modelos de ML, oferecendo ferramentas para exploração de dados, pré-processamento, treinamento e avaliação de modelos.

2. **Vertex AI Training (Treinamento do Vertex AI):** Oferece recursos para treinar modelos de ML em grande escala e com alta eficiência, aproveitando a infraestrutura e os recursos de computação do Google Cloud. Inclui suporte para ajuste de hiperparâmetros, otimização de modelos e seleção de arquiteturas de rede neural.
   
3. **Vertex AI Prediction (Previsão do Vertex AI):** Facilita a implantação de modelos treinados em produção por meio de endpoints gerenciados, permitindo que os modelos sejam facilmente integrados a aplicativos e serviços em nuvem para realizar previsões em tempo real.

4. **Vertex AI Pipelines (Tubulações do Vertex AI):** Oferece uma plataforma para construir, executar e gerenciar pipelines de ML, permitindo a automação de fluxos de trabalho complexos, desde a ingestão de dados até a implantação de modelos em produção.
   
5. **Vertex AI Datasets (Conjuntos de Dados do Vertex AI):** Fornece recursos para armazenar e gerenciar conjuntos de dados de forma escalável e eficiente, facilitando o acesso e a preparação de dados para treinamento e avaliação de modelos de ML.

6. **Vertex AI Experiments (Experimentos do Vertex AI):** Permite que os usuários organizem e acompanhem experimentos de ML, registrando métricas, hiperparâmetros e resultados para análise e comparação posterior.
   
7. **Vertex AI Model Monitoring (Monitoramento de Modelos do Vertex AI):** Oferece ferramentas de monitoramento para acompanhar o desempenho e a qualidade dos modelos implantados em produção, permitindo a detecção e mitigação de problemas em tempo real.

8.  Vertex AI Vizier: É um serviço de otimização de hiperparâmetros que ajuda cientistas de dados e engenheiros de aprendizado de máquina a encontrar eficientemente as melhores configurações de hiperparâmetros para seus modelos, melhorando assim o desempenho e a precisão do modelo.

# Utilização

### ML Datasets

Datasets são conjuntos de dados que servem para treinar um modelo.

Tipos suportados

- Imagem
- Textos
- Datasets Tabulares
- Vídeos

### Treinamento

[Métodos de treinamentos](https://cloud.google.com/vertex-ai/docs/start/training-methods?utm_source=youtube&utm_medium=unpaidsoc&utm_campaign=CDR_pri_aiml_anwczyck4us_AISimplified_011021&utm_content=description&hl=pt-br)

### Exemplo de modelo de classificação com Vertex AI

[Vídeo com o exemplo](https://www.youtube.com/watch?v=d8FtBAxDZ9A&list=PLIivdWyY5sqJ1YuMdGjRwJ3fFYZ_vWQ62&index=5)

Nesse exemplo é criado um modelo de classificação para fotos com poses de Yoga.

# Referências

- [Tutorial e introdução ao Vertex AI](https://www.youtube.com/playlist?list=PLIivdWyY5sqJ1YuMdGjRwJ3fFYZ_vWQ62)