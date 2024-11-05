# Vertex AI

> [!info] Info
> Criado pela Google a Vertex AI é uma plataforma de desenvolvimento de IA unificada e totalmente gerenciada para criar e usar a IA generativa.
> 
> [Página inicial do produto](https://cloud.google.com/vertex-ai?_gl=1*u5gaud*_up*MQ..&gclid=CjwKCAjwp8OpBhAFEiwAG7NaElBEz4y3U-Y-DtXP6jJnk--f2M35IuE0l_8HKt5cks-jpbo43hQ29BoCp0YQAvD_BwE&gclsrc=aw.ds&hl=pt_br#how-it-works)
> [Tutorial e introdução ao Vertex AI](https://www.youtube.com/playlist?list=PLIivdWyY5sqJ1YuMdGjRwJ3fFYZ_vWQ62)
> 

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

1. **Vertex AI Workbench:** Uma interface integrada que permite aos cientistas de dados e desenvolvedores colaborarem no desenvolvimento de modelos de ML, oferecendo ferramentas para exploração de dados, pré-processamento, treinamento e avaliação de modelos.

2. **Vertex AI Training:** Oferece recursos para treinar modelos de ML em grande escala e com alta eficiência.
   
3. **Vertex AI Prediction (Previsão do Vertex AI):** implantação de modelos treinados em produção por meio de endpoints gerenciados

4. **Vertex AI Pipelines:** automação de fluxos de trabalho complexos, desde a ingestão de dados até a implantação de modelos em produção.
   
5. **Vertex AI Datasets:** Fornece recursos para armazenar e gerenciar conjuntos de dados de forma escalável e eficiente

6. **Vertex AI Experiments:** Permite que os usuários organizem e acompanhem experimentos de ML, registrando métricas, hiperparâmetros e resultados para análise para comparação posterior.
   
7. **Vertex AI Model Monitoring:** ferramentas de monitoramento de desempenho e qualidade em tempo real

8.  Vertex AI Vizier: serviço de otimização de hiperparâmetros

# ML Datasets

Datasets são conjuntos de dados que servem para treinar um modelo.

Tipos suportados

- Imagem
- Textos
- Datasets Tabulares
- Vídeos

# Treinamento

[Métodos de treinamentos](https://cloud.google.com/vertex-ai/docs/start/training-methods?utm_source=youtube&utm_medium=unpaidsoc&utm_campaign=CDR_pri_aiml_anwczyck4us_AISimplified_011021&utm_content=description&hl=pt-br)

### Publicação de modelos treinados

1. **Prepare seu modelo treinado:** seu modelo deve estar preparado e treinado em algum dos formatos disponíveis, que incluem TensorFlow SavedModel, TensorFlow Lite ou um contêiner personalizado para modelos construídos usando outros framework.
2. **Faça o upload do seu modelo para um bucket do Cloud Storage:** Armazene os artefatos do seu modelo treinado (por exemplo, binários do modelo, metadados) em um bucket do Cloud Storage.
3. **Crie um recurso de modelo no Vertex AI:** Usando o SDK do Vertex AI ou o Console do Google Cloud, crie um recurso de modelo que represente seu modelo treinado.
4. **Implante o modelo em um Endpoint:** Depois que o recurso do modelo for criado, implante-o em um Endpoint no Vertex AI.
5. **Teste o modelo implantado:** Após a implantação, teste seu modelo enviando solicitações de previsão para o Endpoint. 
	-  Opções de testes são, SDK do Vertex AI, API REST ou bibliotecas clientes
6. **Monitore e gerencie o Endpoint:** Monitore o desempenho e o uso do seu modelo implantado usando ferramentas de monitoramento fornecidas pelo Vertex AI. 
	- Métricas latência, throughput e taxas de erro para

### Exemplo de modelo de classificação com Vertex AI

[Vídeo com o exemplo](https://www.youtube.com/watch?v=d8FtBAxDZ9A&list=PLIivdWyY5sqJ1YuMdGjRwJ3fFYZ_vWQ62&index=5)

Nesse exemplo é criado um modelo de classificação para fotos com poses de Yoga.


# Vertex AI para IoT

Veja como o Vertex AI pode auxiliar na implantação de modelos em dispositivos IoT:

1. **Otimização de Modelos:** fornece técnicas como quantização, poda e compressão de modelo para reduzir o tamanho do modelo e a complexidade computacional, mantendo a precisão.
    
2. **Implantação de Modelo na Borda:** fornece runtimes de inferência leves, possibilitando a inferência em tempo real sem exigir recursos computacionais significativos.
    
3. **Monitoramento e Gerenciamento:** oferece capacidades de monitoramento e gerenciamento para modelos implantados, permitindo que os desenvolvedores monitorem o desempenho, a saúde e a utilização de recursos. 

> [!info] Referência de utilização do Vertex AI para detecção de anomalias industriais
> - [Artigo com a explicação do projeto](https://www.griddynamics.com/blog/anomaly-detection-industrial-iot-data)
> - [Código de referência utilizando Vertex AI](https://github.com/griddynamics/rnd-gcp-starter-kits/tree/main/anomaly-detection-iot-vertex-ai)