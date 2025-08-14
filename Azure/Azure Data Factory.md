# Azure Data Factory

> [!info] Principais referências
> - [Página do produto](https://azure.microsoft.com/pt-br/products/data-factory)
>- [Documentação](https://learn.microsoft.com/pt-br/azure/data-factory/introduction) 

Azure Data Factory (ADF) é um serviço de integração de dados baseado na nuvem [[Azure]].

Ele foi projetado para orquestrar e automatizar a movimentação e transformação de dados.

Seus principais cenários de utilização são:

- ETL e ELT
	- Azure Databricks, Acure Synapse Analytics ou HDInsight
- Automação de processos e Orquestração de pipeline de dados
- Monitoramento e [[Governança de dados]]
- Integração com ferramentas de BI
- Integração com APIs e serviços externos
- Data Lakes e Data Warehouses
- Cenários de IoT
- Preparação de dados para [[Machine Learning]]

Algumas limitações do ADF

- Por **não ser uma ferramenta de transformação de dados nativa**, transformações complexas dependem de serviços como Databricks, Azure Synapse Analytics e HDInsight
- Apresenta alguns **custos adicionais** que podem ser bastante expressivos em grande volumen de dados
- Para o desenvolvimento o ADF apresenta **suporte limitado** a versionamento, CI/CD e depuração, fazendo com que pipelines mais complexos sejam mais desafiadores de serem validados

### Principais componentes

- **Pipelines e Atividades** para orquestração de workflows.
    
- **Datasets e Linked Services** para conexão com fontes e destinos de dados.
    
- **Integration Runtime** para movimentação de dados em ambientes híbridos.
	- Ele é o mecanismo que permite executar atividades e mover dados entre redes, seja a rede local ou redes virtuais privadas.
    
- **Data Flows** para transformações visuais de dados.
	- Também é possível utilizado o **Mapping Data Flow** para mapear transformações ETL mais complexas, como limpeza de dados, agregações, cálculos ou enriquecimento de dados.
    
- **Triggers** para automação de execuções.
    
- **Integração com Azure Data Lake Storage, Synapse Analytics, Databricks** e outros serviços para processamento e armazenamento de dados.

- **Monitoramento e Gerenciamento**
	- Oferece ferramentas integradas para monitorar a execução de pipelines, como logs, métricas e alertas.