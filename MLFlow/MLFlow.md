# MLFlow

--- start-multi-column: ExampleRegion1  
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

[MLFlow](https://mlflow.org/) é uma plataforma que unifica todo o processo de desenvolvimento de [[Machine Learning]].

--- end-column ---

> [!info] Principais referências
> - [Documentação](https://mlflow.org/docs/latest/introduction/index.html)
>- 

--- end-multi-column
# MLFlow models

O MLFlow disponibiliza um formato padrão de empacotamento de modelos de Machine Learning chamado [MLFlow Models](https://mlflow.org/docs/latest/models.html). Com isso podemos utilizar uma variedade de modelos desenvolvidos por outras ferramentas, por exemplo servindo serviços em tempo real ou processamento em lotes.

Registrar modelos utilizando MLFlow Models tem as seguintes vantagens:

- Modelo de treinamento escalável, por utilizar cluster em nuvem para fazer o processamento
- Publicação e disponibilização do modelo de forma simplificada
- Aplicação de avaliações e e customizações em modelos já registrados
- Rastreamento da evolução do modelo, o próprio [[MLFlow]] tem uma robusta interface de rastreamento dessa evolução que exibem várias métricas.

Por exemplo para registrar e carregar modelos do tipo Python é necessário fazer:

```python
# registro do modelo
mlflow.<model-type>.log_model(model, ...) # <model-type> pode ser substituído por pyfunc por exemplo

# carregametno do modelo como uma UDF do Spark
input_data = spark.table(input_table_name)
model_udf = mlflow.pyfunc.spark_udf(spark, model_path)
df = input_data.withColumn("prediction", model_udf())
```

Nesse exemplo uma função Python é registrada como um Modelo do MLFlow e carregada como uma UDF do Spark para gerar uma coluna `prediction`.
