# Exemplo - Separação do treinamento do uso de modelos de ML com MLFlow

Podemos fazer o treinamento independente da utilização desse modelo criado pelo formato definido pelo [[MLFlow]].

Nesse exemplo temos o primeiro script que treina e registra o modelo `LogisticRegression` em um volume do Databricks (utilizando o gerenciamento do [[Unity Catalog]]).

```python
# training_model.py
from mlflow import spark
from pyspark.ml.classification import LogisticRegression

# Train a Spark MLlib model
lr = LogisticRegression(maxIter=2)
model = lr.fit(train_data)

# Log the model as an MLflow artifact
with mlflow.start_run() as run:
    mlflow.spark.log_model(model, "caminho/do/modelo")
```

Quando o processamento de [[Structured Streaming]] ou o processamento em lotes do [[Apache Spark]] precisa do modelo, ele é carregado no mesmo volume definido e então utilizado.

```python
# job.py
loaded_model = mlflow.pyfunc.load_model("caminho/do/modelo")
```
