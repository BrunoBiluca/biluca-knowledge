---
tags:
  - engenharia_de_dados
---
When a pipeline is submitted for execution to the Dataflow Service, it is first transformed into an execution plan called the “Optimized” pipeline graph. Optimizations such as operator fusion, combiner lifting, flatten unzipping, and more are applied to the original pipeline to produce a new one with equivalent semantics. More information on fusion is available [here](https://cloud.google.com/dataflow/docs/guides/deploying-a-pipeline#fusion-optimization). The output is a Directed Acyclic Graph (DAG) with nodes, called stages, and edges, representing data shuffles connecting the stages. Each stage performs roughly the following sequence of operations:

- Read from shuffle input or a data source: This is how the data gets into the stage, either from a previous (upstream) stage, or from some external source of data such as Cloud Pub/Sub, Kafka, GCS, etc.
- Apply a sequence of user-defined transforms/functions (UDFs): This is the “Business Logic” of the dataflow pipeline at this stage. This may include transformations, aggregations, windowing, etc. In many cases this will also include logic that connects to the data sink, such as BigQuery, Cloud BigTable, etc.
- Commit the resulting changes to durable state and output shuffle: Sends outputs that are to be shuffled downstream to further stages for processing. This part of the sequence also ensures durability and correctness, as we will examine in detail below.

