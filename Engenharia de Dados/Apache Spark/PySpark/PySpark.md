---
tags:
  - engenharia_de_dados
categoria: framework
---
# PySpark

--- start-multi-column: ExampleRegion1  
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

PySpark é uma camada sobre o [[Apache Spark]] que possibilita a implementação de processamento de dados utilizando a linguagem [[Python]].

--- end-column ---

> [!info] Principais referências
>- [Tutorial definitivo de instalação do PySpark no Windows](https://sparkbyexamples.com/pyspark/how-to-install-and-run-pyspark-on-windows/)

--- end-multi-column

Exemplos

- [[UDFs]]
- [[Exemplo - Valores mínimos]]

Melhores práticas

- [[Empacotamento de arquivo do PySpark]]

Principais componentes

- [[DataFrameReader]]
- [[DataFrameWriter]]

# PySpark e testes automatizados

> [!quote]- (Tutorial) - [Unit testing PySpark code using Pytest | Engineering for Data Science](https://engineeringfordatascience.com/posts/pyspark_unit_testing_with_pytest/)
> Bom exemplo de utilização do Pytest para executar os testes

### Melhoria de performance nos testes

Quando estamos implementando testes automatizados para o desenvolvimento de projetos com PySpark um dos principais problemas encontrados é na **performance da execução**. Criar uma nova sessão do spark a cada teste pode impactar profundamente na performance do sistema.

Uma solução para esse problema é criar e **compartilhar a mesma sessão do spark sobre toda a bateria de testes**.

# PySpark com Venv

> [!quote]- (Tutorial) - [Using VirtualEnv with PySpark - Cloudera Community - 245932](https://community.cloudera.com/t5/Community-Articles/Using-VirtualEnv-with-PySpark/ta-p/245932)

### Configurações

| Property | Description |
| ---- | ---- |
| spark.pyspark.virtualenv.enabled | Property flag to enable virtualenv |
| spark.pyspark.virtualenv.type | Type of virtualenv. Valid values are “native”, “conda” |
| spark.pyspark.virtualenv.requirements | Requirements file (optional, not required for interactive mode) |
| spark.pyspark.virtualenv.bin.path | The location of virtualenv executable file for type native or conda executable file for type conda |
| spark.pyspark.virtualenv.python_version | Python version for conda. (optional, only required when you use conda in interactive mode) |
# Pypark vs Pandas

Tanto o [[Apache Spark]] quanto o Pandas são frameworks para manipulação de dados com ampla utilização no mercado, mesmo que tenham interfaces parecidas elas tem casos de uso diferentes.

Quando pensamos em escalabilidade e desempenho para grandes volumes de dados o mais indicado é o [[Apache Spark]], já que o Pandas é normalmente executado em apenas uma máquina.

Para análise exploratória e pela performance em bases dados menores o Pandas pode ser uma ótima opção. Apenas essa análise ser levantada podemos então implementar os jobs Spark para a execução da massa completa.

