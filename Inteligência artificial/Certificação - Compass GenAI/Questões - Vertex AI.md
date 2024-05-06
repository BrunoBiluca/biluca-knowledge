## Vertex AI

### How can you deploy a trained model in Vertex AI?

1. **Prepare seu modelo treinado:** seu modelo deve estar preparado e treinado em algum dos formatos disponíveis, que incluem TensorFlow SavedModel, TensorFlow Lite ou um contêiner personalizado para modelos construídos usando outros framework.
2. **Faça o upload do seu modelo para um bucket do Cloud Storage:** Armazene os artefatos do seu modelo treinado (por exemplo, binários do modelo, metadados) em um bucket do Cloud Storage.
3. **Crie um recurso de modelo no Vertex AI:** Usando o SDK do Vertex AI ou o Console do Google Cloud, crie um recurso de modelo que represente seu modelo treinado.
4. **Implante o modelo em um Endpoint:** Depois que o recurso do modelo for criado, implante-o em um Endpoint no Vertex AI.
5. **Teste o modelo implantado:** Após a implantação, teste seu modelo enviando solicitações de previsão para o Endpoint. 
	-  Opções de testes são, SDK do Vertex AI, API REST ou bibliotecas clientes
6. **Monitore e gerencie o Endpoint:** Monitore o desempenho e o uso do seu modelo implantado usando ferramentas de monitoramento fornecidas pelo Vertex AI. 
	- Métricas latência, throughput e taxas de erro para

### What are the features that Google Vertex AI offers?

- Desenvolvimento de modelos colaborativos em uma plataforma unificada e integrada
- Treinamento de modelos escalável
- Automação do ciclo de vida do modelo
- Implantação de modelos em produção
- Monitoramento e gerenciamento de modelos
- Integração com outras ferramentas do Google Cloud
- Suporte a uma variedade de frameworks e linguagens
- Serviços pré-treinados e AutoML

### What are the main components of Vertex AI?

1. **Vertex AI Workbench (Bancada de Trabalho do Vertex AI):** Uma interface integrada que permite aos cientistas de dados e desenvolvedores colaborarem no desenvolvimento de modelos de ML, oferecendo ferramentas para exploração de dados, pré-processamento, treinamento e avaliação de modelos.

2. **Vertex AI Training (Treinamento do Vertex AI):** Oferece recursos para treinar modelos de ML em grande escala e com alta eficiência, aproveitando a infraestrutura e os recursos de computação do Google Cloud. Inclui suporte para ajuste de hiperparâmetros, otimização de modelos e seleção de arquiteturas de rede neural.
   
3. **Vertex AI Prediction (Previsão do Vertex AI):** Facilita a implantação de modelos treinados em produção por meio de endpoints gerenciados, permitindo que os modelos sejam facilmente integrados a aplicativos e serviços em nuvem para realizar previsões em tempo real.
   
4. **Vertex AI Datasets (Conjuntos de Dados do Vertex AI):** Fornece recursos para armazenar e gerenciar conjuntos de dados de forma escalável e eficiente, facilitando o acesso e a preparação de dados para treinamento e avaliação de modelos de ML.

5. **Vertex AI Model Monitoring (Monitoramento de Modelos do Vertex AI):** Oferece ferramentas de monitoramento para acompanhar o desempenho e a qualidade dos modelos implantados em produção, permitindo a detecção e mitigação de problemas em tempo real.


### Vertex AI offers integration with which data storage services?

1. **Google Cloud Storage (GCS):** GCS é um serviço escalável de armazenamento de objetos que permite armazenar e recuperar dados de praticamente qualquer lugar. Ele se integra perfeitamente ao Vertex AI, permitindo que você armazene conjuntos de dados, artefatos de modelos e outros dados relacionados a ML.

2. **BigQuery:** BigQuery é um data warehouse totalmente gerenciado e serverless que permite analisar grandes conjuntos de dados usando consultas SQL. O Vertex AI pode acessar diretamente dados armazenados em tabelas do BigQuery para treinamento e inferência, facilitando a construção de modelos de ML usando conjuntos de dados em larga escala.
   
3. **Google Cloud Bigtable:** Bigtable é um serviço de banco de dados NoSQL projetado para lidar com cargas de trabalho massivas com baixa latência. O Vertex AI pode ler dados diretamente do Bigtable para uso em tarefas de treinamento e previsão, permitindo que você aproveite dados em tempo real para aplicativos de ML.

4. **Google Cloud Firestore:** Firestore é um banco de dados flexível e escalável para desenvolvimento de aplicativos móveis, da web e de servidor. O Vertex AI pode integrar-se ao Firestore para acessar dados estruturados para tarefas de treinamento e inferência, permitindo que você construa modelos de ML que utilizem dados de coleções do Firestore.
   
5. **Google Cloud SQL:** Cloud SQL é um serviço de banco de dados relacional totalmente gerenciado que suporta MySQL, PostgreSQL e SQL Server. O Vertex AI pode se conectar a instâncias do Cloud SQL para recuperar dados estruturados para tarefas de treinamento e previsão, proporcionando uma integração perfeita com bancos de dados relacionais.

### What is the difference between AI Platform and Google Vertex AI?

