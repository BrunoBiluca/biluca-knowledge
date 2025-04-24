# Spark Connect

A partir do [[Apache Spark]] 3.4, Spark Connect foi introduzido para desacoplar a arquitetura cliente-servidor para possibilitar conectividade ao cluster do Spark usando a [[DataFrame]] API e plano lógico não resolvido como protocolo. A API do Spark Connect funciona para embarcar em aplicações de servidores, IDEs, notebooks, e linguagens de programação.

> [!quote]- (Documentação) - [Spark Connect Overview](https://spark.apache.org/docs/3.5.2/spark-connect-overview.html)
> Visão geral sobre os Spark Connect.

**Benefícios:**

- **Estabilidade:** aplicações impactam apenas em seus próprios ambientes e definem suas próprias dependências
- **Habilidade de atualização:** permite atualização do Spark Driver independentemente das aplicações
- **Habilidade de depuração e monitoramento:** permite depuração interativa diretamente das IDEs.




