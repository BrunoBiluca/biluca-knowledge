---
tags:
  - engenharia_de_dados
---
# Engines de streaming de dados

As engines de streaming de dados são conjuntos de tecnologias que permitem um processamento contínuo dos dados com baixa latência.

## Tipos de engines

### Open source compositional engines

In a compositional stream processing engines, developers define the Directed Acyclic Graph (DAG) in advance and then process the data. This may simplify code, but also means developers need to plan their [data stream architecture](https://www.upsolver.com/blog/streaming-data-architecture-key-components) carefully to avoid inefficient processing.

**Challenges:** Compositional stream processing are considered the “first generation” of stream processing and can be complex and difficult to manage.

**Examples:** Compositional engines include Samza, Apex, and Apache Storm.

### Managed Declarative Engines

Developers use declarative engines to chain stream processing functions. The engine calculates the DAG as it ingests the data. Developers can specify the DAG explicitly in their code, and the engine optimizes it on the fly.

**Challenges:** While declarative engines are easier to manage, and have readily-available managed service options, they still require major investments in data engineering to set up the data pipeline, from source to eventual storage and analysis.

**Examples:** Declarative engines include [Apache Spark Streaming](https://www.upsolver.com/glossary/spark-streaming) and Flink, both of which are provided as a managed offering.

### Fully Managed Self-Service Engines

A new category of stream processing engines is emerging, which not only manages the DAG but offers an end-to-end solution including ingestion of streaming data into storage infrastructure, organizing the data, and facilitating streaming analytics.

**Examples:** 
- [Upsolver SQLake](https://www.upsolver.com/sqlake-main) is a fully managed declarative data pipeline platform for streaming and batch data.  SQLake handles huge volumes of streaming data, stores it in a high-performance cloud data lake architecture, and enables real-time access to data and SQL-based analytics. Learn more from our [architecture overview](https://upsolver.com/wp/architecture-overview).  And see [some of the ways you can use SQLake](https://www.upsolver.com/sqlake-builders-hub) to build declarative, self-orchestrating end-to-end data pipelines.
- O Amazon Kinesis processa e analisa de forma econômica os dados de streaming em qualquer escala como um serviço totalmente gerenciado.

# Comparações

| Engine/Framework | Arquitetura | Tempo real | Pros | Cons | Market Share |
| ---- | ---- | ---- | ---- | ---- | ---- |
| [[Apache Spark]] | Open-source porém deve ser configurado.<br><br>Existem serviços que implementam o Apache Spark como o EMR na AWS e Dataproc no GCP | Baixa/Média latencia | Apache Spark is a mature product with a large community, proven in production for many use cases, and readily supports SQL querying. | - Spark can be complex to set up and implement<br>- It is not a true streaming engine (it performs very fast batch processing)<br>- Limited language support<br>- Latency of a few seconds, which eliminates some real-time analytics use cases | 80% (Juntando Apache Spark e Streaming) |
| [Apache Storm](http://storm.apache.org/) | The Apache Storm Architecture is founded on spouts and bolts. Spouts are origins of information and transfer information to one or more bolts. This information is linked to other bolts, and the entire topology forms a DAG. Developers define how the spouts and bolts are connected. | Muito baixa latência | - Probably the best technical solution for true real-time processing<br>- Use of micro-batches provides flexibility in adapting the tool for different use cases<br>- Very wide language support | - Does not guarantee ordering of messages, may compromise reliability<br>- Highly complex to implement | 6% |
| [Apache Samza](http://samza.apache.org/) | [Apache Samza](http://samza.apache.org/) uses the Apache Kafka messaging system, architecture, and guarantees, to offer buffering, fault tolerance, and state storage. Samza relies on YARN for resource negotiation. However, a Hadoop cluster is needed (at least HDFS and YARN). | Baixa latência.<br><br>Processamento utilizando HDFS e YARN (Pode se mostrar mais lento) | - Offers replicated storage that provides reliable persistency with low latency.<br>- Easy and inexpensive multi-subscriber model<br>- Can eliminate backpressure, allowing data to be persisted and processed later | - Only supports JVM languages<br>- Does not support very low latency<br>- Does not support exactly-once semantics | <1% |
| [Flink](http://flink.apache.org/) | Apache Flink is a stream processing framework that also handles batch tasks. Flink approaches batches as data streams with finite boundaries. | Baixa latência e alta taxa de transferência.<br><br>Processamento de entrada a entrada em tempo real. | - Stream-first approach offers low latency, high throughput<br>- Real entry-by-entry processing<br>- Does not require manual optimization and adjustment to data it processes<br>- Dynamically analyzes and optimizes tasks | - Some scaling limitations<br>- A relatively new project with less production deployments than other frameworks | 8.85% |
| [Amazon Kinesis Streams](http://aws.amazon.com/kinesis/data-streams/) | It can collect gigabytes of data per seconds from hundreds of thousands of sources, including database event streams, website clickstreams, financial transactions, IT logs, social media feeds, and location-tracking events. |  | - A robust managed service that is easy to set up and maintain<br>- Integrates with Amazon’s extensive big data toolset | - Commercial cloud service, priced per hour per shard (see [pricing](https://aws.amazon.com/kinesis/data-streams/pricing/)) | 1% |
| [Apex](http://apex.apache.org/) (Descontinuado) |  |  |  |  |  |
| [Flume](http://flume.apache.org/) | The key concept behind the design of Flume is to capture streaming data from web servers to Hadoop Distributed File System (HDFS). |  | - Fault tolerance, failover and advanced recovery and reliability features | - Difficult to understand and configure with complex logical/physical mapping |  |
| [Azure Stream Analytics](https://azure.microsoft.com/en-us/products/stream-analytics) | Build an end-to-end serverless streaming pipeline using the no-code editor or SQL. |  |  |  |  |