Em resumo, o AI Platform é uma plataforma madura para desenvolvimento de modelos de ML e IA, enquanto o **Vertex AI é uma evolução desse serviço**, oferecendo uma abordagem mais abstrata, automatizada e integrada para desenvolver, treinar e implantar modelos de ML e IA. Se você está começando um novo projeto de ML no Google Cloud, o Vertex AI pode ser a escolha mais indicada devido à sua abordagem simplificada e unificada.
###  What is the goal of Google Vertex AI Service API?

O serviço de API do Google Vertex AI é disponibilizado para os programadores a permiti-los gerenciar recursos de forma escalável e automática. Principais características quando utilizado o serviço:

- Automação
- Integração
- Customização
- Escalabilidade

### What is Vertex Vizier? 

O Vertex Vizier é um componente da plataforma Vertex AI do Google Cloud que oferece ajuste automatizado de hiperparâmetros e otimização para modelos de aprendizado de máquina. É um serviço de otimização de hiperparâmetros que ajuda cientistas de dados e engenheiros de aprendizado de máquina a encontrar eficientemente as melhores configurações de hiperparâmetros para seus modelos, melhorando assim o desempenho e a precisão do modelo.

> [!info] Hiperparâmetros
> São parâmetros que controlam o processo de aprendizado de algoritmos de aprendizado de máquina.

Recursos principais do Vertex Vizier incluem:

1. **Ajuste de Hiperparâmetros:** O Vertex Vizier automatiza o processo de ajuste de hiperparâmetros
    
2. **Algoritmos de Otimização:**  suporta vários algoritmos de otimização, incluindo pesquisa aleatória, pesquisa em grade, otimização bayesiana e algoritmos evolutivos.
    
3. **Paralelismo e Escalabilidade:** Ovárias avaliações de modelo sejam realizadas simultaneamente. Esse paralelismo melhora a eficiência e reduz o tempo necessário para encontrar hiperparâmetros ótimos, especialmente para projetos de aprendizado de máquina em grande escala com modelos e conjuntos de dados complexos.
    
4. **Integração com o Vertex AI:** O Vertex Vizier se integra perfeitamente a outros componentes da plataforma Vertex AI, incluindo Treinamento do Vertex AI e Previsão do Vertex AI.
    
5. **Monitoramento e Visualização:** O Vertex Vizier fornece ferramentas de monitoramento e visualização para acompanhar o progresso dos experimentos de ajuste de hiperparâmetros, permitindo visualizar métricas de desempenho, o que ajuda no processo de tomada de decisões sobre o modelo.
### What types of deep learning models does Vertex AI support?

1. **Redes Neurais Convolucionais (CNNs):** CNNs são amplamente usadas para tarefas de visão computacional, como classificação de imagens, detecção de objetos e segmentação semântica.
    
2. **Redes Neurais Recorrentes (RNNs):** RNNs são adequadas para tarefas que envolvem sequências de dados, como reconhecimento de fala, tradução automática, geração de texto e análise de séries temporais.
    
3. **Redes Neurais Convolucionais 1D (1D CNNs):** 1D CNNs são utilizadas para tarefas de processamento de sequência, como análise de sentimentos em texto, classificação de documentos e detecção de padrões em séries temporais.
    
4. **Redes Neurais Generativas (GANs):** GANs são usadas para gerar dados sintéticos realistas, como imagens, áudio e texto. Elas são frequentemente utilizadas em aplicações de geração de conteúdo e aumento de dados.
    
5. **Redes Neurais Recorrentes Longas de Curto Prazo (LSTMs):** LSTMs são uma forma especializada de RNNs que são eficazes para lidar com sequências longas e capturar dependências de longo prazo. Elas são comumente usadas em tarefas de linguagem natural e processamento de texto.
    
6. **Redes Neurais Transformers:** Transformers são modelos de aprendizado profundo que se destacam em tarefas de processamento de linguagem natural (NLP), como tradução automática, geração de resumos e resposta a perguntas.
### How does Vertex AI assist in deploying models to IoT devices?

O Vertex AI oferece capacidades para ajudar na implantação de modelos de aprendizado de máquina em dispositivos IoT (Internet das Coisas), possibilitando a integração de recursos de IA em dispositivos de borda (Edge devices) para inferência e tomada de decisões em tempo real. Veja como o Vertex AI pode auxiliar na implantação de modelos em dispositivos IoT:

1. **Otimização de Modelos:** fornece técnicas como quantização, poda e compressão de modelo para reduzir o tamanho do modelo e a complexidade computacional, mantendo a precisão.
    
2. **Implantação de Modelo na Borda:** fornece runtimes de inferência leves, possibilitando a inferência em tempo real sem exigir recursos computacionais significativos.
    
3. **AutoML Edge (Descontinuado):** automatiza o processo de treinamento do modelo, otimização e conversão para implantação em dispositivos IoT, tornando mais fácil para os desenvolvedores criar e implantar modelos de ML na borda.
    
4. **Monitoramento e Gerenciamento:** oferece capacidades de monitoramento e gerenciamento para modelos implantados, permitindo que os desenvolvedores monitorem o desempenho, a saúde e a utilização de recursos. 

> [!info] Referência de utilização do Vertex AI para detecção de anomalias industriais
> - [Artigo com a explicação do projeto](https://www.griddynamics.com/blog/anomaly-detection-industrial-iot-data)
> - [Código de referência utilizando Vertex AI](https://github.com/griddynamics/rnd-gcp-starter-kits/tree/main/anomaly-detection-iot-vertex-ai)