# Notebooks

Os Notebooks são elementos do [[Databricks]] que permite que times executem Jobs, façam análise exploratória entre outras várias tarefas de engenheiros, cientistas e analistas de dados precisam.

Para **definir um Notebook no Databricks** é necessário apenas criar um arquivo python e na primeira linha adicionar o seguinte comentário: `# Databricks notebook source`.

# Comandos mágicos

Comandos mágicos que podem ser utilizados nos notebooks do Databricks para várias funcionalidades

```python
%python, %r, %scala, %sql # troca a linguagem na célula de comando
%sh                       # roda código shell
%fs                       # atalho para dbutils comandos do sistema de arquivos
%md                       # markdown para estilização
%run                      # executa um notebook remoto de outro notebook
%pip                      # instala novas bibliotecas python
```

Sobre o `%sh` é um comando mágico que deve ser utilizado com cautela já que ele executa o código shell sobre a máquina driver local **aumentando a sobrecarga de trabalho**. 

Para verificar o diretório atual podemos utilizar o comando `%sh pwd`.

# Adicionando parâmetros aos Notebooks

Para adicionarmos parâmetros os notebook utilizamos a funcionalidade de [Widgets](https://docs.databricks.com/pt/notebooks/widgets.html)

```python
​​dbutils.widgets.text("param1", "default")
param1 = dbutils.widgets.get("param1")
```

Esse parâmetros podem ser configurados pela interface gráfica do Databricks.

# Código

### Misturando as linguagens

É possível [intercambiar dados entre células de Python e SQL](https://docs.databricks.com/en/notebooks/notebooks-code.html#explore-sql-cell-results-in-python-notebooks-using-python) . Esse é um caso de uso muito comum quando queremos buscar dados utilizando SQL e explorar os dados em Python. Para isso utilizamos tabelas temporárias que são definidas em sistemas de cache do ambiente.

```python
# celula_1.py

path = "..."
sparkDF = spark.read.csv(path, header="true", inferSchema="true")
sparkDF.createOrReplaceTempView("tabela_temporária")
```

```sql
-- celula_2.sql
%sql
SELECT * FROM tabela_temporária
...
```

A segunda célula será executada normalmente buscando os dados da tabela temporária criada.
### SQL UDF

É possível definir funções para serem reutilizadas no código SQL dentro dos notebooks Databricks.

```sql
%sql
-- exemplo de declaração de função
CREATE OR REPLACE FUNCTION item_preference(name STRING, price INT)
RETURNS STRING
RETURN CASE
	WHEN name = "Standard" THEN "Default item"
	WHEN name = "Premium" THEN "Favorite item"
	WHEN price > 100 THEN "Caro demais"
	ELSE "É isso ai"
END;

-- exemplo de uso da função
SELECT *, item_preference(name, price) FROM item_lookup
```

### Python UDF

Função que aplica uma transformação customizada em uma coluna. Ao aplicar UDFs em python é importante ter em mente algumas considerações:

- Não são otimizadas pelo Catalyst
- São serializadas e enviadas para os executores
	- Os dados da linha são deserializados para formato binário do Spark, passado para a UDF e então os resultados são serializados novamente o formato binário
- Existe uma comunicação excedente entre o executor e o interpretador do python.

É possível registrar uma UDF em python para ser utilizada no SQL.

```python
def example_fn(thing):
	# faz alguma coisa

spark.udf.register("sql_udf", example_fn)

%sql
SELECT sql_udf(thing) as transformed_thing from table_a
```

### Importando módulos Python

Podemos utilizar módulos em [[Python]] de duas formas:

- Módulos de outros diretórios
- Pacotes wheel

Para [importar módulos de outros diretórios](https://docs.databricks.com/pt/files/workspace-modules.html#import-python-and-r-modules) é necessário adicionar o caminho ao interpretador do Python. Isso é feito pela variável `sys.path` como no exemplo a seguir:

```python
import sys
import os
sys.path.append(os.path.abspath('..'))
```

O `sys.path` contém a lista de todos os diretórios que o interpretador do Python busca por módulos. 

Também é possível importar pacotes [[Python wheel]] fazendo a instalação a partir do comando 

```
%python pip pacote.whl
```